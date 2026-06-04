import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import Reveal from '../components/Reveal';
import services from '../data/services';
import projects from '../data/projects';

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = useMemo(() => services.find((item) => item.id === serviceId), [serviceId]);

  if (!service) {
    return (
      <div className="content-container pt-32 pb-24">
        <SEO title="Service Not Found" description="The requested Studio 39+ service page could not be found." />
        <p className="eyebrow">Service not found</p>
        <button type="button" onClick={() => navigate('/services')} className="btn-secondary mt-6">
          Back to services
        </button>
      </div>
    );
  }

  const relatedProjects = projects.filter((project) => service.projectIds.includes(project.id));

  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO title={`${service.metaTitle || service.seoTitle} | Studio 39+`} description={service.seoDescription} />
      <section className="content-container grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <SectionHeading as="h1" eyebrow="Service" title={service.seoTitle} copy={service.description} />
        <div className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
          <p className="eyebrow">Who it is for</p>
          <p className="mt-5 text-base leading-9 text-charcoal/72 dark:text-sand">{service.audience}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {service.keywords.map((keyword) => (
              <span key={keyword} className="border border-charcoal/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-charcoal/70 dark:border-ivory/15 dark:text-sand">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Reveal as="section" className="content-container py-14 md:py-20" aria-labelledby="service-process-title">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Process</p>
            <h2 id="service-process-title" className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
              A clear workflow from private brief to considered design decisions.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {service.process.map((step, index) => {
              const title = typeof step === 'string' ? step : step.title;
              const copy = typeof step === 'string' ? null : step.copy;

              return (
                <article key={title} className="border-t border-charcoal/15 pt-7 dark:border-ivory/15">
                  <p className="text-xs uppercase tracking-[0.24em] text-charcoal/55 dark:text-sand/70">0{index + 1}</p>
                  <h3 className="mt-5 text-xl font-semibold leading-tight text-charcoal dark:text-ivory">{title}</h3>
                  {copy && <p className="mt-5 text-sm leading-7 text-charcoal/68 dark:text-sand/82">{copy}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>

      {service.deliverables?.length > 0 && (
        <Reveal as="section" className="content-container py-14 md:py-20" aria-labelledby="service-deliverables-title">
          <div className="grid gap-10 border-y border-charcoal/15 py-12 dark:border-ivory/15 lg:grid-cols-[0.85fr_1.15fr] md:py-16">
            <div>
              <p className="eyebrow">What's Included</p>
              <h2 id="service-deliverables-title" className="mt-4 max-w-xl text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
                Core architectural deliverables for a clear residential process.
              </h2>
            </div>
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <div key={item} className="border-t border-charcoal/12 pt-5 dark:border-ivory/12">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-charcoal/72 dark:text-sand">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {relatedProjects.length > 0 && (
        <Reveal as="section" className="content-container py-14 md:py-20" aria-labelledby="related-projects-title">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Relevant Work</p>
              <h2 id="related-projects-title" className="mt-4 text-3xl font-semibold leading-tight text-charcoal dark:text-ivory sm:text-4xl">
                Related residences
              </h2>
            </div>
            <Link to="/projects" className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.22em] text-charcoal dark:text-sand">
              Explore our Work
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Reveal>
      )}

      <CTASection
        title={`Begin a conversation about ${service.shortTitle.toLowerCase()} work.`}
        copy="Share the project location, timeline, budget range, and any early drawings or references. We will respond with a clear next step."
      />
    </div>
  );
}

export default ServiceDetail;
