import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TREATMENTS, PRODUCTS, SAMPLE_REVIEWS } from '../../data/mockData';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  Sparkles, 
  Calendar, 
  Heart, 
  ShoppingBag, 
  Share2,
  Layers,
  Activity,
  AlertCircle
} from 'lucide-react';

export const TreatmentDetailModal: React.FC = () => {
  const { 
    selectedTreatmentId, 
    setSelectedTreatmentId, 
    setActivePage, 
    openBookingWithTreatment,
    customer,
    toggleFavoriteTreatment,
    addToCart,
    showToast
  } = useApp();

  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const treatment = TREATMENTS.find((t) => t.id === selectedTreatmentId) || TREATMENTS[0];
  const isFav = customer.favoriteTreatmentIds.includes(treatment.id);

  const relatedTreatments = TREATMENTS.filter(
    (t) => t.id !== treatment.id && (t.category === treatment.category || t.isFeatured)
  ).slice(0, 3);

  const recommendedProducts = PRODUCTS.filter((p) =>
    treatment.recommendedHomecareIds?.includes(p.id)
  );

  const treatmentReviews = SAMPLE_REVIEWS.filter(
    (r) => r.treatmentName.toLowerCase().includes(treatment.name.toLowerCase().split(' ')[0])
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan ritual berhasil disalin ke papan klip Anda.');
  };

  return (
    <div id="treatment-detail-container" className="bg-[#F7F4EF] min-h-screen pb-32">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E8DDD3] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setActivePage('treatments')}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#252525] hover:text-[#9B8778] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Ritual</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleFavoriteTreatment(treatment.id)}
              className="p-2 border border-[#E8DDD3] hover:border-[#252525] transition-colors rounded"
              title={isFav ? 'Hapus dari favorit' : 'Simpan ke favorit'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : 'text-[#252525]'}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 border border-[#E8DDD3] hover:border-[#252525] transition-colors rounded"
              title="Bagikan ritual"
            >
              <Share2 className="w-4 h-4 text-[#252525]" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Gallery & Hero Imagery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded shadow-xl relative">
              <img 
                src={treatment.image} 
                alt={treatment.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-[#252525] text-white text-[10px] uppercase tracking-widest font-semibold">
                  {treatment.category}
                </span>
                {treatment.isSignature && (
                  <span className="px-3 py-1 bg-[#C4A47C] text-[#252525] text-[10px] uppercase tracking-widest font-bold">
                    Ritual Utama
                  </span>
                )}
              </div>
            </div>

            {/* Micro Highlights Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-white border border-[#E8DDD3] text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block">Durasi Sesi</span>
                <span className="font-serif-luxury text-base font-medium text-[#252525]">{treatment.durationMinutes} Menit</span>
              </div>
              <div className="p-3 bg-white border border-[#E8DDD3] text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block">Intensitas</span>
                <span className="text-xs font-semibold text-[#252525] truncate block mt-0.5">{treatment.intensity}</span>
              </div>
              <div className="p-3 bg-white border border-[#E8DDD3] text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block">Downtime</span>
                <span className="text-xs font-semibold text-[#252525] truncate block mt-0.5">{treatment.downtime}</span>
              </div>
            </div>
          </div>

          {/* Right: Overview & Pricing */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-[#C4A47C] mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C4A47C]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#252525]">{treatment.rating}</span>
                <span className="text-xs text-[#9B8778]">({treatment.reviewCount} ulasan tamu terverifikasi)</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light leading-tight">
                {treatment.name}
              </h1>
              <p className="text-sm font-medium text-[#9B8778] mt-1 tracking-wide">
                {treatment.subtitle}
              </p>
            </div>

            {/* Price & Action */}
            <div className="p-6 bg-white border border-[#E8DDD3] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#9B8778] block font-semibold">
                  Biaya Perawatan
                </span>
                <div className="flex items-baseline space-x-3 mt-1">
                  <span className="font-serif-luxury text-3xl font-bold text-[#252525]">
                    ${treatment.price}
                  </span>
                  {treatment.originalPrice && (
                    <span className="text-sm text-[#9B8778] line-through">
                      ${treatment.originalPrice}
                    </span>
                  )}
                  <span className="text-[10px] text-[#9B8778] uppercase tracking-wider">
                    • Dapatkan {Math.round(treatment.price * 0.1)} Poin Titis
                  </span>
                </div>
              </div>

              <button
                onClick={() => openBookingWithTreatment(treatment.id)}
                className="px-6 py-3.5 bg-[#252525] text-white hover:bg-[#3d3d3d] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-[#C4A47C]" />
                <span>Reservasi Jadwal</span>
              </button>
            </div>

            {/* Clinical Overview */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#252525]">
                Arsitektur Klinis
              </h3>
              <p className="text-sm text-[#252525]/85 font-light leading-relaxed">
                {treatment.longDescription}
              </p>
            </div>

            {/* Who is it for */}
            <div className="p-5 bg-[#E8DDD3]/30 border border-[#E8DDD3] space-y-3">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#252525] block">
                Indikasi & Kesesuaian Kulit
              </span>
              <ul className="space-y-2">
                {treatment.suitableFor.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-[#252525]/85">
                    <Check className="w-3.5 h-3.5 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Key Benefits */}
      <section className="py-16 bg-white border-y border-[#E8DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="editorial-badge text-[#9B8778]">Hasil Klinis Terbukti</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#252525] font-light mt-1">
              Manfaat Nyata Perawatan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatment.benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 bg-[#F7F4EF] border border-[#E8DDD3] space-y-3">
                <span className="font-serif-luxury text-2xl text-[#9B8778]">0{idx + 1}</span>
                <p className="text-xs text-[#252525]/90 font-medium leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Step-by-Step Treatment Sequence */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <span className="editorial-badge text-[#9B8778]">Koreografi Ritual</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#252525] font-light mt-1">
            Tahapan Sesi Perawatan
          </h2>
          <p className="text-xs text-[#9B8778] mt-2">
            Total Durasi: {treatment.durationMinutes} Menit • Formulasi Diracik Eksklusif di Tempat
          </p>
        </div>

        <div className="space-y-6">
          {treatment.steps.map((st) => (
            <div 
              key={st.stepNumber}
              className="p-6 bg-white border border-[#E8DDD3] flex flex-col sm:flex-row items-start justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#252525] text-white font-serif-luxury text-lg flex items-center justify-center shrink-0">
                  {st.stepNumber}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-serif-luxury text-xl font-medium text-[#252525]">
                      {st.phaseName}
                    </h4>
                    <span className="px-2.5 py-0.5 bg-[#E8DDD3] text-[#252525] text-[10px] uppercase font-semibold">
                      {st.durationMin} Menit
                    </span>
                  </div>
                  <p className="text-xs text-[#252525]/80 font-light leading-relaxed max-w-2xl">
                    {st.description}
                  </p>
                  {st.productsUsed && (
                    <div className="flex items-center space-x-2 text-[11px] text-[#9B8778]">
                      <Sparkles className="w-3 h-3 text-[#C4A47C]" />
                      <span>Formulasi: <strong className="text-[#252525] font-medium">{st.productsUsed}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Before & After Comparison Slider */}
      <section className="py-20 bg-[#252525] text-white border-y border-[#3d3d3d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <span className="editorial-badge text-[#C4A47C]">Bukti Klinis Transformasi</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light mt-1 text-[#F7F4EF]">
            Transformasi Sebelum & Sesudah
          </h2>
          <p className="text-xs text-[#E8DDD3]/80 mt-2 mb-10">
            {treatment.beforeAfter.label} • {treatment.beforeAfter.timeframe}
          </p>

          {/* Slider Container */}
          <div className="relative aspect-[16/10] max-w-2xl mx-auto overflow-hidden rounded border border-white/20 select-none shadow-2xl">
            {/* After Image (Full background) */}
            <img 
              src={treatment.beforeAfter.after} 
              alt="Sesudah Ritual" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#252525]/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold">
              Sesudah (Pasca-Ritual)
            </div>

            {/* Before Image (Clipped by slider position) */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={treatment.beforeAfter.before} 
                alt="Sebelum Ritual" 
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-bold">
                Sebelum
              </div>
            </div>

            {/* Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#252525] flex items-center justify-center text-xs font-bold shadow-lg">
                ↔
              </div>
            </div>

            {/* Invisible Range Control on top */}
            <input 
              type="range" 
              min={0} 
              max={100} 
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            />
          </div>

          <p className="text-[11px] text-[#9B8778] mt-4 italic">
            Geser pemisah horizontal untuk membandingkan perbaikan tekstur dan ketegasan garis rahang.
          </p>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (Accordion) */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <span className="editorial-badge text-[#9B8778]">Tanya Jawab Medis</span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#252525] font-light mt-1">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          {treatment.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-[#E8DDD3] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-[#F7F4EF]/50 transition-colors"
                >
                  <span className="font-serif-luxury text-lg text-[#252525] font-medium pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[#9B8778] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs text-[#252525]/80 font-light leading-relaxed border-t border-[#E8DDD3]/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Recommended Homecare Products Pairing */}
      {recommendedProducts.length > 0 && (
        <section className="py-16 bg-[#E8DDD3]/30 border-t border-[#E8DDD3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
              <div>
                <span className="editorial-badge text-[#9B8778]">Preskripsi Apotek Klinis</span>
                <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Lanjutkan Ritual Perawatan di Rumah
                </h2>
              </div>
              <button
                onClick={() => setActivePage('shop')}
                className="text-xs uppercase tracking-widest text-[#252525] font-semibold underline mt-2 sm:mt-0"
              >
                Kunjungi Apotek Titis
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((prod) => (
                <div key={prod.id} className="p-5 bg-white border border-[#E8DDD3] flex items-center justify-between space-x-4">
                  <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-[#252525]">{prod.name}</h4>
                    <p className="text-[10px] text-[#9B8778]">{prod.volume}</p>
                    <p className="text-xs font-semibold text-[#252525] mt-1">${prod.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-3.5 py-2 bg-[#252525] text-white hover:bg-[#3d3d3d] text-[10px] uppercase tracking-wider font-semibold"
                  >
                    + Tas Belanja
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E8DDD3] p-4 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">
            <h4 className="font-serif-luxury text-lg text-[#252525] font-medium leading-none">{treatment.name}</h4>
            <span className="text-[10px] text-[#9B8778] uppercase tracking-wider">{treatment.durationMinutes} Menit • ${treatment.price}</span>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            <div>
              <span className="text-[10px] uppercase text-[#9B8778] block sm:hidden">Biaya Investasi</span>
              <span className="font-serif-luxury text-2xl font-bold text-[#252525] sm:hidden">${treatment.price}</span>
            </div>

            <button
              onClick={() => openBookingWithTreatment(treatment.id)}
              className="px-8 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#3d3d3d] transition-all shadow-md flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-[#C4A47C]" />
              <span>Reservasi Ritual Ini</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
