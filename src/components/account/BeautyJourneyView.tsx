import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TREATMENTS, 
  PRODUCTS, 
  BEAUTY_EXPERTS, 
  CLINIC_LOCATIONS 
} from '../../data/mockData';
import { 
  User, 
  Calendar, 
  Award, 
  Clock, 
  Sparkles, 
  FileText, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Heart, 
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  QrCode,
  Layers,
  Activity
} from 'lucide-react';

export const BeautyJourneyView: React.FC = () => {
  const { 
    customer, 
    bookings, 
    openBookingWithTreatment, 
    setSelectedTreatmentId, 
    setActivePage,
    addToCart,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'journey' | 'appointments' | 'membership' | 'profile' | 'favorites'>('journey');

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const favoriteTreatments = TREATMENTS.filter(t => customer.favoriteTreatmentIds.includes(t.id));
  const prescribedProducts = PRODUCTS.filter(p => customer.prescribedProductIds.includes(p.id));

  return (
    <div id="account-journey-page" className="bg-[#F7F4EF] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* User Hero Banner */}
        <div className="bg-white border border-[#E8DDD3] p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-center space-x-5">
              <img 
                src={customer.avatar} 
                alt={customer.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#9B8778] p-0.5" 
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-serif-luxury text-3xl text-[#252525] font-light">
                    {customer.name}
                  </h1>
                  <span className="px-3 py-0.5 bg-[#252525] text-[#C4A47C] text-[10px] uppercase tracking-widest font-bold">
                    Anggota {customer.tier}
                  </span>
                </div>
                <p className="text-xs text-[#9B8778] mt-1">
                  Anggota Sejak {customer.memberSince} • ARSITEKTUR KULIT {customer.skinProfile.type.toUpperCase()}
                </p>
                <p className="text-xs text-[#252525]/70 mt-0.5">
                  Sanctuary Utama: {customer.primaryLocation}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[#E8DDD3] pt-4 md:pt-0 md:pl-8">
              <div className="text-center">
                <span className="font-serif-luxury text-3xl font-bold text-[#252525]">{customer.points}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#9B8778] block">Poin Titis</span>
              </div>
              <div className="text-center">
                <span className="font-serif-luxury text-3xl font-bold text-[#252525]">{customer.completedVisitsCount}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#9B8778] block">Ritual Selesai</span>
              </div>
              <div className="text-center">
                <span className="font-serif-luxury text-3xl font-bold text-[#C4A47C]">{customer.skinProfile.luminosityScore}%</span>
                <span className="text-[10px] uppercase tracking-widest text-[#9B8778] block">Indeks Kilau</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DDD3] mb-8 overflow-x-auto space-x-6 text-xs uppercase tracking-[0.16em] font-semibold">
          {[
            { id: 'journey' as const, label: 'Lini Masa Perjalanan Kulit' },
            { id: 'appointments' as const, label: `Janji Temu (${upcomingBookings.length})` },
            { id: 'membership' as const, label: 'Keanggotaan Titis Circle' },
            { id: 'profile' as const, label: 'Profil Diagnostik Kulit' },
            { id: 'favorites' as const, label: `Ritual Favorit (${favoriteTreatments.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3.5 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-b-2 border-[#252525] text-[#252525]'
                  : 'text-[#9B8778] hover:text-[#252525]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Beauty Journey Timeline */}
        {activeTab === 'journey' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-2xl text-[#252525]">Evolusi & Progres Kulit Jangka Panjang</h3>
                <p className="text-xs text-[#9B8778] mt-0.5">Catatan pencapaian klinis berkala yang dicatat langsung oleh para master aesthetician Anda.</p>
              </div>

              <button
                onClick={() => openBookingWithTreatment()}
                className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d3d3d]"
              >
                Jadwalkan Sesi Berikutnya
              </button>
            </div>

            {/* Timeline Item Cards */}
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-[1.5px] before:bg-[#E8DDD3]">
              {customer.journeyTimeline.map((item, idx) => (
                <div key={item.id} className="relative pl-14 sm:pl-16">
                  {/* Timeline Dot */}
                  <div className="absolute left-3.5 sm:left-4 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-[#252525] border-4 border-[#F7F4EF] flex items-center justify-center z-10" />

                  <div className="bg-white border border-[#E8DDD3] p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E8DDD3] gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#9B8778] font-semibold">
                          {item.date} • {item.location}
                        </span>
                        <h4 className="font-serif-luxury text-xl font-medium text-[#252525] mt-0.5">
                          {item.treatmentName}
                        </h4>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        <span className="text-[#9B8778]">Praktisi: <strong className="text-[#252525]">{item.practitioner}</strong></span>
                        <span className="px-2.5 py-1 bg-[#F7F4EF] border border-[#E8DDD3] text-[10px] font-bold text-[#252525]">
                          Milestone #{customer.journeyTimeline.length - idx}
                        </span>
                      </div>
                    </div>

                    {/* Practitioner Notes */}
                    <div className="p-4 bg-[#F7F4EF] border-l-2 border-[#9B8778] space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#9B8778]">
                        Catatan Evaluasi Klinis
                      </span>
                      <p className="text-xs text-[#252525]/85 italic leading-relaxed">
                        "{item.notes}"
                      </p>
                    </div>

                    {/* Skin Metrics Captured */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-white border border-[#E8DDD3] rounded text-center">
                        <span className="text-[9px] uppercase tracking-wider text-[#9B8778] block">Matriks Hidrasi</span>
                        <span className="font-serif-luxury text-lg font-bold text-[#252525]">+{item.metrics.hydrationGain}%</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E8DDD3] rounded text-center">
                        <span className="text-[9px] uppercase tracking-wider text-[#9B8778] block">Kekenyalan & Kontur</span>
                        <span className="font-serif-luxury text-lg font-bold text-[#252525]">+{item.metrics.elasticity}%</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E8DDD3] rounded text-center">
                        <span className="text-[9px] uppercase tracking-wider text-[#9B8778] block">Perbaikan Pori & Barrier</span>
                        <span className="font-serif-luxury text-lg font-bold text-[#252525]">+{item.metrics.barrierScore}%</span>
                      </div>
                      <div className="p-3 bg-white border border-[#E8DDD3] rounded text-center">
                        <span className="text-[9px] uppercase tracking-wider text-[#9B8778] block">Fokus Target</span>
                        <span className="text-xs font-semibold text-[#252525] mt-1 block truncate">{item.metrics.primaryFocus}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Prescribed Homecare Protocol */}
            <div className="pt-8">
              <h3 className="font-serif-luxury text-2xl text-[#252525] mb-4">Resep Produk Perawatan di Rumah</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {prescribedProducts.map(prod => (
                  <div key={prod.id} className="bg-white border border-[#E8DDD3] p-5 flex items-center justify-between space-x-4">
                    <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h5 className="text-xs font-semibold text-[#252525]">{prod.name}</h5>
                      <p className="text-[10px] text-[#9B8778]">{prod.volume}</p>
                      <p className="text-xs font-bold text-[#252525] mt-1">${prod.price}</p>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(prod);
                        showToast(`Menambahkan ${prod.name} ke Tas Belanja.`);
                      }}
                      className="p-2.5 bg-[#252525] text-white hover:bg-[#3d3d3d] rounded"
                      title="Beli ulang produk"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Upcoming Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#252525]">Jadwal Janji Temu Sanctuary</h3>
            {upcomingBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingBookings.map(bk => (
                  <div key={bk.id} className="bg-white border border-[#E8DDD3] p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-3">
                      <span className="font-mono text-xs font-bold text-[#252525]">{bk.bookingCode}</span>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-wider rounded">
                        Tiket Sanctuary Terkonfirmasi
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif-luxury text-xl text-[#252525] font-medium">{bk.treatmentName}</h4>
                      <p className="text-xs text-[#9B8778] mt-0.5">{bk.locationName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 bg-[#F7F4EF] p-3 rounded">
                      <div>
                        <span className="text-[10px] text-[#9B8778] block">Tanggal & Jam</span>
                        <strong className="text-[#252525]">{bk.date} • {bk.timeSlot}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#9B8778] block">Praktisi Master</span>
                        <strong className="text-[#252525]">{bk.expertName}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <QrCode className="w-6 h-6 text-[#252525]" />
                        <span className="text-[10px] text-[#9B8778]">Check-in digital aktif</span>
                      </div>
                      
                      <button
                        onClick={() => showToast('Permintaan jadwal ulang telah dikirimkan ke concierge Titis Anda.')}
                        className="text-xs uppercase tracking-wider font-semibold text-[#252525] hover:text-[#9B8778] underline"
                      >
                        Ubah Jadwal / Bantuan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-[#E8DDD3] space-y-4">
                <p className="font-serif-luxury text-2xl text-[#252525]">Belum ada janji temu terjadwal.</p>
                <p className="text-xs text-[#9B8778]">Jadwalkan ritual perawatan Anda berikutnya untuk melanjutkan evolusi kilau kulit.</p>
                <button
                  onClick={() => openBookingWithTreatment()}
                  className="px-6 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Pesan Ritual Sekarang
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Membership Tiers & Privileges */}
        {activeTab === 'membership' && (
          <div className="space-y-6">
            <div className="bg-[#252525] text-white p-8 border border-[#C4A47C] shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-[#C4A47C]">Status Keanggotaan</span>
                  <h3 className="font-serif-luxury text-3xl font-light text-white mt-0.5">Lingkaran {customer.tier}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#E8DDD3] uppercase tracking-widest block">Poin Tersedia</span>
                  <span className="font-serif-luxury text-3xl font-bold text-[#C4A47C]">{customer.points}</span>
                </div>
              </div>

              <p className="text-xs text-[#E8DDD3]/90 font-light max-w-xl">
                Sebagai tamu {customer.tier}, Anda berhak atas 10% cashback poin pada seluruh perawatan, jaminan penahanan slot janji temu 48 jam, dan upgrade gratis ke Private Penthouse Suite.
              </p>

              <div className="pt-4 border-t border-white/20 flex flex-wrap gap-4">
                <button
                  onClick={() => showToast('Voucher saldo poin siap ditukarkan saat checkout.')}
                  className="px-5 py-2.5 bg-[#C4A47C] text-[#252525] text-xs uppercase tracking-widest font-bold hover:bg-white"
                >
                  Tukarkan {customer.points} Poin
                </button>
                <button
                  onClick={() => setActivePage('membership')}
                  className="px-5 py-2.5 border border-white text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10"
                >
                  Lihat Semua Hak Istimewa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Diagnostic Skin Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-[#E8DDD3] p-8 space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#252525]">Profil Diagnostik Dasar Kulit</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-4 bg-[#F7F4EF] border border-[#E8DDD3]">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block font-bold">Arsitektur Kulit</span>
                <span className="font-serif-luxury text-xl text-[#252525] font-medium capitalize mt-1 block">{customer.skinProfile.type}</span>
              </div>
              <div className="p-4 bg-[#F7F4EF] border border-[#E8DDD3]">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block font-bold">Indeks Sensitivitas</span>
                <span className="font-serif-luxury text-xl text-[#252525] font-medium capitalize mt-1 block">{customer.skinProfile.sensitivity}</span>
              </div>
              <div className="p-4 bg-[#F7F4EF] border border-[#E8DDD3]">
                <span className="text-[10px] uppercase tracking-wider text-[#9B8778] block font-bold">Kekuatan Barrier</span>
                <span className="font-serif-luxury text-xl text-[#252525] font-medium mt-1 block">{customer.skinProfile.barrierScore}/100</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-bold text-[#252525] block">Fokus Masalah Kulit Saat Ini</span>
              <div className="flex flex-wrap gap-2">
                {customer.concerns.map(c => (
                  <span key={c} className="px-3 py-1 bg-[#E8DDD3] text-[#252525] text-xs font-medium tracking-wide uppercase">
                    {c.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DDD3] flex justify-end">
              <button
                onClick={() => showToast('Preferensi profil telah disinkronkan dengan rekam medis klinis.')}
                className="px-6 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold"
              >
                Perbarui Parameter Kulit
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: Saved / Favorite Rituals */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#252525]">Daftar Ritual Tersimpan</h3>
            {favoriteTreatments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteTreatments.map(trt => (
                  <div key={trt.id} className="bg-white border border-[#E8DDD3] p-5 space-y-4">
                    <img src={trt.image} alt={trt.name} className="w-full aspect-[16/10] object-cover rounded" />
                    <div>
                      <h4 className="font-serif-luxury text-lg text-[#252525] font-medium">{trt.name}</h4>
                      <p className="text-xs text-[#9B8778]">{trt.durationMinutes} Menit • ${trt.price}</p>
                    </div>
                    <button
                      onClick={() => openBookingWithTreatment(trt.id)}
                      className="w-full py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d3d3d]"
                    >
                      Reservasi Sesi
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border border-[#E8DDD3]">
                <p className="text-xs text-[#9B8778]">Belum ada ritual yang disimpan di daftar favorit.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
