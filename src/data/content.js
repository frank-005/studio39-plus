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
  statementLines: ['YOUR HOME STARTS', 'WITH YOUR STORY.'],
  image: '/about/nairobi-kenya.jpg',
  paragraphs: [
    'Before we draw anything, we want to understand the life you want to build. What do your mornings look like? Where does your family naturally gather? What does home mean to you? These conversations shape the design.',
    'Based in Nairobi and working across Kenya, Franklin collaborates closely with clients to turn ideas, needs, and aspirations into homes that feel genuinely their own. Every project is an opportunity to create a place where you want to spend your life.'
  ],
  location: 'Nairobi · Kenya',
  capabilities: 'Residential Architecture · Interiors · Thoughtful Design',
  ...aboutData,
  statementLines: Array.isArray(aboutData.statementLines) ? aboutData.statementLines : ['YOUR HOME STARTS', 'WITH YOUR STORY.'],
  paragraphs: Array.isArray(aboutData.paragraphs) ? aboutData.paragraphs : []
};