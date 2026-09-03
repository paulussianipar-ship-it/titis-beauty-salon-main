import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ActivePage, 
  Treatment, 
  TreatmentCategory, 
  BeautyExpert, 
  Product, 
  CartItem, 
  CustomerProfile, 
  Booking,
  JournalArticle
} from '../types';
import { 
  TREATMENTS, 
  PRODUCTS, 
  BEAUTY_EXPERTS, 
  INITIAL_CUSTOMER, 
  JOURNAL_ARTICLES 
} from '../data/mockData';

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedTreatmentId: string | null;
  setSelectedTreatmentId: (id: string | null) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedCategory: TreatmentCategory | 'all';
  setSelectedCategory: (cat: TreatmentCategory | 'all') => void;
  
  // Modals & Drawers
  isBeautyFinderOpen: boolean;
  setIsBeautyFinderOpen: (open: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  preselectedBookingTreatmentId: string | null;
  preselectedBookingExpertId: string | null;
  openBookingWithTreatment: (treatmentId?: string, expertId?: string) => void;
  
  // Cart
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Concierge
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;

  // User Profile & CRM
  customer: CustomerProfile;
  updateCustomerProfile: (updated: Partial<CustomerProfile>) => void;
  toggleFavoriteTreatment: (treatmentId: string) => void;
  toggleFavoriteProduct: (productId: string) => void;
  
  // Bookings
  allBookings: Booking[];
  addNewBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;

  // Data
  treatments: Treatment[];
  products: Product[];
  experts: BeautyExpert[];
  articles: JournalArticle[];
  
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Admin Mode Toggle
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<TreatmentCategory | 'all'>('all');

  const [isBeautyFinderOpen, setIsBeautyFinderOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedBookingTreatmentId, setPreselectedBookingTreatmentId] = useState<string | null>(null);
  const [preselectedBookingExpertId, setPreselectedBookingExpertId] = useState<string | null>(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);

  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerProfile>(INITIAL_CUSTOMER);
  const [allBookings, setAllBookings] = useState<Booking[]>([
    ...INITIAL_CUSTOMER.upcomingAppointments,
    ...INITIAL_CUSTOMER.pastAppointments
  ]);

  const [treatments, setTreatments] = useState<Treatment[]>(TREATMENTS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [experts, setExperts] = useState<BeautyExpert[]>(BEAUTY_EXPERTS);
  const [articles, setArticles] = useState<JournalArticle[]>(JOURNAL_ARTICLES);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Auto clear toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const openBookingWithTreatment = (treatmentId?: string, expertId?: string) => {
    if (treatmentId) {
      setPreselectedBookingTreatmentId(treatmentId);
    }
    if (expertId) {
      setPreselectedBookingExpertId(expertId);
    }
    setIsBookingModalOpen(true);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your beauty bag.`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const updateCustomerProfile = (updated: Partial<CustomerProfile>) => {
    setCustomer(prev => ({ ...prev, ...updated }));
  };

  const toggleFavoriteTreatment = (treatmentId: string) => {
    setCustomer(prev => {
      const exists = prev.favoriteTreatmentIds.includes(treatmentId);
      const updated = exists
        ? prev.favoriteTreatmentIds.filter(id => id !== treatmentId)
        : [...prev.favoriteTreatmentIds, treatmentId];
      
      showToast(exists ? 'Removed from your ritual favorites' : 'Saved to your ritual favorites');
      return { ...prev, favoriteTreatmentIds: updated };
    });
  };

  const toggleFavoriteProduct = (productId: string) => {
    setCustomer(prev => {
      const exists = prev.favoriteProductIds.includes(productId);
      const updated = exists
        ? prev.favoriteProductIds.filter(id => id !== productId)
        : [...prev.favoriteProductIds, productId];

      showToast(exists ? 'Removed from saved apothecary' : 'Saved to your apothecary wishlist');
      return { ...prev, favoriteProductIds: updated };
    });
  };

  const addNewBooking = (booking: Booking) => {
    setAllBookings(prev => [booking, ...prev]);
    setCustomer(prev => ({
      ...prev,
      points: prev.points + booking.pointsEarned,
      lifetimeSpend: prev.lifetimeSpend + booking.totalAmount,
      upcomingAppointments: [booking, ...prev.upcomingAppointments]
    }));
    showToast(`Appointment reserved! Booking reference: ${booking.bookingCode}`);
  };

  const cancelBooking = (bookingId: string) => {
    setAllBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    setCustomer(prev => ({
      ...prev,
      upcomingAppointments: prev.upcomingAppointments.filter(b => b.id !== bookingId)
    }));
    showToast('Your appointment has been cancelled. Confirmation sent via WhatsApp/Email.');
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setAllBookings(prev =>
      prev.map(b =>
        b.id === bookingId ? { ...b, date: newDate, timeSlot: newTime } : b
      )
    );
    setCustomer(prev => ({
      ...prev,
      upcomingAppointments: prev.upcomingAppointments.map(b =>
        b.id === bookingId ? { ...b, date: newDate, timeSlot: newTime } : b
      )
    }));
    showToast(`Appointment rescheduled to ${newDate} at ${newTime}.`);
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setAllBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status } : b))
    );
    showToast(`Booking ${bookingId} status updated to ${status}.`);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage: (p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedTreatmentId,
        setSelectedTreatmentId,
        selectedProductId,
        setSelectedProductId,
        selectedArticleId,
        setSelectedArticleId,
        selectedCategory,
        setSelectedCategory,
        isBeautyFinderOpen,
        setIsBeautyFinderOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        preselectedBookingTreatmentId,
        preselectedBookingExpertId,
        openBookingWithTreatment,
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isConciergeOpen,
        setIsConciergeOpen,
        customer,
        updateCustomerProfile,
        toggleFavoriteTreatment,
        toggleFavoriteProduct,
        allBookings,
        addNewBooking,
        cancelBooking,
        rescheduleBooking,
        updateBookingStatus,
        treatments,
        products,
        experts,
        articles,
        toastMessage,
        showToast,
        isAdminMode,
        setIsAdminMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
