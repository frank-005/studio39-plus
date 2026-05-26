import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import SEO from '../components/SEO';
import CTASection from '../components/CTASection';
import services from '../data/services';

function Services() {
  return (
    <div className="pt-24 pb-16 sm:pt-28 md:pt-32">
      <SEO
        title="Architecture Services in Nairobi | Homes, Lodges and Visualization"
        description="Studio 39+ offers architectural design, residential design, hospitality architecture, safari lodge concepts, interiors, documentation, and architectural visualization in Kenya."
      />
      <section className="content-container space-y-12 py-16 sm:py-20 md:py-28">
        <SectionHeading as="h1" eyebrow="Services" title="Architecture, planning, interiors, and visualization for considered environments." copy="Dedicated service paths for clients seeking a design-led studio for residences, hospitality, safari lodge concepts, boutique developments, and presentation-ready visual direction." />
      </section>

      <section className="content-container grid gap-x-10 pb-20 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      <CTASection title="Have a site, lodge brief, home concept, or visualization package to discuss?" />
    </div>
  );
}

export default Services;
