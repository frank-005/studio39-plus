export function optimizedImageUrl(url, width = 1200) {
  if (!url.includes('images.unsplash.com')) return url;

  const imageUrl = new URL(url, typeof window === 'undefined' ? 'https://www.studio39ke.com' : window.location.origin);
  imageUrl.searchParams.set('auto', 'format');
  imageUrl.searchParams.set('fit', 'crop');
  imageUrl.searchParams.set('w', String(width));
  imageUrl.searchParams.set('q', '78');
  imageUrl.searchParams.set('fm', 'webp');
  return imageUrl.toString();
}

export function imageSrcSet(url, widths = [640, 960, 1280, 1600]) {
  return widths.map((width) => `${optimizedImageUrl(url, width)} ${width}w`).join(', ');
}
