import { absoluteUrl, defaultImage, site } from '../data/site';

const baseBusiness = {
  '@context': 'https://schema.org',
  '@id': `${site.url}/#studio`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  image: defaultImage,
  logo: `${site.url}/studio39logo.png`,
  email: site.email,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    ...site.address
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...site.geo
  },
  areaServed: ['Nairobi', 'Kenya', 'East Africa'],
  ...(site.social.length ? { sameAs: site.social } : {}),
  knowsAbout: site.keywords
};

export const professionalServiceSchema = {
  ...baseBusiness,
  '@type': 'ProfessionalService',
  serviceType: 'Architecture, interior design, renovation, and architectural visualization'
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  publisher: { '@id': `${site.url}/#studio` }
};

export function serviceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.seoDescription || service.description,
    url: absoluteUrl(`/services/${service.slug || service.id}`),
    provider: { '@id': `${site.url}/#studio` },
    areaServed: ['Nairobi', 'Kenya']
  };
}

export function projectSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    url: absoluteUrl(`/projects/${project.slug || project.id}`),
    image: absoluteUrl(project.hero),
    creator: { '@id': `${site.url}/#studio` },
    about: project.category,
    locationCreated: project.location,
    description: project.excerpt
  };
}
