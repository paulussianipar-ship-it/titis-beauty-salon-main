import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TREATMENTS } from '../../data/mockData';
import { TreatmentCategory, SkinConcern, SkinType } from '../../types';
import { 
  Search, 
  Filter, 
  Clock, 
  Star, 
  Sparkles, 
  Heart, 
  ArrowUpDown, 
  Check, 
  X,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const TreatmentExplorer: React.FC = () => {
  const { 
    setSelectedTreatmentId, 
    setActivePage, 
    openBookingWithTreatment,
    selectedCategory,
    setSelectedCategory,
    customer,
    toggleFavoriteTreatment,
    setIsBeautyFinderOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | 'all'>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(800);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'duration'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories: { key: TreatmentCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'Semua Ritual' },
    { key: 'facial', label: 'Wajah (Facial)' },
    { key: 'skin', label: 'Regenerasi Kulit' },
    { key: 'body', label: 'Kontur Tubuh' },
    { key: 'hair', label: 'Trikologi Rambut' },
    { key: 'aesthetic', label: 'Estetika Klinis' },
  ];

  const concernsList: { id: SkinConcern | 'all'; label: string }[] = [
    { id: 'all', label: 'Semua Masalah Kulit' },
    { id: 'lifting-contour', label: 'Pengencangan & Kontur Wajah' },
    { id: 'anti-aging', label: 'Penuaan Dini & Kolagen' },
    { id: 'hydration', label: 'Hidrasi & Skin Barrier' },
    { id: 'glow-radiance', label: 'Kilau & Kecerahan Kaca' },
    { id: 'acne-texture', label: 'Pori-pori & Tekstur Kulit' },
    { id: 'pigmentation', label: 'Hiperpigmentasi & Noda Hitam' },
    { id: 'hair-density', label: 'Kepadatan Rambut & Kulit Kepala' },
  ];

  const skinTypesList: { id: SkinType | 'all'; label: string }[] = [
    { id: 'all', label: 'Semua Tipe Kulit' },
    { id: 'dry', label: 'Kering (Dry)' },
    { id: 'oily', label: 'Berminyak (Oily)' },
    { id: 'combination', label: 'Kombinasi' },
    { id: 'sensitive', label: 'Sensitif & Reaktif' },
    { id: 'mature', label: 'Matang (Mature)' },
    { id: 'normal', label: 'Normal' },
  ];

  // Filtering Logic
  const filteredTreatments = useMemo(() => {
    return TREATMENTS.filter((t) => {
      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(query);
        const matchesSubtitle = t.subtitle.toLowerCase().includes(query);
        const matchesDesc = t.description.toLowerCase().includes(query);
        if (!matchesName && !matchesSubtitle && !matchesDesc) return false;
      }
      // Concern filter
      if (selectedConcern !== 'all' && !t.skinConcerns.includes(selectedConcern)) {
        return false;
      }
      // Skin type filter
      if (selectedSkinType !== 'all' && !t.skinTypes.includes(selectedSkinType)) {
        return false;
      }
      // Price filter
      if (t.price > maxPrice) {
        return false;
      }
      // Duration filter
      if (selectedDuration === 'under-60' && t.durationMinutes > 60) return false;
      if (selectedDuration === '60-75' && (t.durationMinutes < 60 || t.durationMinutes > 75)) return false;
      if (selectedDuration === '90-plus' && t.durationMinutes < 90) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, selectedConcern, selectedSkinType, maxPrice, selectedDuration, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedConcern('all');
    setSelectedSkinType('all');
    setMaxPrice(800);
    setSelectedDuration('all');
    setSortBy('featured');
  };

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedConcern !== 'all' ? 1 : 0) +
    (selectedSkinType !== 'all' ? 1 : 0) +
    (selectedDuration !== 'all' ? 1 : 0) +
    (maxPrice < 800 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div id="treatment-explorer-page" className="bg-[#F7F4EF] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="editorial-badge text-[#9B8778]">Indeks Ritual Klinis</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Katalog Ritual Perawatan
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Setiap sesi dirancang dengan koreografi khusus antara teknik fasia osteopati, bio-pensinyalan eksosom Swiss murni, dan lipid botanika berstandar medis farmasi.
          </p>

          <div className="mt-6 inline-flex items-center space-x-3">
            <button
              onClick={() => setIsBeautyFinderOpen(true)}
              className="px-5 py-2.5 bg-[#E8DDD3] text-[#252525] hover:bg-[#252525] hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold flex items-center space-x-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C4A47C]" />
              <span>Bingung Memilih? Coba Tes Diagnostik AI</span>
            </button>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-300 ${
                selectedCategory === cat.key
                  ? 'bg-[#252525] text-white shadow-sm'
                  : 'bg-white border border-[#E8DDD3] text-[#252525] hover:border-[#9B8778]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Quick Controls Bar */}
        <div className="bg-white border border-[#E8DDD3] p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8778]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ritual, eksosom, fokus masalah..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9B8778] hover:text-[#252525]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Selects */}
          <div className="flex items-center flex-wrap gap-3 w-full md:w-auto justify-end">
            
            {/* Concern Filter */}
            <select
              value={selectedConcern}
              onChange={(e) => setSelectedConcern(e.target.value as any)}
              className="px-3 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
            >
              {concernsList.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
            >
              <option value="featured">Paling Direkomendasikan</option>
              <option value="price-asc">Biaya: Rendah ke Tinggi</option>
              <option value="price-desc">Biaya: Tinggi ke Rendah</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="duration">Durasi Tersingkat</option>
            </select>

            {/* Filter Drawer Toggle */}
            <button
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className={`px-3.5 py-2 border text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 transition-colors ${
                isFilterDrawerOpen || activeFiltersCount > 0
                  ? 'border-[#252525] bg-[#252525] text-white'
                  : 'border-[#E8DDD3] bg-[#F7F4EF] text-[#252525] hover:border-[#9B8778]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Detail</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 w-4 h-4 bg-[#C4A47C] text-[#252525] rounded-full text-[9px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#9B8778] hover:text-[#252525] underline ml-2"
              >
                Reset Filter
              </button>
            )}

          </div>
        </div>

        {/* Expandable Advanced Filter Panel */}
        {isFilterDrawerOpen && (
          <div className="p-6 bg-white border border-[#E8DDD3] mb-8 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8DDD3] pb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-[#252525]">Filter Lanjutan</span>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="text-[#9B8778] hover:text-[#252525]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Skin Type Filter */}
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-2">
                  Kondisi / Tipe Kulit
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {skinTypesList.map(st => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedSkinType(st.id)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        selectedSkinType === st.id
                          ? 'border-[#252525] bg-[#252525] text-white'
                          : 'border-[#E8DDD3] bg-[#F7F4EF] text-[#252525] hover:border-[#9B8778]'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#9B8778] block mb-2">
                  Durasi Sesi
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'all', label: 'Semua Durasi' },
                    { id: 'under-60', label: '≤ 60 Menit' },
                    { id: '60-75', label: '60 – 75 Menit' },
                    { id: '90-plus', label: '90+ Menit' }
                  ].map(dur => (
                    <button
                      key={dur.id}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                        selectedDuration === dur.id
                          ? 'border-[#252525] bg-[#252525] text-white'
                          : 'border-[#E8DDD3] bg-[#F7F4EF] text-[#252525] hover:border-[#9B8778]'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#9B8778]">
                    Batas Biaya Maksimal
                  </label>
                  <span className="text-xs font-semibold text-[#252525]">${maxPrice}</span>
                </div>
                <input 
                  type="range"
                  min={250}
                  max={800}
                  step={25}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#252525]"
                />
                <div className="flex justify-between text-[10px] text-[#9B8778] mt-1">
                  <span>$250</span>
                  <span>$800+</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#9B8778]">
          <span>Menampilkan {filteredTreatments.length} ritual perawatan</span>
          {activeFiltersCount > 0 && (
            <span>Tersaring berdasarkan kriteria aktif</span>
          )}
        </div>

        {/* Treatment Grid */}
        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map((treatment) => {
              const isFav = customer.favoriteTreatmentIds.includes(treatment.id);
              return (
                <div
                  key={treatment.id}
                  className="bg-white border border-[#E8DDD3] overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-500"
                >
                  <div>
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img 
                        src={treatment.image} 
                        alt={treatment.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 bg-[#252525]/90 backdrop-blur-sm text-white text-[9px] uppercase tracking-widest font-semibold">
                          {treatment.category}
                        </span>
                        {treatment.isSignature && (
                          <span className="px-2.5 py-1 bg-[#C4A47C] text-[#252525] text-[9px] uppercase tracking-widest font-bold">
                            Signature
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleFavoriteTreatment(treatment.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#252525] hover:text-red-600 transition-colors"
                        title={isFav ? 'Hapus favorit' : 'Simpan favorit'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-red-600 text-red-600' : ''}`} />
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-[11px] text-[#9B8778] tracking-wider uppercase font-semibold">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{treatment.durationMinutes} Menit</span>
                        </span>
                        <span className="flex items-center space-x-1 text-[#252525]">
                          <Star className="w-3 h-3 fill-[#C4A47C] text-[#C4A47C]" />
                          <span>{treatment.rating} ({treatment.reviewCount})</span>
                        </span>
                      </div>

                      <div>
                        <h3 
                          onClick={() => {
                            setSelectedTreatmentId(treatment.id);
                            setActivePage('treatment-detail');
                          }}
                          className="font-serif-luxury text-2xl font-medium text-[#252525] hover:text-[#9B8778] transition-colors cursor-pointer leading-snug"
                        >
                          {treatment.name}
                        </h3>
                        <p className="text-[11px] text-[#9B8778] font-medium tracking-wide mt-1">
                          {treatment.subtitle}
                        </p>
                      </div>

                      <p className="text-xs text-[#252525]/75 font-light line-clamp-3 leading-relaxed">
                        {treatment.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {treatment.suitableFor.slice(0, 2).map((item, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 bg-[#F7F4EF] border border-[#E8DDD3] text-[#252525] tracking-wide">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-[#E8DDD3] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#9B8778] uppercase tracking-wider block">Biaya Investasi</span>
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
                          className="px-3.5 py-2 border border-[#9B8778]/60 text-[#252525] hover:bg-[#E8DDD3] text-[10px] tracking-widest uppercase font-semibold transition-colors"
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
        ) : (
          <div className="text-center py-20 bg-white border border-[#E8DDD3] space-y-4">
            <p className="font-serif-luxury text-2xl text-[#252525]">Tidak ada ritual yang cocok dengan filter yang dipilih.</p>
            <p className="text-xs text-[#9B8778]">Coba sesuaikan batas biaya atau parameter masalah kulit Anda.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
