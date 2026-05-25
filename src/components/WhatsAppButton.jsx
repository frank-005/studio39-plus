import { site } from '../data/site';

function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float fixed z-40 inline-flex items-center justify-center rounded-full border border-charcoal bg-charcoal text-xs font-semibold uppercase tracking-[0.18em] text-ivory shadow-soft hover:bg-[#3a372f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage dark:border-sand dark:bg-sand dark:text-charcoal"
      aria-label="Contact Studio 39+ on WhatsApp"
    >
      <span aria-hidden="true" className="whatsapp-mark">WA</span>
      <span>WhatsApp</span>
    </a>
  );
}

export default WhatsAppButton;
