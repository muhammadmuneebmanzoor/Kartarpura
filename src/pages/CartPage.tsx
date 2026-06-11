import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-dark-900 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <div className="w-24 h-24 bg-dark-900 rounded-full flex items-center justify-center mb-6">
               <ShoppingBag className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 mb-8 max-w-md font-light">Looks like you haven't added anything to your order yet. Explore our menu to find your next meal.</p>
            <Link to="/menu" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-widest text-xs rounded-full transition-colors uppercase flex items-center gap-2 group">
              Explore Menu
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900 border-t border-white/5 relative">
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <h1 className="text-4xl font-bold text-white mb-8">Your Order</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="flex items-center gap-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 pr-6"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <p className="text-orange-500 font-bold mb-3">Rs {item.price}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-dark-900 rounded-lg px-2 py-1 border border-white/10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-orange-500 text-gray-400 transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-orange-500 text-gray-400 transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-6">
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-xl text-white">Rs {item.price * item.quantity}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 text-gray-300 font-light mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rs 150</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Rs {(cartTotal * 0.05).toFixed(0)}</span>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 mb-8">
                <div className="flex justify-between items-center text-white">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-orange-500">Rs {cartTotal + 150 + (cartTotal * 0.05)}</span>
                </div>
              </div>

              <button onClick={() => navigate('/checkout')} className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-widest text-xs rounded-xl transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
