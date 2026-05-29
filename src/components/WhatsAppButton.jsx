import { site } from '../data/site';
import { trackEmailClick, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

function WhatsAppButton() {
  return (
    <div className="mobile-contact-rail fixed z-40">
      <a href={site.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" onClick={() => trackWhatsAppClick('mobile_contact_rail')}>
        WhatsApp
      </a>
      <a href={`tel:${site.phone}`} aria-label="Call Studio 39+" onClick={() => trackPhoneClick('mobile_contact_rail')}>
        Call
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email Studio 39+" onClick={() => trackEmailClick('mobile_contact_rail')}>
        Email
      </a>
    </div>
  );
}

export default WhatsAppButton;
