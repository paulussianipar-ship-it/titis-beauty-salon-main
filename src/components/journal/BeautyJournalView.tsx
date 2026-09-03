import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JOURNAL_ARTICLES } from '../../data/mockData';
import { JournalArticle } from '../../types';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  User,
  Quote
} from 'lucide-react';

export const BeautyJournalView: React.FC = () => {
  const { selectedArticleId, setSelectedArticleId, openBookingWithTreatment, showToast } = useApp();

  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(
    selectedArticleId ? JOURNAL_ARTICLES.find(a => a.id === selectedArticleId) || null : null
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan artikel berhasil disalin.');
  };

  if (activeArticle) {
    return (
      <div id="journal-article-detail" className="bg-[#F7F4EF] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <button
            onClick={() => {
              setActiveArticle(null);
              setSelectedArticleId(null);
            }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-[#252525] hover:text-[#9B8778] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Indeks Editorial</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <span className="editorial-badge text-[#9B8778]">{activeArticle.category}</span>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#252525] font-light leading-tight">
              {activeArticle.title}
            </h1>
            <p className="text-sm font-medium text-[#9B8778]">{activeArticle.subtitle}</p>

            <div className="flex items-center justify-between pt-4 border-t border-[#E8DDD3] text-xs text-[#9B8778]">
              <div className="flex items-center space-x-3">
                <img src={activeArticle.author.avatar} alt={activeArticle.author.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <span className="font-semibold text-[#252525] block">{activeArticle.author.name}</span>
                  <span className="text-[10px]">{activeArticle.author.role} • {activeArticle.publishDate}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeArticle.readTime}</span>
                </span>
                <button onClick={handleShare} className="p-2 border border-[#E8DDD3] hover:border-[#252525] rounded" title="Bagikan Artikel">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[16/9] overflow-hidden rounded shadow-lg">
            <img src={activeArticle.heroImage} alt={activeArticle.title} className="w-full h-full object-cover" />
          </div>

          {/* Body Content */}
          <div className="bg-white border border-[#E8DDD3] p-8 sm:p-12 prose prose-stone max-w-none text-sm text-[#252525]/85 font-light leading-relaxed space-y-6">
            <p className="text-base text-[#252525] font-serif-luxury italic border-l-2 border-[#9B8778] pl-4">
              "{activeArticle.excerpt}"
            </p>
            
            <p className="font-normal text-[#252525]">{activeArticle.content.leadParagraph}</p>

            {activeArticle.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2 pt-2">
                <h3 className="font-serif-luxury text-xl font-medium text-[#252525]">{sec.heading}</h3>
                <p>{sec.body}</p>
              </div>
            ))}

            <div className="p-6 bg-[#F7F4EF] border border-[#E8DDD3] my-6 space-y-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#9B8778] block">Rekomendasi Praktisi</span>
              <p className="text-xs text-[#252525]">
                Untuk merasakan langsung translasi klinis dari prinsip anatomis ini, kami menyarankan untuk menjadwalkan konsultasi di klinik sanctuary flagship kami.
              </p>
              <button
                onClick={() => openBookingWithTreatment()}
                className="px-5 py-2 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#3d3d3d]"
              >
                Reservasi Sesi Sekarang
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div id="journal-index-page" className="bg-[#F7F4EF] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="editorial-badge text-[#9B8778]">Jurnal Arsitektur Kecantikan</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#252525] font-light mt-2 tracking-tight">
            Jurnal VÉRE
          </h1>
          <p className="text-xs sm:text-sm text-[#252525]/80 font-light mt-4 leading-relaxed">
            Esai mendalam seputar osteopati fasia wajah, pensinyalan bio-eksosom botanika, drainase limfatik, dan filosofi estetika restoratif seluler.
          </p>
        </div>

        {/* Featured First Article */}
        {JOURNAL_ARTICLES.length > 0 && (
          <div 
            onClick={() => setActiveArticle(JOURNAL_ARTICLES[0])}
            className="bg-white border border-[#E8DDD3] overflow-hidden mb-16 cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden">
                <img 
                  src={JOURNAL_ARTICLES[0].heroImage} 
                  alt={JOURNAL_ARTICLES[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="editorial-badge text-[#9B8778]">{JOURNAL_ARTICLES[0].category}</span>
                  <h2 className="font-serif-luxury text-2xl sm:text-4xl text-[#252525] font-light group-hover:text-[#9B8778] transition-colors leading-tight">
                    {JOURNAL_ARTICLES[0].title}
                  </h2>
                  <p className="text-xs text-[#252525]/75 font-light leading-relaxed">
                    {JOURNAL_ARTICLES[0].excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DDD3] flex items-center justify-between text-xs text-[#9B8778]">
                  <div className="flex items-center space-x-2">
                    <img src={JOURNAL_ARTICLES[0].author.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span>{JOURNAL_ARTICLES[0].author.name}</span>
                  </div>
                  <span>{JOURNAL_ARTICLES[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <div 
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="bg-white border border-[#E8DDD3] overflow-hidden flex flex-col justify-between cursor-pointer group hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={article.heroImage} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#9B8778] font-bold">{article.category}</span>
                  <h3 className="font-serif-luxury text-xl font-medium text-[#252525] group-hover:text-[#9B8778] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#252525]/75 font-light line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-[#E8DDD3] flex items-center justify-between text-[11px] text-[#9B8778]">
                  <span>{article.author.name.split(' ')[0]} • {article.publishDate}</span>
                  <span className="flex items-center space-x-1 text-[#252525] font-medium group-hover:translate-x-1 transition-transform">
                    <span>Baca</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
