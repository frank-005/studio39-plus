import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import CaseStudyFacts from '../components/CaseStudyFacts';
import CTASection from '../components/CTASection';
import projects from '../data/projects';
import { imageSrcSet, optimizedImageUrl } from '../utils/images';
import { projectSchema } from '../utils/schema';

function ListBlock({ title, items }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-5 space-y-3 text-base leading-8 text-charcoal/72 dark:text-sand">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function DetailTable({ project }) {
  const rows = [
    ['Project', project.name],
    ['Location', project.location],
    ['Typology', project.category],
    ['Year', project.year],
    ['Status', project.status],
    ['Studio role', 'Architecture, visualization, material direction, documentation strategy']
  ];

  return (
    <dl className="divide-y divide-charcoal/12 border-y border-charcoal/12 dark:divide-ivory/12 dark:border-ivory/12">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-2 py-4 sm:grid-cols-[0.38fr_0.62fr]">
          <dt className="eyebrow text-[0.68rem]">{label}</dt>
          <dd className="text-sm leading-7 text-charcoal/76 dark:text-sand">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find((item) => item.id === projectId), [projectId]);

  if (!project) {
    return (
      <div className="pt-32 pb-24 content-container">
        <SEO title="Project Not Found" description="The requested Studio 39+ architecture case study could not be found." />
        <p className="eyebrow">Project not found</p>
        <button onClick={() => navigate('/projects')} className="btn-secondary mt-6">
          Back to projects
        </button>
      </div>
    );
  }

  const gallery = [
    project.hero,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80&fm=webp',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80&fm=webp'
  ];

  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title={`${project.name} Case Study`}
        description={`${project.name} by Studio 39+: ${project.excerpt}`}
        image={optimizedImageUrl(project.hero, 1600)}
        type="article"
        schema={projectSchema(project)}
      />
      <section className="relative overflow-hidden bg-ivory light-surface-overlay pb-12 dark:bg-charcoal md:pb-16">
        <div className="content-container grid gap-10 py-14 sm:py-16 md:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="eyebrow">{project.category} Case Study</p>
            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl lg:text-6xl dark:text-ivory">{project.name}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-charcoal/72 dark:text-sand">{project.excerpt}</p>
          </div>
          <CaseStudyFacts project={project} />
        </div>

        <div className="content-container">
          <div className="project-feature-media overflow-hidden bg-charcoal">
            <img
              src={optimizedImageUrl(project.hero, 1600)}
              srcSet={imageSrcSet(project.hero, [720, 1080, 1440, 1800])}
              sizes="100vw"
              alt={`${project.name} exterior and spatial atmosphere in ${project.location}`}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="content-container grid gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_.9fr]">
        <div className="space-y-10">
          <SectionHeading eyebrow="Project Overview" title="A detailed architectural story from brief to spatial concept." />
          <p className="text-base leading-9 text-charcoal/72 dark:text-sand">{project.overview}</p>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Client Brief</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.brief}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Design Concept</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.concept}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Site / Context</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.context}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-charcoal dark:text-ivory">Challenges Solved</h2>
            <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{project.challenges}</p>
          </div>
        </div>
        <aside className="space-y-10 border border-mist bg-sand p-7 shadow-soft dark:border-neutral-700 dark:bg-charcoal sm:p-10">
          <div>
            <h3 className="eyebrow">Project Details</h3>
            <div className="mt-6">
              <DetailTable project={project} />
            </div>
          </div>
          <ListBlock title="Materials" items={project.materials} />
          <ListBlock title="Renders" items={project.renders} />
          <ListBlock title="Floor Plans" items={project.floorPlans} />
          <div>
            <h3 className="eyebrow">Studio Scope</h3>
            <ul className="mt-5 space-y-3 text-base leading-8 text-charcoal/72 dark:text-sand">
              <li>Architecture</li>
              <li>Interior Architecture</li>
              <li>Architectural Visualization</li>
              <li>Technical Documentation</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="content-container pb-16 md:pb-20" aria-labelledby="gallery-title">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="gallery-title" className="text-3xl font-semibold text-charcoal dark:text-ivory">Renders and Visual Studies</h2>
          <Link to="/projects" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.24em] text-charcoal dark:text-sand">
            All projects
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {gallery.map((image, index) => (
            <div key={image} className="aspect-[4/3] overflow-hidden bg-mist dark:bg-charcoal">
              <img
                src={optimizedImageUrl(image, 900)}
                srcSet={imageSrcSet(image, [480, 720, 960])}
                sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt={`${project.name} render ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
      <CTASection title={`Discuss a project like ${project.name}.`} />
    </div>
  );
}

export default ProjectDetail;
