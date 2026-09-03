import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TREATMENTS, 
  CLINIC_LOCATIONS, 
  BEAUTY_EXPERTS, 
  ADD_ON_OPTIONS 
} from '../../data/mockData';
import { 
  Treatment, 
  ClinicLocation, 
  BeautyExpert, 
  AddOnOption, 
  Booking 
} from '../../types';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Sparkles, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  CheckCircle2,
  Coffee,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SmartBookingModal: React.FC = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    preselectedBookingTreatmentId,
    preselectedBookingExpertId,
    addNewBooking,
    customer,
    showToast
  } = useApp();

  const [bookingStep, setBookingStep] = useState<number>(1);

  // Selections
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment>(
    TREATMENTS.find(t => t.id === preselectedBookingTreatmentId) || TREATMENTS[0]
  );
  const [selectedLocation, setSelectedLocation] = useState<ClinicLocation>(CLINIC_LOCATIONS[0]);
  const [selectedExpert, setSelectedExpert] = useState<BeautyExpert | 'any'>('any');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-18');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('14:00');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  
  // Guest info
  const [guestName, setGuestName] = useState(customer.name);
  const [guestEmail, setGuestEmail] = useState(customer.email);
  const [guestPhone, setGuestPhone] = useState(customer.phone);
  const [guestNotes, setGuestNotes] = useState('');
  const [preferredTea, setPreferredTea] = useState(customer.preferences.tea);
  const [preferredAroma, setPreferredAroma] = useState(customer.preferences.aroma);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'xendit_midtrans' | 'credit_card' | 'pay_at_clinic' | 'points_membership'>('xendit_midtrans');
  const [usePoints, setUsePoints] = useState(false);

  // Final confirmation receipt
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (preselectedBookingTreatmentId) {
      const found = TREATMENTS.find(t => t.id === preselectedBookingTreatmentId);
      if (found) setSelectedTreatment(found);
    }
    if (preselectedBookingExpertId) {
      const foundExp = BEAUTY_EXPERTS.find(e => e.id === preselectedBookingExpertId);
      if (foundExp) setSelectedExpert(foundExp);
    }
  }, [preselectedBookingTreatmentId, preselectedBookingExpertId]);

  if (!isBookingModalOpen) return null;

  const toggleAddOn = (addon: AddOnOption) => {
    setSelectedAddOns(prev =>
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalDuration = selectedTreatment.durationMinutes + selectedAddOns.reduce((sum, a) => sum + a.durationMin, 0);
  const subtotal = selectedTreatment.price + addOnsTotal;
  const pointsDiscount = usePoints ? Math.min(customer.points * 0.1, subtotal * 0.3) : 0; // Max 30% via points
  const totalAmount = Math.max(0, subtotal - pointsDiscount);
  const pointsEarned = Math.round(totalAmount * (customer.tier === 'Privé' ? 0.15 : customer.tier === 'Signature' ? 0.10 : 0.05));

  const availableTimeSlots = [
    '09:30 WIB', '11:00 WIB', '13:30 WIB', '14:00 WIB', '15:45 WIB', '17:00 WIB', '18:30 WIB'
  ];

  const handleConfirmReservation = () => {
    const bookingCode = `VR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBk: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode,
      treatmentId: selectedTreatment.id,
      treatmentName: selectedTreatment.name,
      treatmentCategory: selectedTreatment.category,
      treatmentPrice: selectedTreatment.price,
      durationMinutes: totalDuration,
      addOns: selectedAddOns,
      locationId: selectedLocation.id,
      locationName: selectedLocation.name,
      expertId: selectedExpert === 'any' ? 'first-available' : selectedExpert.id,
      expertName: selectedExpert === 'any' ? 'Praktisi Utama Tersedia' : selectedExpert.name,
      expertTitle: selectedExpert === 'any' ? 'Lead Aesthetic Clinician' : selectedExpert.title,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      customerInfo: {
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        skinConcerns: customer.concerns,
        notes: guestNotes,
        isFirstVisit: false,
        preferredTea,
        preferredAroma
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'pay_at_clinic' ? 'pending' : 'paid',
      subtotal,
      discount: pointsDiscount,
      totalAmount,
      pointsEarned,
      pointsUsed: usePoints ? Math.round(pointsDiscount * 10) : 0,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      aftercareInstructions: [
        'Hindari olahraga berat dan paparan suhu panas tinggi (sauna) selama 24 jam',
        'Cukupi asupan air putih kaya elektrolit',
        'Gunakan VÉRE Ceramide Barrier Cream yang diresepkan'
      ]
    };

    addNewBooking(newBk);
    setCompletedBooking(newBk);
    setBookingStep(7); // Jump to Confirmation Pass
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
    setBookingStep(1);
    setCompletedBooking(null);
  };

  return (
    <div id="smart-booking-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-[#252525]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#F7F4EF] w-full max-w-4xl border border-[#E8DDD3] shadow-2xl overflow-hidden relative flex flex-col max-h-[92vh]"
      >
        
        {/* Modal Top Header */}
        <div className="p-6 bg-[#252525] text-[#F7F4EF] flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-white/10 text-[#C4A47C]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="editorial-badge text-[#C4A47C]">Reservasi Sanctuary VÉRE</span>
              <h3 className="font-serif-luxury text-2xl text-[#F7F4EF] font-light">
                {bookingStep < 7 ? `Reservasi Cerdas • Langkah ${bookingStep} dari 6` : 'Tiket Janji Temu Dikonfirmasi'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 text-[#E8DDD3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {bookingStep < 7 && (
          <div className="w-full bg-[#E8DDD3] h-1">
            <div 
              className="bg-[#252525] h-1 transition-all duration-500 ease-out" 
              style={{ width: `${(bookingStep / 6) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">

          {/* STEP 1: Treatment Selection */}
          {bookingStep === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 1</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Pilih Ritual Perawatan Anda
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Pilih dari koleksi ritual signature skulpting osteopati, eksosom seluler, atau trikologi rambut.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TREATMENTS.map((trt) => {
                  const isSelected = selectedTreatment.id === trt.id;
                  return (
                    <div
                      key={trt.id}
                      onClick={() => setSelectedTreatment(trt)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start space-x-4 ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-md'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <img src={trt.image} alt={trt.name} className="w-16 h-16 object-cover rounded shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider text-[#9B8778] font-bold">{trt.category}</span>
                          <span className="text-xs font-semibold text-[#252525]">${trt.price}</span>
                        </div>
                        <h5 className="font-serif-luxury text-base text-[#252525] font-medium truncate mt-0.5">{trt.name}</h5>
                        <p className="text-[10px] text-[#9B8778] mt-1">{trt.durationMinutes} Menit • {trt.downtime}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
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

          {/* STEP 2: Sanctuary Location */}
          {bookingStep === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 2</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Pilih Lokasi Klinik Sanctuary
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Semua sanctuary VÉRE dilengkapi suite kedap suara privat dan oxygen relaxation lounge.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CLINIC_LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start space-x-4 ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-md'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <img src={loc.image} alt={loc.name} className="w-20 h-20 object-cover rounded shrink-0" />
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#9B8778] font-bold">{loc.city}</span>
                        <h5 className="font-serif-luxury text-lg text-[#252525] font-medium">{loc.name}</h5>
                        <p className="text-[11px] text-[#252525]/70 font-light mt-1">{loc.address}</p>
                        <p className="text-[10px] text-[#9B8778] mt-1">{loc.suitesCount} Suite Privat • {loc.parking}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
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

          {/* STEP 3: Master Artisan Expert */}
          {bookingStep === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 3</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Pilih Dokter & Praktisi Kecantikan
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Pilih dokter/ahli estetika spesifik atau pilih praktisi master pertama yang tersedia.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Available Option */}
                <div
                  onClick={() => setSelectedExpert('any')}
                  className={`p-4 border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    selectedExpert === 'any'
                      ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-md'
                      : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[#252525] text-[#C4A47C] flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-serif-luxury text-base text-[#252525] font-medium">Praktisi Pertama Tersedia</h5>
                      <p className="text-[11px] text-[#9B8778]">Konfirmasi reservasi paling cepat</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedExpert === 'any' ? 'border-[#252525] bg-[#252525] text-white' : 'border-[#9B8778]/40'
                  }`}>
                    {selectedExpert === 'any' && <Check className="w-3 h-3" />}
                  </div>
                </div>

                {/* List of Experts */}
                {BEAUTY_EXPERTS.map((exp) => {
                  const isSelected = typeof selectedExpert === 'object' && selectedExpert.id === exp.id;
                  return (
                    <div
                      key={exp.id}
                      onClick={() => setSelectedExpert(exp)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-md'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img src={exp.avatar} alt={exp.name} className="w-12 h-12 rounded-full object-cover border border-[#9B8778]" />
                        <div>
                          <h5 className="font-serif-luxury text-base text-[#252525] font-medium">{exp.name}</h5>
                          <p className="text-[10px] text-[#9B8778]">{exp.role} • ★ {exp.rating}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
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

          {/* STEP 4: Date & Time Slot */}
          {bookingStep === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 4</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Pilih Tanggal & Waktu Kunjungan
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Slot waktu ditahan selama 15 menit selama proses pemesanan berlangsung.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-2">
                    Tanggal Janji Temu
                  </label>
                  <input 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2026-09-03"
                    className="w-full p-3 bg-white border border-[#E8DDD3] text-sm text-[#252525] focus:outline-none focus:border-[#252525]"
                  />
                  <p className="text-[10px] text-[#9B8778] mt-1.5">
                    Lokasi: {selectedLocation.name}
                  </p>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-2">
                    Slot Jam Tersedia
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-2.5 text-xs text-center border font-medium transition-colors ${
                            isSelected
                              ? 'border-[#252525] bg-[#252525] text-white'
                              : 'border-[#E8DDD3] bg-white text-[#252525] hover:border-[#9B8778]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Add-On Enhancements */}
          {bookingStep === 5 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 5</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Tingkatkan dengan Terapi Tambahan (Add-On)
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Booster klinis opsional yang diintegrasikan langsung ke dalam durasi sesi ritual Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADD_ON_OPTIONS.map((addon) => {
                  const isSelected = selectedAddOns.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`p-4 border cursor-pointer transition-all duration-300 flex items-start justify-between ${
                        isSelected
                          ? 'border-[#252525] bg-[#E8DDD3]/50 shadow-md'
                          : 'border-[#E8DDD3] bg-white hover:border-[#9B8778]'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider text-[#9B8778] font-bold">{addon.category}</span>
                          <span className="text-xs font-semibold text-[#252525]">+${addon.price} (+{addon.durationMin}m)</span>
                        </div>
                        <h5 className="text-xs font-semibold text-[#252525]">{addon.name}</h5>
                        <p className="text-[11px] text-[#9B8778] font-light">{addon.tagline}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
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

          {/* STEP 6: Guest Details & Payment Selection */}
          {bookingStep === 6 && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#9B8778]">Langkah 6</span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                  Detail Tamu & Metode Pembayaran
                </h4>
                <p className="text-xs text-[#252525]/75 mt-1 font-light">
                  Lengkapi preferensi kenyamanan sesi dan pilih opsi penyelesaian transaksi.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Guest Preferences Form */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-1">
                        Nama Lengkap
                      </label>
                      <input 
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-1">
                        Alamat Email
                      </label>
                      <input 
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-1">
                        Nomor WhatsApp (Pengingat)
                      </label>
                      <input 
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-1">
                        Pilihan Teh Selamat Datang
                      </label>
                      <select
                        value={preferredTea}
                        onChange={(e) => setPreferredTea(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
                      >
                        <option value="Jasmine Silver Needle">Jasmine Silver Needle</option>
                        <option value="Organic White Peony">Organic White Peony</option>
                        <option value="Hibiscus Cold Brew Infusion">Hibiscus Cold Brew Infusion</option>
                        <option value="French Lavender Calming Tea">French Lavender Calming Tea</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-1">
                      Catatan Kulit / Permintaan Khusus
                    </label>
                    <textarea
                      rows={2}
                      value={guestNotes}
                      onChange={(e) => setGuestNotes(e.target.value)}
                      placeholder="Contoh: Area bawah mata sensitif, fokus kilau menjelang acara penting..."
                      className="w-full p-2.5 bg-white border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-3 border-t border-[#E8DDD3] space-y-2">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#252525] block">
                      Metode Pembayaran
                    </label>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('xendit_midtrans')}
                        className={`p-3 text-left border rounded text-xs transition-all ${
                          paymentMethod === 'xendit_midtrans'
                            ? 'border-[#252525] bg-[#252525] text-white'
                            : 'border-[#E8DDD3] bg-white text-[#252525]'
                        }`}
                      >
                        <div className="font-semibold text-[11px]">QRIS / Midtrans / Xendit</div>
                        <div className="text-[9px] opacity-80 mt-0.5">QRIS Instan, Virtual Account, & E-Wallet</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit_card')}
                        className={`p-3 text-left border rounded text-xs transition-all ${
                          paymentMethod === 'credit_card'
                            ? 'border-[#252525] bg-[#252525] text-white'
                            : 'border-[#E8DDD3] bg-white text-[#252525]'
                        }`}
                      >
                        <div className="font-semibold text-[11px]">Kartu Kredit / Debit</div>
                        <div className="text-[9px] opacity-80 mt-0.5">Visa, Mastercard, JCB, Amex Global</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pay_at_clinic')}
                        className={`p-3 text-left border rounded text-xs transition-all ${
                          paymentMethod === 'pay_at_clinic'
                            ? 'border-[#252525] bg-[#252525] text-white'
                            : 'border-[#E8DDD3] bg-white text-[#252525]'
                        }`}
                      >
                        <div className="font-semibold text-[11px]">Bayar di Klinik</div>
                        <div className="text-[9px] opacity-80 mt-0.5">Selesaikan saat tiba di resepsionis klinik</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('points_membership')}
                        className={`p-3 text-left border rounded text-xs transition-all ${
                          paymentMethod === 'points_membership'
                            ? 'border-[#252525] bg-[#252525] text-white'
                            : 'border-[#E8DDD3] bg-white text-[#252525]'
                        }`}
                      >
                        <div className="font-semibold text-[11px]">Akun Keanggotaan Privé</div>
                        <div className="text-[9px] opacity-80 mt-0.5">Tagihan saldo anggota langsung</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Summary Card & Points Redemption */}
                <div className="lg:col-span-5 bg-white border border-[#E8DDD3] p-6 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">
                      Ringkasan Reservasi
                    </span>
                    <h5 className="font-serif-luxury text-xl text-[#252525] font-medium mt-1">
                      {selectedTreatment.name}
                    </h5>
                    <p className="text-xs text-[#9B8778] mt-0.5">
                      {selectedLocation.name}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#E8DDD3] space-y-2 text-xs">
                      <div className="flex justify-between text-[#252525]/80">
                        <span>Tanggal & Jam</span>
                        <span className="font-medium text-[#252525]">{selectedDate} • {selectedTimeSlot}</span>
                      </div>
                      <div className="flex justify-between text-[#252525]/80">
                        <span>Praktisi</span>
                        <span className="font-medium text-[#252525]">
                          {typeof selectedExpert === 'object' ? selectedExpert.name : 'Praktisi Master Tersedia'}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#252525]/80">
                        <span>Total Durasi</span>
                        <span className="font-medium text-[#252525]">{totalDuration} Menit</span>
                      </div>
                      <div className="flex justify-between text-[#252525]/80">
                        <span>Biaya Ritual</span>
                        <span>${selectedTreatment.price}</span>
                      </div>
                      {selectedAddOns.map(a => (
                        <div key={a.id} className="flex justify-between text-[#9B8778]">
                          <span>+ {a.name}</span>
                          <span>${a.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Member Points Toggle */}
                    <div className="mt-4 p-3 bg-[#F7F4EF] border border-[#E8DDD3] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#252525] block">
                          Tukarkan Poin VÉRE
                        </span>
                        <span className="text-[10px] text-[#9B8778]">
                          Anda memiliki {customer.points} poin (setara ${(customer.points * 0.1).toFixed(0)})
                        </span>
                      </div>
                      <input 
                        type="checkbox"
                        checked={usePoints}
                        onChange={(e) => setUsePoints(e.target.checked)}
                        className="w-4 h-4 accent-[#252525]"
                      />
                    </div>

                    {usePoints && (
                      <div className="flex justify-between text-xs text-green-700 font-semibold mt-2">
                        <span>Diskon Poin</span>
                        <span>-${pointsDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t-2 border-[#252525] flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#252525]">Total Pembayaran</span>
                      <span className="font-serif-luxury text-3xl font-bold text-[#252525]">${totalAmount.toFixed(2)}</span>
                    </div>

                    <p className="text-[10px] text-[#9B8778] mt-1 text-right">
                      Mendapatkan +{pointsEarned} Poin setelah kunjungan
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 7: Confirmation & Digital Sanctuary Pass */}
          {bookingStep === 7 && completedBooking && (
            <div className="space-y-6 text-center animate-fadeIn py-4">
              
              <div className="w-16 h-16 rounded-full bg-[#E8DDD3] text-[#252525] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 text-[#252525]" />
              </div>

              <div>
                <span className="editorial-badge text-[#C4A47C]">Reservasi Dikonfirmasi</span>
                <h4 className="font-serif-luxury text-3xl sm:text-4xl text-[#252525] font-light mt-1">
                  Kami sangat menantikan kehadiran Anda.
                </h4>
                <p className="text-xs text-[#9B8778] mt-1 font-mono">
                  Kode Konfirmasi: <strong>{completedBooking.bookingCode}</strong>
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="max-w-md mx-auto p-6 bg-white border border-[#E8DDD3] shadow-lg text-left space-y-4 relative">
                <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-3">
                  <span className="font-serif-luxury text-xl font-bold tracking-widest text-[#252525]">VÉRE PASS</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-700">TERKONFIRMASI</span>
                </div>

                <div className="space-y-2">
                  <h5 className="font-serif-luxury text-lg text-[#252525] font-medium">{completedBooking.treatmentName}</h5>
                  <p className="text-xs text-[#9B8778]">{completedBooking.locationName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#E8DDD3]">
                  <div>
                    <span className="text-[10px] text-[#9B8778] block">Tanggal</span>
                    <strong className="text-[#252525]">{completedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9B8778] block">Jam Sesi</span>
                    <strong className="text-[#252525]">{completedBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9B8778] block">Praktisi</span>
                    <strong className="text-[#252525]">{completedBooking.expertName}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9B8778] block">Total Selesai</span>
                    <strong className="text-[#252525]">${completedBooking.totalAmount}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#9B8778] block uppercase tracking-wider">Check-In Sanctuary</span>
                    <span className="text-[10px] font-mono text-[#252525]">Tunjukkan QR saat tiba</span>
                  </div>
                  <div className="w-14 h-14 bg-[#252525] p-1 flex items-center justify-center rounded">
                    <QrCode className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              {/* Notification & WhatsApp simulation */}
              <div className="p-4 bg-[#E8DDD3]/40 border border-[#E8DDD3] max-w-md mx-auto text-xs text-[#252525]/80 space-y-1">
                <div className="flex items-center justify-center space-x-1.5 text-[#252525] font-semibold">
                  <MessageSquare className="w-3.5 h-3.5 text-[#C4A47C]" />
                  <span>Notifikasi WhatsApp & Email Terkirim</span>
                </div>
                <p className="text-[11px] text-[#9B8778]">
                  Petunjuk persiapan dikirim ke {completedBooking.customerInfo.phone} dan kalender janji temu ke {completedBooking.customerInfo.email}.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-white border-t border-[#E8DDD3] flex items-center justify-between">
          {bookingStep > 1 && bookingStep < 7 && (
            <button
              onClick={() => setBookingStep(bookingStep - 1)}
              className="px-5 py-2.5 border border-[#E8DDD3] text-xs uppercase tracking-widest text-[#252525] hover:bg-[#F7F4EF] flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          )}

          {bookingStep === 1 && <div />}

          {bookingStep < 6 && (
            <button
              onClick={() => setBookingStep(bookingStep + 1)}
              className="px-7 py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#3d3d3d] flex items-center space-x-2"
            >
              <span>Lanjutkan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {bookingStep === 6 && (
            <button
              onClick={handleConfirmReservation}
              className="px-8 py-3.5 bg-[#C4A47C] text-[#252525] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#252525] hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-lg"
            >
              <Check className="w-4 h-4" />
              <span>Konfirmasi & Kunci Reservasi</span>
            </button>
          )}

          {bookingStep === 7 && (
            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#252525] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#3d3d3d]"
            >
              Lihat di Riwayat Akun Tamu
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};
