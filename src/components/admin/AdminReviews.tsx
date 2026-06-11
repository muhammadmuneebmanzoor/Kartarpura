import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, X, ShieldAlert, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReviews() {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }
      if (data) {
        setReviews(data.map(r => ({
          id: r.id,
          customer: r.customer,
          rating: Number(r.rating),
          date: r.date || new Date().toISOString().split('T')[0],
          text: r.text,
          status: r.status
        })));
      }
    } catch (err) {
      console.error('Catch fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) {
        console.error('Error updating review status:', error);
        alert('Could not update status: ' + error.message);
        return;
      }
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err: any) {
      console.error('Catch updating review status:', err);
      alert('Error updating status: ' + err.message);
    }
  };

  const deleteReview = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this review? This action cannot be undone.")) {
      return;
    }
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error deleting review:', error);
        alert('Could not delete review: ' + error.message);
        return;
      }
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch (err: any) {
      console.error('Catch deleting review:', err);
      alert('Error: ' + err.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Reviews Management</h3>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 text-gray-500 font-bold uppercase tracking-widest text-xs">No Reviews Found</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-dark-900 border border-white/10 p-6 rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white">{rev.customer}</span>
                  <span className="text-gray-500 text-xs">{rev.date}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ml-2 ${
                      rev.status === 'Approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      rev.status === 'Hidden' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      rev.status === 'Rejected' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                      'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                    }`}>
                      {rev.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star <= rev.rating ? 'text-orange-500 fill-orange-500' : 'text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-300 font-light text-sm italic">"{rev.text}"</p>
              </div>
              
              <div className="flex items-center gap-2">
                {rev.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => updateStatus(rev.id, 'Approved')}
                      className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-black rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(rev.id, 'Rejected')}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </>
                )}
                {rev.status === 'Approved' && (
                  <button 
                    onClick={() => updateStatus(rev.id, 'Hidden')}
                    className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500 hover:text-black rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" /> Hide
                  </button>
                )}
                {rev.status === 'Hidden' && (
                  <button 
                    onClick={() => updateStatus(rev.id, 'Approved')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-black rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Unhide
                  </button>
                )}
                {rev.status === 'Rejected' && (
                  <button 
                    onClick={() => updateStatus(rev.id, 'Approved')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500 hover:text-black rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                )}

                <button 
                  onClick={() => deleteReview(rev.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white rounded transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer ml-1"
                  title="Delete permanently"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
