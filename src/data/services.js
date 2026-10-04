const contentFiles = import.meta.glob('../content/services/*.json', {
  eager: true,
  import: 'default'
});

const services = Object.entries(contentFiles)
  .map(([filePath, content]) => {
    const id = filePath.split('/').pop().replace(/\.json$/, '');
    const service = content && typeof content === 'object' ? content : {};

    return {
      ...service,
      id,
      slug: service.slug || id,
      title: service.title || 'Untitled Service',
      shortTitle: service.shortTitle || service.title || 'Service',
      description: service.description || '',
      fullDescription: service.fullDescription || service.description || '',
      keywords: Array.isArray(service.keywords) ? service.keywords : [],
      process: Array.isArray(service.process) ? service.process : [],
      deliverables: Array.isArray(service.deliverables) ? service.deliverables : [],
      featured: service.featured === true,
      published: service.published !== false,
      order: Number.isFinite(service.order) ? service.order : Number.MAX_SAFE_INTEGER
    };
  })
  .filter((service) => service.published)
  .sort((first, second) => first.order - second.order || first.id.localeCompare(second.id));

export default services;