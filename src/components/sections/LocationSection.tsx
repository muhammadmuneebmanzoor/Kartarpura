import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

export function LocationSection() {
  return (
    <section id="contact" className="py-24 bg-dark-900 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-dark-900 pointer-events-none z-0"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            >
              Find <span className="text-gradient">Us</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 font-light text-lg leading-relaxed mb-10"
            >
              Located in the historic food street of Rawalpindi. We are ready to serve you 24 hours a day, 7 days a week.
            </motion.p>

            <div className="flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-gold-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Our Location</h4>
                  <p className="text-gray-400">Kartarpura Street Food,<br/>Kartarpura, Rawalpindi,<br/>Punjab, Pakistan</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Clock className="text-orange-500 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Opening Hours</h4>
                  <p className="text-gray-400">Monday - Sunday<br/>Open 24 Hours</p>
                </div>
              </motion.div>
            </div>

            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Kartarpura+Food+Street+Rawalpindi"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-xl transition-all uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer inline-flex shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </motion.a>
          </div>

          <div className="flex-1 w-full min-h-[400px] bg-[#121212] rounded-2xl overflow-hidden border border-white/10 relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13286.20888251214!2d73.056088!3d33.621432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df9489f6645db9%3A0x6e2df4da63c5d79!2sKartarpura%20Food%20Street!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
             <div className="absolute inset-0 pointer-events-none border-[12px] border-dark-900/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
