import React from 'react';
import { Navigate } from 'react-router-dom';
import { areaBySlug, areaPages } from '../data/areaPages';
import ShopPage from './ShopPage';

export default function AreaPage({ slug }) {
  const page = areaBySlug[slug];
  if (!page) return <Navigate to="/" replace />;
  return <ShopPage page={page} />;
}

export const areaRoutes = areaPages.map((p) => ({ path: `/${p.slug}`, slug: p.slug }));
