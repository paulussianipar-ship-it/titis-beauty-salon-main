/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { TreatmentExplorer } from './components/treatments/TreatmentExplorer';
import { TreatmentDetailModal } from './components/treatments/TreatmentDetailModal';
import { BeautyExpertsView } from './components/experts/BeautyExpertsView';
import { BeautyJourneyView } from './components/account/BeautyJourneyView';
import { BeautyShopView } from './components/shop/BeautyShopView';
import { MembershipView } from './components/membership/MembershipView';
import { BeautyJournalView } from './components/journal/BeautyJournalView';
import { AftercareGuideView } from './components/aftercare/AftercareGuideView';
import { LocationsView } from './components/locations/LocationsView';
import { AdminCrmDashboard } from './components/admin/AdminCrmDashboard';
import { BeautyFinderModal } from './components/finder/BeautyFinderModal';
import { SmartBookingModal } from './components/booking/SmartBookingModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { ConciergeChatModal } from './components/concierge/ConciergeChatModal';
import { MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const MainContent: React.FC = () => {
  const { activePage, setIsConciergeOpen, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EF] text-[#252525] selection:bg-[#E8DDD3] selection:text-[#252525]">
      
      {/* Global Navigation */}
      <Navbar />

      {/* Main Active Page View */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'treatments' && <TreatmentExplorer />}
        {activePage === 'treatment-detail' && <TreatmentDetailModal />}
        {activePage === 'experts' && <BeautyExpertsView />}
        {(activePage === 'account' || activePage === 'journey') && <BeautyJourneyView />}
        {activePage === 'shop' && <BeautyShopView />}
        {activePage === 'membership' && <MembershipView />}
        {activePage === 'journal' && <BeautyJournalView />}
        {activePage === 'aftercare' && <AftercareGuideView />}
        {activePage === 'locations' && <LocationsView />}
        {activePage === 'admin' && <AdminCrmDashboard />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <BeautyFinderModal />
      <SmartBookingModal />
      <CartDrawer />
      <ConciergeChatModal />

      {/* Floating Concierge Bubble on Bottom Right */}
      <motion.button
        id="floating-concierge-trigger"
        onClick={() => setIsConciergeOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#252525] text-[#F7F4EF] shadow-2xl border border-[#C4A47C]/40 flex items-center space-x-2.5 group"
        title="Speak with Titis Aesthetic Concierge"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-[#C4A47C]" />
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full absolute -top-1 -right-1 ring-2 ring-[#252525] animate-pulse" />
        </div>
        <span className="text-xs uppercase tracking-widest font-semibold pr-1 hidden sm:inline-block">
          Skin Concierge
        </span>
      </motion.button>

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#252525] text-white border border-[#C4A47C] shadow-2xl rounded flex items-center space-x-3"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0" />
            <span className="text-xs tracking-wide font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
