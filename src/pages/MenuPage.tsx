import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMenu } from '../context/MenuContext';

const CATEGORIES = ["All", "Breakfast", "Nihari & Paya", "BBQ", "Karahi", "Breads", "Desserts", "Beverages"];

export function MenuPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { menuItems } = useMenu();

  const filteredDishes = menuItems.filter(dish => {
    const matchesCat = activeCat === "All" || dish.category === activeCat;
    const matchesSearch = dish.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-dark-900 border-t border-white/5 relative">
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          >
            Our <span className="text-gradient">Menu</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-light text-lg max-w-2xl"
          >
            Explore the rich culinary heritage of Rawalpindi through our authentic offerings.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          
          {/* Categories */}
          <div className="flex overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 gap-2 scrollbar-hide hide-scrollbar" style={{scrollbarWidth: 'none'}}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${activeCat === cat ? 'bg-orange-500 text-black border border-orange-500' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/30 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full lg:w-auto flex gap-4">
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search dishes..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-500"
              />
            </div>
            <button className="w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-colors shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredDishes.map((dish) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={dish.id} 
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                   <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center">
                     <span className="text-gold-500 text-sm font-bold flex items-center gap-1">★ {dish.rating}</span>
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                    <span className="text-gold-500 font-bold whitespace-nowrap ml-4">Rs {dish.price}</span>
                  </div>
                  <p className="text-gray-400 font-light text-sm mb-6 flex-1">{dish.description}</p>
                  
                  <button onClick={() => addToCart(dish)} className="w-full py-3 bg-white/5 border border-white/10 hover:bg-orange-500 hover:text-black hover:border-orange-500 text-white rounded-xl transition-all font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-24">
             <p className="text-gray-500 font-light text-lg">No dishes found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}
