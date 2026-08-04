import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { MotionConfig } from 'framer-motion';
import { prefersReducedMotion } from './lib/utils';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Catalog from './components/Catalog';
import NewArrivalsPage from './components/NewArrivalsPage';
import About from './components/About';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryBasket from './components/EnquiryBasket';
import { EnquiryListProvider } from './context/EnquiryListContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  // Lenis owns window scrolling, so plain scrollIntoView gets overridden —
  // scrolling must go through the Lenis instance.
  const lenis = useLenis();
  useEffect(() => {
    // Effects run after the route's DOM is committed, so the target exists here.
    if (hash) {
      const el = document.querySelector(hash);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -96, immediate: prefersReducedMotion() });
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);
  return null;
}

export default function App() {
  return (
    <ReactLenis root>
      <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <EnquiryListProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#FAFAFC]">
            <Header />
            <main id="main-content" className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <EnquiryBasket />
            <FloatingWhatsApp />
          </div>
        </EnquiryListProvider>
      </BrowserRouter>
      </MotionConfig>
    </ReactLenis>
  );
}
