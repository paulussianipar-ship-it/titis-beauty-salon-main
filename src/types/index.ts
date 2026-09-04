export type TreatmentCategory = 'facial' | 'skin' | 'body' | 'hair' | 'aesthetic';

export type SkinConcern = 
  | 'anti-aging'
  | 'hydration'
  | 'pigmentation'
  | 'acne-texture'
  | 'lifting-contour'
  | 'glow-radiance'
  | 'pore-refining'
  | 'hair-density';

export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'mature' | 'normal';

export interface TreatmentStep {
  stepNumber: number;
  phaseName: string;
  durationMin: number;
  description: string;
  productsUsed?: string;
}

export interface BeforeAfterImage {
  before: string;
  after: string;
  label: string;
  timeframe: string;
}

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar?: string;
  rating: number;
  date: string;
  treatmentName: string;
  comment: string;
  verified: boolean;
  therapistName?: string;
}

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  tagline: string;
  category: TreatmentCategory;
  durationMinutes: number;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  benefits: string[];
  suitableFor: string[];
  steps: TreatmentStep[];
  skinConcerns: SkinConcern[];
  skinTypes: SkinType[];
  intensity: 'Gentle & Relaxing' | 'Targeted Clinical' | 'Deep Transformation';
  downtime: 'Zero Downtime' | '2-4 Hours Mild Glow' | '24 Hours Minimal Flush';
  beforeAfter: BeforeAfterImage;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isSignature?: boolean;
  image: string;
  gallery: string[];
  recommendedHomecareIds: string[];
  faqs: TreatmentFAQ[];
}

export interface AddOnOption {
  id: string;
  name: string;
  tagline: string;
  price: number;
  durationMin: number;
  category: string;
  image?: string;
}

export interface BeautyExpert {
  id: string;
  name: string;
  title: string;
  role: 'Dermatologist' | 'Master Aesthetician' | 'Trichologist' | 'Holistic Facialist';
  credentials: string[];
  experienceYears: number;
  bio: string;
  quote: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  coverImage?: string;
  specializations: string[];
  clinicLocationIds: string[];
  availableDays: string[];
  scheduleSlots: string[];
  signatureTreatmentId: string;
  consultationFee?: number;
}

export interface ClinicLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  district: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  suitesCount: number;
  vipLounge: boolean;
  parking: string;
  features: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'skincare' | 'bodycare' | 'haircare' | 'aftercare' | 'devices';
  price: number;
  volume: string;
  rating: number;
  reviewCount: number;
  description: string;
  keyIngredients: {
    name: string;
    benefit: string;
  }[];
  clinicalResults: {
    percentage: number;
    claim: string;
  }[];
  howToUse: string;
  texture: string;
  image: string;
  gallery?: string[];
  tags: string[];
  isBestSeller?: boolean;
  inventoryCount: number;
  linkedTreatmentIds?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BookingCustomerInfo {
  name: string;
  email: string;
  phone: string;
  skinConcerns: string[];
  notes?: string;
  isFirstVisit: boolean;
  preferredTea?: string;
  preferredAroma?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  treatmentId: string;
  treatmentName: string;
  treatmentCategory: TreatmentCategory;
  treatmentPrice: number;
  durationMinutes: number;
  addOns: AddOnOption[];
  locationId: string;
  locationName: string;
  expertId: string;
  expertName: string;
  expertTitle: string;
  date: string;
  timeSlot: string;
  customerInfo: BookingCustomerInfo;
  paymentMethod: 'credit_card' | 'xendit_midtrans' | 'pay_at_clinic' | 'points_membership';
  paymentStatus: 'paid' | 'pending' | 'deposit_paid';
  subtotal: number;
  discount: number;
  totalAmount: number;
  pointsEarned: number;
  pointsUsed?: number;
  status: 'confirmed' | 'completed' | 'in-progress' | 'cancelled';
  createdAt: string;
  aftercareInstructions?: string[];
  therapistNotes?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: 'Rituals & Science' | 'Skin Longevity' | 'Artisan Spotlight' | 'Wellness & Botanical';
  readTime: string;
  publishDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroImage: string;
  content: {
    leadParagraph: string;
    sections: {
      heading: string;
      body: string;
      pullQuote?: string;
    }[];
    conclusion: string;
  };
  relatedTreatmentIds: string[];
  relatedProductIds: string[];
}

export interface JourneyMilestone {
  id: string;
  date: string;
  treatmentId: string;
  treatmentName: string;
  therapistName: string;
  locationName: string;
  skinHydrationDelta: string;
  skinElasticityDelta: string;
  skinHealthScore: number;
  notes: string;
  prescribedHomecare: string[];
  beforePhoto: string;
  afterPhoto: string;
  nextRecommendedDate: string;
  nextRecommendedTreatmentId: string;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  expiresAt: string;
  isRedeemed: boolean;
  description: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: 'Essential' | 'Signature' | 'Privé';
  membershipTierSince: string;
  points: number;
  lifetimeSpend: number;
  skinHealthScore: number;
  skinType: SkinType;
  concerns: SkinConcern[];
  sensitivities: string[];
  preferences: {
    tea: string;
    aroma: string;
    pressure: string;
    musicPreference: string;
  };
  upcomingAppointments: Booking[];
  pastAppointments: Booking[];
  journeyMilestones: JourneyMilestone[];
  vouchers: Voucher[];
  favoriteTreatmentIds: string[];
  favoriteProductIds: string[];
}

export interface MembershipTierDetail {
  tier: 'Essential' | 'Signature' | 'Privé';
  tagline: string;
  annualSpendRequired: number;
  pointsCashbackPct: number;
  color: string;
  badgeBg: string;
  perks: string[];
  complimentaryRituals: string[];
  exclusiveAccess: string[];
}

export interface QuizAnswers {
  focusArea: 'face' | 'skin' | 'body' | 'hair' | 'aesthetic';
  concerns: string[];
  skinCondition: string;
  desiredOutcome: string;
  timeCommitment: string;
  intensityPreference: string;
}

export type ActivePage = 
  | 'home'
  | 'about'
  | 'treatments'
  | 'treatment-detail'
  | 'beauty-finder'
  | 'experts'
  | 'booking'
  | 'account'
  | 'membership'
  | 'shop'
  | 'product-detail'
  | 'journal'
  | 'journal-detail'
  | 'aftercare'
  | 'locations'
  | 'admin';
