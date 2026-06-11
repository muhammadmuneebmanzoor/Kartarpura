import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
             <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
                 alt="Kartarpura chef preparing food" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent"></div>
             </div>
             
             {/* Floating Stats Card */}
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="absolute -bottom-8 -right-8 md:-right-16 glass p-6 rounded-2xl border border-white/20 z-20 hidden sm:block max-w-[250px]"
             >
               <h4 className="text-4xl font-bold text-orange-500 mb-2 tracking-tight">60+</h4>
               <p className="text-gray-300 font-medium leading-tight text-sm">Years of preserving authentic Rawalpindi street food heritage.</p>
             </motion.div>
          </div>

          <div className="flex flex-col">
             <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-[1px] bg-orange-500"></span>
              <span className="text-orange-500 uppercase tracking-[0.2em] text-[10px] items-center font-bold hidden sm:block">Our Story</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
            >
              A Legacy of <br/><span className="text-gradient">Authentic Taste</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-light text-lg leading-relaxed mb-6"
            >
              Born in the vibrant heart of Kartarpura, our journey began with a simple mission: to serve the most authentic, soul-comforting Pakistani cuisine. What started as an humble stall has blossomed into Rawalpindi's premier street food destination.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 font-light text-lg leading-relaxed mb-12"
            >
              Our recipes are heirlooms, passed down through generations. From our 24-hour slow-cooked Nihari to the weekend frenzy of Halwa Puri, every dish is crafted with uncompromising passion, premium local spices, and traditional cooking methods that cannot be rushed.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10"
            >
              <div>
                <h5 className="text-3xl font-bold text-white mb-2 tracking-tight">4.3 <span className="text-gold-500 text-lg">★</span></h5>
                <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-widest">Google Rating</p>
              </div>
              <div>
                <h5 className="text-3xl font-bold text-white mb-2 tracking-tight">24/7</h5>
                <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-widest">Always Serving</p>
              </div>
              <div>
                <h5 className="text-3xl font-bold text-white mb-2 tracking-tight">1.9k+</h5>
                <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-widest">Verified Reviews</p>
              </div>
              <div>
                <h5 className="text-3xl font-bold text-white mb-2 tracking-tight">15+</h5>
                <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-widest">Master Chefs</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
