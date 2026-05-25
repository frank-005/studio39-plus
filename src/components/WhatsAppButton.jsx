import { site } from '../data/site';

function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal bg-charcoal px-5 text-xs font-semibold uppercase tracking-[0.2em] text-ivory shadow-soft hover:bg-[#3a372f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage dark:border-sand dark:bg-sand dark:text-charcoal"
      aria-label="Contact Studio 39+ on WhatsApp"
    >
      WhatsApp
    </a>
  );
}

export default WhatsAppButton;
