import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import services from '../data/services';

function Services() {
  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        page="services"
        title="Architecture, Interiors & Visualization Services | Studio 39+"
        description="Explore Studio 39+ services for residential, hospitality, and commercial projects, from architecture and interiors to renovation, technical drawings, and visualization."
      />
      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading as="h1" eyebrow="Services" title="Architecture, interiors, and visualization." copy="Design support for residential, hospitality, and commercial projects, shaped around each brief." />
      </section>

      <section className="content-container grid gap-x-14 gap-y-2 pb-24 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      <CTASection title="Have a project to discuss?" />
    </div>
  );
}

export default Services;
