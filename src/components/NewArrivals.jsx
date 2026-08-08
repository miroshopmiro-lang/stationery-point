import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import { prefersReducedMotion } from '../lib/utils';

// How long the cursor must rest on the strip, with the page still, before the
// drift stops. Short enough to feel like a response; long enough that merely
// scrolling the strip past a stationary cursor never trips it, because any
// scroll restarts the countdown.
const DWELL_MS = 250;

// After a drag ends, hold still for a beat before drifting again — resuming
// under the finger the instant it lifts feels like the strip snatched itself
// back.
const RESUME_MS = 1200;

// Seconds for one full set of tiles to pass — the old CSS animation's pace.
const CYCLE_S = 25;

// Copies of the item list laid end to end. The scroll position is kept inside
// the second copy, so there is always a full set of tiles rendered either side
// of the viewport and the wrap is invisible. Four (not three) so the strip
// still wraps cleanly on a display wider than one set of tiles.
const REPEATS = 4;

// Deliberately NOT the full ProductCard: a moving tap target with a quantity
// stepper is hostile on touch. These tiles are presentational and link to the
// catalog; enquiry happens there, where the controls hold still.
function MarqueeTile({ product }) {
  return (
    <Link
      to={`/catalog?category=${product.category}`}
      className="shrink-0 w-40 sm:w-52 mr-4 sm:mr-6 group"
      tabIndex={-1}
      aria-hidden="true"
      draggable={false}
    >
      <div className="aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft">
        {product.image ? (
          <img
            src={product.image}
            alt=""
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-brand-soft" />
        )}
      </div>
      <p className="mt-2 text-xs sm:text-sm font-semibold text-gray-700 leading-snug line-clamp-2">
        {product.name}
      </p>
    </Link>
  );
}

export default function NewArrivals() {
  const [dragging, setDragging] = useState(false);

  const viewportRef = useRef(null);
  const pausedRef = useRef(false);
  const overRef = useRef(false);
  const dwellRef = useRef(null);
  const resumeRef = useRef(null);
  // Live drag bookkeeping: pointer id, where the press started, and the scroll
  // position at that moment. Mouse only — touch gets native panning.
  const dragRef = useRef(null);
  const movedRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (dwellRef.current) clearTimeout(dwellRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    dwellRef.current = null;
    resumeRef.current = null;
  }, []);

  // Start (or restart) the dwell countdown. Anything suggesting the pointer is
  // only passing through — a scroll, leaving the strip — restarts or cancels
  // it, so the strip only stops on sustained, still attention.
  const armDwell = useCallback(() => {
    if (dwellRef.current) clearTimeout(dwellRef.current);
    dwellRef.current = setTimeout(() => {
      if (overRef.current && !dragRef.current) pausedRef.current = true;
    }, DWELL_MS);
  }, []);

  // The drift, plus the wrap that makes it endless. Runs every frame regardless
  // of pause state so drag and touch momentum get wrapped too.
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const el = viewportRef.current;
    if (!el) return undefined;

    // Land in the second copy so there is room to drag either way.
    const seg = () => el.scrollWidth / REPEATS;
    el.scrollLeft = seg();

    let frame;
    let last = null;
    const step = (t) => {
      const s = seg();
      if (s > 0) {
        if (last != null && !pausedRef.current && !reduce) {
          // Clamp the delta so a backgrounded tab doesn't jump on return.
          const dt = Math.min(t - last, 100);
          el.scrollLeft += (s / (CYCLE_S * 1000)) * dt;
        }
        if (el.scrollLeft >= s * 2) el.scrollLeft -= s;
        else if (el.scrollLeft < s) el.scrollLeft += s;
      }
      last = t;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Page scrolling means the strip is moving under the pointer, not being read.
  useEffect(() => {
    const onPageScroll = () => {
      if (!overRef.current || dragRef.current) return;
      pausedRef.current = false;
      armDwell();
    };
    // wheel and touchmove as well as scroll: smooth-scroll libraries can move
    // the page without a native scroll event on every frame.
    const opts = { passive: true };
    window.addEventListener('scroll', onPageScroll, opts);
    window.addEventListener('wheel', onPageScroll, opts);
    window.addEventListener('touchmove', onPageScroll, opts);
    return () => {
      window.removeEventListener('scroll', onPageScroll);
      window.removeEventListener('wheel', onPageScroll);
      window.removeEventListener('touchmove', onPageScroll);
      clearTimers();
    };
  }, [armDwell, clearTimers]);

  const onPointerEnter = useCallback(() => {
    overRef.current = true;
    armDwell();
  }, [armDwell]);

  const onPointerLeave = useCallback(() => {
    overRef.current = false;
    if (dragRef.current) return;
    if (dwellRef.current) clearTimeout(dwellRef.current);
    dwellRef.current = null;
    // A post-drag hold outlives the pointer leaving — on touch, pointerleave
    // fires the instant the finger lifts, and cancelling here would snap the
    // drift back on under the flick.
    if (!resumeRef.current) pausedRef.current = false;
  }, []);

  // A press is unambiguous contact, so it stops the strip at once — no dwell.
  const onPointerDown = useCallback((e) => {
    clearTimers();
    pausedRef.current = true;
    movedRef.current = false;
    dragRef.current = {
      id: e.pointerId,
      type: e.pointerType,
      x: e.clientX,
      scroll: viewportRef.current?.scrollLeft ?? 0,
    };
  }, [clearTimers]);

  const onPointerMove = useCallback((e) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    // Touch panning is the browser's job — intercepting it costs momentum and
    // fights the vertical scroll. Only the mouse needs a hand-rolled drag.
    if (drag.type === 'touch') return;
    if (!movedRef.current && Math.abs(dx) < 4) return;
    if (!movedRef.current) {
      movedRef.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    if (viewportRef.current) viewportRef.current.scrollLeft = drag.scroll - dx;
  }, []);

  const endDrag = useCallback((e, immediate) => {
    const drag = dragRef.current;
    if (drag && e && drag.id !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    clearTimers();
    if (immediate) {
      pausedRef.current = false;
      return;
    }
    resumeRef.current = setTimeout(() => {
      resumeRef.current = null;
      // Still under the hand after the hold: they are working the strip, so
      // leave it stopped. Lifting off is what starts it drifting again.
      if (!overRef.current) pausedRef.current = false;
    }, RESUME_MS);
  }, [clearTimers]);

  const onPointerUp = useCallback((e) => endDrag(e, false), [endDrag]);

  // The browser fires pointercancel when it takes the gesture over to pan the
  // page — i.e. the "press" was the start of a vertical scroll, not interest in
  // the strip. Give the drift straight back.
  const onPointerCancel = useCallback((e) => endDrag(e, true), [endDrag]);

  // Swallow the click that ends a drag, or releasing over a tile navigates.
  const onClickCapture = useCallback((e) => {
    if (!movedRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    movedRef.current = false;
  }, []);

  const items = products.filter((p) => p.newArrival && p.image);
  if (items.length === 0) return null;

  const loop = Array.from({ length: REPEATS }, () => items).flat();

  return (
    <section id="new-arrivals" aria-label="New arrivals" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight">New Arrivals</h2>
          <p className="text-sm text-gray-500 mt-1.5 font-medium">Fresh stock on the shelves.</p>
        </div>
        <Link
          to="/new-arrivals"
          className="text-sm font-bold text-brand-primary hover:text-brand-dark underline underline-offset-4 whitespace-nowrap transition-colors shrink-0"
        >
          View All &rarr;
        </Link>
      </div>

      {/* Full-bleed strip: drifts on its own, stops on touch or a brief dwell,
          and can be dragged or flicked by hand. */}
      <div
        ref={viewportRef}
        className={`marquee-viewport${dragging ? ' is-dragging' : ''}`}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="marquee-track">
          {loop.map((p, i) => (
            <MarqueeTile key={`${p.id ?? p.name}-${i}`} product={p} />
          ))}
        </div>
      </div>

      {/* Screen-reader equivalent of the decorative strip above. */}
      <ul className="sr-only">
        {items.map((p) => (
          <li key={p.id ?? p.name}>
            <Link to={`/catalog?category=${p.category}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
