import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { settings } = useApp();

  return (
    <footer className="bg-earth-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
              <span className="text-white font-cairo font-extrabold text-sm">ب</span>
            </div>
            <span className="font-cairo font-bold text-cream-200">
              {settings.restaurant_name || 'بيت شويطي'}
            </span>
          </div>

          <p className="font-tajawal text-earth-500 text-sm flex items-center gap-1">
            صنع بكل <Heart size={14} className="text-red-500 fill-red-500 inline" /> لكل عراقي يحب الأكل الأصيل
          </p>

          <p className="font-tajawal text-earth-600 text-xs">
            جميع الحقوق محفوظة {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
