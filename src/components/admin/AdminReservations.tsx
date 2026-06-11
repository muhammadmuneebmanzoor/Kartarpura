import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Search, Calendar, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function AdminReservations() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string | number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state instead of refetching everything
      setReservations(prev => 
        prev.map(res => res.id === id ? { ...res, status: newStatus } : res)
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredReservations = reservations.filter(res => 
    (res.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (res.phone || '').includes(searchQuery)
  );
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white uppercase tracking-widest">Reservation Management</h3>
        <button onClick={fetchReservations} className="text-xs uppercase tracking-widest text-orange-500 hover:text-orange-400 font-bold border border-orange-500/30 px-3 py-1.5 rounded-lg transition-colors">
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search reservations by name or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:border-orange-500 outline-none placeholder:text-gray-600" 
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-white/10">
              <th className="pb-4 font-bold">ID</th>
              <th className="pb-4 font-bold">Customer</th>
              <th className="pb-4 font-bold">Contact</th>
              <th className="pb-4 font-bold">Date & Time</th>
              <th className="pb-4 font-bold">Guests</th>
              <th className="pb-4 font-bold">Status</th>
              <th className="pb-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm">
            {loading && reservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">Loading reservations...</td>
              </tr>
            ) : filteredReservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500">No reservations found.</td>
              </tr>
            ) : (
              filteredReservations.map((res) => (
                <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-bold text-white max-w-[80px] truncate" title={res.id.toString()}>#{res.id.toString().substring(0,8)}</td>
                  <td className="py-4 font-light">{res.name}</td>
                  <td className="py-4 font-light text-gray-400">{res.phone}</td>
                  <td className="py-4 font-light flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" /> {res.date} at {res.time}
                  </td>
                  <td className="py-4 font-bold text-orange-500 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {res.guests}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      res.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      res.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                    }`}>
                      {res.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {(!res.status || res.status === 'Pending') && (
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => updateStatus(res.id, 'Confirmed')} className="p-2 text-gray-400 hover:text-green-500 transition-colors" title="Approve">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => updateStatus(res.id, 'Rejected')} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Reject">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
