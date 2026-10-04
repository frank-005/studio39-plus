import { Link } from 'react-router-dom';

function normalizeHref(href) {
  if (typeof href !== 'string') return '';

  const value = href.trim();
  if (/^\/(?!\/)/.test(value)) return value;

  try {
    const url = new URL(value);
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol) ? value : '';
  } catch {
    return '';
  }
}

function ContentLink({ href, children, ...props }) {
  const safeHref = normalizeHref(href);
  if (!safeHref) return null;

  if (safeHref.startsWith('/')) {
    return <Link to={safeHref} {...props}>{children}</Link>;
  }

  return <a href={safeHref} {...props}>{children}</a>;
}

export default ContentLink;