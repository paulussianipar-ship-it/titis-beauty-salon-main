import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Compass, 
  Calendar, 
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Heart,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    openBookingWithTreatment, 
    setIsBeautyFinderOpen,
    setIsCartOpen,
    cartCount,
    setIsConciergeOpen,
    customer,
    isAdminMode,
    setIsAdminMode,
    setSelectedCategory
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTreatmentsMenuOpen, setIsTreatmentsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Solusi Kami', page: 'experts' as const },
    { label: 'Promo', page: 'membership' as const },
    { label: 'Lokasi', page: 'locations' as const },
    { label: 'Artikel', page: 'journal' as const },
    { label: 'Tentang', page: 'home' as const },
  ];

  const treatmentMenuItems = [
    { label: 'Face', category: 'facial' as const },
    { label: 'Body', category: 'body' as const },
  ];

  const goToTreatments = (category?: 'facial' | 'body') => {
    setSelectedCategory(category ?? 'all');
    setActivePage('treatments');
    setIsTreatmentsMenuOpen(false);
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
            
            {/* Left Nav links on desktop */}
            <nav className="hidden lg:flex items-center space-x-6">
              <div className="relative">
                <button
                  id="nav-link-treatments"
                  onClick={() => setIsTreatmentsMenuOpen(!isTreatmentsMenuOpen)}
                  className={`text-xs tracking-[0.16em] uppercase transition-all duration-300 relative py-1 flex items-center gap-2 ${
                    activePage === 'treatments'
                      ? 'text-[#252525] font-semibold'
                      : 'text-[#252525]/75 hover:text-[#252525]'
                  }`}
                >
                  <span>Treatments</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTreatmentsMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTreatmentsMenuOpen && (
                  <div className="absolute left-0 top-full mt-3 w-44 bg-white border border-[#E8DDD3] shadow-xl z-50">
                    {treatmentMenuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => goToTreatments(item.category)}
                        className="block w-full text-left px-4 py-3 text-xs uppercase tracking-[0.14em] text-[#252525] hover:bg-[#F7F4EF] transition-colors border-b border-[#E8DDD3] last:border-b-0"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    if (link.action) {
                      link.action();
                    } else if (link.page) {
                      setActivePage(link.page);
                      setIsTreatmentsMenuOpen(false);
                    }
                  }}
                  className={`text-xs tracking-[0.16em] uppercase transition-all duration-300 relative py-1 ${
                    link.isSpecial 
                      ? 'text-[#9B8778] font-semibold flex items-center space-x-1 hover:text-[#252525]' 
                      : activePage === link.page 
                        ? 'text-[#252525] font-semibold' 
                        : 'text-[#252525]/75 hover:text-[#252525]'
                  }`}
                >
                  {link.isSpecial && <Sparkles className="w-3 h-3 text-[#C4A47C]" />}
                  <span>{link.label}</span>
                  {!link.isSpecial && activePage === link.page && (
                    <motion.div 
                      layoutId="navUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#252525]" 
                    />
                  )}
                </button>
              ))}
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
              <nav className="flex items-center space-x-5 mr-2">
                <div className="relative">
                  <button
                    id="nav-link-treatments-right"
                    onClick={() => setIsTreatmentsMenuOpen(!isTreatmentsMenuOpen)}
                    className={`text-xs tracking-[0.16em] uppercase transition-all duration-300 relative py-1 flex items-center gap-2 ${
                      activePage === 'treatments'
                        ? 'text-[#252525] font-semibold'
                        : 'text-[#252525]/75 hover:text-[#252525]'
                    }`}
                  >
                    <span>Treatments</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTreatmentsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isTreatmentsMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-44 bg-white border border-[#E8DDD3] shadow-xl z-50">
                      {treatmentMenuItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => goToTreatments(item.category)}
                          className="block w-full text-left px-4 py-3 text-xs uppercase tracking-[0.14em] text-[#252525] hover:bg-[#F7F4EF] transition-colors border-b border-[#E8DDD3] last:border-b-0"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => {
                      if (link.action) {
                        link.action();
                      } else if (link.page) {
                        setActivePage(link.page);
                        setIsTreatmentsMenuOpen(false);
                      }
                    }}
                    className={`text-xs tracking-[0.16em] uppercase transition-all duration-300 relative py-1 ${
                      activePage === link.page 
                        ? 'text-[#252525] font-semibold' 
                        : 'text-[#252525]/75 hover:text-[#252525]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {activePage === link.page && (
                      <motion.div 
                        layoutId="navUnderlineRight" 
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#252525]" 
                      />
                    )}
                  </button>
                ))}
              </nav>

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
            className="lg:hidden fixed inset-x-0 top-[108px] z-30 bg-[#F7F4EF] border-b border-[#E8DDD3] shadow-2xl px-6 py-8 overflow-y-auto max-h-[80vh]"
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

              {/* Navigation list */}
              <div className="flex flex-col space-y-3 pt-2">
                <div className="border-b border-[#E8DDD3]/50 pb-3">
                  <button
                    onClick={() => setIsTreatmentsMenuOpen(!isTreatmentsMenuOpen)}
                    className="flex items-center justify-between w-full text-left py-2.5 text-sm tracking-[0.15em] uppercase text-[#252525] hover:text-[#9B8778] transition-colors"
                  >
                    <span>Treatments</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isTreatmentsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isTreatmentsMenuOpen && (
                    <div className="mt-2 ml-3 space-y-2">
                      {treatmentMenuItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            goToTreatments(item.category);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left py-2 text-xs uppercase tracking-[0.14em] text-[#252525]/80 hover:text-[#252525]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {navLinks.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (link.action) {
                        link.action();
                      } else if (link.page) {
                        setActivePage(link.page);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-left py-2.5 text-sm tracking-[0.15em] uppercase text-[#252525] border-b border-[#E8DDD3]/50 hover:text-[#9B8778] transition-colors"
                  >
                    <span className="flex items-center space-x-2">
                      {link.isSpecial && <Sparkles className="w-4 h-4 text-[#C4A47C]" />}
                      <span className={link.isSpecial ? 'text-[#9B8778] font-semibold' : ''}>{link.label}</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#9B8778]" />
                  </button>
                ))}
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
