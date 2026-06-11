import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ChevronRight, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase
        .from('reservations')
        .insert([
          {
            name: formData.name,
            date: formData.date,
            time: formData.time,
            guests: parseInt(formData.guests),
            phone: formData.phone,
            notes: formData.notes,
            status: 'Pending'
          }
        ]);
        
      if (error) throw error;
      
      setSuccess(true);
      setFormData({ name: '', date: '', time: '', guests: '', phone: '', notes: '' });
    } catch (err: any) {
      console.error('Error saving reservation:', err);
      setError(err.message || 'Failed to submit reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900 border-t border-white/5 relative">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] text-orange-500 font-semibold">
              KARTARPURA EXPERIENCE
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Book a Table
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light text-lg max-w-2xl mx-auto"
          >
            Reserve your spot at Rawalpindi's most iconic street food destination. Serving legendary taste 24/7.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Reservation Requested!</h3>
              <p className="text-gray-400 mb-8">We have received your request and will contact you shortly to confirm your booking.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-colors"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm">
                  {error}
                </div>
              )}

              {/* Grid form layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Name */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="time" 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Size */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select 
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      <option value="" disabled>Select number of guests</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, '9+'].map(num => (
                        <option key={num} value={num}>{num} Person{num === 1 ? '' : 's'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+92</span>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="300 1234567"
                      required
                      className="w-full bg-dark-900 border border-white/10 rounded-xl pl-14 pr-4 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-300 uppercase tracking-widest">Special Requests</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any preferences or dietary requirements?"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
              </div>

              <div className="border-t border-white/10 pt-8 mt-2 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-10 py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-widest text-sm rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  {loading ? 'Processing...' : 'Confirm Reservation'} 
                  {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
              
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
