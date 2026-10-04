const contentFiles = import.meta.glob('../content/projects/*.json', {
  eager: true,
  import: 'default'
});

const projects = Object.entries(contentFiles)
  .map(([filePath, content]) => {
    const id = filePath.split('/').pop().replace(/\.json$/, '');
    const project = content && typeof content === 'object' ? content : {};

    return {
      ...project,
      id,
      slug: project.slug || id,
      name: project.name || project.title || 'Untitled Project',
      category: project.category || 'Other',
      location: project.location || project.country || 'Kenya',
      year: project.year || '',
      status: project.status || '',
      hero: project.hero || project.coverImage || project.gallery?.[0]?.src || '',
      excerpt: project.excerpt || '',
      overview: project.overview || project.excerpt || '',
      gallery: Array.isArray(project.gallery) ? project.gallery : [],
      drawings: Array.isArray(project.drawings) ? project.drawings : [],
      materials: Array.isArray(project.materials) ? project.materials : [],
      spatialExperience: Array.isArray(project.spatialExperience) ? project.spatialExperience : [],
      technicalDocumentation: Array.isArray(project.technicalDocumentation) ? project.technicalDocumentation : [],
      details: Array.isArray(project.details) ? project.details : [],
      palette: Array.isArray(project.palette) ? project.palette : [],
      services: Array.isArray(project.services) ? project.services : [],
      seoKeywords: Array.isArray(project.seoKeywords) ? project.seoKeywords : [],
      caseStudy: project.caseStudy && typeof project.caseStudy === 'object' ? project.caseStudy : {},
      featured: project.featured === true,
      published: project.published !== false,
      order: Number.isFinite(project.order) ? project.order : Number.MAX_SAFE_INTEGER
    };
  })
  .filter((project) => project.published)
  .sort((first, second) => first.order - second.order || first.id.localeCompare(second.id));

export default projects;