import React from 'react';
import { useApp } from '../../context/AppContext';
import { CLINIC_LOCATIONS } from '../../data/mockData';
import { MessageSquare, ArrowUpRight, Shield, Sparkles, Instagram, Facebook, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setIsBeautyFinderOpen, setIsConciergeOpen, showToast } = useApp();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Terima kasih. Anda telah terdaftar dalam warta eksklusif VÉRE Journal.');
  };

  return (
    <footer id="main-luxury-footer" className="bg-[#252525] text-[#F7F4EF] pt-20 pb-12 border-t border-[#3d3d3d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Quote */}
        <div className="text-center pb-16 border-b border-white/10">
          <span className="editorial-badge text-[#C4A47C]">Filosofi VÉRE</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#F7F4EF] font-light tracking-wide mt-4 max-w-4xl mx-auto leading-tight italic">
            "Kecantikan Anda bukanlah sebuah intervensi, melainkan ritual keabadian yang penuh kesadaran."
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsBeautyFinderOpen(true)}
              className="px-6 py-3 border border-[#E8DDD3]/40 text-[#E8DDD3] hover:bg-[#F7F4EF] hover:text-[#252525] transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C4A47C]" />
              <span>Mulai Tes Diagnostik Kulit AI</span>
            </button>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="px-6 py-3 bg-[#E8DDD3] text-[#252525] hover:bg-white transition-all duration-300 text-xs tracking-[0.2em] uppercase font-medium flex items-center space-x-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Konsierge Estetika Langsung</span>
            </button>
          </div>
        </div>

        {/* Multi-Column Luxury Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-white/10">
          
          {/* Col 1: Brand & Atelier Mission */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-2">
              <span className="font-serif-luxury text-3xl tracking-[0.25em] text-[#F7F4EF] uppercase">
                VÉRE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A47C]" />
            </div>
            <p className="text-xs text-[#E8DDD3]/70 font-light leading-relaxed max-w-md">
              Kolektif privat Dokter Spesialis Dermatologi, Master Facialist Osteopati, dan Pelopor Trikologi Internasional. Mendefinisikan ulang regenerasi seluler, arsitektur wajah, dan ritual pemulihan non-invasif di berbagai sanctuary dunia.
            </p>
            
            <div className="pt-2 text-xs text-[#9B8778]">
              <p className="tracking-widest uppercase text-[10px] text-[#C4A47C] font-semibold mb-1">Layanan VIP Client Desk Global</p>
              <p className="text-[#E8DDD3]/90 font-mono">+62 (21) 3912-8800 • concierge@vereritual.com</p>
            </div>
          </div>

          {/* Col 2: Sanctuaries Directory */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#C4A47C]">
              Sanctuary & Lokasi
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DDD3]/75 font-light">
              {CLINIC_LOCATIONS.map((loc) => (
                <li key={loc.id}>
                  <button 
                    onClick={() => setActivePage('locations')}
                    className="hover:text-white transition-colors text-left group flex items-center space-x-1"
                  >
                    <span>{loc.city}</span>
                    <span className="text-[10px] text-[#9B8778] group-hover:text-[#C4A47C]">({loc.district})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Ritual Pillars */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#C4A47C]">
              Pilar Ritual
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DDD3]/75 font-light">
              <li>
                <button onClick={() => setActivePage('treatments')} className="hover:text-white transition-colors">
                  Arsitektur Wajah & Buccal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('treatments')} className="hover:text-white transition-colors">
                  Regenerasi Eksosom Bio-Peptida
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('treatments')} className="hover:text-white transition-colors">
                  Luminositas Cryo-Hydro Vortex
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('treatments')} className="hover:text-white transition-colors">
                  Trikologi & Folikel Rambut
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('treatments')} className="hover:text-white transition-colors">
                  Detoks Limfatik Tubuh Botanika
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Dispatch / Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold text-[#C4A47C]">
              Warta Eksklusif Jurnal
            </h4>
            <p className="text-[11px] text-[#E8DDD3]/70 font-light leading-normal">
              Dapatkan undangan salon privat, publikasi riset biologi seluler, dan peluncuran formula perawatan berkala.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input 
                type="email" 
                required
                placeholder="Masukkan alamat email Anda"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C4A47C]"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-[#E8DDD3] text-[#252525] text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors"
              >
                Daftar Warta
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Legal & Ethics Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#9B8778] font-light space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} VÉRE Aesthetics International Corp.</span>
            <span>•</span>
            <span className="text-[#E8DDD3]/60">Hak cipta dilindungi undang-undang.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => setActivePage('aftercare')} className="hover:text-white transition-colors">
              Protokol Klinis Medis
            </button>
            <button onClick={() => setActivePage('membership')} className="hover:text-white transition-colors">
              Privilese Anggota VÉRE Circle
            </button>
            <span className="hover:text-white cursor-pointer transition-colors">
              Kebijakan Privasi & Etika Medis
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Ketentuan Layanan
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
