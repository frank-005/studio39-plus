import { site } from '../data/site';

function WhatsAppButton() {
  return (
    <div className="mobile-contact-rail fixed z-40">
      <a href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        WhatsApp
      </a>
      <a href={`tel:${site.phone}`} aria-label="Call Studio 39+">
        Call
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email Studio 39+">
        Email
      </a>
    </div>
  );
}

export default WhatsAppButton;
