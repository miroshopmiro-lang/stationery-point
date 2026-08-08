import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/productData';
import ProductCard from './ProductCard';

// Dedicated New Arrivals page (nav destination). Content is driven entirely by
// the `newArrival` toggle on products in the /admin CMS.
export default function NewArrivalsPage() {
  const items = products.filter((p) => p.newArrival);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-medium text-gray-400 mb-2">Fresh stock on the shelves</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">New Arrivals</h1>
        <p className="mt-3 text-gray-500 max-w-xl">
          The latest products in store. Add what you like to your list and send us one WhatsApp enquiry.
        </p>
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map((p) => (
              <ProductCard key={p.id ?? p.name} product={p} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-400 py-16 text-center">New stock is on its way — check back soon.</p>
      )}

      <div className="mt-12 flex justify-center">
        <Link to="/catalog" className="rounded-full border-2 border-brand-primary text-brand-primary font-bold px-8 py-2.5 text-xs sm:text-sm hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow">
          Browse Full Catalog &rarr;
        </Link>
      </div>
    </div>
  );
}
