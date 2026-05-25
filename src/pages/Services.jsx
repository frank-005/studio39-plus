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
      <section className="content-container space-y-12 py-14 sm:py-16 md:py-20">
        <SectionHeading as="h1" eyebrow="Services" title="Architecture, interiors, and visualization services for considered projects." copy="Dedicated service paths for clients seeking architects in Nairobi, residential architects Kenya, hospitality architects East Africa, safari lodge architects, and architectural visualization Kenya." />
      </section>

      <section className="content-container grid gap-x-10 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
      <CTASection title="Have a site, lodge brief, home concept, or visualization package to discuss?" />
    </div>
  );
}

export default Services;
