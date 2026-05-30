import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import services from '../data/services';

function Services() {
  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title="Luxury Residential Architecture Services in Kenya"
        description="Studio 39+ offers bespoke residential architecture, luxury villa design, interior architecture, landscape integration, visualization, master planning, and renovations in Kenya."
      />
      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading as="h1" eyebrow="Services" title="Residential architecture services for exceptional private homes." copy="Dedicated service paths for clients seeking a refined studio for private residences, coastal villas, family estates, interior architecture, renovations, and presentation-ready visual direction." />
      </section>

      <section className="content-container grid gap-x-10 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      <CTASection title="Have a site, residence brief, villa concept, or family estate to discuss?" />
    </div>
  );
}

export default Services;
