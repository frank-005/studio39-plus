import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteUrl, defaultImage, site } from '../data/site';

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function setLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

function SEO({ page, title, description, image, type = 'website', schema, keywords, robots = 'index, follow' }) {
  const location = useLocation();
  const canonical = absoluteUrl(location.pathname);
  const pageSeo = page ? site.pageSeo?.[page] : null;
  const resolvedTitle = pageSeo?.title || title || site.defaultSeoTitle || site.name;
  const resolvedDescription = pageSeo?.description || description || site.defaultSeoDescription || '';
  const resolvedImage = pageSeo?.ogImage || pageSeo?.image || image || defaultImage;
  const fullTitle = resolvedTitle.includes(site.name) ? resolvedTitle : `${resolvedTitle} | ${site.name}`;
  const schemas = useMemo(() => (Array.isArray(schema) ? schema : [schema].filter(Boolean)), [schema]);

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: 'description', content: resolvedDescription });
    setMeta('meta[name="robots"]', { name: 'robots', content: robots });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords || site.keywords.join(', ') });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: resolvedDescription });
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: resolvedImage });
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: resolvedDescription });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: resolvedImage });
    setLink('canonical', canonical);

    document.querySelectorAll('script[data-seo-schema="true"]').forEach((element) => element.remove());
    schemas.filter(Boolean).forEach((item) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoSchema = 'true';
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }, [canonical, fullTitle, keywords, resolvedDescription, resolvedImage, robots, schemas, type]);

  return null;
}

export default SEO;
