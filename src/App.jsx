import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { prefersReducedMotion } from './lib/utils';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Catalog from './components/Catalog';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import EnquiryBasket from './components/EnquiryBasket';
import { EnquiryListProvider } from './context/EnquiryListContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Effects run after the route's DOM is committed, so the target exists here.
    if (hash) {
      const el = document.querySelector(hash);
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <EnquiryListProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[var(--bg-color)]">
            <Header />
            <main id="main-content" className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
            <EnquiryBasket />
            <FloatingWhatsApp />
          </div>
        </EnquiryListProvider>
      </BrowserRouter>
    </MotionConfig>
  );
}
