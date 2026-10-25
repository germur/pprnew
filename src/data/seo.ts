import { COMPANY, REGIONS, SERVICES } from './company';
import projects from './selected-projects.json';
import { SERVICE_IMAGERY, RESOURCE_IMAGERY } from './project-imagery';

const cities = REGIONS.flatMap(region => [...region.cities]);
const articles = new Set(['/resources/is-black-mold-dangerous/', '/resources/mold-testing-cost/']);
const names: Record<string, string> = {
  restoration: 'Restoration', 'service-areas': 'Service Areas', resources: 'Resources',
  projects: 'Projects', contact: 'Contact', emergency: 'Emergency', commercial: 'Commercial Restoration',
  'insurance-claims': 'Insurance Claims', 'our-process': 'Our Process',
  'privacy-policy': 'Privacy Policy', 'terms-of-service': 'Terms of Service',
  'is-black-mold-dangerous': 'Is Black Mold Dangerous?', 'mold-testing-cost': 'Mold Testing Cost',
  ...Object.fromEntries(SERVICES.map(service => [service.slug, service.name])),
  ...Object.fromEntries(cities.map(city => [city.slug, city.name])),
};

export function buildSeo({ title, description, path, site }: { title: string; description: string; path: string; site: URL }) {
  const absolute = (value: string) => new URL(value, site).href;
  const root = absolute('/');
  // Paths are editorial routes, never request query strings or fragments.
  const pathname = new URL(path, site).pathname;
  const canonical = absolute(pathname);
  const businessId = root + '#business';
  const websiteId = root + '#website';
  const pageId = canonical + '#webpage';
  const city = cities.find(city => pathname === `/service-areas/${city.slug}/`);
  const service = SERVICES.find(service => service.url === pathname);
  const isArticle = articles.has(pathname);
  const selection = service ? SERVICE_IMAGERY[service.slug] : pathname === '/resources/is-black-mold-dangerous/' ? RESOURCE_IMAGERY : undefined;
  const photo = selection?.photo || (city && projects.find(project => project.citySlug === city.slug)?.photos[0]);
  const image = photo ? { url: absolute(photo.src), alt: photo.alt, width: photo.width, height: photo.height }
    : { url: absolute('/ppr-logo.png'), alt: COMPANY.name, width: undefined, height: undefined };
  const areaServed = cities.map(city => ({ '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: 'Florida' } }));
  const business = {
    '@type': 'LocalBusiness', '@id': businessId, name: COMPANY.name,
    description: 'Property restoration services for water, fire, mold and storm damage in the listed Florida service areas. Contact available 24/7.',
    url: root, telephone: '+1' + COMPANY.phoneRaw, email: COMPANY.email,
    image: absolute('/ppr-logo.png'), logo: absolute('/ppr-logo.png'),
    sameAs: Object.values(COMPANY.social),
    address: { '@type': 'PostalAddress', streetAddress: COMPANY.address, addressLocality: COMPANY.city, addressRegion: COMPANY.state, postalCode: COMPANY.zip, addressCountry: 'US' },
    areaServed,
    contactPoint: { '@type': 'ContactPoint', telephone: '+1' + COMPANY.phoneRaw, contactType: 'customer service',
      hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' } },
  };
  const graph: Record<string, unknown>[] = [business,
    { '@type': 'WebSite', '@id': websiteId, url: root, name: COMPANY.name, publisher: { '@id': businessId }, inLanguage: 'en-US' },
    { '@type': ['/projects/', '/resources/', '/service-areas/', '/restoration/'].includes(pathname) ? 'CollectionPage' : pathname === '/contact/' ? 'ContactPage' : 'WebPage',
      '@id': pageId, url: canonical, name: title, description, inLanguage: 'en-US', isPartOf: { '@id': websiteId }, about: { '@id': businessId },
      primaryImageOfPage: { '@type': 'ImageObject', url: image.url },
      ...(pathname !== '/' ? { breadcrumb: { '@id': canonical + '#breadcrumbs' } } : {}),
      ...(service || city ? { mainEntity: { '@id': canonical + '#service' } } : isArticle ? { mainEntity: { '@id': canonical + '#article' } } : {}),
    },
  ];
  if (pathname !== '/') {
    let accumulated = '';
    const crumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: root }];
    pathname.split('/').filter(Boolean).forEach((segment, index) => {
      accumulated += '/' + segment;
      crumbs.push({ '@type': 'ListItem', position: index + 2, name: names[segment] || segment.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' '), item: absolute(accumulated + '/') });
    });
    graph.push({ '@type': 'BreadcrumbList', '@id': canonical + '#breadcrumbs', itemListElement: crumbs });
  }
  if (service || city) graph.push({ '@type': 'Service', '@id': canonical + '#service', url: canonical,
    name: service?.name || `Property restoration in ${city!.name}`, description,
    serviceType: service?.name || 'Property restoration', provider: { '@id': businessId },
    areaServed: city ? { '@type': 'City', name: city.name, containedInPlace: { '@type': 'State', name: 'Florida' } } : areaServed,
    mainEntityOfPage: { '@id': pageId },
  });
  if (isArticle) graph.push({ '@type': 'Article', '@id': canonical + '#article', headline: title, description,
    url: canonical, image: image.url, publisher: { '@id': businessId }, mainEntityOfPage: { '@id': pageId }, inLanguage: 'en-US',
    ...(pathname === '/resources/is-black-mold-dangerous/' ? { dateModified: '2026-10-24' } : {}),
  });
  return { canonical, image, isArticle, schema: { '@context': 'https://schema.org', '@graph': graph } };
}
