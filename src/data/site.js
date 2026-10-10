const settingsFiles = import.meta.glob('../content/site-settings.json', {
  eager: true,
  import: 'default'
});

const settings = settingsFiles['../content/site-settings.json'] || {};
const fallbackImage = 'https://studio39ke.com/projects/ukwala/arrival-wide.jpg';
const fallbackPageSeo = {
  home: {
    title: 'Architecture & Interior Design Nairobi | Studio 39+',
    description: 'Nairobi-based architecture and interior design studio for residential, hospitality and commercial spaces, including technical drawings and 3D visualisation.'
  },
  about: {
    title: 'About Studio 39+ | Nairobi Architecture Studio',
    description: 'Meet Studio 39+, a Nairobi architecture and interior design studio working on residential, hospitality, and commercial projects across Kenya.'
  },
  projects: {
    title: 'Architecture & Interior Projects in Kenya | Studio 39+',
    description: 'Explore architecture and interior design projects by Studio 39+, with project locations, design details, and visualisations.'
  },
  services: {
    title: 'Architecture, Interiors & 3D Visualisation | Studio 39+',
    description: 'Explore Studio 39+ services for residential, hospitality, and commercial projects, from architecture and interiors to renovation, documentation, and 3D visualisation.'
  },
  contact: {
    title: 'Contact Studio 39+ | Start a Design Project',
    description: 'Contact Studio 39+ in Nairobi to discuss a residential, hospitality, commercial, architecture, interior design, or visualisation project.'
  }
};

export const site = {
  name: 'Studio 39+',
  legalName: 'Studio 39+ Architecture Studio',
  url: 'https://studio39ke.com',
  email: 'frankombui1@gmail.com',
  phone: '+254703906562',
  displayPhone: '+254 703 906 562',
  location: 'Nairobi, Kenya',
  address: {
    streetAddress: 'Imaara Mall',
    addressLocality: 'Nairobi',
    addressCountry: 'KE'
  },
  geo: {
    latitude: -1.3284,
    longitude: 36.8797
  },
  keywords: [
    'Architecture Nairobi',
    'Architectural design Kenya',
    'Residential architecture',
    'Interior design Kenya',
    'Architectural visualization',
    'Technical drawings'
  ],
  socialLinks: {
    instagram: '',
    behance: '',
    linkedin: ''
  },
  defaultSeoTitle: 'Architecture & Interior Design Nairobi | Studio 39+',
  defaultSeoDescription: 'Nairobi-based architecture and interior design studio for residential, hospitality and commercial spaces, including technical drawings and 3D visualisation.',
  defaultOgImage: fallbackImage,
  pageSeo: fallbackPageSeo,
  copyright: '(c) 2026 Studio 39+. Architecture, interiors, and visualization.',
  whatsapp: 'https://wa.me/254703906562',
  ...settings,
  address: { streetAddress: 'Imaara Mall', addressLocality: 'Nairobi', addressCountry: 'KE', ...settings.address },
  geo: { latitude: -1.3284, longitude: 36.8797, ...settings.geo },
  social: [settings.socialLinks?.instagram, settings.socialLinks?.behance, settings.socialLinks?.linkedin]
    .filter((href) => typeof href === 'string' && href.trim()),
  socialLinks: {
    instagram: '',
    behance: '',
    linkedin: '',
    ...settings.socialLinks
  },
  pageSeo: {
    ...fallbackPageSeo,
    ...settings.pageSeo
  }
};

export const defaultImage = site.defaultOgImage || fallbackImage;

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}
