"""Read-only inventory of the built site. Run after npm run build.

Usage: python scripts/audit-built-site.py --output docs/audit-2026-10-23/after.json
This checks local HTML; it does not emulate hosting redirects or measure speed.
"""
import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

ORIGIN = 'https://paramountpropertyrestoration.com'
ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tags = []

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


def route(file):
    name = '/' + file.relative_to(DIST).as_posix()
    return name[:-10] if name.endswith('index.html') else name


def inventory():
    files = sorted(DIST.rglob('*.html'))
    pages = {}
    issues = []
    for file in files:
        page = Page()
        page.feed(file.read_text(encoding='utf-8'))
        pages[route(file)] = page.tags
    for url, tags in pages.items():
        def issue(kind, detail):
            issues.append({'page': url, 'issue': kind, 'detail': detail})

        if sum(tag == 'h1' for tag, _ in tags) != 1:
            issue('h1-count', sum(tag == 'h1' for tag, _ in tags))
        if not any(tag == 'main' or a.get('role') == 'main' for tag, a in tags):
            issue('missing-main-landmark', 'No main landmark')
        canonical = [a.get('href') for tag, a in tags if tag == 'link' and a.get('rel') == 'canonical']
        if canonical != [ORIGIN + url]:
            issue('canonical', canonical)
        if not any(tag == 'meta' and a.get('name') == 'description' and a.get('content') for tag, a in tags):
            issue('missing-description', '')
        if url in ('/404.html', '/410-gone/') and not any(tag == 'meta' and a.get('name') == 'robots' and 'noindex' in a.get('content', '') for tag, a in tags):
            issue('error-page-indexable', url)
        ids = [a['id'] for _, a in tags if 'id' in a]
        for identity, count in Counter(ids).items():
            if count > 1:
                issue('duplicate-id', identity)
        labels = {a['for'] for tag, a in tags if tag == 'label' and a.get('for')}
        for tag, a in tags:
            if tag in ('input', 'select', 'textarea') and a.get('type') != 'hidden' and a.get('name') != 'bot-field':
                if not (a.get('id') in labels or a.get('aria-label') or a.get('aria-labelledby')):
                    issue('control-without-associated-label', a.get('name', ''))
            if tag == 'img' and 'alt' not in a:
                issue('missing-image-alt', a.get('src'))
            attr = 'href' if tag == 'a' else 'src' if tag in ('img', 'script') else None
            if not attr or not a.get(attr):
                continue
            target = urlsplit(urljoin(ORIGIN + url, a[attr]))
            if target.scheme not in ('http', 'https') or target.netloc != urlsplit(ORIGIN).netloc:
                continue
            path = unquote(target.path)
            local = DIST / path.lstrip('/')
            exists = local.is_file() or (local / 'index.html').is_file()
            if not exists:
                issue('missing-local-target', a[attr])
            elif tag == 'a' and target.fragment:
                target_tags = pages.get(path, [])
                if not any(attrs.get('id') == unquote(target.fragment) for _, attrs in target_tags):
                    issue('missing-fragment', a[attr])
    sitemap = []
    for file in sorted(DIST.glob('sitemap-*.xml')):
        root = ET.parse(file).getroot()
        if root.tag.endswith('urlset'):
            sitemap.extend(e.text for e in root.iter() if e.tag.endswith('}loc'))
    assets = sorted((p for p in DIST.rglob('*') if p.is_file() and p.suffix.lower() in ('.webp', '.png', '.jpg', '.jpeg')), key=lambda p: p.stat().st_size, reverse=True)
    return {
        'html_pages': len(files),
        'city_pages': sum(url.startswith('/service-areas/') and url != '/service-areas/' for url in pages),
        'sitemap_urls': len(sitemap),
        'sitemap_error_urls': [u for u in sitemap if urlsplit(u).path in ('/404/', '/404.html', '/410-gone/')],
        'issue_counts': dict(Counter(i['issue'] for i in issues)),
        'issues': issues,
        'largest_images': [{'path': '/' + p.relative_to(DIST).as_posix(), 'bytes': p.stat().st_size} for p in assets[:5]],
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    result = inventory()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    print(json.dumps({k: result[k] for k in ('html_pages', 'city_pages', 'sitemap_urls', 'sitemap_error_urls', 'issue_counts')}, indent=2))
