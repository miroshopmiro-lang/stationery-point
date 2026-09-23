import React from 'react';

/*
 * Solid black divider between the hero banner and the yellow band (23 Sep 2026). Without
 * it the photo runs straight into flat yellow with no clean break. It is its own block in
 * the flow, not an overlay, so nothing in the hero can paint over it.
 */
export default function MarkerDivider() {
  return <div aria-hidden="true" className="h-[5px] lg:h-[6px] w-full" style={{ background: 'var(--ink)' }} />;
}
