import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.includes('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const [route, hash] = path.split('#');
      if (location.pathname !== (route || '/')) {
        navigate(route || '/');
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Reviews', path: '/#reviews' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
      scrolled ? 'bg-dark-900/90 backdrop-blur-md border-white/10 py-4 shadow-lg' : 'bg-transparent py-6'
    )}>
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-gold-500 rounded-lg flex items-center justify-center text-black group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils w-6 h-6"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </div>
          <span className="text-xl font-bold tracking-tight uppercase hidden sm:block">Kartarpura <span className="text-orange-500">Street</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.path.includes('#') ? (
              <a key={link.name} href={link.path} onClick={(e) => handleNavClick(e, link.path)} className="text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors uppercase tracking-widest">
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => {
                  if (location.pathname === link.path) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" aria-label="Cart" className="text-gray-300 hover:text-orange-500 transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/reservation" className="hidden lg:block px-6 py-2.5 bg-orange-500 text-black font-bold tracking-widest rounded-full hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-xs uppercase">
            BOOK A TABLE
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-dark-900 border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl glass"
        >
          {navLinks.map((link) => (
            link.path.includes('#') ? (
               <a 
                key={link.name} 
                href={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className="text-lg font-medium text-white/90 hover:text-orange-500 transition-colors"
               >
                 {link.name}
               </a>
            ) : (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === link.path) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="text-lg font-medium text-white/90 hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </Link>
            )
          ))}
          <div className="h-px bg-white/10 my-2" />
          <Link to="/reservation" onClick={() => setMobileMenuOpen(false)} className="px-5 py-3 bg-orange-500 text-black font-bold rounded-lg text-center uppercase tracking-widest">
            Book a Table
          </Link>
        </motion.div>
      )}
    </header>
  );
}
