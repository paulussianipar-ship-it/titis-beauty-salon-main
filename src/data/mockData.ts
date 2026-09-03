import { 
  Treatment, 
  BeautyExpert, 
  ClinicLocation, 
  Product, 
  JournalArticle, 
  MembershipTierDetail, 
  CustomerProfile, 
  AddOnOption,
  Review
} from '../types';

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'loc-menteng',
    name: 'Atelier Menteng Sanctuary',
    city: 'Jakarta Pusat',
    country: 'Indonesia',
    address: 'Jl. Teuku Umar No. 28, Menteng',
    district: 'Menteng Heritage District',
    phone: '+62 21 3912 8800',
    email: 'menteng@vereritual.com',
    hours: 'Senin – Sabtu: 09:00 – 20:00 WIB | Minggu: 10:00 – 18:00 WIB',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
    suitesCount: 8,
    vipLounge: true,
    parking: 'Layanan Valet Privat Gratis',
    features: ['Suite Penthouse VIP Kedap Suara', 'Kamar Oksigen Hiperbarik', 'Paviliun Teh Pasca-Ritual', 'Konsultasi Kulit 3D Visia AI']
  },
  {
    id: 'loc-beverly-hills',
    name: 'Beverly Hills Sanctuary',
    city: 'Los Angeles',
    country: 'Amerika Serikat',
    address: '468 N Rodeo Drive, Lantai 3 Penthouse',
    district: 'Golden Triangle',
    phone: '+1 (310) 892-4400',
    email: 'beverlyhills@vereritual.com',
    hours: 'Senin – Sabtu: 09:00 – 20:00 | Minggu: 10:00 – 18:00',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    suitesCount: 8,
    vipLounge: true,
    parking: 'Layanan Valet Privat Tersedia',
    features: ['Suite Penthouse VIP', 'Ruang Krioterapik', 'Bar Oksigen Medis', 'Paviliun Teh Herbal Botanika']
  },
  {
    id: 'loc-paris',
    name: 'Place Vendôme Suite',
    city: 'Paris',
    country: 'Prancis',
    address: '15 Place Vendôme, 1er Arrondissement',
    district: 'Vendôme',
    phone: '+33 1 42 68 55 00',
    email: 'paris@vereritual.com',
    hours: 'Selasa – Sabtu: 09:30 – 19:30 | Senin: Tutup',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
    suitesCount: 5,
    vipLounge: true,
    parking: 'Halaman Courtyard Privat',
    features: ['Haute French Facial Artistry', 'Lounge Teh & Sampanye', 'Bar Parfum Kustom']
  },
  {
    id: 'loc-mayfair',
    name: 'Mayfair House & Spa',
    city: 'London',
    country: 'Inggris',
    address: '22 Berkeley Square, Mayfair',
    district: 'West End',
    phone: '+44 20 7946 0912',
    email: 'mayfair@vereritual.com',
    hours: 'Senin – Sabtu: 09:00 – 19:30 | Minggu: 11:00 – 17:00',
    image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=85',
    suitesCount: 7,
    vipLounge: true,
    parking: 'Drop-off Concierge Khusus',
    features: ['Taman Courtyard Botanika', 'Suite Akustik Anti-Bising', 'Suite Hydro-Jet Medis']
  }
];

export const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: 'addon-led-matrix',
    name: 'Terapi Matriks LED Standar Medis',
    tagline: 'Stimulasi gelombang ganda merah & inframerah-dekat untuk mempercepat sintesis kolagen.',
    price: 65,
    durationMin: 15,
    category: 'Infusi & Cahaya',
    image: 'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'addon-cold-plasma',
    name: 'Peremajaan Kontur Mata & Bibir Cold-Plasma',
    tagline: 'Gelombang ozon termikronisasi mengencangkan area periorbital & perioral seketika.',
    price: 95,
    durationMin: 20,
    category: 'Lifting Terarah'
  },
  {
    id: 'addon-24k-gold',
    name: 'Topeng Peptida Emas Murni 24K',
    tagline: 'Masker bio-selulosa kaya elektrolit dengan serpihan emas 24 karat untuk kilau mewah.',
    price: 85,
    durationMin: 15,
    category: 'Nutrisi Seluler'
  },
  {
    id: 'addon-buccal',
    name: 'Pijat Sculptural Buccal Intra-Oral Tambahan',
    tagline: 'Pelepasan fasia mendalam untuk memahat tulang pipi dan meredakan ketegangan rahang.',
    price: 110,
    durationMin: 25,
    category: 'Pahatan Manual'
  },
  {
    id: 'addon-lymphatic-boots',
    name: 'Terapi Kompresi Dinamis Seluruh Tubuh',
    tagline: 'Ruang tekanan pneumatik bertahap untuk detoksifikasi dan melancarkan sirkulasi saat beristirahat.',
    price: 70,
    durationMin: 30,
    category: 'Pemulihan Tubuh'
  },
  {
    id: 'addon-stemcell-mist',
    name: 'Kabut Oksigen Hiperbarik Eksosom Tumbuhan',
    tagline: 'Oksigen murni 98% menghantarkan sel induk eksosom tumbuhan jauh ke dalam lapisan dermis.',
    price: 90,
    durationMin: 15,
    category: 'Infusi Seluler'
  }
];

export const TREATMENTS: Treatment[] = [
  {
    id: 'trt-sculptural-buccal',
    slug: 'sculptural-buccal-facelift',
    name: 'Arsitektur Wajah & Pijat Sculptural Buccal',
    subtitle: 'Rekonstruksi Fasia Mendalam & Kontur Non-Invasif',
    tagline: 'Ritual pemahatan manual khas VÉRE yang mempertegas tulang pipi dan melemaskan ketegangan miofasial.',
    category: 'facial',
    durationMinutes: 90,
    price: 420,
    originalPrice: 480,
    description: 'Ritual wajah osteopatik transformatif yang memadukan drainase limfatik eksternal dengan pemodelan buccal intra-oral dari dalam rongga mulut untuk efek lifting arsitektural tanpa tandingan.',
    longDescription: 'Dirancang khusus bagi Anda yang mendambakan kontur wajah tegas tanpa jarum ataupun waktu pemulihan (downtime). Para Master Aesthetician kami memadukan manipulasi intra-oral presisi, pelepasan kranial-sakral, dan stimulasi neuromuskular mikro untuk melatih kembali otot wajah, mengalirkan cairan limfatik yang tersumbat, dan mempertegas garis rahang.',
    benefits: [
      'Penegasan nyata pada garis rahang, area pipi, dan tulang zygomatik',
      'Pelepasan instan pada ketegangan rahang (TMJ) dan otot leher',
      'Peningkatan sirkulasi mikro dan biosintesis kolagen alami',
      'Tanpa rasa sakit & tanpa downtime — hasil instan siap karpet merah'
    ],
    suitableFor: [
      'Penurunan elastisitas atau hilangnya ketegasan kontur wajah',
      'Wajah sembap dan retensi cairan di area rahang dan mata',
      'Tingkat stres tinggi dengan kebiasaan menggemeretakkan gigi (bruxism/TMJ)',
      'Persiapan acara penting atau pemotretan eksklusif'
    ],
    steps: [
      {
        stepNumber: 1,
        phaseName: 'Inhalasi Aromaterapi & Pelepasan Kranial',
        durationMin: 15,
        description: 'Pernapasan diafragma terpandu dengan lavender Prancis organik dan kayu cedar hangat, disertai dekompresi sutura kranial lembut.',
        productsUsed: 'Eliksir Penenang Botanika VÉRE'
      },
      {
        stepNumber: 2,
        phaseName: 'Double Cleanse Enzimatik & Pembersihan Jalur Limfatik',
        durationMin: 20,
        description: 'Emulsifikasi minyak camellia hangat dilanjutkan eksfoliasi ultrasonik untuk membuka jalur penetrasi seluler.',
        productsUsed: 'Balsam Pembersih Restoratif VÉRE'
      },
      {
        stepNumber: 3,
        phaseName: 'Pemodelan Sculptural Buccal Intra-Oral',
        durationMin: 30,
        description: 'Pijat intra-oral bersarung tangan steril medis memanipulasi kelompok otot zygomaticus, masseter, dan orbicularis oris dari dalam rongga mulut.',
        productsUsed: 'Serum Luncur Peptida VÉRE'
      },
      {
        stepNumber: 4,
        phaseName: 'Penguncian Krioterapik & Lipid Pelindung Barier',
        durationMin: 25,
        description: 'Cryo-globe baja bedah bersuhu -4°C untuk mengunci bio-peptida aktif dan mempertahankan kontur pahatan wajah.',
        productsUsed: 'Krim Barier Seluler VÉRE'
      }
    ],
    skinConcerns: ['anti-aging', 'lifting-contour', 'glow-radiance'],
    skinTypes: ['combination', 'dry', 'mature', 'normal', 'sensitive'],
    intensity: 'Targeted Clinical',
    downtime: 'Zero Downtime',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
      label: 'Definisi Rahang & Pipi Segera Pasca-Perawatan',
      timeframe: 'Hasil 1 Sesi (90 Menit)'
    },
    rating: 4.98,
    reviewCount: 142,
    isFeatured: true,
    isBestseller: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=85'
    ],
    recommendedHomecareIds: ['prod-sculpt-elixir', 'prod-barrier-cream', 'prod-gua-sha'],
    faqs: [
      {
        question: 'Apakah pijatan buccal intra-oral terasa sakit?',
        answer: 'Sama sekali tidak. Walaupun Anda akan merasakan sensasi pelepasan miofasial yang mendalam pada otot pengunyah (masseter), terapis ahli kami terus menyesuaikan tekanan untuk memastikan pengalaman yang sangat relaks dan nyaman.'
      },
      {
        question: 'Berapa lama hasil pemahatan wajah ini bertahan?',
        answer: 'Efek pengencangan instan dan drainase limfatik bertahan 7 hingga 10 hari setelah satu sesi. Untuk pembentukan kontur jangka panjang, kami merekomendasikan rangkaian 4 sesi dengan interval dua minggu.'
      },
      {
        question: 'Bolehkah saya langsung memakai riasan (make-up)?',
        answer: 'Kami menyarankan agar ceramide lipid yang meresap dibiarkan menyerap sempurna setidaknya 4 jam. Namun, kulit Anda akan langsung memancarkan kilau bercahaya alami yang siap untuk acara malam apa pun.'
      }
    ]
  },
  {
    id: 'trt-cellular-exosome',
    slug: 'cellular-exosome-infusion',
    name: 'Regenerasi Seluler Matriks Eksosom 5B & Bio-Peptida',
    subtitle: 'Estetika Regeneratif Generasi Terbaru',
    tagline: '5 miliar eksosom tumbuhan bio-sintetik dihantarkan ke lapisan epidermal untuk pembaruan sel tanpa preseden.',
    category: 'skin',
    durationMinutes: 75,
    price: 550,
    description: 'Perawatan wajah regeneratif mutakhir yang memanfaatkan nanoneedling klinis tanpa rasa sakit dan eksosom tumbuhan murni untuk merangsang kolagen alami, memperbaiki tekstur kulit, dan memulihkan kerusakan akibat sinar UV.',
    longDescription: 'Diformulasikan untuk pemulihan kulit intensif, ritual ini menginfus 5 miliar faktor pertumbuhan biomimetik, polimer asam hialuronat murni, dan peptida multi-molekul langsung ke pusat perbaikan seluler kulit.',
    benefits: [
      'Menyamarkan garis halus, pori-pori besar, dan warna kulit tidak merata',
      'Peningkatan dramatis retensi kelembapan kulit sebesar 42% dalam 48 jam',
      'Memperkuat barier kulit yang sensitif atau rusak serta meredakan kemerahan',
      'Mempercepat pergantian sel baru tanpa trauma kimia agresif'
    ],
    suitableFor: [
      'Kulit kusam, lelah, atau dehidrasi kronis',
      'Tanda awal penuaan dan penurunan elastisitas',
      'Kulit stres akibat polusi perkotaan atau pasca-perjalanan jauh',
      'Tekstur kasar dan pori-pori tersumbat'
    ],
    steps: [
      {
        stepNumber: 1,
        phaseName: 'Pembersihan Kavitasi Ultrasonik Pori Mendalam',
        durationMin: 15,
        description: 'Gelombang akustik mikro membersihkan kotoran dan sebum pori secara menyeluruh tanpa pemencetan manual yang menyakitkan.',
        productsUsed: 'Larutan Enzim Penjernih VÉRE'
      },
      {
        stepNumber: 2,
        phaseName: 'Infusi Nano-Channeling Tanpa Rasa Sakit',
        durationMin: 30,
        description: 'Ujung mikro silikon medis membuka 200.000 jalur mikroskopis per menit untuk menyalurkan konsentrat eksosom aktif.',
        productsUsed: 'Bio-Serum Eksosom Murni 5B VÉRE'
      },
      {
        stepNumber: 3,
        phaseName: 'Terapi Oksigen Hiperbarik 98% Murni',
        durationMin: 15,
        description: 'Aliran oksigen murni bertekanan yang diperkaya polifenol teh hijau dan peptida tembaga untuk oksigenasi sel.',
        productsUsed: 'Kabut Oksigen Pembaharu VÉRE'
      },
      {
        stepNumber: 4,
        phaseName: 'Penyegelan Sejuk Cryo-Elektroporasi',
        durationMin: 15,
        description: 'Arus mikro berdenyut sub-nol untuk mengunci peptida ke dalam matriks kulit sekaligus menenangkan kulit seketika.',
        productsUsed: 'Tirai Perbaikan Ceramide VÉRE'
      }
    ],
    skinConcerns: ['anti-aging', 'hydration', 'pore-refining', 'glow-radiance'],
    skinTypes: ['dry', 'combination', 'mature', 'sensitive', 'normal'],
    intensity: 'Targeted Clinical',
    downtime: '2-4 Hours Mild Glow',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      label: 'Kepadatan & Luminositas Kulit Hari ke-3',
      timeframe: 'Hasil Evaluasi 1 Sesi'
    },
    rating: 4.96,
    reviewCount: 98,
    isFeatured: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85'
    ],
    recommendedHomecareIds: ['prod-exosome-serum', 'prod-barrier-cream'],
    faqs: [
      {
        question: 'Dari mana asal eksosom yang digunakan?',
        answer: 'VÉRE menggunakan 100% eksosom tumbuhan terbio-fermentasi murni yang dikembangkan di laboratorium Swiss, bebas dari turunan biologis manusia maupun hewani.'
      },
      {
        question: 'Apakah wajah akan memerah setelah perawatan?',
        answer: 'Metode nano-infusi kami tidak melukai pembuluh darah. Sebagian besar klien hanya merasakan rona segar seperti sehabis berolahraga yang akan berubah menjadi kilau kaca (glass-skin) dalam 2 hingga 3 jam.'
      }
    ]
  },
  {
    id: 'trt-cryo-hydro-glow',
    slug: 'cryo-hydro-luminosity-facial',
    name: 'Luminositas Cryo-Hydro & Detoks Limfatik',
    subtitle: 'Detoks Vortex Pori & Penegasan Sub-Zero',
    tagline: 'Pembersihan vortex spiral dengan asam laktat bio-fermentasi dipadukan pengencangan cryo-toning nitrogen dingin.',
    category: 'facial',
    durationMinutes: 60,
    price: 310,
    originalPrice: 350,
    description: 'Penyegaran kulit mewah paling definitif. Mengangkat komedo, melarutkan penumpukan keratin mati, dan membanjiri sel dengan niacinamide serta asam hialuronat tiga bobot molekul.',
    longDescription: 'Perpaduan harmonis antara aqua-peeling pusaran presisi tinggi, penyeimbangan pH kustom, dan kabut nutrisi aktif dingin. Dirancang untuk mengembalikan kejernihan, transparansi, dan kekenyalan pada kulit perkotaan.',
    benefits: [
      'Ekstraksi komedo dan sebum lembut tanpa rasa sakit dan tanpa kemerahan',
      'Kehalusan instan seperti porselen dengan pantulan cahaya maksimal',
      'Meringkas tampilan pori melalui kontras suhu dingin cryo',
      'Mempersiapkan kulit agar menyerap produk skincare rumah secara optimal'
    ],
    suitableFor: [
      'Pori-pori tersumbat, komedo hitam/putih, dan permukaan kulit kasar',
      'Kulit kusam sebelum pemotretan, pernikahan, atau acara besar',
      'Kulit berminyak atau kombinasi yang rentan kilap berlebih di siang hari'
    ],
    steps: [
      {
        stepNumber: 1,
        phaseName: 'Eksfoliasi Vortex Asam Laktat & Glukosamin',
        durationMin: 15,
        description: 'Ujung spiral hidrodinamik mengangkat korneosit mati dengan lembut sembari membasahi kulit dengan air mentimun menyejukkan.',
        productsUsed: 'Cairan Luminositas VÉRE I'
      },
      {
        stepNumber: 2,
        phaseName: 'Ekstraksi Asam Salisilat Area T-Zone',
        durationMin: 15,
        description: 'Vakum vortex terfokus membersihkan sumbatan sebum di hidung, dahi, dan dagu.',
        productsUsed: 'Cairan Penjernih VÉRE II'
      },
      {
        stepNumber: 3,
        phaseName: 'Pemahatan Wajah Krio Sub-Nol (Sub-Zero Glow)',
        durationMin: 15,
        description: 'Terapi termal dingin terkontrol untuk menenangkan kapiler darah dan mengencangkan jaringan kulit.',
        productsUsed: 'Konsentrat Laut Asam Hialuronat VÉRE'
      },
      {
        stepNumber: 4,
        phaseName: 'Topeng Hidrasi Alga Elektrolit',
        durationMin: 15,
        description: 'Masker karet spirulina peel-off yang mengunci perlindungan antioksidan dan kelembapan mendalam.',
        productsUsed: 'Krim Barier Botanika VÉRE'
      }
    ],
    skinConcerns: ['hydration', 'pore-refining', 'acne-texture', 'glow-radiance'],
    skinTypes: ['oily', 'combination', 'normal', 'dry'],
    intensity: 'Gentle & Relaxing',
    downtime: 'Zero Downtime',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      label: 'Kejernihan Kulit Porselen Pasca-Vortex',
      timeframe: 'Hasil di Hari yang Sama'
    },
    rating: 4.94,
    reviewCount: 210,
    isFeatured: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85'
    ],
    recommendedHomecareIds: ['prod-clarifying-essence', 'prod-barrier-cream'],
    faqs: [
      {
        question: 'Apakah ini sama dengan hydrafacial biasa?',
        answer: 'VÉRE Cryo-Hydro menyempurnakan teknologi ini dengan formula nutrisi kelas medis yang diracik segar dan memadukan hisapan vortex spiral dengan cryo-toning -4°C untuk efek kencang seketika.'
      }
    ]
  },
  {
    id: 'trt-botanical-lymphatic-body',
    slug: 'botanical-lymphatic-body-contour',
    name: 'Detoks Limfatik & Pengilapan Tubuh Botanika Holistik',
    subtitle: 'Pahatan Fasia Seluruh Tubuh & Garam Laut Mati',
    tagline: 'Penyikatan tubuh kering (dry brushing), drainase limfatik manual, dan balutan vetiver hangat untuk membuang retensi cairan.',
    category: 'body',
    durationMinutes: 90,
    price: 380,
    description: 'Ritual menyegarkan yang dirancang untuk memahat kontur tubuh, melancarkan peredaran darah, dan membangkitkan metabolisme sel melalui ritme drainase lembut dan minyak aromaterapi murni.',
    longDescription: 'Dimulai dengan penyikatan bulu sutra alami untuk mengaktifkan kelenjar getah bening, tubuh Anda dipoles dengan kristal kuarsa dan mineral Laut Mati, dilanjutkan dengan pijatan drainase terarah pada tungkai, perut, dan lengan.',
    benefits: [
      'Meredakan rasa berat pada kaki dan akumulasi cairan tubuh',
      'Mengencangkan dan menghaluskan tekstur kulit paha dan pinggang',
      'Meningkatkan kualitas tidur melalui relaksasi sistem saraf parasimpatis',
      'Memperkaya kulit dengan ceramide nabati kaya omega 3, 6, dan 9'
    ],
    suitableFor: [
      'Retensi cairan dan kaki lelah pasca-penerbangan panjang',
      'Pengencangan dan penghalusan tubuh menjelang liburan',
      'Detoksifikasi tubuh dan pelepasan stres mendalam'
    ],
    steps: [
      {
        stepNumber: 1,
        phaseName: 'Aktivasi Limfatik Bulu Sutra Agave',
        durationMin: 20,
        description: 'Penyikatan tubuh kering sistematis mengikuti jalur kelenjar getah bening menuju muara limfa utama.',
        productsUsed: 'Sikat Tubuh Agave Alami VÉRE'
      },
      {
        stepNumber: 2,
        phaseName: 'Pengilapan Mineral Kuarsa & Garam Laut Hangat',
        durationMin: 25,
        description: 'Lulur eksfoliasi beraroma rosemary, juniper berry, dan minyak almond manis perasan dingin.',
        productsUsed: 'Glaze Tubuh Garam Laut Mati VÉRE'
      },
      {
        stepNumber: 3,
        phaseName: 'Pijatan Drainase Fasia Berirama',
        durationMin: 35,
        description: 'Gerakan sapuan jaringan dalam dan alat terapi kayu khusus untuk menggerakkan cairan interstitial.',
        productsUsed: 'Minyak Tubuh Pemahat Botanika VÉRE'
      },
      {
        stepNumber: 4,
        phaseName: 'Balutan Selimut Termal & Seduhan Teh Herbal',
        durationMin: 10,
        description: 'Penyelimutan inframerah hangat untuk menyerap omega nutrisi sambil menikmati seduhan teh detoks kembang sepatu.',
        productsUsed: 'Infusi Herbal Artisan VÉRE'
      }
    ],
    skinConcerns: ['lifting-contour', 'hydration', 'glow-radiance'],
    skinTypes: ['dry', 'normal', 'sensitive'],
    intensity: 'Gentle & Relaxing',
    downtime: 'Zero Downtime',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80',
      label: 'Pengurangan Sembap & Siluet Tubuh Lebih Ramping',
      timeframe: 'Segera Pasca-Sesi'
    },
    rating: 4.97,
    reviewCount: 84,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85'
    ],
    recommendedHomecareIds: ['prod-body-oil', 'prod-gua-sha'],
    faqs: [
      {
        question: 'Apakah perawatan ini membantu mengurangi tampilan selulit?',
        answer: 'Ya. Dengan menstimulasi drainase limfatik dan melepaskan fasia yang mengikat jaringan lemak, kulit tampak lebih rata, kencang, dan bercahaya.'
      }
    ]
  },
  {
    id: 'trt-trichology-scalp-reborn',
    slug: 'trichology-scalp-follicle-renewal',
    name: 'Trikologi & Regenerasi Folikel Rambut Mikro-Arus',
    subtitle: 'Kesehatan Kulit Kepala Klinis & Densitas Rambut',
    tagline: 'Detoksifikasi sebum folikular, terapi laser tingkat rendah (LLLT), dan infusi peptida tembaga untuk kesuburan rambut.',
    category: 'hair',
    durationMinutes: 75,
    price: 360,
    description: 'Program trikologi medis yang memulihkan ekosistem kulit kepala, menyeimbangkan mikrobioma, dan mengaktifkan kembali folikel rambut yang dorman melalui stimulasi fotonik dan bio-peptida.',
    longDescription: 'Kesehatan rambut yang lebat berakar dari kulit kepala yang subur. Ritual ini diawali diagnosis mikroskopis 200x, eksfoliasi asam salisilat lembut, infusi peptida folikular bertekanan oksigen murni, dan pemaparan cahaya monokromatik.',
    benefits: [
      'Pembersihan tumpukan sebum dan residu produk dari folikel rambut',
      'Pengurangan kerontokan dan stimulasi pertumbuhan rambut baru',
      'Meredakan gatal, ketombe, dan inflamasi kulit kepala seketika',
      'Meningkatkan volume dan kilau alami helai rambut dari akar'
    ],
    suitableFor: [
      'Penipisan rambut, kerontokan musiman, atau kebotakan dini',
      'Kulit kepala berminyak, berketombe, atau gatal',
      'Kulit kepala sensitif akibat pewarnaan atau penataan kimiawi'
    ],
    steps: [
      {
        stepNumber: 1,
        phaseName: 'Analisis Mikroskopi Trikologi 200x',
        durationMin: 15,
        description: 'Pemeriksaan densitas folikel dan ketebalan sebum secara digital di layar sebelum tindakan.',
        productsUsed: 'Pemindai Trikologi Presisi VÉRE'
      },
      {
        stepNumber: 2,
        phaseName: 'Eksfoliasi Keratolitik & Pijat Akupresur Leher',
        durationMin: 20,
        description: 'Aplikasi asam glikolat dan seng PCA diiringi pijatan titik meridian kranial untuk sirkulasi darah.',
        productsUsed: 'Eliksir Eksfoliasi Kulit Kepala VÉRE'
      },
      {
        stepNumber: 3,
        phaseName: 'Infusi Peptida Tembaga Mikro-Arus',
        durationMin: 25,
        description: 'Elektro-porasi tanpa jarum menyalurkan tripeptida tembaga (GHK-Cu) dan biotin langsung ke papila dermal folikel.',
        productsUsed: 'Serum Folikel Trikologi VÉRE'
      },
      {
        stepNumber: 4,
        phaseName: 'Terapi Laser Tingkat Rendah (LLLT 650nm)',
        durationMin: 15,
        description: 'Dioda laser dingin merangsang produksi ATP mitokondria di sel folikel rambut.',
        productsUsed: 'Perangkat Laser Trikologi Medis VÉRE'
      }
    ],
    skinConcerns: ['hair-density', 'anti-aging'],
    skinTypes: ['normal', 'oily', 'sensitive'],
    intensity: 'Targeted Clinical',
    downtime: 'Zero Downtime',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80',
      label: 'Kebersihan Muara Folikel & Kepadatan Rambut',
      timeframe: 'Evaluasi 4 Minggu'
    },
    rating: 4.95,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85'
    ],
    recommendedHomecareIds: ['prod-trichology-serum'],
    faqs: [
      {
        question: 'Apakah rambut saya harus basah saat datang?',
        answer: 'Tidak perlu. Ritual trikologi kami sudah mencakup pencucian dan pengeringan rambut mewah di suite privat Anda.'
      }
    ]
  },
  {
    id: 'trt-fractional-laser-glow',
    slug: 'fractional-photomedicine-resurfacing',
    name: 'Resurfacing Laser Pecahan Fotomedisin & Kolagen',
    subtitle: 'Terapi Cahaya Presisi Medis & Koreksi Pigmen',
    tagline: 'Panjang gelombang terkalibrasi menghapus hiperpigmentasi, melasma, dan merestrukturisasi kolagen dermal.',
    category: 'aesthetic',
    durationMinutes: 75,
    price: 680,
    description: 'Prosedur estetika medis dokter yang menargetkan pigmen membandel dan bekas luka jerawat sembari memicu pembentukan kolagen baru tipe I dan III secara masif.',
    longDescription: 'Dikelola langsung oleh Dokter Spesialis Dermatologi kami. Menggunakan teknologi laser pecahan non-ablatif dengan sistem pendingin kontak safir terintegrasi untuk kenyamanan maksimal dan hasil kulit mulus bebas noda.',
    benefits: [
      'Memudarkan bintik matahari, flek hitam, dan hiperpigmentasi pasca-inflamasi (PIH)',
      'Meratakan bekas jerawat dan tekstur bergelombang',
      'Penyusutan ukuran pori dan pengetatan serat elastin',
      'Meremajakan kejernihan dan warna kulit secara permanen'
    ],
    suitableFor: [
      'Hiperpigmentasi membandel, melasma, dan bintik matahari',
      'Tekstur bopeng atau bekas jerawat lama',
      'Garis penuaan sedang di sekitar mata dan mulut'
    ],
    steps: [
      {
        stepNumber: 1,
        phaseName: 'Pemetaan Spektral Pigmen & Anestesi Topikal',
        durationMin: 20,
        description: 'Pemindaian UV mendeteksi kedalaman melanosit disertai aplikasi krim anestesi mewah beraroma mawar.',
        productsUsed: 'Krim Anestesi Kenyamanan VÉRE'
      },
      {
        stepNumber: 2,
        phaseName: 'Penghantaran Laser Pecahan Presisi',
        durationMin: 25,
        description: 'Denyut laser mikro terfokus menciptakan zona termal mikroskopis untuk merangsang perbaikan seluler alami.',
        productsUsed: 'Laser Dermal Safir VÉRE'
      },
      {
        stepNumber: 3,
        phaseName: 'Infusi Krio-Soothe Peptida Pendingin',
        durationMin: 15,
        description: 'Aplikasi topeng bio-selulosa beku kaya centella asiatica murni dan beta-glukan untuk meredakan panas jaringan.',
        productsUsed: 'Topeng Pemulihan Cica VÉRE'
      },
      {
        stepNumber: 4,
        phaseName: 'Pelindung Tabir Surya Mineral Mikronisasi',
        durationMin: 15,
        description: 'Proteksi spektrum luas SPF 50+ PA++++ berbahan seng oksida murni bebas minyak.',
        productsUsed: 'Tabir Surya Pelindung Sutra VÉRE'
      }
    ],
    skinConcerns: ['pigmentation', 'acne-texture', 'anti-aging', 'pore-refining'],
    skinTypes: ['combination', 'dry', 'normal', 'mature'],
    intensity: 'Deep Transformation',
    downtime: '24 Hours Minimal Flush',
    beforeAfter: {
      before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
      label: 'Pemudaran Melasma & Penghalusan Tekstur Kulit',
      timeframe: 'Hasil Minggu ke-2 Pasca-Laser'
    },
    rating: 4.99,
    reviewCount: 165,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=1000&q=85'
    ],
    recommendedHomecareIds: ['prod-barrier-cream', 'prod-sculpt-elixir'],
    faqs: [
      {
        question: 'Apakah ada masa pengelupasan kulit?',
        answer: 'Laser non-ablatif kami tidak mengelupas lapisan luar secara agresif. Kulit hanya akan terasa sedikit hangat selama 4-6 jam dan mengalami pengikisan mikro mikroskopis yang halus tanpa mengganggu aktivitas sosial Anda.'
      }
    ]
  }
];

export const BEAUTY_EXPERTS: BeautyExpert[] = [
  {
    id: 'exp-dr-vance',
    name: 'Dr. Alistair Vance, Sp.D.V.E.',
    title: 'Kepala Kedokteran Estetika & Dokter Spesialis Dermatologi',
    role: 'Dermatologist',
    credentials: ['Spesialis Dermatologi & Venereologi', 'Fellow European Academy of Dermatology', 'Doktor Riset Kolagen Seluler'],
    experienceYears: 18,
    bio: 'Dikenal secara internasional atas karyanya dalam pemulihan matriks kolagen dan fotomedisin presisi. Dr. Vance memadukan ilmu medis dermatologi ketat dengan sentuhan keindahan artistik yang elegan.',
    quote: 'Keindahan sejati bukanlah tentang mengubah anatomi wajah, melainkan mengoptimalkan kejernihan biologis seluler dan keseimbangan proporsi alami Anda.',
    rating: 4.99,
    reviewCount: 312,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=85',
    specializations: ['Laser Resurfacing Pecahan', 'Regenerasi Eksosom', 'Koreksi Pigmen Melasma', 'Struktur Kontur Medis'],
    clinicLocationIds: ['loc-menteng', 'loc-beverly-hills'],
    availableDays: ['Senin', 'Selasa', 'Kamis', 'Jumat'],
    scheduleSlots: ['09:30', '11:00', '14:00', '16:00', '18:00'],
    signatureTreatmentId: 'trt-fractional-laser-glow',
    consultationFee: 150
  },
  {
    id: 'exp-helene-laurent',
    name: 'Master Hélène Laurent',
    title: 'Master Facialist & Pelatih Osteopati Fasial Prancis',
    role: 'Master Aesthetician',
    credentials: ['Diplôme d’État d’Esthétique Paris', 'Sertifikasi Internasional Buccal Modeling', '25+ Tahun Pengalaman Haute Couture Paris'],
    experienceYears: 24,
    bio: 'Pelopor teknik Sculptural Buccal di Paris dan konsultan wajah pribadi figur ternama dunia. Hélène menguasai seni melemaskan ketegangan otot dalam untuk mengangkat tulang pipi secara instan.',
    quote: 'Otot wajah menyimpan memori emosi dan ketegangan hidup kita. Ketika kita melepaskannya dari dalam, wajah memancarkan vitalitas muda seketika.',
    rating: 4.98,
    reviewCount: 420,
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=85',
    specializations: ['Pijat Sculptural Buccal', 'Drainase Limfatik Kranial', 'Pelepasan Miofasial TMJ', 'Krioterapi Wajah'],
    clinicLocationIds: ['loc-menteng', 'loc-paris'],
    availableDays: ['Selasa', 'Rabu', 'Kamis', 'Sabtu'],
    scheduleSlots: ['10:00', '12:00', '14:30', '16:30', '18:30'],
    signatureTreatmentId: 'trt-sculptural-buccal',
    consultationFee: 120
  },
  {
    id: 'exp-dr-meiling',
    name: 'Dr. Mei-Ling Zhou, MD',
    title: 'Spesialis Dermatologi Kosmetik & Estetika Mikro',
    role: 'Dermatologist',
    credentials: ['MD Dermatology Tokyo University', 'Board Certified Cosmetic Dermatologist', 'Peneliti Nanomaterial Kulit'],
    experienceYears: 14,
    bio: 'Pakar terkemuka dalam mikrobioma kulit, hidrasi seluler, dan teknologi pembersihan pori tanpa inflamasi. Kerap menjadi pembicara utama simposium estetika Asia-Pasifik.',
    quote: 'Kulit bercahaya porselen bermula dari barier epidermal yang tenang, bersih sempurna, dan terhidrasi hingga lapisan terdalam.',
    rating: 4.97,
    reviewCount: 265,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=85',
    specializations: ['Cryo-Hydro Luminosity', 'Perbaikan Barier Kulit', 'Ekstraksi Pori Non-Invasif', 'Perawatan Kulit Sensitif'],
    clinicLocationIds: ['loc-menteng', 'loc-mayfair'],
    availableDays: ['Senin', 'Rabu', 'Jumat', 'Sabtu'],
    scheduleSlots: ['09:00', '10:30', '13:00', '15:00', '17:00'],
    signatureTreatmentId: 'trt-cryo-hydro-glow',
    consultationFee: 130
  },
  {
    id: 'exp-dr-soren',
    name: 'Dr. Soren Lindqvist, PhD',
    title: 'Direktur Riset Trikologi & Fisiologi Seluler',
    role: 'Trichologist',
    credentials: ['PhD Cellular Biology Karolinska Institute', 'Fellow International Society of Hair Specialists', 'Penemu Kompleks Peptida Folikular'],
    experienceYears: 16,
    bio: 'Pakar trikologi rambut dan kulit kepala yang mengembangkan protokol reaktivasi sel punca folikel dengan kombinasi fotobiomodulasi dan peptida tembaga murni.',
    quote: 'Densitas dan kelebatan mahkota rambut mencerminkan kesehatan ekosistem kulit kepala di tingkat mikroskopis.',
    rating: 4.96,
    reviewCount: 198,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=85',
    specializations: ['Trikologi Kulit Kepala Medis', 'Reaktivasi Folikel Rambut', 'Detoks Sebum Kulit Kepala', 'Terapi Laser LLLT'],
    clinicLocationIds: ['loc-menteng', 'loc-mayfair'],
    availableDays: ['Senin', 'Selasa', 'Kamis', 'Sabtu'],
    scheduleSlots: ['10:00', '11:30', '14:00', '16:00'],
    signatureTreatmentId: 'trt-trichology-scalp-reborn',
    consultationFee: 140
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-sculpt-elixir',
    slug: 'botanical-lipid-sculpting-elixir',
    name: 'Eliksir Minyak Lipid Botani No. 04',
    subtitle: 'Minyak Fasia Wajah Kaya Ceramide & Squalane Tumbuhan',
    category: 'skincare',
    price: 185,
    volume: '50ml / 1.7 fl. oz.',
    rating: 4.98,
    reviewCount: 88,
    description: 'Eliksir lipid mewah hasil ekstraksi dingin yang dirancang khusus untuk memfasilitasi pijatan fasia mandiri, mengunci kelembapan, dan mengembalikan elastisitas barier kulit.',
    keyIngredients: [
      { name: 'Squalane Zaitun Murni 100%', benefit: 'Meniru lipid alami kulit untuk penyerapan instan tanpa menyumbat pori.' },
      { name: 'Minyak Biji Camellia Japonica', benefit: 'Kaya asam oleat dan vitamin A, B, D, E untuk nutrisi mendalam.' },
      { name: 'Kompleks Ceramide Nabati NP', benefit: 'Menutup retakan mikroskopis barier kulit agar kelembapan terkunci abadi.' }
    ],
    clinicalResults: [
      { percentage: 96, claim: 'merasakan kulit lebih kenyal dan kencang dalam 7 hari pemakaian rutin.' },
      { percentage: 91, claim: 'melihat peningkatan kilau cahaya alami kulit seketika.' }
    ],
    howToUse: 'Hangatkan 3-4 tetes di telapak tangan, hirup aromanya secara mendalam, lalu tekan lembut ke wajah, leher, dan decollete dengan gerakan mengangkat ke atas.',
    texture: 'Minyak sutra ringan keemasan yang langsung meresap tanpa residu lengket.',
    image: 'https://images.unsplash.com/photo-1608248597359-593683f218a5?auto=format&fit=crop&w=800&q=85',
    tags: ['Best Seller', 'Barier Kulit', 'Fasial Mandiri', 'Bebas Pewangi Sintetis'],
    isBestSeller: true,
    inventoryCount: 42,
    linkedTreatmentIds: ['trt-sculptural-buccal']
  },
  {
    id: 'prod-exosome-serum',
    slug: 'pure-exosome-5b-bio-essence',
    name: 'Serum Esensi Bio-Eksosom Tumbuhan 5B',
    subtitle: 'Konsentrat Regenerasi Sel & Faktor Pertumbuhan',
    category: 'skincare',
    price: 260,
    volume: '30ml / 1.0 fl. oz.',
    rating: 4.99,
    reviewCount: 64,
    description: 'Mahakarya bioteknologi Swiss yang mengandung 5 miliar partikel eksosom murni dari sel punca bunga mawar Alpen untuk memicu sintesis kolagen alami.',
    keyIngredients: [
      { name: 'Eksosom Mawar Alpen Bio-Fermentasi', benefit: 'Mengirimkan sinyal molekuler untuk mempercepat pemulihan dan regenerasi sel.' },
      { name: 'Asam Hialuronat 5 Bobot Molekul', benefit: 'Menghidrasi kulit dari permukaan hingga ke lapisan dermis terdalam.' },
      { name: 'Peptida Tembaga (GHK-Cu)', benefit: 'Meningkatkan elastisitas dan memudarkan garis-garis halus.' }
    ],
    clinicalResults: [
      { percentage: 98, claim: 'mengonfirmasi tekstur kulit terasa jauh lebih halus dan kencang dalam 14 hari.' },
      { percentage: 89, claim: 'mencatat penurunan kedalaman garis halus di area dahi dan mata.' }
    ],
    howToUse: 'Gunakan 1 pipet penuh setiap pagi dan malam pada wajah yang bersih sebelum mengaplikasikan krim pelembap.',
    texture: 'Gel cair kristal transparan dengan sensasi dingin menyejukkan.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
    tags: ['Regenerasi Sel', 'Anti-Aging Medis', 'Klinis', 'Bioteknologi'],
    isBestSeller: true,
    inventoryCount: 28,
    linkedTreatmentIds: ['trt-cellular-exosome', 'trt-fractional-laser-glow']
  },
  {
    id: 'prod-barrier-cream',
    slug: 'cellular-ceramide-reconstruction-cream',
    name: 'Krim Rekonstruksi Barier Kolagen & Ceramide',
    subtitle: 'Pelindung Dermis Intensif & Pelembap Bio-Identik',
    category: 'skincare',
    price: 195,
    volume: '60ml / 2.0 fl. oz.',
    rating: 4.96,
    reviewCount: 110,
    description: 'Krim perbaikan kaya emolit yang memulihkan lapisan barier lipid pelindung, meredakan kemerahan, dan melindungi kulit dari polusi agresif perkotaan.',
    keyIngredients: [
      { name: 'Bio-Lipid Kompleks 3:1:1:1', benefit: 'Rasio emas ceramide, kolesterol, asam lemak bebas, dan phytosphingosine.' },
      { name: 'Ekstrak Centella Asiatica Titrasi (TECA)', benefit: 'Meredakan iritasi dan mempercepat penyembuhan kulit pasca-tindakan klinis.' },
      { name: 'Ectoin 2%', benefit: 'Molekul pelindung sel ekstrem dari stres lingkungan dan cahaya biru.' }
    ],
    clinicalResults: [
      { percentage: 100, claim: 'mengalami perbaikan barier kulit secara signifikan dalam 72 jam pertama.' }
    ],
    howToUse: 'Ambil seukuran mutiara, hangatkan di ujung jari, lalu ratakan secara menyeluruh ke seluruh wajah dan leher.',
    texture: 'Krim beludru kaya nutrisi yang meleleh lembut saat bersentuhan dengan kehangatan kulit.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85',
    tags: ['Barier Kulit', 'Pasca-Tindakan', 'Kulit Sensitif', 'Hidrasi 24 Jam'],
    inventoryCount: 35,
    linkedTreatmentIds: ['trt-cellular-exosome', 'trt-fractional-laser-glow', 'trt-cryo-hydro-glow']
  },
  {
    id: 'prod-gua-sha',
    slug: 'handcrafted-black-obsidian-sculptor',
    name: 'Perangkat Pemahat Wajah Batu Obsidian Hitam',
    subtitle: 'Alat Pijat Fasia & Drainase Limfatik Buatan Tangan',
    category: 'devices',
    price: 120,
    volume: 'Perangkat Estetika Padat',
    rating: 4.97,
    reviewCount: 145,
    description: 'Dipahat tangan dari batu kaca vulkanik obsidian hitam alami berdensitas tinggi untuk menahan suhu sejuk dan memudahkan manipulasi fasia rahang serta leher.',
    keyIngredients: [
      { name: 'Batu Obsidian Vulkanik 100% Alami', benefit: 'Membantu grounding energi dan melancarkan sirkulasi chi/limfe.' },
      { name: 'Desain Ergonomis 4 Sisi Arsitektural', benefit: 'Sisi bergerigi untuk stimulasi kolagen, sisi lengkung untuk tulang pipi.' }
    ],
    clinicalResults: [
      { percentage: 94, claim: 'mencatat pengurangan sembap wajah di pagi hari setelah 5 menit pemijatan.' }
    ],
    howToUse: 'Gunakan bersama Eliksir Minyak Lipid No. 04. Sapukan perlahan dari tengah dagu ke arah cuping telinga, dan dari pangkal hidung ke pelipis.',
    texture: 'Batu mineral hitam mulus dingin bersudut presisi.',
    image: 'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=800&q=85',
    tags: ['Alat Kecantikan', 'Obsidian Alami', 'Pahatan Mandiri', 'Detoks Wajah'],
    inventoryCount: 50,
    linkedTreatmentIds: ['trt-sculptural-buccal', 'trt-botanical-lymphatic-body']
  },
  {
    id: 'prod-trichology-serum',
    slug: 'trichology-follicle-density-elixir',
    name: 'Serum Nutrisi Folikel Trikologi & Densitas',
    subtitle: 'Aktivator Sel Punca Kulit Kepala & Penguat Akar Rambut',
    category: 'haircare',
    price: 175,
    volume: '60ml / 2.0 fl. oz.',
    rating: 4.94,
    reviewCount: 52,
    description: 'Serum kulit kepala berbahan dasar air non-lepek yang mengombinasikan Redensyl, peptida tembaga, dan ekstrak ginseng hitam untuk memperpanjang fase anagen pertumbuhan rambut.',
    keyIngredients: [
      { name: 'Redensyl® 3%', benefit: 'Mengaktifkan sel punca folikel rambut ORSc.' },
      { name: 'GHK-Cu Copper Peptide', benefit: 'Mempertebal batang rambut dan meningkatkan suplai nutrisi darah ke folikel.' },
      { name: 'Seng PCA & Asam Salisilat Halus', benefit: 'Mengontrol minyak berlebih dan menjaga kulit kepala tetap bersih segar.' }
    ],
    clinicalResults: [
      { percentage: 88, claim: 'mengamati pengurangan rambut rontok secara nyata dalam 6 minggu pemakaian rutin.' }
    ],
    howToUse: 'Teteskan 1-2 pipet langsung ke kulit kepala yang bersih dalam keadaan kering atau lembap, pijat lembut dengan ujung jari selama 2 menit.',
    texture: 'Cairan esensial ringan cepat meresap tanpa meninggalkan minyak.',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=85',
    tags: ['Kesehatan Rambut', 'Trikologi', 'Rambut Rontok', 'Kulit Kepala Bersih'],
    inventoryCount: 30,
    linkedTreatmentIds: ['trt-trichology-scalp-reborn']
  },
  {
    id: 'prod-body-oil',
    slug: 'restorative-botanical-body-contour-oil',
    name: 'Minyak Kontur Tubuh Botanika Restoratif',
    subtitle: 'Eliksir Drainase Limfatik, Juniper & Rosemary Hangat',
    category: 'bodycare',
    price: 145,
    volume: '150ml / 5.1 fl. oz.',
    rating: 4.95,
    reviewCount: 40,
    description: 'Minyak tubuh beraroma spa aromaterapi mewah yang menstimulasi aliran cairan tubuh, menghaluskan tampilan selulit, dan mengenyalkan kulit pasca-mandi.',
    keyIngredients: [
      { name: 'Minyak Esensial Juniper Berry & Grapefruit', benefit: 'Memicu drainase cairan dan detoksifikasi jaringan interstitial.' },
      { name: 'Minyak Biji Rosehip Organik', benefit: 'Membantu memudarkan stretch mark dan menjaga elastisitas kulit.' }
    ],
    clinicalResults: [
      { percentage: 92, claim: 'merasa tubuh lebih ringan dan kulit lebih kencang bersinar.' }
    ],
    howToUse: 'Pijatkan pada kulit tubuh yang masih agak lembap setelah mandi dengan gerakan melingkar ke arah jantung.',
    texture: 'Minyak kering bertekstur beludru dengan aroma herbal menyegarkan.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    tags: ['Perawatan Tubuh', 'Detoks Limfatik', 'Aromaterapi', 'Bebas Toksin'],
    inventoryCount: 25,
    linkedTreatmentIds: ['trt-botanical-lymphatic-body']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-fascial-architecture',
    slug: 'the-science-of-fascial-architecture-buccal',
    title: 'Sains di Balik Arsitektur Fasia Wajah & Pijat Buccal Intra-Oral',
    subtitle: 'Mengapa Pembentukan Otot dari Dalam Rongga Mulut Mengubah Paradigma Estetika Non-Invasif',
    excerpt: 'Memahami bagaimana manipulasi miofasial mendalam mampu mereposisi bantalan lemak wajah, menguras cairan limfatik yang terjebak, dan menegaskan kembali garis rahang tanpa memerlukan filler buatan.',
    category: 'Rituals & Science',
    readTime: '6 Menit Baca',
    publishDate: '28 Agustus 2026',
    author: {
      name: 'Master Hélène Laurent',
      role: 'Master Facialist & Ahli Osteopati Fasial',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&q=85'
    },
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    content: {
      leadParagraph: 'Selama beberapa dekade terakhir, estetika wajah konvensional hanya berfokus pada dua hal: lapisan luar kulit melalui krim topikal, atau perubahan volume instan melalui jarum suntik. Namun, kunci sejati dari elastisitas dan ketegasan wajah terletak pada lapisan di antara keduanya: sistem fasia dan otot neuromuskular.',
      sections: [
        {
          heading: 'Fasia: Jaring Laba-laba Penopang Kontur Wajah',
          body: 'Fasia adalah lembaran jaringan ikat elastis yang membungkus setiap otot, pembuluh darah, dan bantalan lemak di wajah kita. Ketika kita mengalami stres emosional, kurang tidur, atau kebiasaan menggemeretakkan rahang di malam hari, fasia mengalami kekakuan dan mengeras, menyebabkan wajah tampak letih, asimetris, dan sembap.',
          pullQuote: 'Wajah bukan sekadar kanvas dua dimensi; wajah adalah mahakarya arsitektur kinetik tiga dimensi.'
        },
        {
          heading: 'Keajaiban Manipulasi Intra-Oral dari Dalam',
          body: 'Pijat buccal intra-oral bekerja dengan cara menjangkau otot-otot pengunyah (masseter dan buccinator) secara bersamaan dari luar dan dalam rongga mulut. Dengan akses ganda ini, terapis bersertifikasi dapat meredakan ketegangan yang tidak pernah bisa dijangkau oleh pemijatan permukaan biasa, menghasilkan efek lifting alami yang menakjubkan.'
        }
      ],
      conclusion: 'Mengintegrasikan pelepasan fasia rutin dan pemodelan buccal ke dalam ritual bulanan Anda tidak hanya merawat kecantikan luar, melainkan memulihkan harmoni fungsional seluruh struktur wajah Anda.'
    },
    relatedTreatmentIds: ['trt-sculptural-buccal'],
    relatedProductIds: ['prod-sculpt-elixir', 'prod-gua-sha']
  },
  {
    id: 'art-plant-exosomes',
    slug: 'plant-exosomes-next-frontier-cellular-regeneration',
    title: 'Eksosom Tumbuhan: Garis Depan Baru Regenerasi Seluler & Anti-Penuaan',
    subtitle: 'Bagaimana Vesikel Pembawa Pesan Alami Memicu Kolagen dari Lapisan Terdalam',
    excerpt: 'Penemuan bioteknologi terkini dalam memurnikan eksosom botani mawar Alpen dan Edelweiss untuk meremajakan sel fibroblas kulit tanpa intervensi sintetis agresif.',
    category: 'Skin Longevity',
    readTime: '8 Menit Baca',
    publishDate: '15 Agustus 2026',
    author: {
      name: 'Dr. Alistair Vance, Sp.D.V.E.',
      role: 'Dokter Spesialis Dermatologi',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=85'
    },
    heroImage: 'https://images.unsplash.com/photo-1512290900672-1f41d996156e?auto=format&fit=crop&w=1200&q=85',
    content: {
      leadParagraph: 'Dalam dekade terakhir, dermatologi kosmetik telah melompat jauh dari sekadar perbaikan permukaan kulit menjadi manipulasi sinyal biokimia seluler. Di pusat revolusi ilmiah ini adalah eksosom—vesikel ekstraseluler berukuran nano yang bertindak sebagai kurir pengantar pesan informasi antarsel.',
      sections: [
        {
          heading: 'Bahasa Komunikasi Seluler Nano',
          body: 'Eksosom membawa muatan biologis yang sangat kaya: mikro-RNA berharga, protein pembangun, dan faktor pertumbuhan bio-identik. Ketika diantarkan ke kulit yang menua atau rusak akibat sinar matahari, eksosom menginstruksikan sel fibroblas yang lesu untuk kembali memproduksi pro-kolagen dan elastin muda seperti saat usia prima.',
          pullQuote: 'Eksosom tidak membebani sel kulit; eksosom mengembalikan instruksi asli sel untuk menyembuhkan dirinya sendiri.'
        },
        {
          heading: 'Mengapa Eksosom Tumbuhan Jauh Lebih Aman & Murni',
          body: 'Di VÉRE, kami menolak penggunaan eksosom turunan biologis manusia demi menjaga kemurnian etis dan sterilitas medis mutlak. Melalui bio-fermentasi tumbuhan Alpen di laboratorium Swiss, kami mengekstraksi eksosom dengan afinitas tinggi pada reseptor kulit manusia tanpa risiko kontaminasi atau reaksi imun negatif.'
        }
      ],
      conclusion: 'Dengan memadukan eksosom botani murni bersama nano-channeling klinis tanpa rasa sakit, kita memasuki era baru di mana usia kronologis kulit dapat diputar kembali secara harmonis.'
    },
    relatedTreatmentIds: ['trt-cellular-exosome'],
    relatedProductIds: ['prod-exosome-serum', 'prod-barrier-cream']
  }
];

export const MEMBERSHIP_TIERS: MembershipTierDetail[] = [
  {
    tier: 'Essential',
    tagline: 'Langkah Awal Memasuki Dunia Ritual Kecantikan Presisi',
    annualSpendRequired: 0,
    pointsCashbackPct: 5,
    color: '#9B8778',
    badgeBg: 'bg-[#E8DDD3]/40 border-[#9B8778]/30 text-[#252525]',
    perks: [
      'Cashback reward 5% dalam bentuk poin VÉRE di setiap transaksi',
      'Akses prioritas reservasi janji temu 14 hari sebelumnya',
      'Teh herbal pilihan & konsultasi sensorik gratis di setiap sesi',
      'Hadiah ulang tahun eksklusif berupa voucher potongan IDR 500.000'
    ],
    complimentaryRituals: [
      'Pemeriksaan Analisis Kulit 3D Visia AI di awal setiap kedatangan'
    ],
    exclusiveAccess: [
      'Akses ke Jurnal Ilmiah VÉRE dan panduan perawatan mandiri di rumah'
    ]
  },
  {
    tier: 'Signature',
    tagline: 'Pengalaman Perawatan Holistik dengan Privilese Luas',
    annualSpendRequired: 2500,
    pointsCashbackPct: 10,
    color: '#C4A47C',
    badgeBg: 'bg-[#C4A47C]/15 border-[#C4A47C] text-[#252525]',
    perks: [
      'Cashback reward 10% poin untuk semua ritual dan produk apotek',
      'Akses prioritas reservasi 30 hari sebelumnya & daftar tunggu VIP',
      'Gratis 1 add-on peningkatan perawatan (misal: Terapi LED Medis) setiap kunjungan',
      'Pengiriman ekspres gratis untuk seluruh pesanan produk apotek ke rumah',
      'Undangan ke acara kecantikan tertutup bersama dokter dan master facialist'
    ],
    complimentaryRituals: [
      '1x Sesi Gratis Cryo-Hydro Luminosity Facial per tahun',
      'Analisis Kulit 3D Visia berkala setiap 3 bulan'
    ],
    exclusiveAccess: [
      'Akses ke Private VIP Lounge sebelum dan sesudah sesi perawatan'
    ]
  },
  {
    tier: 'Privé',
    tagline: 'Puncak Kemewahan & Layanan Konsierge Tanpa Batas',
    annualSpendRequired: 6000,
    pointsCashbackPct: 15,
    color: '#252525',
    badgeBg: 'bg-[#252525] text-[#E8DDD3] border-[#C4A47C]',
    perks: [
      'Cashback reward 15% tertinggi untuk semua transaksi ritual & produk',
      'Akses reservasi kapan saja tanpa batas waktu dengan jaminan slot privat',
      'Layanan penjemputan mobil mewah / Chauffeur pribadi ke Sanctuary',
      'Suite Penthouse Privat khusus untuk setiap sesi perawatan Anda',
      'Konsierge Pribadi Estetika 24/7 via WhatsApp khusus',
      'Hadiah mewah kurasi produk apotek di setiap pergantian musim'
    ],
    complimentaryRituals: [
      '2x Sesi Gratis Sculptural Buccal Facelift atau Bio-Exosome per tahun',
      'Add-on terapi oksigen hiperbarik tanpa batas di setiap kunjungan'
    ],
    exclusiveAccess: [
      'Akses ke seluruh Suite Atelier Global di Menteng, Beverly Hills, Paris, dan London'
    ]
  }
];

export const INITIAL_CUSTOMER: CustomerProfile = {
  id: 'cust-audrey-01',
  name: 'Audrey Titis Wardhani',
  email: 'audrey.titis@vereritual.com',
  phone: '+62 812 8899 7711',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
  tier: 'Signature',
  membershipTierSince: 'Maret 2025',
  points: 1850,
  lifetimeSpend: 4320,
  skinHealthScore: 92,
  skinType: 'combination',
  concerns: ['lifting-contour', 'anti-aging', 'glow-radiance'],
  sensitivities: ['Pewangi Buatan Sintetis', 'Alkohol Terdenaturasi'],
  preferences: {
    tea: 'Seduhan Teh Mawar Putih Organik & Melati',
    aroma: 'Lavender Prancis & Cedarwood Hangat',
    pressure: 'Sedang Berirama Lembut',
    musicPreference: 'Akustik Zen & Frekuensi Gelombang Theta 432Hz'
  },
  upcomingAppointments: [
    {
      id: 'book-2026-001',
      bookingCode: 'VRE-JKT-8891',
      treatmentId: 'trt-sculptural-buccal',
      treatmentName: 'Arsitektur Wajah & Pijat Sculptural Buccal',
      treatmentCategory: 'facial',
      treatmentPrice: 420,
      durationMinutes: 90,
      addOns: [ADD_ON_OPTIONS[0]],
      locationId: 'loc-menteng',
      locationName: 'Atelier Menteng Sanctuary',
      expertId: 'exp-helene-laurent',
      expertName: 'Master Hélène Laurent',
      expertTitle: 'Master Facialist & Pelatih Osteopati Fasial Prancis',
      date: '2026-09-12',
      timeSlot: '14:30',
      customerInfo: {
        name: 'Audrey Titis Wardhani',
        email: 'audrey.titis@vereritual.com',
        phone: '+62 812 8899 7711',
        skinConcerns: ['lifting-contour', 'anti-aging'],
        notes: 'Fokuskan pada pelepasan ketegangan di area rahang kanan.',
        isFirstVisit: false,
        preferredTea: 'Seduhan Teh Mawar Putih Organik & Melati',
        preferredAroma: 'Lavender Prancis & Cedarwood Hangat'
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      subtotal: 485,
      discount: 0,
      totalAmount: 485,
      pointsEarned: 48,
      status: 'confirmed',
      createdAt: '2026-08-30'
    }
  ],
  pastAppointments: [
    {
      id: 'book-2026-past-01',
      bookingCode: 'VRE-JKT-7720',
      treatmentId: 'trt-cellular-exosome',
      treatmentName: 'Regenerasi Seluler Matriks Eksosom 5B & Bio-Peptida',
      treatmentCategory: 'skin',
      treatmentPrice: 550,
      durationMinutes: 75,
      addOns: [],
      locationId: 'loc-menteng',
      locationName: 'Atelier Menteng Sanctuary',
      expertId: 'exp-dr-vance',
      expertName: 'Dr. Alistair Vance, Sp.D.V.E.',
      expertTitle: 'Dokter Spesialis Dermatologi',
      date: '2026-07-18',
      timeSlot: '11:00',
      customerInfo: {
        name: 'Audrey Titis Wardhani',
        email: 'audrey.titis@vereritual.com',
        phone: '+62 812 8899 7711',
        skinConcerns: ['hydration', 'glow-radiance'],
        isFirstVisit: false
      },
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      subtotal: 550,
      discount: 55,
      totalAmount: 495,
      pointsEarned: 50,
      status: 'completed',
      createdAt: '2026-07-05'
    }
  ],
  journeyMilestones: [
    {
      id: 'ms-01',
      date: '18 Juli 2026',
      treatmentId: 'trt-cellular-exosome',
      treatmentName: 'Regenerasi Seluler Matriks Eksosom 5B',
      therapistName: 'Dr. Alistair Vance, Sp.D.V.E.',
      locationName: 'Atelier Menteng Sanctuary',
      skinHydrationDelta: '+38%',
      skinElasticityDelta: '+24%',
      skinHealthScore: 92,
      notes: 'Barier kulit menunjukkan pemulihan signifikan. Kemerahan mikro di area pipi mereda total setelah infusi eksosom.',
      prescribedHomecare: [
        'Serum Esensi Bio-Eksosom Tumbuhan 5B (2x sehari)',
        'Krim Rekonstruksi Barier Kolagen & Ceramide'
      ],
      beforePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      afterPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      nextRecommendedDate: '12 September 2026',
      nextRecommendedTreatmentId: 'trt-sculptural-buccal'
    }
  ],
  vouchers: [
    {
      id: 'vouch-vip-20',
      code: 'VEREVIP20',
      title: 'Privilese Diskon Anggota 20%',
      discountType: 'percentage',
      value: 20,
      minSpend: 300,
      expiresAt: '31 Desember 2026',
      isRedeemed: false,
      description: 'Berlaku untuk semua ritual perawatan wajah & tubuh di seluruh Atelier VÉRE.'
    },
    {
      id: 'vouch-gift-50',
      code: 'ATELIER50',
      title: 'Voucher Produk Apotek $50',
      discountType: 'fixed',
      value: 50,
      minSpend: 150,
      expiresAt: '15 Oktober 2026',
      isRedeemed: false,
      description: 'Potongan langsung untuk pembelian Eliksir Minyak Lipid No. 04 atau Krim Kolagen.'
    }
  ],
  favoriteTreatmentIds: ['trt-sculptural-buccal', 'trt-cellular-exosome'],
  favoriteProductIds: ['prod-sculpt-elixir', 'prod-exosome-serum']
};

export const QUIZ_QUESTIONS = [
  {
    step: 1,
    id: 'focusArea',
    title: 'Pilar Fokus Transformasi',
    subtitle: 'Di area manakah ritual kecantikan Anda ingin difokuskan hari ini?',
    options: [
      { id: 'facial', label: 'Arsitektur & Kontur Wajah', desc: 'Pemahatan garis rahang, tulang pipi, dan pelepasan fasia ketegangan otot.' },
      { id: 'skin', label: 'Regenerasi Seluler Kulit', desc: 'Perbaikan barier, hidrasi mendalam, kilau kaca (glass-skin), & eksosom.' },
      { id: 'aesthetic', label: 'Fotomedisin & Koreksi Laser', desc: 'Penanganan melasma, hiperpigmentasi, dan perataan bekas luka halus.' },
      { id: 'hair', label: 'Trikologi & Kesehatan Rambut', desc: 'Detoks kulit kepala, penguatan akar rambut, dan stimulasi densitas folikel.' },
      { id: 'body', label: 'Kontur Tubuh & Detoks Limfatik', desc: 'Drainase cairan, relaksasi miofasial tubuh, dan penghalusan tekstur kulit.' }
    ]
  },
  {
    step: 2,
    id: 'skinCondition',
    title: 'Kondisi & Sensitivitas Kulit Saat Ini',
    subtitle: 'Bagaimana karakteristik barier kulit yang Anda rasakan?',
    options: [
      { id: 'sensitive-barrier', label: 'Barier Sensitif & Mudah Memerah', desc: 'Membutuhkan nutrisi sangat lembut, penenang cica, dan perbaikan ceramide.' },
      { id: 'dehydrated-dull', label: 'Dehidrasi Kronis & Kusam Lelah', desc: 'Kurang cahaya alami, tekstur kasar akibat pendingin ruangan atau polusi.' },
      { id: 'loss-firmness', label: 'Penurunan Kekenyalan & Kontur', desc: 'Garis halus mulai terlihat dan garis rahang terasa kurang terdefinisi.' },
      { id: 'congested-pores', label: 'Pori Tersumbat & Minyak Berlebih', desc: 'Komedo di area T-zone dan penumpukan keratin mati.' }
    ]
  },
  {
    step: 3,
    id: 'desiredOutcome',
    title: 'Ekspektasi Hasil Akhir',
    subtitle: 'Transformasi utama apa yang paling ingin Anda lihat di cermin?',
    options: [
      { id: 'instant-sculpt', label: 'Garis Rahang Tegas & Wajah Terangkat Seketika', desc: 'Pahatan dramatis tanpa jarum, siap untuk acara penting.' },
      { id: 'glass-glow', label: 'Luminositas Transparan & Kulit Berkilau Kaca', desc: 'Kilau cahaya pantul alami tanpa perlu pulasan foundation tebal.' },
      { id: 'pure-reset', label: 'Pori Bersih Berseri & Wajah Segar Dingin', desc: 'Detoksifikasi mendalam dan rasa bersih ringan yang melegakan.' },
      { id: 'holistic-renewal', label: 'Pelepasan Stres & Harmoni Tubuh Menyeluruh', desc: 'Relaksasi sistem saraf dan peremajaan holistik dari kepala hingga ujung kaki.' }
    ]
  },
  {
    step: 4,
    id: 'timeCommitment',
    title: 'Ketersediaan Waktu Sesi Anda',
    subtitle: 'Berapa durasi sesi santai yang paling ideal untuk jadwal Anda?',
    options: [
      { id: '60-min', label: '60 Menit — Express Luminescence', desc: 'Sesi efisien dan intensif untuk hasil kilau cepat di sela aktivitas.' },
      { id: '75-min', label: '75 Menit — Precision Regeneration', desc: 'Kombinasi seimbang antara teknologi klinis dan relaksasi mendalam.' },
      { id: '90-min', label: '90 Menit — The Full Architectural Immersion', desc: 'Pengalaman ritual lengkap dengan meditasi pernapasan dan pemodelan fasia total.' }
    ]
  }
];

export const SAMPLE_CUSTOMERS = [
  {
    id: 'cust-01',
    name: 'Audrey Titis Wardhani',
    email: 'wantianititis@gmail.com',
    phone: '+62 811 8899 210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    tier: 'Privé' as const,
    points: 4850,
    completedVisitsCount: 14,
    concerns: ['Pencegahan Penuaan Dini', 'Hidrasi Intensif', 'Pengencangan Rahang'],
    skinProfile: {
      luminosityScore: 94,
      hydrationLevel: 88,
      elasticityLevel: 92
    }
  },
  {
    id: 'cust-02',
    name: 'Clarissa S. Djojohadikusumo',
    email: 'clarissa.sd@luxegroup.id',
    phone: '+62 812 3456 7890',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    tier: 'Privé' as const,
    points: 8200,
    completedVisitsCount: 22,
    concerns: ['Kontur Rahang', 'Sensitivitas Barier'],
    skinProfile: {
      luminosityScore: 97,
      hydrationLevel: 91,
      elasticityLevel: 95
    }
  },
  {
    id: 'cust-03',
    name: 'Dr. Sofia Ramadhani',
    email: 'sofia.ramadhani@medika.id',
    phone: '+62 818 9012 3456',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    tier: 'Signature' as const,
    points: 2450,
    completedVisitsCount: 7,
    concerns: ['Pori-Pori & Detoks', 'Luminositas'],
    skinProfile: {
      luminosityScore: 89,
      hydrationLevel: 84,
      elasticityLevel: 86
    }
  }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Clarissa S. Djojohadikusumo',
    location: 'Jakarta & Singapura',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    date: '24 Agustus 2026',
    treatmentName: 'Arsitektur Wajah & Buccal Sculpting',
    comment: 'Setelah sesi Sculptural Buccal pertama bersama Master Hélène di Atelier Menteng, ketegangan rahang saya akibat bruxism hilang total dan tulang pipi terlihat begitu terangkat alami.',
    verified: true
  },
  {
    id: 'rev-02',
    author: 'Eleanor Vance-Montgomery',
    location: 'Beverly Hills, CA',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    date: '12 Agustus 2026',
    treatmentName: 'Regenerasi Eksosom 5B & Bio-Peptida',
    comment: 'Hasilnya luar biasa. Tidak ada kemerahan sama sekali dan keesokan harinya kulit saya memancarkan kilau kaca yang bertahan berminggu-minggu.',
    verified: true
  },
  {
    id: 'rev-03',
    author: 'Dr. Sofia Ramadhani',
    location: 'Surabaya & Jakarta',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    date: '02 Agustus 2026',
    treatmentName: 'Luminositas Cryo-Hydro & Detoks',
    comment: 'Pembersihan pori paling lembut dan mewah yang pernah saya rasakan. Ruang suite privatnya sangat tenang, teh herbalnya istimewa.',
    verified: true
  }
];


