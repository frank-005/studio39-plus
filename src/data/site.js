const settingsFiles = import.meta.glob('../content/site-settings.json', {
  eager: true,
  import: 'default'
});

const settings = settingsFiles['../content/site-settings.json'] || {};
const fallbackImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80&fm=webp';
const fallbackPageSeo = {
  home: {
    title: 'Residential Architect Kenya | Private Homes and Villas',
    description: 'Studio 39+ is a Nairobi-based architecture practice designing private homes, villas, residences, and retreat environments across Kenya and East Africa.'
  },
  about: {
    title: 'About Studio 39+ | Luxury Residential Architect Kenya',
    description: 'Learn about Studio 39+, a Nairobi-based residential architecture studio designing homes, villas, and retreat environments across Kenya.'
  },
  projects: {
    title: 'Featured Residences | Luxury Homes and Villas in Kenya',
    description: 'Browse Studio 39+ residential architecture studies across private homes, villas, and compact residential commissions in Kenya.'
  },
  services: {
    title: 'Luxury Residential Architecture Services in Kenya',
    description: 'We design thoughtfully crafted private homes, villas, and residential estates across Kenya, with focused architecture, interiors, renovation, and visualization services.'
  },
  contact: {
    title: 'Begin a Residential Project in Kenya',
    description: 'Contact Studio 39+ to discuss private homes, villas, renovations, Interior Design, and residential design work in Kenya.'
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
    'Residential Architect Kenya',
    'Modern Villa Architect Nairobi',
    'Private Residential Design Kenya',
    'Contemporary Home Architect East Africa',
    'Bespoke Villa Design Kenya',
    'Private Residence Architect Nairobi'
  ],
  social: ['https://www.instagram.com/', 'https://www.behance.net/', 'https://www.linkedin.com/'],
  socialLinks: {
    instagram: 'https://www.instagram.com/',
    behance: 'https://www.behance.net/',
    linkedin: 'https://www.linkedin.com/'
  },
  defaultSeoTitle: 'Luxury Residential Architect Kenya | Bespoke Villa Design | Studio 39+',
  defaultSeoDescription: 'Studio 39+ is a Nairobi-based architecture practice designing luxury homes, villas, private residences, family estates, and bespoke living environments across Kenya and East Africa.',
  defaultOgImage: fallbackImage,
  pageSeo: fallbackPageSeo,
  copyright: '(c) 2026 Studio 39+. Architecture, interiors, and visualization.',
  whatsapp: 'https://wa.me/254703906562',
  ...settings,
  address: { streetAddress: 'Imaara Mall', addressLocality: 'Nairobi', addressCountry: 'KE', ...settings.address },
  geo: { latitude: -1.3284, longitude: 36.8797, ...settings.geo },
  social: [
    settings.socialLinks?.instagram || 'https://www.instagram.com/',
    settings.socialLinks?.behance || 'https://www.behance.net/',
    settings.socialLinks?.linkedin || 'https://www.linkedin.com/'
  ].filter(Boolean),
  socialLinks: {
    instagram: 'https://www.instagram.com/',
    behance: 'https://www.behance.net/',
    linkedin: 'https://www.linkedin.com/',
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
