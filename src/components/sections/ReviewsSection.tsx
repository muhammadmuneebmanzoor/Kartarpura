import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REVIEWS } from '../../data/mock';
import { Star, Quote, Send, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  async function loadReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        setReviewsList(REVIEWS);
        return;
      }

      if (data && data.length > 0) {
        // Filter approved reviews on the client side so that hidden reviews are never shown,
        // and we don't trigger seeding if there are reviews of other statuses (like Hidden).
        const approvedReviews = data.filter(r => r.status === 'Approved');
        
        setReviewsList(approvedReviews.map(r => ({
          id: r.id,
          author: r.customer,
          rating: Number(r.rating),
          comment: r.text,
          verified: true,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(r.customer)}`
        })));
      } else {
        // Table in Supabase is empty, let's seed it with static default reviews
        const seeded = REVIEWS.map((r, i) => ({
          id: `REV-00${i + 1}`,
          customer: r.author,
          rating: r.rating,
          text: r.comment,
          status: 'Approved'
        }));
        
        await supabase.from('reviews').insert(seeded);
        setReviewsList(REVIEWS);
      }
    } catch (err) {
      console.error('Catch block in reviews load:', err);
      setReviewsList(REVIEWS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    setSubmitting(true);
    const reviewId = `REV-${Math.floor(Math.random() * 900000) + 100000}`;
    const newRev = {
      id: reviewId,
      customer: author,
      rating: rating,
      text: comment,
      status: 'Pending' // Submit as Pending so it requires Admin approval
    };

    try {
      const { error } = await supabase.from('reviews').insert([newRev]);
      if (error) {
        console.error('Supabase review insert error:', error);
      } else {
        setSuccessMsg(true);
        setAuthor('');
        setComment('');
        setRating(5);
        setShowForm(false);
        await loadReviews();
        setTimeout(() => setSuccessMsg(false), 5000);
      }
    } catch (err) {
      console.error('Submit review error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="py-24 bg-dark-900 border-t border-white/5 relative">
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-orange-500 uppercase tracking-widest text-[10px] font-bold">testimonials & reviews</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            What Our <span className="text-gradient">Guests Say</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-light text-lg max-w-2xl mb-8"
          >
            Join thousands of satisfied food lovers who have experienced the magic of Kartarpura.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> {showForm ? 'Close Form' : 'Write a Review'}
          </motion.button>
        </div>

        {/* Submission Form Modal/Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto mb-16 bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            >
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Share Your Experience</h3>
              <p className="text-gray-400 font-light text-sm mb-6">Leave your review below and help us serve you better!</p>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Rating</label>
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <button
                        type="button"
                        key={starVal}
                        onClick={() => setRating(starVal)}
                        className="focus:outline-none cursor-pointer transition-transform active:scale-95 p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            starVal <= rating ? 'text-orange-500 fill-orange-500' : 'text-white/20'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-gray-400 text-sm ml-2 font-medium">({rating} out of 5 stars)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your food and dining experience at Kartarpura Street Food..."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none text-sm transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-3 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-black rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all hover:shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-10 bg-green-500/10 border border-green-500/30 text-green-500 rounded-xl p-4 text-center text-sm uppercase tracking-wider font-bold"
            >
              🎉 Thank you! Your review has been submitted for approval and will be visible once reviewed by an administrator.
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="text-center py-16 text-gray-400 tracking-widest font-bold uppercase text-xs">Loading Reviews...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewsList.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 relative group flex flex-col justify-between"
              >
                <div>
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5 group-hover:text-orange-500/20 transition-colors pointer-events-none" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        className={`w-4 h-4 ${index < review.rating ? 'text-orange-500 fill-orange-500' : 'text-white/10'}`} 
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 leading-relaxed font-light mb-8 relative z-10 italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={review.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(review.author || 'guest')}`} 
                    alt={review.author} 
                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5"
                  />
                  <div>
                    <h5 className="text-white font-bold">{review.author}</h5>
                    {review.verified && (
                      <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">Verified Guest</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

