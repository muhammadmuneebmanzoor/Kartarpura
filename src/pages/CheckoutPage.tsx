import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Gift, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

export function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [complete, setComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [paymentProof, setPaymentProof] = useState<string | undefined>(undefined);
  
  const total = cartTotal + 150 + (cartTotal * 0.05);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please pick an image smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProof(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const name = formData.get('name') as string;
    
    addOrder({
      customer: `${title} ${name}`,
      items: cart.map(c => `${c.quantity}x ${c.name}`).join(', '),
      total: `RS ${total.toFixed(0)}`,
      paymentMethod,
      paymentProof: paymentMethod !== 'Cash on Delivery' ? paymentProof : undefined
    });
    
    setComplete(true);
    clearCart();
  };

  if (cart.length === 0 && !complete) {
    navigate('/cart');
    return null;
  }

  if (complete) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-dark-900 border-t border-white/5 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 bg-white/5 rounded-3xl border border-white/10"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
               <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-400 mb-8 max-w-md font-light">Thank you for ordering from Kartarpura. Your order is being prepared and will be delivered soon.</p>
            <Link to="/menu" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold tracking-widest text-xs rounded-full transition-colors uppercase">
              Order More
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900 border-t border-white/5 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">   
        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-12">
          {/* Form Fields */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Checkout</h1>
                <p className="text-gray-400 font-medium">This is a <span className="font-bold text-white">Delivery Order</span> 🛵</p>
                <p className="text-gray-500 text-sm">Just a last step, please enter your details:</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="text-sm font-bold text-gray-400">Title</label>
                  <select name="title" className="border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors bg-dark-900 appearance-none">
                    <option>Title</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1 md:col-span-9">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-400">Full Name</label>
                    <span className="text-xs text-orange-500 italic">*Required</span>
                  </div>
                  <input required name="name" type="text" className="bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="Full Name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-gray-400">Mobile Number</label>
                    <span className="text-xs text-orange-500 italic">*Required</span>
                  </div>
                  <input required name="phone" type="tel" className="bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="03xx-xxxxxxx" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-400">Alternate Mobile Number</label>
                  <input name="alt_phone" type="tel" className="bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="03xx-xxxxxxx" />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-400">Delivery Address</label>
                  <span className="text-xs text-orange-500 italic">*Required</span>
                </div>
                <div className="relative flex items-center">
                  <input required name="address" type="text" className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="Enter your complete address" />
                  <div className="absolute right-2 bg-white/5 rounded px-3 py-1 text-sm text-gray-400">Bhutto ..</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-400">Email Address</label>
                  <input name="email" type="email" className="bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="Enter your email" />
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <label className="text-sm font-bold text-gray-400">Delivery Instructions</label>
                <input name="instructions" type="text" className="bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="Delivery Instructions" />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-400 mb-3">Payment Information</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg transition-all ${
                    paymentMethod === 'Cash on Delivery' 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-white/10 hover:border-white/30 text-gray-400'
                  }`}
                >
                  <span className={`font-medium text-sm ${paymentMethod === 'Cash on Delivery' ? 'text-orange-500' : 'text-gray-400'}`}>Cash on Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Easypaisa')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg transition-all ${
                    paymentMethod === 'Easypaisa' 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-white/10 hover:border-white/30 text-gray-400'
                  }`}
                >
                  <span className={`font-medium text-sm ${paymentMethod === 'Easypaisa' ? 'text-orange-500' : 'text-gray-400'}`}>Easypaisa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('JazzCash')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg transition-all ${
                    paymentMethod === 'JazzCash' 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-white/10 hover:border-white/30 text-gray-400'
                  }`}
                >
                  <span className={`font-medium text-sm ${paymentMethod === 'JazzCash' ? 'text-orange-500' : 'text-gray-400'}`}>JazzCash</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Bank Transfer')}
                  className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg transition-all ${
                    paymentMethod === 'Bank Transfer' 
                      ? 'border-orange-500 bg-orange-500/10' 
                      : 'border-white/10 hover:border-white/30 text-gray-400'
                  }`}
                >
                  <span className={`font-medium text-sm ${paymentMethod === 'Bank Transfer' ? 'text-orange-500' : 'text-gray-400'}`}>Bank Transfer</span>
                </button>
              </div>
              
              {paymentMethod !== 'Cash on Delivery' && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                  {paymentMethod === 'Easypaisa' && <p className="text-white font-bold mb-4">Easypaisa Number: <span className="text-orange-500">0332322333</span></p>}
                  {paymentMethod === 'JazzCash' && <p className="text-white font-bold mb-4">JazzCash Number: <span className="text-orange-500">0332322333</span></p>}
                  {paymentMethod === 'Bank Transfer' && <p className="text-white font-bold mb-4">Bank Account Number: <span className="text-orange-500">34987654321</span></p>}
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-400">Send Receipt (Upload payment proof)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/10 file:text-orange-500 hover:file:bg-orange-500/20" 
                    />
                    {paymentProof && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs text-green-500 font-bold uppercase tracking-wider">Receipt screenshot uploaded successfully!</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-400">Change Request</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-4 flex items-center font-medium text-gray-400 text-sm">
                    Rs.
                  </div>
                  <input name="change" type="number" className="w-full bg-dark-900 border border-white/10 rounded-lg pl-14 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600" placeholder="500" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sticky top-32">              
              <div className="space-y-4 mb-6 border-b border-white/10 pb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300 font-medium">
                      {item.quantity} x {item.name}
                    </span>
                    <span className="text-white font-bold">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <h2 className="text-xl font-bold text-white mb-4">Your Order</h2>
              
              <div className="flex flex-col gap-2 text-sm font-medium text-gray-400 mb-6">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax 5%</span>
                  <span>Rs. {(cartTotal * 0.05).toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rs. 150</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 text-white border-t border-white/10">
                  <span className="font-bold">Grand Total</span>
                  <span className="font-bold text-orange-500">Rs. {total.toFixed(0)}</span>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold uppercase tracking-widest text-xs rounded-xl transition-colors mb-4">
                Place Order
              </button>

              <div className="text-center">
                <Link to="/menu" className="text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center justify-center gap-1 uppercase tracking-widest text-xs">
                  <ArrowLeft className="w-4 h-4" /> continue to add more items
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
