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
        description="We design thoughtfully crafted private homes, villas, and residential estates across Kenya, with focused architecture, interiors, renovation, and visualization services."
      />
      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading as="h1" eyebrow="Services" title="Architecture for private homes." copy="We provide architecture, interiors, renovations, and visualization services for clients seeking thoughtful, lasting homes." />
      </section>

      <section className="content-container grid gap-x-14 gap-y-2 pb-24 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      <CTASection title="Have a private home, villa, or residential estate to discuss?" />
    </div>
  );
}

export default Services;
