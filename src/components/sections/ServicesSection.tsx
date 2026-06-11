import { motion } from 'framer-motion';

export function ServicesSection() {
  const services = [
    { title: 'Dine In', desc: 'Experience the vibrant atmosphere of Kartarpura street.', icon: '🍽️' },
    { title: 'No Contact Delivery', desc: 'Premium food delivered safely to your doorstep.', icon: '🛵' },
    { title: 'Drive Through', desc: 'Quick and convenient pickup without leaving your car.', icon: '🚗' },
    { title: 'Event Catering', desc: 'Bring the taste of Kartarpura to your special occasions.', icon: '🎉' },
  ];

  return (
    <section className="py-24 bg-dark-900 border-y border-white/5 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            >
              Premium <span className="text-gradient">Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 font-light text-lg leading-relaxed mb-10"
            >
              Whether you want to soak in the bustling street ambiance or enjoy our delicacies from the comfort of your home, we've got you covered.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-white font-bold text-lg mb-2">{service.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant dining area" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
