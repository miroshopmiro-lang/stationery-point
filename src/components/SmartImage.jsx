import React, { useState } from 'react';

// Every image on this site is generated art that may not exist on disk yet —
// the layout has to be correct before the assets land, and a broken-image icon
// in a client review is worse than no image at all. On error this falls back to
// a tinted panel in the brand palette, so a missing file degrades to something
// deliberate-looking rather than a browser glyph.
//
// `tint` is a hex from the collection/category data; it keeps each fallback
// distinguishable so a half-populated grid still reads as designed.
export default function SmartImage({
  src,
  srcMobile,
  alt = '',
  tint = '#EEF0FB',
  className = '',
  imgClassName = '',
  width,
  height,
  eager = false,
  children,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={failed ? { backgroundColor: tint } : undefined}>
      {!failed && (
        <picture>
          {srcMobile && <source media="(max-width: 639px)" srcSet={srcMobile} />}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? 'eager' : 'lazy'}
            decoding={eager ? 'sync' : 'async'}
            {...(eager ? { fetchpriority: 'high' } : {})}
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        </picture>
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="w-12 h-12 opacity-15">
            <rect width="48" height="48" rx="12" fill="#332E92" />
            <path d="M14 33L29 11l6 4.5L20 37l-7 1.5z" fill="#CDD661" />
          </svg>
        </div>
      )}
      {children}
    </div>
  );
}
