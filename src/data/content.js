const homepageFiles = import.meta.glob('../content/homepage.json', {
  eager: true,
  import: 'default'
});
const aboutFiles = import.meta.glob('../content/about.json', {
  eager: true,
  import: 'default'
});

const homepageContent = homepageFiles['../content/homepage.json'] || {};
const aboutData = aboutFiles['../content/about.json'] || {};

export const homepage = {
  ...homepageContent,
  heroSlides: Array.isArray(homepageContent.heroSlides) ? homepageContent.heroSlides : [],
  featuredProjects: Array.isArray(homepageContent.featuredProjects) ? homepageContent.featuredProjects : [],
  featuredServices: Array.isArray(homepageContent.featuredServices) ? homepageContent.featuredServices : [],
  philosophy: Array.isArray(homepageContent.philosophy) ? homepageContent.philosophy : [],
  process: Array.isArray(homepageContent.process) ? homepageContent.process : [],
  testimonials: {
    ...(homepageContent.testimonials || {}),
    items: Array.isArray(homepageContent.testimonials?.items) ? homepageContent.testimonials.items : []
  },
  materials: {
    ...(homepageContent.materials || {}),
    principles: Array.isArray(homepageContent.materials?.principles) ? homepageContent.materials.principles : []
  }
};

export const aboutContent = {
  founder: 'Franklin Ombui',
  role: 'Founder & Principal Designer',
  eyebrow: 'Getting to Know Us',
  statementLines: ['EVERY PROJECT STARTS', 'WITH A CONVERSATION.'],
  image: '/about/nairobi-kenya.jpg',
  paragraphs: [
    'Before we draw anything, we listen. We learn about the brief, the site, the people who will use the space, and the ambitions behind the project. These conversations give the design a clear starting point.',
    'Based in Nairobi and working across Kenya, Franklin collaborates with clients and project teams to turn ideas, needs, and aspirations into thoughtful spaces. Each project is shaped by its context, purpose, and agreed scope.'
  ],
  location: 'Nairobi · Kenya',
  capabilities: 'Architecture · Interiors · Visualization',
  ...aboutData,
  statementLines: Array.isArray(aboutData.statementLines) ? aboutData.statementLines : ['EVERY PROJECT STARTS', 'WITH A CONVERSATION.'],
  paragraphs: Array.isArray(aboutData.paragraphs) ? aboutData.paragraphs : []
};
