import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onCartClick: () => void;
  onAdminClick: () => void;
}

export default function Navbar({ onCartClick, onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCartCount, settings } = useApp();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المنيو', href: '#menu' },
    { label: 'آراء الزبائن', href: '#reviews' },
    { label: 'تواصل معنا', href: '#contact' },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-earth-900/95 backdrop-blur-md shadow-2xl shadow-earth-900/30 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-500/40 group-hover:ring-brand-400 transition-all">
              <img src="/Screenshot_from_2026-06-10_13-53-13.png" alt="بيت شويطي" className="w-full h-full object-cover" />
            </div>
            <span className="font-cairo font-extrabold text-xl text-cream-100 group-hover:text-brand-400 transition-colors">
              {settings.restaurant_name || 'بيت شويطي'}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="font-cairo font-semibold text-cream-200 hover:text-brand-400 px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onAdminClick}
              className="font-cairo text-sm text-earth-400 hover:text-cream-200 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all duration-300 mr-2"
            >
              لوحة التحكم
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative bg-brand-600 hover:bg-brand-500 text-white p-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-600/40 active:scale-90"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -left-2 bg-cream-400 text-earth-900 text-xs font-cairo font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-cream-200 hover:text-brand-400 p-2 transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-earth-800/95 backdrop-blur-md rounded-2xl p-4 space-y-1">
            {navItems.map(item => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="block w-full text-right font-cairo font-semibold text-cream-200 hover:text-brand-400 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onAdminClick(); }}
              className="block w-full text-right font-cairo text-sm text-earth-400 hover:text-cream-200 px-4 py-2 rounded-xl hover:bg-white/5 transition-all"
            >
              لوحة التحكم
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
