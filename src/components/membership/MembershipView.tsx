import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight,
  Gift,
  Clock,
  HeartHandshake
} from 'lucide-react';

export const MembershipView: React.FC = () => {
  const { customer, setCustomer, showToast, openBookingWithTreatment } = useApp();

  const [simulatedSpend, setSimulatedSpend] = useState<number>(3000);

  const calculatePointsEarned = (tier: 'Essential' | 'Signature' | 'Privé', spend: number) => {
    const rate = tier === 'Privé' ? 0.15 : tier === 'Signature' ? 0.10 : 0.05;
    return Math.round(spend * rate);
  };

  const handleUpgradeTier = (tier: 'Essential' | 'Signature' | 'Privé') => {
    setCustomer(prev => ({ ...prev, tier }));
    showToast(`Selamat datang di Lingkaran Titis ${tier}. Hak istimewa Anda telah aktif.`);
  };

  return (
    <div id="membership-page" className="bg-[#F7F4EF] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Loyalitas & Elevasi Eksklusif</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Lingkaran Keanggotaan Titis
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Dedikasi kami untuk kesinambungan kilau kulit Anda. Nikmati privilese suite privat, concierge estetika personal 24/7, dan cashback poin hingga 15% di seluruh sanctuary global kami.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Tier 1: Essential */}
          <div className={`p-8 bg-white border flex flex-col justify-between space-y-6 ${
            customer.tier === 'Essential' ? 'border-[#252525] ring-2 ring-[#252525]' : 'border-[#E8DDD3]'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#9B8778]">Tingkat I</span>
                {customer.tier === 'Essential' && (
                  <span className="px-2 py-0.5 bg-[#252525] text-white text-[9px] uppercase font-bold">Tingkat Anda</span>
                )}
              </div>
              <h3 className="font-serif-luxury text-3xl text-[#252525] font-light mt-2">Essential</h3>
              <p className="text-xs text-[#9B8778] mt-1">Otomatis aktif saat pendaftaran pertama</p>
              
              <div className="my-6 pt-4 border-t border-[#E8DDD3] space-y-3">
                <span className="text-xs font-semibold text-[#252525] block">Hak Istimewa Tingkat:</span>
                <ul className="space-y-3 text-xs text-[#252525]/80 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>5% Poin Kecantikan untuk semua ritual & produk apotek</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Pemindaian Kulit 3D Digital gratis 2x per tahun</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Akses reservasi prioritas 7 hari lebih awal</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Layanan teh apotek organik selamat datang</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleUpgradeTier('Essential')}
              disabled={customer.tier === 'Essential'}
              className="w-full py-3 border border-[#252525] text-[#252525] text-xs uppercase tracking-widest font-semibold hover:bg-[#252525] hover:text-white transition-colors disabled:opacity-50"
            >
              {customer.tier === 'Essential' ? 'Keanggotaan Aktif' : 'Pilih Essential'}
            </button>
          </div>

          {/* Tier 2: Signature (Featured) */}
          <div className={`p-8 bg-[#252525] text-white border-2 border-[#C4A47C] flex flex-col justify-between space-y-6 relative shadow-2xl ${
            customer.tier === 'Signature' ? 'ring-2 ring-white' : ''
          }`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C4A47C] text-[#252525] text-[9px] uppercase tracking-widest font-bold">
              Paling Diminati
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#C4A47C]">Tingkat II</span>
                {customer.tier === 'Signature' && (
                  <span className="px-2 py-0.5 bg-[#C4A47C] text-[#252525] text-[9px] uppercase font-bold">Tingkat Anda</span>
                )}
              </div>
              <h3 className="font-serif-luxury text-3xl text-white font-light mt-2">Signature</h3>
              <p className="text-xs text-[#E8DDD3]/80 mt-1">Kualifikasi tahunan: $2.500+</p>
              
              <div className="my-6 pt-4 border-t border-white/20 space-y-3">
                <span className="text-xs font-semibold text-[#E8DDD3] block">Semua Privilese Essential Ditambah:</span>
                <ul className="space-y-3 text-xs text-[#E8DDD3]/90 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span><strong>10% Cashback Poin Kecantikan</strong> untuk semua perawatan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Gratis 90-Menit Signature Birthday Ritual saat bulan ulang tahun</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Gratis upgrade ke Private Penthouse Suite</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Jaminan slot janji temu darurat 48 jam</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C4A47C] shrink-0 mt-0.5" />
                    <span>Kotak hadiah apotek botanika musiman</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleUpgradeTier('Signature')}
              className="w-full py-3 bg-[#C4A47C] text-[#252525] text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors"
            >
              {customer.tier === 'Signature' ? 'Keanggotaan Aktif' : 'Tingkatkan ke Signature'}
            </button>
          </div>

          {/* Tier 3: Privé */}
          <div className={`p-8 bg-white border flex flex-col justify-between space-y-6 ${
            customer.tier === 'Privé' ? 'border-[#252525] ring-2 ring-[#252525]' : 'border-[#E8DDD3]'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#9B8778]">Tingkat III</span>
                {customer.tier === 'Privé' && (
                  <span className="px-2 py-0.5 bg-[#252525] text-white text-[9px] uppercase font-bold">Tingkat Anda</span>
                )}
              </div>
              <h3 className="font-serif-luxury text-3xl text-[#252525] font-light mt-2">Privé</h3>
              <p className="text-xs text-[#9B8778] mt-1">Kualifikasi tahunan: $7.500+</p>
              
              <div className="my-6 pt-4 border-t border-[#E8DDD3] space-y-3">
                <span className="text-xs font-semibold text-[#252525] block">Semua Privilese Signature Ditambah:</span>
                <ul className="space-y-3 text-xs text-[#252525]/80 font-light">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span><strong>15% Cashback Poin Kecantikan</strong> untuk semua transaksi</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Layanan WhatsApp Aesthetician Pribadi 24/7</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Layanan ritual khusus di kediaman / hotel privat</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Fasilitas penjemputan sopir pribadi Titis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                    <span>Akses privat salon di luar jam operasional (After-Hours)</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleUpgradeTier('Privé')}
              className="w-full py-3 border border-[#252525] text-[#252525] text-xs uppercase tracking-widest font-semibold hover:bg-[#252525] hover:text-white transition-colors"
            >
              {customer.tier === 'Privé' ? 'Keanggotaan Aktif' : 'Ajukan Elevasi Privé'}
            </button>
          </div>

        </div>

        {/* Interactive Points & Cashback Calculator */}
        <div className="p-8 sm:p-12 bg-white border border-[#E8DDD3] shadow-md max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="editorial-badge text-[#9B8778]">Kalkulator Hadiah Ritual</span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
              Simulasikan Pengembalian Nilai Poin Anda
            </h3>
            <p className="text-xs text-[#9B8778] mt-1">
              Geser estimasi investasi perawatan kulit tahunan Anda untuk melihat perolehan poin di tiap tingkat keanggotaan.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-[#252525]">
              <span>Estimasi Investasi Ritual Tahunan:</span>
              <span className="font-serif-luxury text-2xl font-bold">${simulatedSpend.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min={500} 
              max={12000} 
              step={250}
              value={simulatedSpend}
              onChange={(e) => setSimulatedSpend(Number(e.target.value))}
              className="w-full accent-[#252525]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8DDD3]">
            <div className="p-4 bg-[#F7F4EF] border border-[#E8DDD3] text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#9B8778] font-bold">Essential (5%)</span>
              <p className="font-serif-luxury text-2xl font-bold text-[#252525] mt-1">{calculatePointsEarned('Essential', simulatedSpend)} pts</p>
              <p className="text-[10px] text-[#9B8778] mt-0.5">Nilai Tukar: ${(calculatePointsEarned('Essential', simulatedSpend) * 0.1).toFixed(0)}</p>
            </div>
            <div className="p-4 bg-[#252525] text-white text-center rounded border border-[#C4A47C]">
              <span className="text-[10px] uppercase tracking-wider text-[#C4A47C] font-bold">Signature (10%)</span>
              <p className="font-serif-luxury text-2xl font-bold text-[#C4A47C] mt-1">{calculatePointsEarned('Signature', simulatedSpend)} pts</p>
              <p className="text-[10px] text-[#E8DDD3] mt-0.5">Nilai Tukar: ${(calculatePointsEarned('Signature', simulatedSpend) * 0.1).toFixed(0)}</p>
            </div>
            <div className="p-4 bg-[#F7F4EF] border border-[#E8DDD3] text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#9B8778] font-bold">Privé (15%)</span>
              <p className="font-serif-luxury text-2xl font-bold text-[#252525] mt-1">{calculatePointsEarned('Privé', simulatedSpend)} pts</p>
              <p className="text-[10px] text-[#9B8778] mt-0.5">Nilai Tukar: ${(calculatePointsEarned('Privé', simulatedSpend) * 0.1).toFixed(0)}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
