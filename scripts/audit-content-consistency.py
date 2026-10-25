"""Check built editorial claims and FAQ/schema agreement, without submitting forms."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
RETIRED_CLAIMS = (
    'dispatch immediately', 'crew is on the way',
    "so you’re responsible only for your deductible", "so you're responsible only for your deductible",
    'reviewed by an iicrc-certified technician', 'no cost until you need us',
    'we handle the claim', 'so a florida insurer approves it',
    'dry to clearance standard', 'we return daily',
)

def normalized(value):
    return re.sub(r'\s+', ' ', value).strip()

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.form_depth = None
        self.script = None
        self.scripts = []
        self.current = None
        self.summary_depth = None
        self.answer_depth = None
        self.faqs = []
        self.editorial = []
        self.metadata = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag not in VOID:
            self.stack.append(tag)
        depth = len(self.stack)
        if tag == 'form': self.form_depth = depth
        if tag == 'meta' and attrs.get('name') == 'description': self.metadata.append(attrs.get('content', ''))
        if tag == 'script' and attrs.get('type') == 'application/ld+json': self.script = []
        if tag == 'details': self.current = {'q': [], 'a': []}
        if self.current is not None:
            if tag == 'summary': self.summary_depth = depth
            if tag == 'div' and 'ans' in attrs.get('class', '').split(): self.answer_depth = depth

    def handle_endtag(self, tag):
        depth = len(self.stack)
        if tag == 'script' and self.script is not None:
            self.scripts.append(''.join(self.script)); self.script = None
        if tag == 'summary': self.summary_depth = None
        if tag == 'div' and self.answer_depth == depth: self.answer_depth = None
        if tag == 'details' and self.current is not None:
            self.faqs.append((normalized(''.join(self.current['q'])), normalized(''.join(self.current['a']))))
            self.current = None; self.summary_depth = None; self.answer_depth = None
        if tag == 'form': self.form_depth = None
        if tag in self.stack:
            self.stack = self.stack[:len(self.stack)-1-self.stack[::-1].index(tag)]

    def handle_data(self, data):
        if self.script is not None: self.script.append(data)
        if self.current is not None:
            if self.summary_depth is not None: self.current['q'].append(data)
            if self.answer_depth is not None: self.current['a'].append(data)
        if self.form_depth is None and not any(tag in self.stack for tag in ('script','style')): self.editorial.append(data)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    errors = []; questions = 0; schema_pages = 0
    files = sorted((ROOT / 'dist').rglob('*.html'))
    if not files: raise SystemExit('Build the site before running this audit.')
    for file in files:
        page = Page(); page.feed(file.read_text(encoding='utf-8'))
        route = '/' + file.relative_to(ROOT / 'dist').as_posix()
        text = normalized(' '.join(page.editorial + page.metadata)).lower()
        for claim in RETIRED_CLAIMS:
            if claim in text: errors.append({'page':route,'issue':'retired-editorial-claim','text':claim})
        for raw in page.scripts:
            try: schema = json.loads(raw)
            except ValueError:
                errors.append({'page':route,'issue':'invalid-json-ld'}); continue
            if schema.get('@type') != 'FAQPage': continue
            schema_pages += 1
            for question in schema.get('mainEntity', []):
                questions += 1
                pair = (normalized(question.get('name','')), normalized(question.get('acceptedAnswer',{}).get('text','')))
                if pair not in page.faqs: errors.append({'page':route,'issue':'faq-schema-mismatch','question':pair[0]})
    result = {'html_pages':len(files),'faq_schemas':schema_pages,'faq_questions_checked':questions,'errors':errors,
              'scope':'Editorial text, metadata and visible FAQ/schema agreement. Form blocks intentionally excluded.'}
    output = Path(args.output); output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    raise SystemExit(bool(errors))

if __name__ == '__main__': main()
