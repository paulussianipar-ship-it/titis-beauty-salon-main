import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';
import { 
  ShoppingBag, 
  Star, 
  Sparkles, 
  Search, 
  Check, 
  Filter, 
  Heart,
  ArrowRight,
  ShieldCheck,
  Leaf
} from 'lucide-react';

export const BeautyShopView: React.FC = () => {
  const { addToCart, setIsCartOpen, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Produk Apotek' },
    { id: 'skincare', label: 'Serum & Bio-Eksosom' },
    { id: 'bodycare', label: 'Eliksir Tubuh & Skin Barrier' },
    { id: 'haircare', label: 'Tonik Trikologi Kulit Kepala' },
    { id: 'devices', label: 'Alat Skulpting & Batu Gua Sha' },
    { id: 'aftercare', label: 'Pemulihan Pasca-Ritual' },
  ];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.subtitle.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div id="beauty-shop-page" className="bg-[#F7F4EF] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Apotek Klinis Titis</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Formulasi Botanika & Bio-Eksosom
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Bio-fermentasi eksosom tumbuhan murni, ceramide multi-molekul, dan lipid botanika berstandar farmasi Jenewa, diracik dalam batch terbatas untuk memperpanjang hasil ritual klinis Anda.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#252525] text-white shadow-sm'
                  : 'bg-white border border-[#E8DDD3] text-[#252525] hover:border-[#9B8778]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-[#E8DDD3] p-4 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8778]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari formulasi, bahan aktif..."
              className="w-full pl-9 pr-4 py-2 bg-[#F7F4EF] border border-[#E8DDD3] text-xs text-[#252525] focus:outline-none focus:border-[#252525]"
            />
          </div>
          <span className="text-xs text-[#9B8778]">Menampilkan {filteredProducts.length} formulasi apotek</span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-[#E8DDD3] overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-[#F7F4EF]">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {prod.isBestSeller && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#252525] text-white text-[9px] uppercase tracking-widest font-bold">
                      Ikon Apotek
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#9B8778] uppercase tracking-wider font-semibold">{prod.volume}</span>
                    <div className="flex items-center space-x-1 text-[#C4A47C]">
                      <Star className="w-3.5 h-3.5 fill-[#C4A47C]" />
                      <span className="text-xs font-bold text-[#252525]">{prod.rating}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => setSelectedProduct(prod)}
                    className="font-serif-luxury text-xl font-medium text-[#252525] hover:text-[#9B8778] cursor-pointer"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-[11px] text-[#9B8778]">{prod.subtitle}</p>

                  <p className="text-xs text-[#252525]/75 font-light line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Key Actives */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {prod.keyIngredients.slice(0, 2).map((ing, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 bg-[#F7F4EF] text-[#252525] border border-[#E8DDD3]">
                        {typeof ing === 'string' ? ing : ing.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#E8DDD3] flex items-center justify-between">
                  <span className="font-serif-luxury text-2xl font-bold text-[#252525]">${prod.price}</span>
                  <button
                    onClick={() => {
                      addToCart(prod);
                      showToast(`Menambahkan ${prod.name} ke Tas Belanja.`);
                    }}
                    className="px-4 py-2.5 bg-[#252525] text-white hover:bg-[#3d3d3d] text-xs uppercase tracking-[0.16em] font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C4A47C]" />
                    <span>+ Tas Belanja</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-[#252525]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#F7F4EF] max-w-2xl w-full border border-[#E8DDD3] p-8 shadow-2xl relative space-y-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-[#252525] hover:text-[#9B8778]"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full aspect-square object-cover rounded" />
                <div className="space-y-3">
                  <span className="editorial-badge text-[#9B8778]">{selectedProduct.category}</span>
                  <h3 className="font-serif-luxury text-2xl text-[#252525]">{selectedProduct.name}</h3>
                  <p className="text-xs text-[#9B8778]">{selectedProduct.volume}</p>
                  <p className="font-serif-luxury text-3xl font-bold text-[#252525]">${selectedProduct.price}</p>
                  <p className="text-xs text-[#252525]/80 font-light leading-relaxed">{selectedProduct.description}</p>
                  
                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-[#9B8778] block mb-1">Bahan Aktif Utama</span>
                    <p className="text-xs text-[#252525]">
                      {selectedProduct.keyIngredients.map(k => typeof k === 'string' ? k : `${k.name} (${k.benefit})`).join(' • ')}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                        showToast(`Menambahkan ${selectedProduct.name} ke Tas Belanja.`);
                      }}
                      className="w-full py-3 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d3d3d]"
                    >
                      Tambah ke Tas Belanja • ${selectedProduct.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
