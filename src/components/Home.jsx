import React, { useState } from 'react';
import SendListModal from './SendListModal';
import HeroCarousel from './HeroCarousel';
import OfferStrip from './OfferStrip';
import CategoryBento from './CategoryBento';
import CollectionCards from './CollectionCards';
import SendListSection from './SendListSection';
import BrandWall from './BrandWall';
import VisitShop from './VisitShop';
import Testimonials from './Testimonials';
import AdvantageCards from './AdvantageCards';

// Offer strip stays empty until Sam gives a real offer with a real number.
// OfferStrip renders nothing when this is null — an invented discount on a
// live client site is a promise they'd have to honour at the counter.
//
// Onam shape, for when he confirms:
//   { headline: 'Onam offer — 10% off orders above ₹1,000',
//     detail: 'Until 26 August',
//     cta: { label: 'Shop now', to: '/catalog' } }
const OFFER = null;

export default function Home() {
  const [listModalOpen, setListModalOpen] = useState(false);

  return (
    <div>
      <SendListModal open={listModalOpen} onClose={() => setListModalOpen(false)} />

      <HeroCarousel />
      <OfferStrip offer={OFFER} />
      <CategoryBento />
      <CollectionCards />
      <SendListSection />
      <BrandWall />
      <Testimonials />
      <VisitShop />
      <AdvantageCards />

      {/* KOCHI DELIVERY BANNER — removed pending client sign-off.
          The copy claimed "our warehouse in Vyttila" and dispatch to Edappally,
          Kakkanad and Kadavanthra. Stationery Point is a ground-floor shop in
          Katti Tower, not a warehouse, and the delivery network is unconfirmed.
          Restore this block once the client confirms what is actually true. */}
    </div>
  );
}
