import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-gold-500 rounded-lg flex items-center justify-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils w-6 h-6"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
              </div>
              <span className="text-xl font-bold tracking-tight uppercase">Kartarpura <span className="text-orange-500">Street</span></span>
            </Link>
            <p className="text-gray-400 font-light text-sm leading-relaxed">
              Experience the authentic taste of Rawalpindi. We bring traditional street food heritage to a premium dining experience. Serving 24 hours.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-colors text-white/80">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-colors text-white/80">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-black transition-colors text-white/80">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white tracking-tight">Contact Us</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <p>Kartarpura Street Food,<br />Kartarpura, Rawalpindi,<br />Punjab, Pakistan</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <p>+92 300 1234567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <p>info@kartarpura.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white tracking-tight">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400 font-light">
              <li><Link to="/menu" className="hover:text-orange-500 transition-colors">Our Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-orange-500 transition-colors">Reservations</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/admin" className="hover:text-orange-500 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white tracking-tight">Opening Hours</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-gray-400 font-light">
                <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold text-white">Monday - Sunday</span>
                  <span>24 Hours Open</span>
                  <span className="text-orange-500 mt-1 uppercase text-[10px] tracking-widest font-bold">Breakfast 6AM - 11AM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Kartarpura Street Food. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <span>Enterprise Dining Platform</span>
            <span>Made with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
