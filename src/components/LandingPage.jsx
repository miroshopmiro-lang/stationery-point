import React from 'react';
import { Navigate } from 'react-router-dom';
import { landingBySlug, landingPages } from '../data/landingPages';
import ShopPage from './ShopPage';

// Guide pages (wholesale, office, art & craft, school, corporate diaries, return gifts).
// Content stays in src/data/landingPages.js; the layout is ShopPage, shared with the area
// pages since 4 Nov 2026. The old text-only layout was replaced because it read like an
// article and outranked the homepage for some searches.
export default function LandingPage({ slug }) {
  const page = landingBySlug[slug];
  if (!page) return <Navigate to="/catalog" replace />;
  return <ShopPage page={page} />;
}

export const landingRoutes = landingPages.map((p) => ({ path: `/${p.slug}`, slug: p.slug }));
