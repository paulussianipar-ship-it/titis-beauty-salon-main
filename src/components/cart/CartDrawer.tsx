import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart,
    customer,
    showToast
  } = useApp();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 25;
  const total = subtotal + shipping;
  const pointsEarned = Math.round(total * 0.1);

  const handleCompleteOrder = () => {
    setIsCheckingOut(false);
    setOrderComplete(true);
    clearCart();
    showToast('Pesanan botani klinis Anda telah dikonfirmasi. Pelacakan terkirim via SMS.');
  };

  return (
    <div id="cart-drawer-backdrop" className="fixed inset-0 z-50 overflow-hidden bg-[#252525]/70 backdrop-blur-sm flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="w-full max-w-md bg-[#F7F4EF] h-full flex flex-col shadow-2xl border-l border-[#E8DDD3]"
      >
        
        {/* Drawer Header */}
        <div className="p-6 bg-[#252525] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C4A47C]" />
            <span className="font-serif-luxury text-xl tracking-wider">Tas Belanja ({cart.reduce((sum, i) => sum + i.quantity, 0)})</span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderComplete(false);
            }}
            className="p-1.5 text-[#E8DDD3] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {orderComplete ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="font-serif-luxury text-2xl text-[#252525]">Pesanan Sedang Diproses</h4>
              <p className="text-xs text-[#9B8778] max-w-xs mx-auto">
                Formulasi botani rantai-dingin Anda dikemas secara hati-hati dalam wadah pengatur suhu steril.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  setIsCartOpen(false);
                }}
                className="px-6 py-2.5 bg-[#252525] text-white text-xs uppercase tracking-widest font-semibold"
              >
                Lanjutkan Belanja
              </button>
            </div>
          ) : cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="p-4 bg-white border border-[#E8DDD3] flex items-center space-x-4 shadow-sm">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-[#252525] truncate">{item.product.name}</h5>
                    <p className="text-[10px] text-[#9B8778]">{item.product.volume}</p>
                    <p className="text-xs font-bold text-[#252525] mt-1">${item.product.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 border border-[#E8DDD3] hover:bg-[#F7F4EF] rounded"
                    >
                      <Minus className="w-3 h-3 text-[#252525]" />
                    </button>
                    <span className="text-xs font-semibold text-[#252525] w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 border border-[#E8DDD3] hover:bg-[#F7F4EF] rounded"
                    >
                      <Plus className="w-3 h-3 text-[#252525]" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="p-4 bg-[#E8DDD3]/40 border border-[#E8DDD3] text-[11px] text-[#252525] space-y-1">
                <div className="flex items-center space-x-1.5 text-[#252525] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C4A47C]" />
                  <span>Sampel Kemewahan Eksklusif Disertakan</span>
                </div>
                <p className="text-[10px] text-[#9B8778]">
                  Setiap pengiriman botani mencakup 2 ritual botani mini edisi deluxe.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#9B8778]/50 mx-auto" />
              <p className="font-serif-luxury text-xl text-[#252525]">Tas Belanja Anda masih kosong.</p>
              <p className="text-xs text-[#9B8778]">Jelajahi formulasi botani klinis kami untuk menyempurnakan kilau kulit Anda di rumah.</p>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && !orderComplete && (
          <div className="p-6 bg-white border-t border-[#E8DDD3] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#9B8778]">
                <span>Subtotal Produk</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#9B8778]">
                <span>Pengiriman Kontrol Suhu Khusus</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-[#252525] text-sm pt-2 border-t border-[#E8DDD3]">
                <span>Total Pembayaran</span>
                <span className="font-serif-luxury text-xl">${total.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-[#9B8778] text-right">
                Mendapatkan +{pointsEarned} Poin Kecantikan Titis
              </p>
            </div>

            <button
              onClick={handleCompleteOrder}
              className="w-full py-3.5 bg-[#252525] text-white hover:bg-[#3d3d3d] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Selesaikan Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
