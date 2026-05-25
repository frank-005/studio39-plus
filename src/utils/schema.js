import { absoluteUrl, defaultImage, site } from '../data/site';

const baseBusiness = {
  '@context': 'https://schema.org',
  '@id': `${site.url}/#studio`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  image: defaultImage,
  logo: `${site.url}/favicon.svg`,
  email: site.email,
  telephone: site.phone,
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    ...site.address
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...site.geo
  },
  areaServed: ['Nairobi', 'Kenya', 'East Africa'],
  sameAs: site.social,
  knowsAbout: site.keywords
};

export const architecturalFirmSchema = {
  ...baseBusiness,
  '@type': 'ArchitecturalFirm',
  description:
    'Studio 39+ is a Nairobi architecture studio for residential, hospitality, safari lodge, interior architecture, and architectural visualization projects.'
};

export const localBusinessSchema = {
  ...baseBusiness,
  '@type': 'LocalBusiness',
  description: 'Architects in Nairobi creating luxury residential, hospitality, and visualization work across Kenya and East Africa.'
};

export const professionalServiceSchema = {
  ...baseBusiness,
  '@type': 'ProfessionalService',
  serviceType: 'Architecture, interior architecture, hospitality design, and architectural visualization'
};

export function projectSchema(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    url: absoluteUrl(`/projects/${project.id}`),
    image: project.hero,
    creator: { '@id': `${site.url}/#studio` },
    about: project.category,
    locationCreated: project.location,
    description: project.excerpt
  };
}
