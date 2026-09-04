import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Calendar, 
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TREATMENTS } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    openBookingWithTreatment, 
    setIsCartOpen,
    cartCount,
    setIsConciergeOpen,
    customer,
    isAdminMode,
    setIsAdminMode,
    setSelectedTreatmentId
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsMenuOpen, setIsTreatmentsMenuOpen] = useState(false);

  const treatmentMenuItems = [
    { label: 'Cleanser Milk', treatmentId: 'trt-cryo-hydro-glow', image: TREATMENTS[2].image },
    { label: 'Steamer', treatmentId: 'trt-cellular-exosome', image: TREATMENTS[1].image },
    { label: 'Ekstrasi Komedo', treatmentId: 'trt-cryo-hydro-glow', image: TREATMENTS[2].gallery[1] },
    { label: 'Massage', treatmentId: 'trt-sculptural-buccal', image: TREATMENTS[0].image },
    { label: 'Facial Wash', treatmentId: 'trt-cellular-exosome', image: TREATMENTS[1].gallery[0] },
    { label: 'Serum', treatmentId: 'trt-cellular-exosome', image: TREATMENTS[1].gallery[1] },
    { label: 'Uap Dingin', treatmentId: 'trt-cryo-hydro-glow', image: TREATMENTS[2].image },
    { label: 'Masker Wajah', treatmentId: 'trt-cryo-hydro-glow', image: TREATMENTS[2].gallery[2] },
    { label: 'Oxygen', treatmentId: 'trt-cellular-exosome', image: TREATMENTS[1].image },
  ];

  const goToTreatment = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setActivePage('treatment-detail');
    setIsTreatmentsMenuOpen(false);
  };

  const goToPage = (page: 'home' | 'about' | 'locations') => {
    setActivePage(page);
    setIsTreatmentsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro-bar for global concierge & VIP notice */}
      <div id="top-announcement-bar" className="bg-[#252525] text-[#E8DDD3] text-[11px] py-1.5 px-4 tracking-widest uppercase transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C4A47C] animate-pulse" />
            <span>Suite Penthouse Privat Dibuka di Menteng Jakarta, Beverly Hills & Paris</span>
          </div>
          
          <div className="flex items-center space-x-6 text-[10px] tracking-wider">
            <button 
              id="topbar-concierge-btn"
              onClick={() => setIsConciergeOpen(true)}
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <MessageSquare className="w-3 h-3 text-[#C4A47C]" />
              <span>Konsierge Estetika Langsung</span>
            </button>

            <button 
              id="topbar-admin-toggle"
              onClick={() => setIsAdminMode(!isAdminMode)}
              className="flex items-center space-x-1.5 px-2 py-0.5 rounded border border-[#9B8778]/40 hover:border-[#E8DDD3] text-[#E8DDD3] hover:text-white transition-all"
            >
              <ShieldCheck className="w-3 h-3 text-[#C4A47C]" />
              <span className="font-semibold">{isAdminMode ? 'Tutup CRM Klinik' : 'CRM & Admin Klinik'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Sticky Header */}
      <header id="main-luxury-header" className="sticky top-0 z-40 bg-[#F7F4EF]/90 backdrop-blur-md border-b border-[#E8DDD3]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Requested primary navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <button onClick={() => goToPage('home')} className="text-xs uppercase tracking-[0.16em] text-[#252525]/75 hover:text-[#252525]">Home</button>
              <button onClick={() => goToPage('about')} className="text-xs uppercase tracking-[0.16em] text-[#252525]/75 hover:text-[#252525]">Tentang</button>
              <div className="relative">
                <button
                  id="nav-link-perawatan"
                  onClick={() => setIsTreatmentsMenuOpen(!isTreatmentsMenuOpen)}
                  className="flex items-center gap-2 py-1 text-xs uppercase tracking-[0.16em] text-[#252525]/75 hover:text-[#252525]"
                >
                  <span>Perawatan</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isTreatmentsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTreatmentsMenuOpen && (
                  <div className="absolute left-0 top-full z-50 mt-3 grid w-88 grid-cols-3 gap-2 border border-[#E8DDD3] bg-white p-3 shadow-xl">
                    {treatmentMenuItems.map((item) => (
                      <button key={item.label} onClick={() => goToTreatment(item.treatmentId)} className="group text-left">
                        <img src={item.image} alt={item.label} className="h-16 w-full object-cover" />
                        <span className="mt-1 block text-[9px] uppercase tracking-[0.08em] text-[#252525] group-hover:text-[#9B8778]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => goToPage('locations')} className="text-xs uppercase tracking-[0.16em] text-[#252525]/75 hover:text-[#252525]">Lokasi</button>
            </nav>

            {/* Centered Brand Logo */}
            <div className="flex-1 lg:flex-none text-center">
              <button
                id="brand-logo-btn"
                onClick={() => setActivePage('home')}
                className="group inline-flex flex-col items-center justify-center text-left"
              >
                <div className="flex items-center space-x-1">
                  <span className="font-serif-luxury text-3xl md:text-4xl tracking-[0.25em] text-[#252525] font-light uppercase transition-transform duration-500 group-hover:tracking-[0.3em]">
                    TITIS
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C] -mt-2" />
                </div>
                <span className="text-[9px] tracking-[0.35em] text-[#9B8778] uppercase -mt-1 font-medium">
                  Kecantikan Anda. Ritual Anda.
                </span>
              </button>
            </div>

            {/* Right Nav links & Actions */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Shopping Bag Button */}
              <button
                id="nav-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#252525] hover:text-[#9B8778] transition-colors"
                title="Lihat Tas Belanja"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#252525] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Customer Account Button */}
              <button
                id="nav-account-btn"
                onClick={() => setActivePage('account')}
                className={`flex items-center space-x-2 pl-2 pr-3 py-1.5 rounded-full border transition-all duration-300 ${
                  activePage === 'account'
                    ? 'border-[#252525] bg-[#E8DDD3]/60 text-[#252525]'
                    : 'border-[#E8DDD3] bg-white/60 hover:border-[#9B8778] text-[#252525]'
                }`}
              >
                <img 
                  src={customer.avatar} 
                  alt={customer.name}
                  className="w-5 h-5 rounded-full object-cover border border-[#9B8778]/40" 
                />
                <div className="text-left">
                  <div className="text-[10px] font-semibold tracking-wider leading-none">
                    {customer.name.split(' ')[0]}
                  </div>
                  <div className="text-[8px] text-[#9B8778] font-medium tracking-widest uppercase leading-none mt-0.5">
                    {customer.tier} • {customer.points} poin
                  </div>
                </div>
              </button>

              {/* Primary Book Ritual CTA */}
              <motion.button
                id="nav-book-ritual-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openBookingWithTreatment()}
                className="px-5 py-2.5 bg-[#252525] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#3d3d3d] transition-all duration-300 shadow-sm flex items-center space-x-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C4A47C]" />
                <span>Reservasi Janji Temu</span>
              </motion.button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                id="mobile-cart-btn"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#252525]"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#252525] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#252525] hover:text-[#9B8778] transition-colors"
                aria-label="Toggle Menu Navigasi"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-x-0 top-27 z-30 bg-[#F7F4EF] border-b border-[#E8DDD3] shadow-2xl px-6 py-8 overflow-y-auto max-h-[80vh]"
          >
            <div className="flex flex-col space-y-5">
              
              {/* Member Card in Mobile */}
              <div 
                onClick={() => {
                  setActivePage('account');
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-4 bg-[#E8DDD3]/40 border border-[#E8DDD3] rounded-lg cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={customer.avatar} 
                    alt={customer.name} 
                    className="w-10 h-10 rounded-full object-cover border border-[#9B8778]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#252525]">{customer.name}</h4>
                    <p className="text-xs text-[#9B8778] uppercase tracking-wider">Anggota {customer.tier} • {customer.points} poin</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9B8778]" />
              </div>

              {/* Requested mobile navigation */}
              <div className="flex flex-col space-y-3 pt-2">
                <button onClick={() => goToPage('home')} className="flex items-center justify-between border-b border-[#E8DDD3]/50 py-2.5 text-left text-sm uppercase tracking-[0.15em] text-[#252525]">
                  <span>Home</span><ChevronRight className="h-3.5 w-3.5 text-[#9B8778]" />
                </button>
                <button onClick={() => goToPage('about')} className="flex items-center justify-between border-b border-[#E8DDD3]/50 py-2.5 text-left text-sm uppercase tracking-[0.15em] text-[#252525]">
                  <span>Tentang</span><ChevronRight className="h-3.5 w-3.5 text-[#9B8778]" />
                </button>
                <div className="border-b border-[#E8DDD3]/50 pb-3">
                  <button
                    onClick={() => setIsTreatmentsMenuOpen(!isTreatmentsMenuOpen)}
                    className="flex items-center justify-between w-full text-left py-2.5 text-sm tracking-[0.15em] uppercase text-[#252525] hover:text-[#9B8778] transition-colors"
                  >
                    <span>Perawatan</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTreatmentsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isTreatmentsMenuOpen && (
                    <div className="mt-2 ml-3 grid grid-cols-2 gap-3">
                      {treatmentMenuItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            goToTreatment(item.treatmentId);
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-left text-xs text-[#252525]/80 hover:text-[#252525]"
                        >
                          <img src={item.image} alt={item.label} className="h-20 w-full object-cover" />
                          <span className="mt-1 block uppercase tracking-[0.08em]">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => goToPage('locations')} className="flex items-center justify-between border-b border-[#E8DDD3]/50 py-2.5 text-left text-sm uppercase tracking-[0.15em] text-[#252525]">
                  <span>Lokasi</span><ChevronRight className="h-3.5 w-3.5 text-[#9B8778]" />
                </button>
              </div>

              {/* Mobile CTAs */}
              <div className="pt-4 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    openBookingWithTreatment();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3.5 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4 text-[#C4A47C]" />
                  <span>Reservasi Ritual Perawatan</span>
                </button>

                <button
                  onClick={() => {
                    setIsConciergeOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 border border-[#252525] text-[#252525] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#C4A47C]" />
                  <span>Tanya Konsierge Kulit</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
