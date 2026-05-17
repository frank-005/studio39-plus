import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import services from '../data/services';

function Services() {
  return (
    <div className="pt-32 pb-28 md:pt-36 md:pb-32 lg:pt-40 lg:pb-36">
      <section className="content-container space-y-16 py-24 md:py-28">
        <SectionHeading eyebrow="Services" title="Studio offerings shaped for architecture, interiors, and visualization." copy="Each service is described with clarity and a confident editorial tone to support premium project work." />
      </section>

      <section className="content-container grid gap-10 pb-28 lg:grid-cols-3 xl:gap-12">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </section>
    </div>
  );
}

export default Services;
