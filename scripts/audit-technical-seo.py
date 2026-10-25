"""Check production build SEO invariants; optionally crawl a hosting preview.

python scripts/audit-technical-seo.py --output docs/technical-seo-audit.json
python scripts/audit-technical-seo.py --output .companycam-review/seo-preview.json --base https://DEPLOY-HOST
Hosting previews intentionally retain production canonical URLs.
"""
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.request import urlopen, Request
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://paramountpropertyrestoration.com'
ERRORS = {'/404.html', '/410-gone/'}


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.tags, self.schemas, self.title = [], [], ''
        self.script = None
        self.in_title = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag == 'title':
            self.in_title = True
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.script = ''

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.script is not None:
            self.script += data

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        if tag == 'script' and self.script is not None:
            self.schemas.append(json.loads(self.script))
            self.script = None

    def meta(self, key):
        return [a.get('content', '') for tag, a in self.tags if tag == 'meta' and (a.get('name') == key or a.get('property') == key)]


def audit(base=None):
    dist = ROOT / 'dist'
    pages, issues, types, identities = {}, [], Counter(), set()
    businesses, titles, descriptions = [], [], []
    sitemap = []
    for file in dist.glob('sitemap-*.xml'):
        tree = ET.parse(file).getroot()
        if tree.tag.endswith('urlset'):
            sitemap += [node.text for node in tree.iter() if node.tag.endswith('}loc')]
    for file in sorted(dist.rglob('*.html')):
        route = '/' + file.relative_to(dist).as_posix()
        if route.endswith('index.html'):
            route = route[:-10]
        pages[route] = Page(file.read_text(encoding='utf-8'))
    def issue(route, message):
        issues.append({'page': route, 'issue': message})
    for route, page in pages.items():
        canonical = [a.get('href') for tag, a in page.tags if tag == 'link' and a.get('rel') == 'canonical']
        if canonical != ([] if route in ERRORS else [ORIGIN + route]):
            issue(route, 'canonical must be unique, absolute and match the clean route; errors omit it')
        robots = page.meta('robots')
        if len(robots) != 1 or (('noindex' in robots[0]) != (route in ERRORS)):
            issue(route, 'production robots mismatch')
        if sum(tag == 'h1' for tag, _ in page.tags) != 1:
            issue(route, 'expected one h1')
        if not page.title.strip() or len(page.meta('description')) != 1:
            issue(route, 'missing/duplicate title or description')
        if sum(tag == 'title' for tag, _ in page.tags) != 1:
            issue(route, 'expected one title element')
        for key in ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'og:type', 'og:site_name', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']:
            if len(page.meta(key)) != 1 or not page.meta(key)[0]:
                issue(route, 'missing/duplicate ' + key)
        if page.meta('og:url') != [ORIGIN + route]:
            issue(route, 'OG URL differs from route')
        nodes = [node for schema in page.schemas for node in schema.get('@graph', [schema])]
        for node in nodes:
            types[node.get('@type', 'unknown')] += 1
            if node.get('@id'):
                identities.add(node['@id'])
            if node.get('@type') == 'LocalBusiness':
                businesses.append(json.dumps(node, sort_keys=True))
                if 'openingHoursSpecification' in node or 'availableLanguage' in node:
                    issue(route, 'unverified business hours/languages')
            if node.get('@type') == 'BreadcrumbList':
                for crumb in node['itemListElement']:
                    if crumb['item'].removeprefix(ORIGIN) not in pages:
                        issue(route, 'breadcrumb target does not exist: ' + crumb['item'])
        if route in ERRORS:
            if nodes:
                issue(route, 'error helper must omit content schemas')
        else:
            titles.append(page.title)
            descriptions += page.meta('description')
            if sum(n.get('@type') == 'LocalBusiness' for n in nodes) != 1:
                issue(route, 'expected one stable business entity')
            if sum(n.get('@type') in ['WebPage', 'CollectionPage', 'ContactPage'] for n in nodes) != 1:
                issue(route, 'missing/duplicate page entity')
            expected_service = route.startswith('/service-areas/') and route != '/service-areas/' or route in ['/commercial/', '/restoration/water-damage/', '/restoration/fire-damage/', '/restoration/storm-damage/', '/restoration/mold-testing/', '/restoration/mold-remediation/']
            if bool(expected_service) != any(n.get('@type') == 'Service' for n in nodes):
                issue(route, 'service entity mismatch')
            for node in nodes:
                for key in ['isPartOf', 'provider', 'publisher', 'mainEntity', 'mainEntityOfPage', 'breadcrumb', 'about']:
                    ref = node.get(key, {})
                    if isinstance(ref, dict) and ref.get('@id') and not any(n.get('@id') == ref['@id'] for n in nodes):
                        issue(route, 'unresolved graph reference: ' + ref['@id'])
    if len(set(businesses)) != 1:
        issue('*', 'business entity changes between pages')
    for key, values in [('titles', titles), ('descriptions', descriptions)]:
        duplicates = [value for value, count in Counter(values).items() if count > 1]
        if duplicates:
            issue('*', 'duplicate ' + key + ': ' + repr(duplicates))
    expected = {ORIGIN + route for route in pages if route not in ERRORS}
    if set(sitemap) != expected or len(sitemap) != len(expected):
        issue('*', 'sitemap does not equal the unique indexable canonical set')
    projects = json.loads((ROOT / 'src/data/selected-projects.json').read_text(encoding='utf-8'))
    project_ids = {a.get('id') for _, a in pages['/projects/'].tags}
    if any(project['id'] not in project_ids for project in projects):
        issue('/projects/', 'projects missing from initial HTML')
    city_links = {a.get('href') for tag, a in pages['/service-areas/'].tags if tag == 'a'}
    if any(route not in city_links for route in pages if route.startswith('/service-areas/') and route != '/service-areas/'):
        issue('/service-areas/', 'city links missing from initial HTML')
    if 'Sitemap: ' + ORIGIN + '/sitemap-index.xml' not in (dist / 'robots.txt').read_text():
        issue('/robots.txt', 'missing sitemap declaration')
    live = []
    if base:
        def check(url):
            route = url.removeprefix(ORIGIN)
            target = base.rstrip('/') + route
            try:
                with urlopen(Request(target, headers={'User-Agent': 'PPR-Technical-SEO-Audit/1.0'}), timeout=30) as response:
                    page = Page(response.read().decode('utf-8'))
                    canonical = [a.get('href') for tag, a in page.tags if tag == 'link' and a.get('rel') == 'canonical']
                    preview = base.rstrip('/') != ORIGIN
                    robot = ','.join(page.meta('robots')) + ',' + response.headers.get('X-Robots-Tag', '')
                    ok = response.status == 200 and response.url == target and canonical == [url] and (('noindex' in robot) == preview)
                    return {'route': route, 'status': response.status, 'canonical': canonical, 'robots': robot, 'ok': ok}
            except Exception as error:
                return {'route': route, 'ok': False, 'error': str(error)}
        with ThreadPoolExecutor(max_workers=4) as pool:
            live = list(pool.map(check, sorted(expected)))
        for item in live:
            if not item['ok']:
                issue(item['route'], 'hosting check failed')
    return {'html_pages': len(pages), 'indexable_pages': len(expected), 'sitemap_urls': len(sitemap), 'schema_counts': dict(types), 'server_rendered_projects': len(projects), 'issues': issues, 'live': live}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    parser.add_argument('--base')
    args = parser.parse_args()
    result = audit(args.base)
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({k: v for k, v in result.items() if k != 'live'}, indent=2))
    raise SystemExit(bool(result['issues']))
