import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TREATMENTS, BEAUTY_EXPERTS, CLINIC_LOCATIONS, JOURNAL_ARTICLES, SAMPLE_REVIEWS } from '../../data/mockData';
import { TreatmentCategory } from '../../types';
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  Calendar, 
  ChevronRight,
  Eye,
  Heart,
  Quote,
  Award,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC = () => {
  const { 
    setActivePage, 
    setSelectedTreatmentId, 
    setSelectedArticleId,
    openBookingWithTreatment, 
    setIsBeautyFinderOpen,
    setSelectedCategory,
    customer,
    toggleFavoriteTreatment
  } = useApp();

  const [activeCategoryTab, setActiveCategoryTab] = useState<TreatmentCategory>('facial');

  const categories = [
    { key: 'facial' as const, label: 'Arsitektur Wajah', desc: 'Pemodelan buccal osteopati dan aliran limfatik kranial' },
    { key: 'skin' as const, label: 'Regenerasi Kulit', desc: '5 Miliar eksosom botanika, nano-needling, dan bio-acids' },
    { key: 'body' as const, label: 'Kontur Tubuh', desc: 'Drainase limfatik, scrub kuarsa murni, dan balutan termal' },
    { key: 'hair' as const, label: 'Trikologi & Kulit Kepala', desc: 'Ozon frekuensi tinggi, tembaga peptida, dan folikel' },
    { key: 'aesthetic' as const, label: 'Estetika Klinis', desc: 'Rematriks kolagen frekuensi radio tanpa waktu pemulihan' },
  ];

  const featuredTreatments = TREATMENTS.filter(t => t.isFeatured);
  const tabTreatments = TREATMENTS.filter(t => t.category === activeCategoryTab);

  return (
    <div id="home-view-container" className="bg-[#F7F4EF] text-[#252525]">
      
      {/* 1. Cinematic Luxury Hero Section */}
      <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-[#E8DDD3]">
        {/* Background Editorial Media with subtle zoom and warm beige overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2000&q=90" 
            alt="Titis Sanctuary Kemewahan"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#252525]/75 via-[#252525]/45 to-[#252525]/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252525]/90 via-transparent to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white py-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4A47C]" />
            <span className="text-[11px] tracking-[0.25em] uppercase font-medium text-[#E8DDD3]">
              Sanctuary Estetika Medis Eksklusif
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] mb-6 text-[#F7F4EF]"
          >
            Sains Keanggunan Abadi.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg font-light text-[#E8DDD3]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-sans-clean"
          >
            Perpaduan harmonis pemodelan fasia buccal osteopati, eksosom botanika klinis murni, dan dokter spesialis dermatologi untuk meremajakan struktur wajah tanpa downtime.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <button
              id="hero-book-now-btn"
              onClick={() => openBookingWithTreatment()}
              className="w-full sm:w-auto px-8 py-4 bg-[#F7F4EF] text-[#252525] hover:bg-white transition-all duration-300 text-xs tracking-[0.22em] uppercase font-semibold flex items-center justify-center space-x-2 shadow-xl"
            >
              <Calendar className="w-4 h-4 text-[#9B8778]" />
              <span>Reservasi Jadwal</span>
            </button>

            <button
              id="hero-beauty-finder-btn"
              onClick={() => setIsBeautyFinderOpen(true)}
              className="w-full sm:w-auto px-8 py-4 border border-[#E8DDD3] text-[#F7F4EF] hover:bg-white/15 backdrop-blur-sm transition-all duration-300 text-xs tracking-[0.22em] uppercase font-medium flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#C4A47C]" />
              <span>Rancang Ritual Kulit AI</span>
            </button>
          </motion.div>

          {/* Hero Micro-Features Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
          >
            <div>
              <p className="text-[#C4A47C] font-serif-luxury text-xl sm:text-2xl">99.6%</p>
              <p className="text-[10px] uppercase tracking-widest text-[#E8DDD3]/80 mt-0.5">Tingkat Kepuasan Kilau</p>
            </div>
            <div>
              <p className="text-[#C4A47C] font-serif-luxury text-xl sm:text-2xl">Nol</p>
              <p className="text-[10px] uppercase tracking-widest text-[#E8DDD3]/80 mt-0.5">Waktu Pemulihan / Downtime</p>
            </div>
            <div>
              <p className="text-[#C4A47C] font-serif-luxury text-xl sm:text-2xl">5 Miliar</p>
              <p className="text-[10px] uppercase tracking-widest text-[#E8DDD3]/80 mt-0.5">Eksosom Tumbuhan Aktif</p>
            </div>
            <div>
              <p className="text-[#C4A47C] font-serif-luxury text-xl sm:text-2xl">4 Sanctuary</p>
              <p className="text-[10px] uppercase tracking-widest text-[#E8DDD3]/80 mt-0.5">Klinik Privat Global</p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. Brand Philosophy & Editorial Manifesto */}
      <section id="philosophy-section" className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="editorial-badge text-[#9B8778]">Kebenaran Arsitektur Fasia</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light leading-tight">
              Kami tidak menutupi fitur wajah.<br />
              <span className="italic font-normal text-[#9B8778]">Kami membangkitkan memori biologis sel.</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-[#9B8778]" />
            <p className="text-sm text-[#252525]/80 font-light leading-relaxed">
              Setiap lekukan, bayangan, dan kontur wajah menyimpan jejak postur, stres, dan ketegangan bertahun-tahun. Pendekatan konvensional seringkali bergantung pada filler artifisial yang membebani otot wajah seiring waktu.
            </p>
            <p className="text-sm text-[#252525]/80 font-light leading-relaxed">
              Di Titis, para pakar kami menerapkan teknik osteopati intra-oral buccal yang mendalam, eksosom bio-fermentasi tumbuhan, dan frekuensi kriogenik sub-nol untuk merestorasi kesehatan kulit dari dalam.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <button
                onClick={() => setActivePage('treatments')}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#252525] hover:text-[#9B8778] transition-colors border-b border-[#252525] pb-1"
              >
                <span>Lihat Katalog Ritual Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsBeautyFinderOpen(true)}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#9B8778] hover:text-[#252525] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C4A47C]" />
                <span>Mulai Tes Diagnostik Kulit</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="space-y-6">
              <div className="overflow-hidden shadow-lg aspect-[4/5] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=800&q=85" 
                  alt="Detail Perawatan Titis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#F7F4EF]/90 backdrop-blur-md text-[#252525] border border-[#E8DDD3]">
                  <p className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold">Presisi Seluler</p>
                  <p className="text-xs font-serif-luxury font-medium mt-0.5">Matriks 5 Miliar Eksosom Bio-Peptida</p>
                </div>
              </div>

              <div className="p-6 bg-[#E8DDD3]/40 border border-[#E8DDD3] space-y-3">
                <Quote className="w-6 h-6 text-[#9B8778]" />
                <p className="text-xs italic text-[#252525]/90 leading-relaxed">
                  "Karya estetika paling transformatif terjadi pada ruang milimeter di mana aliran limfatik bertemu dengan fasia otot."
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold">
                  — dr. Hélène Mercier, DO
                </p>
              </div>
            </div>

            <div className="space-y-6 sm:mt-12">
              <div className="p-6 bg-[#252525] text-[#F7F4EF] space-y-4">
                <p className="editorial-badge text-[#C4A47C]">4 Pilar Utama Ritual</p>
                <ul className="space-y-3 text-xs text-[#E8DDD3]/90 font-light">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A47C] shrink-0" />
                    <span>Arsitektur Buccal & Fasia Intra-Oral</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A47C] shrink-0" />
                    <span>Infusi Eksosom Bio-Identik Tumbuhan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A47C] shrink-0" />
                    <span>Detoks Limfatik & Kriogenik Sub-Nol</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A47C] shrink-0" />
                    <span>Trikologi & Regenerasi Folikel Rambut</span>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden shadow-lg aspect-[4/5] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=85" 
                  alt="Interior Sanctuary Titis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#F7F4EF]/90 backdrop-blur-md text-[#252525] border border-[#E8DDD3]">
                  <p className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold">Sanctuary Privat</p>
                  <p className="text-xs font-serif-luxury font-medium mt-0.5">Suite Kedap Suara Berkalibrasi Akustik</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Interactive Treatment Categories & Ritual Browser */}
      <section id="treatment-categories-section" className="py-20 bg-[#E8DDD3]/30 border-y border-[#E8DDD3]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="editorial-badge text-[#9B8778]">Disiplin Terkurasi</span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light mt-2">
                Kategori Ritual Perawatan
              </h2>
            </div>
            
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActivePage('treatments');
              }}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#252525] hover:text-[#9B8778] transition-colors"
            >
              <span>Lihat Semua Menu & Biaya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryTab(cat.key)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.16em] transition-all duration-300 font-medium ${
                  activeCategoryTab === cat.key
                    ? 'bg-[#252525] text-[#F7F4EF] shadow-md'
                    : 'bg-white/80 border border-[#E8DDD3] text-[#252525] hover:border-[#9B8778]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tabTreatments.map((treatment) => {
              const isFav = customer.favoriteTreatmentIds.includes(treatment.id);
              return (
                <div
                  key={treatment.id}
                  className="bg-[#F7F4EF] border border-[#E8DDD3] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={treatment.image} 
                      alt={treatment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {treatment.isSignature && (
                        <span className="px-2.5 py-1 bg-[#252525] text-white text-[9px] uppercase tracking-widest font-semibold">
                          Ritual Utama
                        </span>
                      )}
                      {treatment.isBestseller && (
                        <span className="px-2.5 py-1 bg-[#C4A47C] text-[#252525] text-[9px] uppercase tracking-widest font-bold">
                          Favorit Tamu VIP
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteTreatment(treatment.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#252525] hover:text-red-600 transition-colors"
                      title={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : ''}`} />
                    </button>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#9B8778] tracking-wider uppercase font-semibold mb-1">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{treatment.durationMinutes} Menit</span>
                        </span>
                        <span className="flex items-center space-x-1 text-[#252525]">
                          <Star className="w-3 h-3 fill-[#C4A47C] text-[#C4A47C]" />
                          <span>{treatment.rating} ({treatment.reviewCount} ulasan)</span>
                        </span>
                      </div>

                      <h3 
                        onClick={() => {
                          setSelectedTreatmentId(treatment.id);
                          setActivePage('treatment-detail');
                        }}
                        className="font-serif-luxury text-xl font-medium text-[#252525] hover:text-[#9B8778] transition-colors cursor-pointer leading-snug"
                      >
                        {treatment.name}
                      </h3>
                      
                      <p className="text-xs text-[#252525]/75 font-light line-clamp-2 mt-2 leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8DDD3] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#9B8778] uppercase tracking-wider block">Biaya Perawatan</span>
                        <div className="flex items-baseline space-x-2">
                          <span className="font-serif-luxury text-2xl font-semibold text-[#252525]">
                            ${treatment.price}
                          </span>
                          {treatment.originalPrice && (
                            <span className="text-xs text-[#9B8778] line-through">
                              ${treatment.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTreatmentId(treatment.id);
                            setActivePage('treatment-detail');
                          }}
                          className="px-3 py-2 border border-[#9B8778]/50 text-[#252525] hover:bg-[#E8DDD3] text-[10px] tracking-widest uppercase font-semibold transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => openBookingWithTreatment(treatment.id)}
                          className="px-4 py-2 bg-[#252525] text-white hover:bg-[#3d3d3d] text-[10px] tracking-widest uppercase font-semibold transition-colors"
                        >
                          Reservasi
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. The Beauty Finder Spotlight Banner */}
      <section id="beauty-finder-teaser-section" className="py-24 px-6 bg-[#252525] text-[#F7F4EF] relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#C4A47C] text-[10px] tracking-widest uppercase font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Algoritma Diagnostik Kulit</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light leading-tight text-[#F7F4EF]">
              Biarkan kami merancang ritual Anda.<br />
              <span className="italic font-normal text-[#E8DDD3]">Tes diagnostik kulit personal dalam 60 detik.</span>
            </h2>

            <p className="text-sm text-[#E8DDD3]/80 font-light leading-relaxed max-w-xl">
              Jawab 4 pertanyaan intuitif seputar kekhawatiran kulit utama, kondisi skin barrier, hasil estetika yang didambakan, dan ketersediaan waktu Anda. Kami merancang urutan ritual klinis serta protokol homecare yang presisi.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-xs font-semibold text-[#C4A47C] uppercase tracking-wider">Langkah 1</p>
                <p className="text-[11px] text-[#E8DDD3]/70 mt-0.5">Area Fokus & Masalah</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#C4A47C] uppercase tracking-wider">Langkah 2</p>
                <p className="text-[11px] text-[#E8DDD3]/70 mt-0.5">Indeks Sensitivitas Kulit</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#C4A47C] uppercase tracking-wider">Langkah 3</p>
                <p className="text-[11px] text-[#E8DDD3]/70 mt-0.5">Kartu Rekomendasi Ritual</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="start-beauty-finder-btn"
                onClick={() => setIsBeautyFinderOpen(true)}
                className="px-8 py-4 bg-[#E8DDD3] text-[#252525] hover:bg-white transition-all duration-300 text-xs tracking-[0.22em] uppercase font-bold flex items-center space-x-3 shadow-xl"
              >
                <span>Mulai Tes Diagnostik Kulit AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Interactive Card Mockup */}
            <div className="p-6 bg-white/5 border border-white/20 backdrop-blur-xl rounded-lg space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[10px] tracking-widest uppercase text-[#C4A47C] font-mono">Contoh Preskripsi Kulit</span>
                <span className="text-[10px] text-white/60">Kesesuaian: 98%</span>
              </div>
              
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-[#9B8778] font-semibold">Ritual yang Disarankan</span>
                <h4 className="font-serif-luxury text-xl text-white">Arsitektur Wajah & Buccal Sculpting</h4>
                <p className="text-xs text-white/70 font-light">Menargetkan kontur garis rahang, drainase limfatik, dan pelepas stres fasia.</p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-[#9B8778] font-semibold">Frekuensi Ideal</span>
                <p className="text-xs text-white/90">Sesi tunggal sebelum acara penting atau siklus 4 minggu intensif.</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsBeautyFinderOpen(true)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-widest font-semibold border border-white/20 transition-colors"
                >
                  Dapatkan Preskripsi Personal Anda
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. The Artisans (Beauty Experts Showcase) */}
      <section id="experts-showcase-section" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="editorial-badge text-[#9B8778]">Para Pakar Medis & Terapis</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light mt-2">
              Profil Para Pakar
            </h2>
          </div>

          <button
            onClick={() => setActivePage('experts')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#252525] hover:text-[#9B8778] transition-colors"
          >
            <span>Lihat Semua Profil Pakar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BEAUTY_EXPERTS.map((expert) => (
            <div 
              key={expert.id}
              className="bg-white border border-[#E8DDD3] p-6 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden mb-5">
                  <img 
                    src={expert.avatar} 
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#F7F4EF]/90 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#252525] font-bold text-center border border-[#E8DDD3]">
                    {expert.role} • {expert.experienceYears} Th Pengalaman
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[#C4A47C] mb-1">
                  <Star className="w-3.5 h-3.5 fill-[#C4A47C]" />
                  <span className="text-xs font-bold text-[#252525]">{expert.rating}</span>
                  <span className="text-[10px] text-[#9B8778]">({expert.reviewCount} ulasan)</span>
                </div>

                <h3 className="font-serif-luxury text-xl font-medium text-[#252525]">
                  {expert.name}
                </h3>
                <p className="text-[11px] text-[#9B8778] font-medium tracking-wide mt-0.5">
                  {expert.title}
                </p>

                <p className="text-xs text-[#252525]/75 font-light line-clamp-3 mt-3 leading-relaxed">
                  "{expert.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DDD3] space-y-3">
                <div className="flex flex-wrap gap-1">
                  {expert.specializations.slice(0, 2).map((spec, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 bg-[#E8DDD3]/60 text-[#252525] tracking-wider uppercase">
                      {spec}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => openBookingWithTreatment(undefined, expert.id)}
                  className="w-full py-2.5 bg-[#252525] text-white hover:bg-[#3d3d3d] text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C4A47C]" />
                  <span>Pilih {expert.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Membership & Loyalty: The Titis Circle */}
      <section id="membership-teaser-section" className="py-24 bg-[#E8DDD3]/30 border-y border-[#E8DDD3]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="editorial-badge text-[#9B8778]">Keanggotaan & Loyalitas</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light mt-2">
              Titis Circle
            </h2>
            <p className="text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
              Tingkatkan status Anda melalui tiga tingkatan privilese eksklusif. Nikmati konsierge kulit pribadi, upgrade suite perawatan VIP, dan cashback hingga 15% dalam Poin Kecantikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Essential */}
            <div className="bg-white border border-[#E8DDD3] p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#9B8778]">Tingkat I</span>
                <h3 className="font-serif-luxury text-3xl text-[#252525] font-light mt-1">Essential</h3>
                <p className="text-xs text-[#9B8778] mt-1">Cashback 5% Poin Kecantikan</p>
                <div className="w-12 h-[1px] bg-[#E8DDD3] my-6" />

                <ul className="space-y-3 text-xs text-[#252525]/80 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Cashback 5% poin di setiap ritual perawatan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Gratis Scan Kulit 3D Digital 2x per tahun</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Prioritas booking 7 hari lebih awal</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActivePage('membership')}
                className="w-full py-3 border border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Pelajari Tingkat Essential
              </button>
            </div>

            {/* Signature (Featured) */}
            <div className="bg-[#252525] text-white border-2 border-[#C4A47C] p-8 flex flex-col justify-between space-y-6 relative shadow-2xl transform md:-translate-y-3">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C4A47C] text-[#252525] text-[9px] uppercase tracking-widest font-bold whitespace-nowrap">
                Paling Diminati Tamu VIP
              </div>

              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C4A47C]">Tingkat II</span>
                <h3 className="font-serif-luxury text-3xl text-white font-light mt-1">Signature</h3>
                <p className="text-xs text-[#E8DDD3]/80 mt-1">Cashback 10% Poin Kecantikan</p>
                <div className="w-12 h-[1px] bg-white/20 my-6" />

                <ul className="space-y-3 text-xs text-[#E8DDD3]/90 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Cashback 10% poin di seluruh sanctuary global</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Gratis Ritual Ulang Tahun 90 Menit Signature</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Gratis upgrade ke Private Penthouse Suite</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Jaminan penahanan jadwal prioritas 48 jam</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActivePage('membership')}
                className="w-full py-3 bg-[#C4A47C] text-[#252525] hover:bg-white text-xs uppercase tracking-[0.2em] font-bold transition-colors"
              >
                Gabung Tingkat Signature
              </button>
            </div>

            {/* Privé */}
            <div className="bg-white border border-[#E8DDD3] p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#9B8778]">Tingkat III</span>
                <h3 className="font-serif-luxury text-3xl text-[#252525] font-light mt-1">Privé</h3>
                <p className="text-xs text-[#9B8778] mt-1">Cashback 15% Poin Kecantikan</p>
                <div className="w-12 h-[1px] bg-[#E8DDD3] my-6" />

                <ul className="space-y-3 text-xs text-[#252525]/80 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Cashback 15% poin untuk semua layanan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Aesthetisi Pribadi 24/7 via WhatsApp Eksklusif</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Layanan perawatan residensi rumah / hotel privat</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Layanan jemputan privat dengan supir khusus</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActivePage('membership')}
                className="w-full py-3 border border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Pelajari Tingkat Privé
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Verified Client Voices & Editorial Reviews */}
      <section id="reviews-section" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Kisah Para Tamu</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light mt-2">
            Transformasi Nyata
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_REVIEWS.map((rev) => (
            <div 
              key={rev.id} 
              className="p-8 bg-white border border-[#E8DDD3] flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-[#C4A47C]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C4A47C]" />
                  ))}
                </div>

                <p className="text-xs text-[#252525]/85 font-light italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DDD3] flex items-center space-x-3">
                <img 
                  src={rev.avatar} 
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#9B8778]" 
                />
                <div>
                  <h4 className="text-xs font-semibold text-[#252525]">{rev.author}</h4>
                  <p className="text-[10px] text-[#9B8778]">{rev.location} • Tamu Terverifikasi</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Global Sanctuaries Locations Preview */}
      <section id="sanctuaries-section" className="py-24 bg-[#252525] text-white border-t border-[#3d3d3d]">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="editorial-badge text-[#C4A47C]">Sanctuary Utama</span>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light mt-2 text-[#F7F4EF]">
                Sanctuary & Flagship
              </h2>
            </div>

            <button
              onClick={() => setActivePage('locations')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#E8DDD3] hover:text-white transition-colors"
            >
              <span>Jelajahi Semua Atelier & Suite</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINIC_LOCATIONS.map((loc) => (
              <div 
                key={loc.id}
                onClick={() => setActivePage('locations')}
                className="group cursor-pointer bg-white/5 border border-white/15 overflow-hidden hover:border-[#C4A47C] transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={loc.image} 
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100" 
                  />
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#252525]/80 backdrop-blur-sm text-[9px] uppercase tracking-widest text-[#C4A47C] font-semibold border border-white/10">
                    {loc.suitesCount} Suite Privat
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[10px] tracking-widest uppercase text-[#9B8778] font-bold">
                    {loc.city}, {loc.country}
                  </span>
                  <h3 className="font-serif-luxury text-lg text-white group-hover:text-[#E8DDD3] transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-white/70 font-light truncate">
                    {loc.address}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
