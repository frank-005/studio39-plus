import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import projects from '../data/projects';

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => projects.find((item) => item.id === projectId), [projectId]);

  if (!project) {
    return (
      <div className="pt-28 pb-24 content-container">
        <p className="text-sm uppercase tracking-[0.35em] text-charcoal/70 dark:text-sand">Project not found</p>
        <button onClick={() => navigate('/projects')} className="mt-6 rounded-full border border-charcoal px-6 py-3 text-sm uppercase tracking-[0.25em] text-charcoal dark:border-sand dark:text-sand">
          Back to projects
        </button>
      </div>
    );
  }

  const gallery = [
    project.hero,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80'
  ];

  return (
    <div className="pt-32 pb-28 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      <section className="relative overflow-hidden bg-ivory pb-16 dark:bg-charcoal md:pb-20">
        <div className="content-container grid gap-14 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:py-24 xl:gap-20">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">{project.category}</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl dark:text-ivory">{project.name}</h1>
            <p className="mt-10 max-w-2xl text-lg leading-10 text-charcoal/70 dark:text-sand">{project.excerpt}</p>
          </div>
          <div className="rounded-[32px] border border-mist bg-sand p-12 dark:border-neutral-700 dark:bg-charcoal md:p-14">
            <div className="space-y-4 text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">
              <span>Location</span>
              <span>Year</span>
              <span>Category</span>
            </div>
            <div className="mt-8 space-y-4 text-base leading-8 text-charcoal dark:text-ivory">
              <p>{project.location}</p>
              <p>{project.year}</p>
              <p>{project.category}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 h-[560px] overflow-hidden rounded-[36px] bg-charcoal">
          <img src={project.hero} alt={project.name} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="content-container grid gap-16 py-24 lg:grid-cols-[1.2fr_.8fr] xl:gap-20">
        <div className="space-y-10">
          <SectionHeading eyebrow="Project narrative" title="A refined spatial story of atmosphere, framing, and material logic." />
          <p className="text-base leading-9 text-charcoal/70 dark:text-sand">{project.details[0]}</p>
          <p className="text-base leading-9 text-charcoal/70 dark:text-sand">{project.details[1]}</p>
          <p className="text-base leading-9 text-charcoal/70 dark:text-sand">{project.details[2]}</p>
        </div>
        <aside className="space-y-10 rounded-[32px] border border-mist bg-sand p-14 shadow-soft dark:border-neutral-700 dark:bg-charcoal md:p-16">
          <div>
            <h3 className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Studio scope</h3>
            <ul className="mt-6 space-y-4 text-base leading-8 text-charcoal/70 dark:text-sand">
              <li>Architecture</li>
              <li>Interior Architecture</li>
              <li>Visualization</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[0.45em] text-charcoal/70 dark:text-sand">Client</h3>
            <p className="mt-6 text-base leading-8 text-charcoal/70 dark:text-sand">Private residential client</p>
          </div>
        </aside>
      </section>

      <section className="content-container pb-28">
        <div className="grid gap-10 sm:grid-cols-2 xl:gap-12">
          {gallery.map((image, index) => (
            <div key={index} className="h-80 overflow-hidden rounded-[28px] bg-mist dark:bg-charcoal">
              <img src={image} alt={`${project.name} gallery ${index + 1}`} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;
