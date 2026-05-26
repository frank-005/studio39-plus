import { useLocation } from 'react-router-dom';
import { site } from '../data/site';

function WhatsAppIcon() {
  return (
    <svg className="floating-whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        d="M16 4.75c-6.05 0-10.95 4.72-10.95 10.55 0 1.97.57 3.82 1.55 5.4L5.1 26.95l6.45-1.45A11.35 11.35 0 0 0 16 26.42c6.05 0 10.95-4.72 10.95-10.55S22.05 4.75 16 4.75Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M12.15 10.92c-.23.12-.92.58-1 1.82-.08 1.24.7 2.73 1.85 4.03 1.15 1.3 3.38 3.15 5.72 3.58 1.22.22 2.08-.42 2.42-.82.34-.4.58-1.37.42-1.62-.15-.25-1.98-1.08-2.3-1.18-.32-.1-.58-.05-.82.25-.24.3-.7.92-.9 1.1-.18.18-.42.18-.75.03-.34-.15-1.42-.52-2.62-1.62-1-.9-1.62-2-1.8-2.33-.18-.33 0-.5.15-.65.15-.16.32-.37.48-.57.15-.2.2-.35.3-.58.1-.23.05-.43-.03-.6-.08-.17-.72-1.72-.98-2.37-.15-.35-.35-.58-.68-.58-.18 0-.38.03-.56.11Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FloatingWhatsAppButton() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  if (isContactPage) return null;

  return (
    <div className="floating-whatsapp-wrap">
      <a
        className="floating-whatsapp"
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Studio 39+ on WhatsApp"
      >
        <span className="floating-whatsapp-label">Chat with us</span>
        <span className="floating-whatsapp-button">
          <WhatsAppIcon />
        </span>
      </a>
    </div>
  );
}

export default FloatingWhatsAppButton;
