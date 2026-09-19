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
  sizes,
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

  /*
   * POSITION COLLISION FIX (17 Aug 2026).
   *
   * This used to hardcode `relative` into its own class string. Callers that need the wrapper
   * to fill a sized parent pass `className="absolute inset-0"` — and Tailwind's `.relative`
   * and `.absolute` have EQUAL specificity, so the winner is decided by order in the generated
   * stylesheet, not by order in the class attribute. `relative` won.
   *
   * Consequence, found by the visual audit and then confirmed by measurement: the wrapper
   * ignored `inset-0` and sized itself to the image's intrinsic ratio instead of its parent.
   * A category circle measured 104x78 inside a 104x104 disc — the leftover 26px read as a
   * white crescent on every circle at every breakpoint. The hero and promo tiles had the same
   * hole. It looked like a missing-image problem; it was a CSS cascade problem.
   *
   * So: only apply `relative` when the caller has not positioned this element itself.
   */
  const positioned = /\b(absolute|fixed|sticky|relative)\b/.test(className);
  const base = positioned ? 'overflow-hidden' : 'relative overflow-hidden';

  return (
    <div className={`${base} ${className}`} style={failed ? { backgroundColor: tint } : undefined}>
      {!failed && (
        <picture>
          {srcMobile && <source media="(max-width: 639px)" srcSet={srcMobile} />}
          <img
            src={src}
            {...(sizes && /\.webp$/.test(src) ? {
              srcSet: `${src.replace(/\.webp$/, '-480.webp')} 480w, ${src.replace(/\.webp$/, '-800.webp')} 800w, ${src} 1200w`,
              sizes,
            } : {})}
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
