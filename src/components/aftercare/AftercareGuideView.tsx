import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TREATMENTS, PRODUCTS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  Sun, 
  Coffee, 
  Heart,
  MessageSquare,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export const AftercareGuideView: React.FC = () => {
  const { setActivePage, setSelectedTreatmentId, addToCart, setIsConciergeOpen, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'buccal' | 'exosome' | 'cryo' | 'trichology'>('all');

  const aftercareProtocols = [
    {
      id: 'buccal-protocol',
      category: 'buccal',
      title: 'Pemulihan Pasca Arsitektur Wajah & Skulpting Bukal Intra-Oral',
      treatmentName: 'Arsitektur Wajah & Buccal Sculpting',
      timeframe: '24 – 48 Jam Pertama',
      goldenRules: [
        'Minum minimal 2.5 liter air putih bersuhu ruangan untuk mempercepat eliminasi toksin limfatik.',
        'Lakukan kompres hangat ringan di area sendi rahang (TMJ) jika terasa rileks mendalam.',
        'Hindari mengunyah makanan keras atau permen karet selama 24 jam pertama pasca-sesi.',
        'Tidur dengan posisi kepala sedikit terangkat (elevasi 30°) untuk mencegah retensi cairan wajah di malam hari.'
      ],
      doList: [
        'Gunakan serum pelembap kaya peptide dan minyak pemijat botanika ringan.',
        'Terapkan teknik usapan drainase getah bening lembut ke arah kelenjar leher.',
        'Konsumsi makanan lembut bernutrisi tinggi kolagen alami.'
      ],
      dontList: [
        'Hindari mandi sauna, uap panas, atau berolahraga kardio intensitas tinggi selama 24 jam.',
        'Hindari menekan keras tulang pipi atau memijat rahang secara kasar tanpa panduan praktisi.',
        'Batasi konsumsi garam dan natrium berlebih.'
      ],
      recommendedProductId: 'prod-sculpt-elixir'
    },
    {
      id: 'exosome-protocol',
      category: 'exosome',
      title: 'Protokol Perlindungan & Fusi Bio-Eksosom Seluler 5 Miliar',
      treatmentName: 'Regenerasi Eksosom Seluler',
      timeframe: '3 Hari Pertama (Fase Replikasi Dermal)',
      goldenRules: [
        'Biarkan matriks eksosom meresap sempurna selama 6 jam pertama tanpa mencuci muka dengan sabun keras.',
        'Wajib mengaplikasikan tabir surya mineral SPF 50+ broad-spectrum setiap 3 jam saat terpapar sinar matahari.',
        'Jaga kelembapan optimal kulit dengan menyemprotkan mist esensial bebas alkohol.',
        'Gunakan sarung bantal sutra bersih untuk mencegah gesekan mekanis pada lapisan pelindung kulit.'
      ],
      doList: [
        'Gunakan krim pengunci barrier (Ceramide Repair Complex) pagi dan malam.',
        'Gunakan pembersih wajah berbahan dasar susu ultra-lembut tanpa busa sulfat.',
        'Beri jeda pemakaian bahan aktif eksfoliasi (AHA/BHA/Retinol) selama 5 hari.'
      ],
      dontList: [
        'Jangan melakukan peeling kimiawi atau scrubbing manual selama 7 hari.',
        'Hindari berenang di kolam air berklorin tinggi selama 72 jam.',
        'Hindari penggunaan riasan wajah tebal berbahan komedogenik selama 24 jam.'
      ],
      recommendedProductId: 'prod-barrier-cream'
    },
    {
      id: 'cryo-protocol',
      category: 'cryo',
      title: 'Perawatan Pasca Cryo-Hydro Luminositas & Ekstraksi Vortex',
      treatmentName: 'Luminositas Cryo-Hydro',
      timeframe: '48 Jam Pasca-Perawatan',
      goldenRules: [
        'Nikmati efek kilau porselen instan dan pertahankan hidrasi dengan serum asam hialuronat murni.',
        'Hindari air panas saat mencuci muka; gunakan air dingin atau suam kuku untuk menjaga kekencangan pori.',
        'Gunakan kuarsa murni dingin yang disimpan di kulkas untuk sensasi kesegaran tambahan.'
      ],
      doList: [
        'Aplikasikan masker hidrogel penenang di malam hari jika kulit terasa sangat haus.',
        'Perbanyak konsumsi antioksidan seperti teh hijau organik atau buah beri.',
        'Jaga kebersihan kuas make-up jika ingin merias wajah.'
      ],
      dontList: [
        'Jangan memencet atau menyentuh wajah dengan tangan yang belum dicuci.',
        'Hindari paparan sinar matahari langsung di siang bolong tanpa pelindung fisik (topi/payung).',
        'Hindari produk berbahan pewangi artifisial sintetis.'
      ],
      recommendedProductId: 'prod-clarifying-essence'
    },
    {
      id: 'trichology-protocol',
      category: 'trichology',
      title: 'Protokol Peremajaan Kulit Kepala & Folikel Rambut Trikologi',
      treatmentName: 'Trikologi & Reaktivasi Folikel Rambut',
      timeframe: '72 Jam Pertama',
      goldenRules: [
        'Hindari keramas selama 24 jam pertama agar serum peptida tembaga dan ozon aktif diserap akar folikel.',
        'Gunakan sisir bergigi jarang dan hindari menyisir rambut saat basah kuyup.',
        'Hindari penggunaan hair dryer bersuhu panas ekstrem langsung di kulit kepala.'
      ],
      doList: [
        'Aplikasikan tonik kulit kepala botanika pada malam hari dengan pijatan melingkar lembut.',
        'Gunakan sampo bebas sulfat dan silikon berstandar trikologi.',
        'Jaga asupan zat besi, seng, dan biotin harian.'
      ],
      dontList: [
        'Hindari pewarnaan rambut, bleaching, atau pengeritingan kimiawi selama minimal 10 hari.',
        'Hindari mengikat rambut terlalu kencang (gaya ponytail tegang).',
        'Jangan menggunakan produk styling berbahan alkohol tinggi seperti hairspray kaku.'
      ],
      recommendedProductId: 'prod-scalp-tonic'
    }
  ];

  const filteredProtocols = aftercareProtocols.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div id="aftercare-guide-page" className="bg-[#F7F4EF] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Protokol Pemulihan Medis</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Panduan Perawatan Pasca-Ritual
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Hasil estetika klinis tertinggi bergantung pada pemeliharaan 72 jam pertama. Ikuti instruksi para dokter dermatologi dan master facialist Titis untuk memastikan regenerasi kolagen optimal tanpa efek samping.
          </p>
        </div>

        {/* Emergency Callout Card */}
        <div className="mb-12 p-6 bg-[#252525] text-white border border-[#C4A47C]/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-[#C4A47C]/20 border border-[#C4A47C] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#C4A47C]" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl text-[#F7F4EF]">Layanan Konsultasi Medis 24/7 Pasca-Perawatan</h3>
              <p className="text-xs text-[#E8DDD3]/80 font-light mt-0.5">
                Jika Anda mengalami reaksi kulit yang tidak terduga atau membutuhkan klarifikasi protokol, tim medis kami siap mendampingi Anda kapan saja.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsConciergeOpen(true)}
            className="px-6 py-3 bg-[#E8DDD3] text-[#252525] hover:bg-white text-xs uppercase tracking-[0.2em] font-semibold whitespace-nowrap transition-colors flex items-center space-x-2"
          >
            <MessageSquare className="w-4 h-4 text-[#C4A47C]" />
            <span>Hubungi Dokter Jaga</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'Semua Protokol' },
            { id: 'buccal', label: 'Skulpting Buccal' },
            { id: 'exosome', label: 'Eksosom Seluler' },
            { id: 'cryo', label: 'Cryo-Hydro Luminositas' },
            { id: 'trichology', label: 'Trikologi Rambut' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#252525] text-white shadow-sm'
                  : 'bg-white border border-[#E8DDD3] text-[#252525] hover:border-[#9B8778]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Protocols Grid */}
        <div className="space-y-12">
          {filteredProtocols.map((proto) => {
            const product = PRODUCTS.find(p => p.id === proto.recommendedProductId);

            return (
              <div 
                key={proto.id}
                className="bg-white border border-[#E8DDD3] p-8 sm:p-10 shadow-sm space-y-8"
              >
                {/* Protocol Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8DDD3] gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="editorial-badge text-[#9B8778]">{proto.timeframe}</span>
                      <span className="text-xs text-[#9B8778]">• {proto.treatmentName}</span>
                    </div>
                    <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
                      {proto.title}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => setIsConciergeOpen(true)}
                      className="px-4 py-2 border border-[#252525] text-[#252525] text-[10px] uppercase tracking-widest font-semibold hover:bg-[#E8DDD3] transition-colors"
                    >
                      Tanya Terapis
                    </button>
                  </div>
                </div>

                {/* Golden Rules Box */}
                <div className="p-6 bg-[#F7F4EF] border-l-4 border-[#9B8778] space-y-3">
                  <div className="flex items-center space-x-2 text-[#252525]">
                    <Sparkles className="w-4 h-4 text-[#C4A47C]" />
                    <h4 className="text-xs uppercase tracking-widest font-bold">Aturan Emas Pemulihan (Golden Rules)</h4>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {proto.goldenRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-[#252525]/85 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#9B8778] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dos and Don'ts Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Do Column */}
                  <div className="p-6 bg-emerald-50/40 border border-emerald-200/60 space-y-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Sangat Disarankan (DO)</span>
                    </span>
                    <ul className="space-y-2.5 pt-1">
                      {proto.doList.map((item, idx) => (
                        <li key={idx} className="text-xs text-emerald-950 font-light flex items-start space-x-2">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don't Column */}
                  <div className="p-6 bg-amber-50/40 border border-amber-200/60 space-y-3">
                    <span className="text-xs uppercase tracking-widest font-bold text-amber-900 flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Wajib Dihindari (DON'T)</span>
                    </span>
                    <ul className="space-y-2.5 pt-1">
                      {proto.dontList.map((item, idx) => (
                        <li key={idx} className="text-xs text-amber-950 font-light flex items-start space-x-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Recommended Companion Product */}
                {product && (
                  <div className="pt-6 border-t border-[#E8DDD3] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded border border-[#E8DDD3]" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#9B8778] font-bold">Produk Preskripsi Pendukung</span>
                        <h4 className="font-serif-luxury text-lg text-[#252525] font-medium">{product.name}</h4>
                        <p className="text-[10px] text-[#9B8778]">{product.volume} • ${product.price}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        showToast(`Menambahkan ${product.name} ke Tas Belanja.`);
                      }}
                      className="px-5 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d3d3d] transition-colors flex items-center space-x-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C4A47C]" />
                      <span>Tambah Produk ke Tas</span>
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 p-8 sm:p-12 bg-white border border-[#E8DDD3] max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <span className="editorial-badge text-[#9B8778]">Pertanyaan Pasca-Ritual</span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#252525] font-light mt-1">
              Kapan Hasil Perawatan Terlihat Maksimal?
            </h3>
          </div>

          <div className="space-y-4 text-xs text-[#252525]/85 font-light leading-relaxed">
            <p>
              <strong>Hari 1:</strong> Efek pengencangan seketika dari relaksasi fasia dan hidrasi mendalam akan terlihat langsung saat Anda meninggalkan sanctuary.
            </p>
            <p>
              <strong>Hari 3 – 7:</strong> Matriks bio-eksosom dan peptide aktif mulai merangsang produksi neokolagen di lapisan dermis, memberikan tekstur kenyal dan pantulan cahaya porselen.
            </p>
            <p>
              <strong>Minggu ke-4:</strong> Siklus pergantian sel kulit baru selesai sempurna, menampakkan kepadatan dan kontur rahang yang terstruktur permanen.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
