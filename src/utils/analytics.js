const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;
let lastPagePath = '';

export const isAnalyticsEnabled = Boolean(GA_MEASUREMENT_ID);

export function initAnalytics() {
  if (!isAnalyticsEnabled || initialized || typeof window === 'undefined') return;

  const existingScript = document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });

  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  initialized = true;
}

export function trackPageView(path, title = document.title) {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return;

  initAnalytics();

  const pagePath = path || `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (pagePath === lastPagePath) return;

  window.gtag?.('event', 'page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: pagePath
  });

  lastPagePath = pagePath;
}

export function trackEvent(eventName, parameters = {}) {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return;

  initAnalytics();
  window.gtag?.('event', eventName, parameters);
}

export function trackWhatsAppClick(source = 'unknown') {
  trackEvent('whatsapp_click', {
    event_category: 'contact',
    event_label: source
  });
}

export function trackEmailClick(source = 'unknown') {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: source
  });
}

export function trackPhoneClick(source = 'unknown') {
  trackEvent('phone_click', {
    event_category: 'contact',
    event_label: source
  });
}

export function trackContactFormSubmission() {
  trackEvent('contact_form_submission', {
    event_category: 'contact',
    event_label: 'contact_form'
  });
}

export function trackContactFileUploadAttempt({ count = 0, types = [], source = 'contact_form' } = {}) {
  trackEvent('contact_file_upload_attempt', {
    event_category: 'contact',
    event_label: source,
    file_count: count,
    file_types: types.join(', ')
  });
}
