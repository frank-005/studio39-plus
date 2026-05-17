function ServiceCard({ service }) {
  return (
    <div className="group rounded-[24px] border border-mist bg-sand p-10 transition duration-300 hover:-translate-y-1 hover:border-sage dark:border-neutral-700 dark:bg-charcoal">
      <h3 className="text-xl font-semibold text-charcoal group-hover:text-sage dark:text-ivory">{service.title}</h3>
      <p className="mt-5 text-sm leading-7 text-charcoal/70 dark:text-sand">{service.description}</p>
    </div>
  );
}

export default ServiceCard;
