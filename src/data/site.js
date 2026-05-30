export const site = {
  name: 'Studio 39+',
  legalName: 'Studio 39+ Architecture Studio',
  url: 'https://www.studio39ke.com',
  email: 'studio39ke@gmail.com',
  phone: '+254703906562',
  displayPhone: '+254 703 906 562',
  whatsapp: 'https://wa.me/254703906562?text=Hello%20Studio%2039%2B%2C%20I%27d%20like%20to%20book%20an%20architecture%20consultation.',
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
    'Luxury Residential Architect Kenya',
    'Modern Villa Architect Nairobi',
    'High-End Residential Design Kenya',
    'Contemporary Home Architect East Africa',
    'Bespoke Villa Design Kenya',
    'Private Residence Architect Nairobi'
  ],
  social: ['https://www.instagram.com/', 'https://www.behance.net/', 'https://www.linkedin.com/']
};

export const defaultImage =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80&fm=webp';

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}
