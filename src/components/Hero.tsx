import { ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { settings } = useApp();

  const handleScroll = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/logo.jpg"
          alt="أكلات عراقية"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/50 to-earth-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-900/40 via-transparent to-earth-900/40" />
      </div>

      <div className="absolute top-20 right-10 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-10 w-40 h-40 bg-cream-400/10 rounded-full blur-3xl animate-float stagger-3" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
          <span className="font-cairo text-cream-200 text-sm font-semibold">مطعم عراقي أصيل</span>
        </div>

        <h1 className="font-cairo font-extrabold text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6 animate-slide-up text-shadow">
          {settings.hero_title || 'مذاق الأصالة من بيت شويطي'}
        </h1>

        <p className="font-tajawal text-lg sm:text-xl md:text-2xl text-cream-200/90 max-w-2xl mx-auto mb-10 animate-slide-up stagger-2 leading-relaxed">
          {settings.hero_subtitle || 'أطيب المشويات والأكلات العراقية بنكهات تراثية وجودة تفتح النفس'}
        </p>

        <button
          onClick={handleScroll}
          className="btn-primary text-lg sm:text-xl px-10 py-4 animate-slide-up stagger-3 rounded-2xl"
        >
          {settings.hero_button_text || 'اطلب هسه'}
        </button>

        <button
          onClick={handleScroll}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-cream-300/60 hover:text-cream-100 transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}
