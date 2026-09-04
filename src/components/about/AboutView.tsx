// @ts-nocheck
export const AboutView = () => (
  <section id="about-page" className="min-h-screen bg-[#F7F4EF] px-6 py-20 sm:px-10 lg:px-16">
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9B8778]">Tentang TITIS</span>
        <h1 className="mt-4 font-serif-luxury text-5xl font-light leading-tight text-[#252525] sm:text-7xl">Ritual kecantikan yang terasa personal.</h1>
        <p className="mt-7 max-w-xl text-sm leading-8 text-[#252525]/75">
          TITIS memadukan keahlian perawatan wajah, sentuhan terapis yang penuh perhatian, dan suasana tenang untuk membantu setiap tamu merawat kulitnya dengan lebih sadar.
        </p>
      </div>
      <div className="overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
        <img
          src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85"
          alt="Ritual perawatan wajah di TITIS"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
);