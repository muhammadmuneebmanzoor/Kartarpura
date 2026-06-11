import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, LogOut, CheckCircle, Clock, Utensils, CalendarDays, Star, Eye, X, Ban, Lock, Mail, Key, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders, AdminOrder, OrderStatus } from '../context/OrderContext';
import { supabase } from '../lib/supabase';

import { AdminMenu } from '../components/admin/AdminMenu';
import { AdminReservations } from '../components/admin/AdminReservations';
import { AdminReviews } from '../components/admin/AdminReviews';

export function AdminPage() {
  const [isAdminSetup, setIsAdminSetup] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('menu');
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();

  const tabs = [
    { id: 'menu', label: 'Menu Management', icon: Utensils },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart },
    { id: 'reservations', label: 'Reservation Management', icon: CalendarDays },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  useEffect(() => {
    async function checkSetup() {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('id')
          .eq('id', 'admin_auth')
          .maybeSingle();
        
        if (data) {
          setIsAdminSetup(true);
        } else {
          setIsAdminSetup(false);
        }
      } catch (err) {
        console.error('Error checking admin setup in Supabase:', err);
        setIsAdminSetup(false);
      }
    }
    checkSetup();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    setLoading(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', 'admin_auth')
        .single();

      if (fetchError || !data) {
        setError('Verification failed. If you just set up, reload and try again.');
        return;
      }

      if (data.email?.toLowerCase().trim() === email.toLowerCase().trim() && data.spent === password) {
        setIsLoggedIn(true);
        // Clear credential inputs for safety
        setEmail('');
        setPassword('');
      } else {
        setError('Incorrect email or password. Please try again.');
      }
    } catch (err: any) {
      console.error('Database authentication error:', err);
      setError('A database error occurred. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.toLowerCase().trim();
    if (!trimmedEmail || !password) {
      setError('Please enter both an email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Re-verify that someone hasn't already registered
      const { data: existing } = await supabase
        .from('customers')
        .select('id')
        .eq('id', 'admin_auth')
        .maybeSingle();

      if (existing) {
        setError('Admin credentials have already been configured! This panel is locked.');
        setIsAdminSetup(true);
        return;
      }

      const { error: insertError } = await supabase
        .from('customers')
        .insert([{
          id: 'admin_auth',
          name: 'Sufi Naan Center Admin',
          email: trimmedEmail,
          phone: 'N/A',
          spent: password,
          orders: 0
        }]);

      if (insertError) {
        throw insertError;
      }

      setIsLoggedIn(true);
      setIsAdminSetup(true);
      // Clear inputs for safety
      setEmail('');
      setPassword('');
    } catch (err: any) {
      console.error('Error writing admin setup:', err);
      setError('Could not complete one-time setup: ' + (err.message || 'database write error'));
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  // 1. LOADING SCREEN
  if (isAdminSetup === null) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            Verifying Admin Protocol...
          </span>
        </div>
      </div>
    );
  }

  // 2. UNAUTHENTICATED EXPERIENCE (Setup or Login Form)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Decorative Rings/Glows */}
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-gold-500/10 rounded-full filter blur-[120px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 relative z-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-gold-500 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
              <Lock className="w-8 h-8 text-black" />
            </div>
            
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">
              Sufi Naan Center
            </h2>
            <p className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-1">
              {isAdminSetup ? "Administrator Portal" : "One-Time Admin Activation"}
            </p>
            <p className="text-sm text-gray-400 font-light px-2 mt-2">
              {isAdminSetup 
                ? "Sign in with your secure administrator credentials." 
                : "Initialize your super admin account. Once configured, nobody else will be able to alter or register new credentials."
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isAdminSetup ? handleLogin : handleSetup} className="flex flex-col gap-5">
            
            {/* Email input */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 px-0.5 text-gray-500 w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sufinaan.com"
                  required
                  className="w-full bg-black/60 border border-white/10 focus:border-orange-500 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Admin Password
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-3 px-0.5 text-gray-500 w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-black/60 border border-white/10 focus:border-orange-500 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Warn message if sign-up */}
            {!isAdminSetup && (
              <div className="flex gap-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mt-1.5">
                <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                  <strong className="text-yellow-500 uppercase tracking-wide">Crucial Security Guard:</strong> This is a permanent, one-time admin sign-up. Write down or save these secure details. Nobody can recover, replace, or reset them.
                </p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-xs font-medium"
              >
                ⚠️ {error}
              </motion.div>
            )}

            {/* Submit button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-500 text-black py-3.5 rounded-xl transition-all font-bold text-sm uppercase tracking-widest cursor-pointer shadow-lg shadow-orange-500/15 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
              ) : (
                <span>{isAdminSetup ? "Sign In to Console" : "Activate & Lock Admin"}</span>
              )}
            </button>
          </form>

          {/* Return Home Button */}
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/')}
              className="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer uppercase tracking-wider font-bold underline underline-offset-4"
            >
              ← Back to Main Page
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. AUTHENTICATED EXPERIENCE (Main Dashboard Layout)
  return (
    <div className="flex min-h-screen bg-dark-900 pt-20 border-t border-white/5">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:flex flex-col gap-8">
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all text-sm tracking-widest uppercase ${
                activeTab === tab.id 
                  ? 'bg-orange-500/20 text-orange-500 border border-orange-500/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        
        <button 
          onClick={handleAdminLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg font-bold transition-colors text-sm tracking-widest uppercase border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl text-white font-bold mb-2">Admin {tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-gray-400 font-light">Authenticated Administrator Session</p>
          </div>
        </header>

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">Manage Orders</h3>
            {orders.length > 0 ? (
              <OrderTable orders={orders} updateStatus={updateOrderStatus} showStatusActions />
            ) : (
              <p className="text-gray-500 py-12 text-center text-sm uppercase tracking-widest font-bold">No orders to manage</p>
            )}
          </motion.div>
        )}

        {activeTab === 'menu' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AdminMenu />
          </motion.div>
        )}

        {activeTab === 'reservations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AdminReservations />
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AdminReviews />
          </motion.div>
        )}

      </main>
    </div>
  );
}

function OrderTable({ orders, updateStatus, showStatusActions = false }: { orders: AdminOrder[], updateStatus: (id: string, s: OrderStatus) => void, showStatusActions?: boolean }) {
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
            <th className="pb-4 font-bold">Order ID</th>
            <th className="pb-4 font-bold">Customer</th>
            <th className="pb-4 font-bold">Items</th>
            <th className="pb-4 font-bold">Total</th>
            <th className="pb-4 font-bold">Payment</th>
            <th className="pb-4 font-bold">Status</th>
            {showStatusActions && <th className="pb-4 font-bold text-center">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-300 text-sm">
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-4 font-bold text-white">{order.id}</td>
              <td className="py-4 font-light">{order.customer}</td>
              <td className="py-4 font-light max-w-[200px] truncate" title={order.items}>{order.items}</td>
              <td className="py-4 font-bold text-orange-500">{order.total}</td>
              <td className="py-4">
                <div className="flex flex-col gap-1 items-start">
                  <span className="font-light text-xs text-gray-400">{order.paymentMethod}</span>
                  {order.paymentProof && (
                    <button
                      type="button"
                      onClick={() => setSelectedProof(order.paymentProof!)}
                      className="inline-flex items-center gap-1.5 text-[10px] bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-black border border-orange-500/20 hover:border-orange-500 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold uppercase tracking-wider mt-1.5 shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Receipt
                    </button>
                  )}
                </div>
              </td>
              <td className="py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  order.status === 'Preparing' ? 'bg-orange-500/10 text-orange-400 border-orange-500/25' :
                  order.status === 'Ready' ? 'bg-blue-500/10 text-blue-400 border-blue-500/25' :
                  order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border-green-500/25' :
                  'bg-red-500/10 text-red-400 border-red-500/25'
                }`}>
                  {order.status}
                </span>
              </td>
              {showStatusActions && (
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    {order.status === 'Preparing' && (
                      <>
                        <button 
                          onClick={() => updateStatus(order.id, 'Ready')} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/15 hover:bg-blue-500 text-blue-400 hover:text-black border border-blue-500/20 hover:border-blue-500 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer" 
                          title="Mark as Prepared / Ready"
                        >
                          <Clock className="w-4 h-4" /> Prepared
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this order?")) {
                              updateStatus(order.id, 'Cancelled');
                            }
                          }} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer" 
                          title="Cancel Order"
                        >
                          <Ban className="w-4 h-4" /> Cancel
                        </button>
                      </>
                    )}
                    {order.status === 'Ready' && (
                      <>
                        <button 
                          onClick={() => updateStatus(order.id, 'Delivered')} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 hover:bg-green-500 text-green-400 hover:text-black border border-green-500/20 hover:border-green-500 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer" 
                          title="Mark Delivered"
                        >
                          <CheckCircle className="w-4 h-4" /> Deliver
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this order?")) {
                              updateStatus(order.id, 'Cancelled');
                            }
                          }} 
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 rounded-lg transition-all text-xs font-bold uppercase tracking-wider cursor-pointer" 
                          title="Cancel Order"
                        >
                          <Ban className="w-4 h-4" /> Cancel
                        </button>
                      </>
                    )}
                    {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                      <span className="text-gray-500 text-xs uppercase font-bold tracking-widest">No actions</span>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Interactive Lightbox / Modal for Payment Receipt Proof */}
      {selectedProof && (
        <div 
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedProof(null)}
        >
          <div 
            className="relative max-w-2xl max-h-[90vh] bg-[#0c0c0c] border border-white/15 p-6 rounded-3xl flex flex-col items-center shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              type="button"
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white cursor-pointer transition-colors"
              onClick={() => setSelectedProof(null)}
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full text-center mb-4">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Payment Proof Receipt</h3>
              <p className="text-xs text-gray-500 tracking-wider">Review receipt below to confirm the transaction was genuine</p>
            </div>
            <div className="overflow-auto border border-white/10 rounded-2xl bg-black/40 p-2 max-h-[65vh] flex items-center justify-center">
              <img 
                src={selectedProof} 
                alt="Payment Receipt Proof Screenshot" 
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-lg" 
              />
            </div>
            <p className="text-orange-500 text-xs mt-4 uppercase tracking-widest font-bold">Click outside or press X to close</p>
          </div>
        </div>
      )}
    </div>
  );
}
