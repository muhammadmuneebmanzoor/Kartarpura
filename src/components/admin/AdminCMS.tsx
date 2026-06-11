import { motion } from 'framer-motion';
import { Save, Image as ImageIcon } from 'lucide-react';

export function AdminCMS() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">Homepage Banner</h3>
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-xl font-bold text-sm tracking-widest uppercase transition-colors">
              <Save className="w-4 h-4" /> Save Publish
            </button>
         </div>
         
         <div className="flex flex-col gap-6">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Hero Title</label>
              <input type="text" defaultValue="Kartarpura Street Food" className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none" />
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Hero Subtitle</label>
              <textarea rows={3} defaultValue="Experience the authentic taste of Pakistan's most famous street food destination, now delivering to your doorstep." className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none resize-none" />
            </div>
            
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Banner Image Background</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-dark-900 text-gray-500 cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-colors">
                 <ImageIcon className="w-8 h-8 mb-2" />
                 <span className="font-bold text-sm uppercase tracking-widest">Click to upload new image</span>
                 <span className="text-xs font-light mt-1">1920x1080 recommended</span>
              </div>
            </div>
         </div>
      </div>

    </motion.div>
  );
}
