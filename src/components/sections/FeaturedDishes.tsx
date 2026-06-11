import { motion } from 'framer-motion';
import { FEATURED_DISHES } from '../../data/mock';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export function FeaturedDishes() {
  const { addToCart } = useCart();
  
  return (
    <section className="py-24 bg-dark-900 relative">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 md:pt-24">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
            >
              Signature <span className="text-gradient">Dishes</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg leading-relaxed font-light"
            >
              Discover the flavors that made us famous. Prepared with decade-old recipes, premium ingredients, and boundless passion.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_DISHES.map((dish, i) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(242,125,38,0.1)] relative"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                  <span className="text-white text-sm font-bold">{dish.rating}</span>
                </div>
              </div>

              <div className="p-6 relative">
                 <button onClick={() => addToCart(dish)} className="absolute -top-6 right-6 w-12 h-12 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 transform group-hover:scale-110 transition-all z-10">
                    <ShoppingCart className="w-5 h-5" />
                 </button>

                 <div className="text-orange-500 text-[10px] uppercase font-bold tracking-widest mb-2">{dish.category}</div>
                 <h3 className="text-xl font-bold text-white mb-3">{dish.name}</h3>
                 <p className="text-gray-400 text-sm mb-6 line-clamp-2">{dish.description}</p>
                 
                 <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gold-500 border-t border-white/10 pt-4 w-full">Rs {dish.price}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
