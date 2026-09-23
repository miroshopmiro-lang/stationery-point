import React, { useState } from 'react';
import SendListModal from './SendListModal';
import HeroCarousel from './HeroCarousel';
import CategoryCircles from './CategoryCircles';
import ProductRail from './ProductRail';
import PromoTiles from './PromoTiles';
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

      {/* Section order set by Sam, 23 Sep 2026, plus Popular in store after categories so
          products show in the top half. New In, School kits,
          the offer strip and the below-MRP rail are off the homepage per that list; the
          components are kept, re-add them here to restore. */}
      <HeroCarousel onOpenListModal={() => setListModalOpen(true)} />
      <CategoryCircles />
      <ProductRail />
      <PromoTiles only="bulk" />
      <Testimonials />
      <SendListSection />
      <BrandWall />
      <PromoTiles only="return-gifts" />
      <CollectionCards />
      <VisitShop />
      {/* AdvantageCards removed from the homepage 17 Aug 2026.
          At 1110px it was the TALLEST block on the page — taller than the hero — and not one
          of the four references has a "why choose us" / benefits grid on its homepage at all.
          Its 44px headline also exceeded every reference H2 (flyingtiger 32px, blick 28px,
          hobbycraft 24px), and it hardcoded #1C1230, which is not in the locked palette.
          Its job — stating the trust claims — is already done by the header trust strip in 38px.
          The component is kept for a possible /about page rather than deleted. */}

      {/* KOCHI DELIVERY BANNER — removed pending client sign-off.
          The copy claimed "our warehouse in Vyttila" and dispatch to Edappally,
          Kakkanad and Kadavanthra. Stationery Point is a ground-floor shop in
          Katti Tower, not a warehouse, and the delivery network is unconfirmed.
          Restore this block once the client confirms what is actually true. */}
    </div>
  );
}
