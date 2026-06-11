import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// @ts-ignore
import sufiHeroImg from '../../assets/images/sufi_naan_center_hero_1781107113752.png';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video / Image Fallback */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-dark-900/70 z-10 
          bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
          from-transparent via-dark-900/80 to-dark-900">
        </div>
        <img 
          src={sufiHeroImg} 
          alt="Sufi Naan Center" 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
          style={{ backgroundColor: '#000000' }}
        />
        {/* Synthetic Smoke/Lighting Effects */}
        <div className="absolute inset-0 z-10 opacity-30 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] blur-sm"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center mt-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.2em] text-gold-500 font-semibold">
            EST. 1960
          </span>
          <div className="h-[1px] w-12 bg-white/20 hidden sm:block"></div>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden sm:block">Rawalpindi's Iconic Food Street</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl text-center font-bold tracking-tight text-white leading-[0.95] mb-6 max-w-5xl"
        >
          Experience Rawalpindi's
          <span className="block text-gradient">Most Famous Street Food</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mb-12 font-light leading-relaxed"
        >
          Authentic Nihari, Halwa Puri, Karahi, BBQ and Traditional Pakistani Flavors Served 24 Hours.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link to="/menu" className="px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group">
            Explore Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/reservation" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center">
            Book a Table
          </Link>
        </motion.div>

        {/* Hero Stats */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="hidden md:flex absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-max gap-8 lg:gap-16 bg-white/5 backdrop-blur-md border border-white/10 py-6 px-12 rounded-3xl z-30"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold flex items-center gap-1">4.3 <span className="text-gold-500 text-xl">★</span></span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold mt-1">Rating</span>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl text-white font-bold mb-1">1900+</span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold mt-1">Reviews</span>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl text-white font-bold mb-1">24/7</span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold mt-1">Open Time</span>
          </div>
          <div className="w-px bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-3xl text-white font-bold mb-1">RWP</span>
            <span className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold mt-1">Location</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
