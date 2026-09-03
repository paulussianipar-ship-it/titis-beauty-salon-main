import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TREATMENTS, PRODUCTS } from '../../data/mockData';
import { SkinConcern, SkinType, Treatment } from '../../types';
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Calendar, 
  Heart, 
  Clock, 
  ShieldCheck, 
  ShoppingBag,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BeautyFinderModal: React.FC = () => {
  const { 
    isBeautyFinderOpen, 
    setIsBeautyFinderOpen, 
    openBookingWithTreatment,
    setSelectedTreatmentId,
    setActivePage,
    addToCart,
    showToast
  } = useApp();

  const [step, setStep] = useState(1);
  const [selectedConcerns, setSelectedConcerns] = useState<SkinConcern[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<SkinType>('combination');
  const [desiredResult, setDesiredResult] = useState<string>('sculpted_lift');
  const [timeAvailable, setTimeAvailable] = useState<string>('90_min');

  const skinConcernsOptions: { id: SkinConcern; label: string; desc: string }[] = [
    { id: 'lifting-contour', label: 'Kehilangan Kekencangan & Kontur', desc: 'Garis rahang kendur, pipi turun, ketegangan otot TMJ' },
    { id: 'hydration', label: 'Dehidrasi Berat & Kulit Kering', desc: 'Kehilangan kelembapan trans-epidermal, skin barrier rapuh' },
    { id: 'anti-aging', label: 'Garis Halus & Penurunan Kolagen', desc: 'Kerutan senyum periorbital, garis leher, penuaan tekstur' },
    { id: 'glow-radiance', label: 'Kulit Kusam & Kurang Bercahaya', desc: 'Kulit lelah akibat stres urban, membutuhkan refleksi cahaya tinggi' },
    { id: 'acne-texture', label: 'Pori Tersumbat & Tekstur Kasar', desc: 'Komedo membandel, sebum berlebih, penumpukan keratin' },
    { id: 'pigmentation', label: 'Flek Hitam & Hiperpigmentasi', desc: 'Melasma, warna kulit tidak merata, kemerahan pasca-jerawat' },
    { id: 'hair-density', label: 'Kesehatan Kulit Kepala & Rambut', desc: 'Folikel lemah, kerontokan helai rambut, ketidakseimbangan sebum scalp' },
  ];

  const skinConditionOptions: { id: SkinType; label: string; detail: string }[] = [
    { id: 'combination', label: 'Kombinasi', detail: 'Berminyak di area T-zone dengan pipi cenderung kering' },
    { id: 'dry', label: 'Kering & Terasa Kencang', detail: 'Mudah mengelupas, terasa haus nutrisi lipid kaya' },
    { id: 'sensitive', label: 'Sensitif & Reaktif', detail: 'Cepat memerah, peka terhadap wewangian keras' },
    { id: 'mature', label: 'Matang (Mature)', detail: 'Penurunan elastisitas subkutan & kekenyalan alami' },
    { id: 'oily', label: 'Berminyak & Mudah Tersumbat', detail: 'Pori-pori tampak jelas, kilap berlebih di siang hari' },
    { id: 'normal', label: 'Seimbang / Normal', detail: 'Relatif merata dengan dehidrasi ringan sesekali' }
  ];

  const desiredResultsOptions = [
    { id: 'sculpted_lift', label: 'Pengencangan Kontur Instan', desc: 'Pahat tulang pipi tajam, tegaskan garis rahang, lepaskan ketegangan wajah' },
    { id: 'glass_skin', label: 'Kilau Kaca Porselen (Glass Skin)', desc: 'Refleksi cahaya maksimal, tekstur halus tanpa pori, translusensi bercahaya' },
    { id: 'cellular_rejuvenation', label: 'Peremajaan Seluler Menyeluruh', desc: 'Infusi bio-eksosom untuk stimulasi neokolagenesis aktif' },
    { id: 'deep_detox', label: 'Detoks & Pembersihan Pori Mendalam', desc: 'Pembersihan hidrodinamik lembut dipadu kryoterapi sub-zero penutup pori' },
  ];

  const timeCommitmentOptions = [
    { id: '60_min', label: '60 Menit • Presisi Terfokus', desc: 'Reset kilat berorientasi hasil instan siap karpet merah' },
    { id: '75_min', label: '75 Menit • Matriks Regeneratif', desc: 'Nano-infusi klinis & terapi oksigen hiperbarik aktif' },
    { id: '90_min', label: '90 Menit • Transformasi Arsitektural Lengkap', desc: 'Skulpting bukal intra-oral osteopati & relaksasi fasial kranial' },
  ];

  const toggleConcern = (concern: SkinConcern) => {
    setSelectedConcerns(prev => 
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  // Diagnostic algorithm calculation
  const getPrescription = (): {
    primaryTreatment: Treatment;
    confidenceScore: number;
    recommendedCadence: string;
    matchingReason: string;
    homecareProducts: typeof PRODUCTS;
  } => {
    if (selectedConcerns.includes('hair-density')) {
      const trt = TREATMENTS.find(t => t.id === 'trt-trichology-scalp-rebirth') || TREATMENTS[0];
      return {
        primaryTreatment: trt,
        confidenceScore: 99,
        recommendedCadence: '1 sesi setiap 3 minggu sebanyak 4 sesi, dilanjutkan pemeliharaan bulanan.',
        matchingReason: 'Profil Anda mengindikasikan ketegangan folikel kulit kepala dan kebutuhan reaktivasi densitas rambut. Terapi ozon berfrekuensi tinggi dan peptida tembaga akan mengembalikan siklus pertumbuhan rambut optimal.',
        homecareProducts: PRODUCTS.filter(p => p.category === 'haircare').slice(0, 2)
      };
    }

    if (desiredResult === 'sculpted_lift' || selectedConcerns.includes('lifting-contour')) {
      const trt = TREATMENTS.find(t => t.id === 'trt-sculptural-buccal') || TREATMENTS[0];
      return {
        primaryTreatment: trt,
        confidenceScore: 98,
        recommendedCadence: 'Paket awal 3 sesi dengan jeda 14 hari, dilanjutkan dengan skulpting kontur bulanan.',
        matchingReason: 'Profil Anda menunjukkan ketegangan otot fasia dan keinginan penegasan struktur wajah. Manipulasi bukal intra-oral akan merilekskan otot masseter dan mengalirkan getah bening yang tertahan secara seketika.',
        homecareProducts: PRODUCTS.filter(p => p.id === 'prod-sculpt-elixir' || p.id === 'prod-gua-sha')
      };
    }

    if (desiredResult === 'cellular_rejuvenation' || selectedConcerns.includes('anti-aging')) {
      const trt = TREATMENTS.find(t => t.id === 'trt-cellular-exosome') || TREATMENTS[1];
      return {
        primaryTreatment: trt,
        confidenceScore: 96,
        recommendedCadence: '2 sesi dengan interval 4 minggu untuk stimulasi pembentukan neokolagen maksimal.',
        matchingReason: 'Kulit Anda akan merevitalisasi diri dengan 5 miliar bio-eksosom tanaman murni melalui nano-infusi mikro tanpa rasa sakit, mengembalikan kelembapan dermal hingga +42%.',
        homecareProducts: PRODUCTS.filter(p => p.id === 'prod-exosome-serum' || p.id === 'prod-barrier-cream')
      };
    }

    // Default to Cryo Hydro Luminosity
    const trt = TREATMENTS.find(t => t.id === 'trt-cryo-hydro-glow') || TREATMENTS[2];
    return {
      primaryTreatment: trt,
      confidenceScore: 95,
      recommendedCadence: 'Setiap 3 hingga 4 minggu untuk menjaga kejernihan porselen dan kekuatan skin barrier.',
      matchingReason: 'Profil Anda mengutamakan perbaikan pori-pori dan kilau kulit kaca. Ekstraksi vortex asam laktat dikombinasikan dengan pembekuan kryo -4°C akan membersihkan sumbatan pori dan melancarkan sirkulasi mikrovaskular.',
      homecareProducts: PRODUCTS.filter(p => p.id === 'prod-clarifying-essence' || p.id === 'prod-barrier-cream')
    };
  };

  const handleReset = () => {
    setStep(1);
    setSelectedConcerns([]);
    setSelectedCondition('combination');
    setDesiredResult('sculpted_lift');
    setTimeAvailable('90_min');
  };

  if (!isBeautyFinderOpen) return null;

  const prescription = getPrescription();

  return (
    <div id="beauty-finder-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-[#252525]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#F7F4EF] w-full max-w-4xl border border-[#E8DDD3] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#252525] text-[#F7F4EF] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-white/10 text-[#C4A47C]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="editorial-badge text-[#C4A47C]">Diagnostik Estetika Personalisasi</span>
              <h3 className="font-serif-luxury text-2xl text-[#F7F4EF] font-light">
                {step <= 4 ? `Kurasi Ritual Anda • Langkah ${step} dari 4` : 'Cetak Biru Ritual Rekomendasi Anda'}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsBeautyFinderOpen(false)}
            className="p-2 text-[#E8DDD3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Progress Indicator */}
        {step <= 4 && (
          <div className="w-full bg-[#E8DDD3] h-1">
            <div 
              className="bg-[#252525] h-1 transition-all duration-500 ease-out" 
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: Skin Concerns */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 1</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Apa fokus utama kulit & estetika yang ingin Anda tingkatkan?
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Pilih satu atau lebih parameter yang sesuai dengan kondisi saat ini.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skinConcernsOptions.map((opt) => {
                  const isSelected = selectedConcerns.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleConcern(opt.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-sm'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[#252525]">
                          {opt.label}
                        </h5>
                        <p className="text-[11px] text-[#9B8778] font-light leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#252525] bg-[#252525] text-white' : 'border-[#9B8778]/40'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Skin Condition / Type */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 2</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Bagaimana kondisi lapisan pelindung (skin barrier) alami Anda?
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Informasi ini memandu konsentrasi bio-asam, teknik pijatan, dan kalibrasi suhu protokol kami.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {skinConditionOptions.map((opt) => {
                  const isSelected = selectedCondition === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedCondition(opt.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-sm'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[#252525]">
                          {opt.label}
                        </h5>
                        <p className="text-[11px] text-[#9B8778] font-light">
                          {opt.detail}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#252525] bg-[#252525] text-white' : 'border-[#9B8778]/40'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Desired Aesthetic Outcome */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 3</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Apa hasil estetika utama yang menjadi prioritas tertinggi Anda?
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Pilih transformasi paling diinginkan yang ingin dirasakan setelah sesi perawatan.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {desiredResultsOptions.map((opt) => {
                  const isSelected = desiredResult === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setDesiredResult(opt.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-sm'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[#252525]">
                          {opt.label}
                        </h5>
                        <p className="text-[11px] text-[#9B8778] font-light">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#252525] bg-[#252525] text-white' : 'border-[#9B8778]/40'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Time Commitment */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 4</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Berapa alokasi waktu yang ingin Anda luangkan di sanctuary VÉRE?
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Semua ritual sudah termasuk teh seduhan aromaterapi selamat datang dan penguncian lipid pelindung pasca-sesi.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {timeCommitmentOptions.map((opt) => {
                  const isSelected = timeAvailable === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setTimeAvailable(opt.id)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-sm'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <h5 className="text-xs font-semibold uppercase tracking-wider text-[#252525]">
                          {opt.label}
                        </h5>
                        <p className="text-[11px] text-[#9B8778] font-light">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#252525] bg-[#252525] text-white' : 'border-[#9B8778]/40'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Prescription & Result Card */}
          {step === 5 && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Prescribed Ritual Banner */}
              <div className="p-6 sm:p-8 bg-white border border-[#E8DDD3] shadow-md space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DDD3] gap-2">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#9B8778]">
                      Ritual Utama Terpilih
                    </span>
                    <h4 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#252525] mt-1">
                      {prescription.primaryTreatment.name}
                    </h4>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-[#252525] text-white text-[10px] uppercase tracking-widest font-semibold">
                      Kecocokan: {prescription.confidenceScore}%
                    </span>
                    <span className="px-3 py-1 bg-[#E8DDD3] text-[#252525] text-[10px] uppercase tracking-widest font-semibold">
                      {prescription.primaryTreatment.durationMinutes} Menit
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 aspect-[4/3] overflow-hidden rounded">
                    <img 
                      src={prescription.primaryTreatment.image} 
                      alt={prescription.primaryTreatment.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <p className="text-xs text-[#252525]/85 font-light leading-relaxed">
                      {prescription.matchingReason}
                    </p>

                    <div className="p-3 bg-[#F7F4EF] border border-[#E8DDD3] space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#9B8778] font-bold">
                        Rekomendasi Siklus Perawatan
                      </span>
                      <p className="text-xs text-[#252525] font-medium">
                        {prescription.recommendedCadence}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block">Biaya Sesi</span>
                        <span className="font-serif-luxury text-2xl font-semibold text-[#252525]">
                          ${prescription.primaryTreatment.price}
                        </span>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setIsBeautyFinderOpen(false);
                            setSelectedTreatmentId(prescription.primaryTreatment.id);
                            setActivePage('treatment-detail');
                          }}
                          className="px-4 py-2 border border-[#252525] text-[#252525] text-xs uppercase tracking-widest font-semibold hover:bg-[#E8DDD3]"
                        >
                          Lihat Detail
                        </button>
                        <button
                          onClick={() => {
                            setIsBeautyFinderOpen(false);
                            openBookingWithTreatment(prescription.primaryTreatment.id);
                          }}
                          className="px-6 py-2 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d3d3d] flex items-center space-x-2"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#C4A47C]" />
                          <span>Reservasi Ritual Ini</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Complementary Aftercare Apothecary Prescriptions */}
              {prescription.homecareProducts.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">
                      Sistem Perawatan Pendukung di Rumah
                    </span>
                    <span className="text-[10px] text-[#9B8778]">Untuk memelihara & melipatgandakan hasil klinis</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prescription.homecareProducts.map((prod) => (
                      <div key={prod.id} className="p-4 bg-white border border-[#E8DDD3] flex items-center justify-between space-x-4">
                        <img src={prod.image} alt={prod.name} className="w-14 h-14 object-cover rounded" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-[#252525]">{prod.name}</h5>
                          <p className="text-[10px] text-[#9B8778]">{prod.volume}</p>
                          <p className="text-xs font-semibold text-[#252525] mt-1">${prod.price}</p>
                        </div>
                        <button
                          onClick={() => addToCart(prod)}
                          className="p-2.5 bg-[#E8DDD3] text-[#252525] hover:bg-[#252525] hover:text-white transition-colors"
                          title="Tambah ke tas belanja"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 bg-white border-t border-[#E8DDD3] flex items-center justify-between">
          {step > 1 && step <= 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 border border-[#E8DDD3] text-xs uppercase tracking-widest text-[#252525] hover:bg-[#F7F4EF]"
            >
              Kembali
            </button>
          ) : step === 5 ? (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 border border-[#E8DDD3] text-xs uppercase tracking-widest text-[#252525] hover:bg-[#F7F4EF] flex items-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Diagnostik</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-7 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#3d3d3d] flex items-center space-x-2"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : step === 4 ? (
            <button
              onClick={() => setStep(5)}
              className="px-7 py-3 bg-[#C4A47C] text-[#252525] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#252525] hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hasilkan Cetak Biru Ritual</span>
            </button>
          ) : (
            <button
              onClick={() => {
                showToast('Cetak biru diagnostik telah disimpan ke Profil Kecantikan Anda.');
                setIsBeautyFinderOpen(false);
              }}
              className="px-6 py-2.5 border border-[#252525] text-[#252525] text-xs uppercase tracking-widest font-semibold hover:bg-[#252525] hover:text-white transition-colors"
            >
              Simpan ke Profil Saya
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};
