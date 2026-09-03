import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TREATMENTS, 
  BEAUTY_EXPERTS, 
  CLINIC_LOCATIONS, 
  SAMPLE_CUSTOMERS 
} from '../../data/mockData';
import { Booking } from '../../types';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle,
  FileText,
  Activity,
  UserCheck
} from 'lucide-react';

export const AdminCrmDashboard: React.FC = () => {
  const { bookings, updateBookingStatus, showToast } = useApp();

  const [adminTab, setAdminTab] = useState<'appointments' | 'clients' | 'treatments' | 'analytics'>('appointments');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchClient, setSearchClient] = useState('');

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.totalAmount : 0), 18450);
  const totalAppointmentsCount = bookings.length + 42;

  const filteredBookings = bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (searchClient.trim()) {
      const q = searchClient.toLowerCase();
      if (!b.customerInfo.name.toLowerCase().includes(q) && !b.bookingCode.toLowerCase().includes(q) && !b.treatmentName.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div id="admin-dashboard-page" className="bg-[#F7F4EF] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Admin Header */}
        <div className="bg-[#252525] text-white p-6 sm:p-8 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="flex items-center space-x-2">
              <span className="editorial-badge text-[#C4A47C]">CRM Internal & Operasional Suite Klinik</span>
              <span className="px-2 py-0.5 bg-green-900/60 border border-green-500 text-green-400 text-[9px] uppercase font-mono">
                Sistem Aktif • Server Jakarta
              </span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-white mt-1">
              Pusat Kontrol Operasional Sanctuary VÉRE
            </h1>
            <p className="text-xs text-[#E8DDD3]/80 font-light mt-1">
              Kelola janji temu real-time, rekam medis kulit tamu, kesiapan suite privat, dan alokasi dokter spesialis.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => showToast('Menyinkronkan sensor IoT suite & sistem sterilisasi udara...')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold border border-white/20 transition-colors"
            >
              Sinkron Sensor Ruang
            </button>
            <button
              onClick={() => showToast('Mengekspor rekam medis terenkripsi sesuai standar privasi.')}
              className="px-4 py-2 bg-[#C4A47C] text-[#252525] text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors"
            >
              Ekspor Laporan
            </button>
          </div>
        </div>

        {/* Operational Metrics Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-[#E8DDD3] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold block">Pendapatan Hari Ini</span>
            <span className="font-serif-luxury text-3xl font-bold text-[#252525] mt-1 block">${totalRevenue.toLocaleString()}</span>
            <span className="text-[10px] text-green-700 flex items-center space-x-1 mt-1 font-semibold">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs siklus sebelumnya</span>
            </span>
          </div>

          <div className="p-5 bg-white border border-[#E8DDD3] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold block">Total Reservasi Aktif</span>
            <span className="font-serif-luxury text-3xl font-bold text-[#252525] mt-1 block">{totalAppointmentsCount}</span>
            <span className="text-[10px] text-[#9B8778] mt-1 block">99.2% Okupansi Suite</span>
          </div>

          <div className="p-5 bg-white border border-[#E8DDD3] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold block">Dokter / Praktisi Bertugas</span>
            <span className="font-serif-luxury text-3xl font-bold text-[#252525] mt-1 block">{BEAUTY_EXPERTS.length}</span>
            <span className="text-[10px] text-[#9B8778] mt-1 block">Di 4 Lokasi Flagship</span>
          </div>

          <div className="p-5 bg-white border border-[#E8DDD3] shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#9B8778] font-bold block">Anggota VIP Privé</span>
            <span className="font-serif-luxury text-3xl font-bold text-[#C4A47C] mt-1 block">148</span>
            <span className="text-[10px] text-[#9B8778] mt-1 block">Rata-rata Kepuasan: 99.4/100</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DDD3] space-x-6 text-xs uppercase tracking-[0.16em] font-semibold">
          {[
            { id: 'appointments' as const, label: `Janji Temu Aktif (${bookings.length})` },
            { id: 'clients' as const, label: 'Daftar & Rekam Medis Tamu' },
            { id: 'treatments' as const, label: 'Katalog & Protokol Ritual' },
            { id: 'analytics' as const, label: 'Analitik Sanctuary' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`pb-3 transition-colors ${
                adminTab === tab.id
                  ? 'border-b-2 border-[#252525] text-[#252525]'
                  : 'text-[#9B8778] hover:text-[#252525]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Live Appointments Management */}
        {adminTab === 'appointments' && (
          <div className="space-y-6">
            
            {/* Filters Bar */}
            <div className="bg-white border border-[#E8DDD3] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8778]" />
                <input 
                  type="text"
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
                  placeholder="Cari berdasarkan nama tamu, kode pass, ritual..."
                  className="w-full pl-9 pr-4 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none"
                >
                  <option value="all">Semua Status</option>
                  <option value="confirmed">Terkonfirmasi (Confirmed)</option>
                  <option value="completed">Selesai (Completed)</option>
                  <option value="cancelled">Dibatalkan (Cancelled)</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white border border-[#E8DDD3] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F4EF] border-b border-[#E8DDD3] text-[10px] uppercase tracking-wider text-[#9B8778]">
                  <tr>
                    <th className="p-4">Kode Tiket</th>
                    <th className="p-4">Nama Tamu</th>
                    <th className="p-4">Ritual & Disiplin</th>
                    <th className="p-4">Sanctuary & Praktisi</th>
                    <th className="p-4">Tanggal & Jam</th>
                    <th className="p-4">Total & Status</th>
                    <th className="p-4 text-right">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDD3]">
                  {filteredBookings.map((bk) => (
                    <tr key={bk.id} className="hover:bg-[#F7F4EF]/50 transition-colors">
                      <td className="p-4 font-mono font-semibold text-[#252525]">{bk.bookingCode}</td>
                      <td className="p-4">
                        <span className="font-semibold text-[#252525] block">{bk.customerInfo.name}</span>
                        <span className="text-[10px] text-[#9B8778]">{bk.customerInfo.phone}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-[#252525] block">{bk.treatmentName}</span>
                        <span className="text-[10px] text-[#9B8778]">{bk.durationMinutes} Menit</span>
                      </td>
                      <td className="p-4">
                        <span className="text-[#252525] block">{bk.locationName}</span>
                        <span className="text-[10px] text-[#9B8778]">{bk.expertName}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-[#252525] block">{bk.date}</span>
                        <span className="text-[10px] text-[#9B8778]">{bk.timeSlot}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-[#252525] block">${bk.totalAmount}</span>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] uppercase font-bold ${
                          bk.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          bk.status === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {bk.status === 'confirmed' ? 'Dikonfirmasi' : bk.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {bk.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              updateBookingStatus(bk.id, 'completed');
                              showToast(`Tiket ${bk.bookingCode} ditandai telah selesai.`);
                            }}
                            className="px-2.5 py-1 bg-[#252525] text-white text-[10px] uppercase tracking-wider rounded font-semibold hover:bg-black"
                          >
                            Selesai
                          </button>
                        )}
                        {bk.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              updateBookingStatus(bk.id, 'cancelled');
                              showToast(`Tiket ${bk.bookingCode} dibatalkan.`);
                            }}
                            className="px-2.5 py-1 border border-red-300 text-red-700 text-[10px] uppercase tracking-wider rounded font-semibold hover:bg-red-50"
                          >
                            Batal
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: Customer CRM Profiles */}
        {adminTab === 'clients' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_CUSTOMERS.map((c) => (
              <div key={c.id} className="bg-white border border-[#E8DDD3] p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-4">
                  <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover border border-[#9B8778]" />
                  <div>
                    <h4 className="font-serif-luxury text-xl font-medium text-[#252525]">{c.name}</h4>
                    <span className="px-2 py-0.5 bg-[#252525] text-[#C4A47C] text-[9px] uppercase tracking-widest font-bold">
                      Anggota {c.tier}
                    </span>
                    <p className="text-[10px] text-[#9B8778] mt-1">{c.email}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#F7F4EF] border border-[#E8DDD3] grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[9px] text-[#9B8778] uppercase block">Kunjungan</span>
                    <strong className="text-[#252525]">{c.completedVisitsCount}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#9B8778] uppercase block">Poin</span>
                    <strong className="text-[#252525]">{c.points}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#9B8778] uppercase block">Kilau</span>
                    <strong className="text-[#C4A47C]">{c.skinProfile.luminosityScore}%</strong>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#9B8778] block">Masalah Kulit Terdokumentasi</span>
                  <div className="flex flex-wrap gap-1">
                    {c.concerns.map((con, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white border border-[#E8DDD3] text-[9px] text-[#252525]">
                        {con}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Membuka berkas rekam medis lengkap dan rahasia milik ${c.name}.`)}
                  className="w-full py-2 border border-[#252525] text-[#252525] text-xs uppercase tracking-widest font-semibold hover:bg-[#252525] hover:text-white transition-colors"
                >
                  Buka Rekam Medis Klinis
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Treatments & Pricing Manager */}
        {adminTab === 'treatments' && (
          <div className="bg-white border border-[#E8DDD3] p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-2xl text-[#252525]">Indeks & Protokol Ritual Sanctuary</h3>
              <button
                onClick={() => showToast('Membuka formulir penyusunan ritual baru...')}
                className="px-4 py-2 bg-[#252525] text-white text-xs uppercase tracking-wider font-semibold"
              >
                + Tambah Ritual Baru
              </button>
            </div>

            <div className="divide-y divide-[#E8DDD3]">
              {TREATMENTS.map((trt) => (
                <div key={trt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <img src={trt.image} alt={trt.name} className="w-14 h-14 object-cover rounded" />
                    <div>
                      <h4 className="font-serif-luxury text-lg text-[#252525] font-medium">{trt.name}</h4>
                      <p className="text-[11px] text-[#9B8778]">{trt.category.toUpperCase()} • {trt.durationMinutes} Menit • {trt.steps.length} Langkah</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-xs font-serif-luxury text-xl font-bold text-[#252525]">${trt.price}</span>
                      <span className="text-[10px] text-[#9B8778] block">★ {trt.rating} ({trt.reviewCount})</span>
                    </div>

                    <button
                      onClick={() => showToast(`Mengedit parameter protokol untuk ${trt.name}`)}
                      className="px-3 py-1.5 border border-[#E8DDD3] text-xs uppercase font-semibold text-[#252525] hover:border-[#252525]"
                    >
                      Edit Protokol
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Sanctuary Analytics */}
        {adminTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#E8DDD3] p-6 shadow-sm space-y-4">
              <h4 className="font-serif-luxury text-xl text-[#252525]">Disiplin Ritual Terpopuler</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Sculptural Buccal & Cranial Architecture</span>
                    <span>42% pangsa</span>
                  </div>
                  <div className="w-full bg-[#E8DDD3] h-2 rounded mt-1 overflow-hidden">
                    <div className="bg-[#252525] h-2 w-[42%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Cellular Exosome Bio-Regeneration</span>
                    <span>31% pangsa</span>
                  </div>
                  <div className="w-full bg-[#E8DDD3] h-2 rounded mt-1 overflow-hidden">
                    <div className="bg-[#252525] h-2 w-[31%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Cryo-Hydro Thermal Luminosity</span>
                    <span>18% pangsa</span>
                  </div>
                  <div className="w-full bg-[#E8DDD3] h-2 rounded mt-1 overflow-hidden">
                    <div className="bg-[#252525] h-2 w-[18%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8DDD3] p-6 shadow-sm space-y-4">
              <h4 className="font-serif-luxury text-xl text-[#252525]">Tingkat Okupansi Sanctuary</h4>
              <ul className="space-y-3 text-xs text-[#252525]">
                <li className="flex justify-between border-b border-[#E8DDD3] pb-2">
                  <span>Flagship Jakarta (Menteng)</span>
                  <strong className="text-green-700">98% Terisi</strong>
                </li>
                <li className="flex justify-between border-b border-[#E8DDD3] pb-2">
                  <span>Atelier Surabaya (Gubeng)</span>
                  <strong className="text-green-700">96% Terisi</strong>
                </li>
                <li className="flex justify-between border-b border-[#E8DDD3] pb-2">
                  <span>Sanctuary Privat Bali (Seminyak)</span>
                  <strong className="text-green-700">94% Terisi</strong>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Atelier Bandung (Dago)</span>
                  <strong className="text-green-700">99% Terisi</strong>
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
