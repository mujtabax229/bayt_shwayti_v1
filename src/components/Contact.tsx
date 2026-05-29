import { Phone, MessageCircle, Instagram, MapPin, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { settings } = useApp();
  const whatsappNum = settings.whatsapp_number || '+9647884222240';
  const instagramUser = settings.instagram_username || 'bait_showaiti';
  const mapLocation = settings.map_location || '33.3128,44.3615';

  return (
    <section id="contact" className="py-16 sm:py-24 bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block font-cairo text-brand-600 font-bold text-sm tracking-wider mb-3 bg-brand-50 px-4 py-1.5 rounded-full">
            تواصل معنا
          </span>
          <h2 className="section-title mb-4">نحنا هنية</h2>
          <p className="font-tajawal text-earth-600 text-lg max-w-xl mx-auto">
            تواصل وياك بأي وقت.. رحبتنا ما تخلص
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <a
              href={`https://wa.me/${whatsappNum.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl p-5 card-hover group border border-earth-100"
            >
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <MessageCircle className="text-green-600 group-hover:text-white transition-colors" size={26} />
              </div>
              <div className="flex-1">
                <h3 className="font-cairo font-bold text-earth-900 text-lg mb-0.5">راسلنا على الواتساب</h3>
                <p className="font-tajawal text-earth-500" dir="ltr">{whatsappNum}</p>
              </div>
            </a>

            <a
              href={`tel:${whatsappNum}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 card-hover group border border-earth-100"
            >
              <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
                <Phone className="text-brand-600 group-hover:text-white transition-colors" size={26} />
              </div>
              <div className="flex-1">
                <h3 className="font-cairo font-bold text-earth-900 text-lg mb-0.5">اتصل بنا</h3>
                <p className="font-tajawal text-earth-500" dir="ltr">{whatsappNum}</p>
              </div>
            </a>

            <a
              href={`https://instagram.com/${instagramUser}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl p-5 card-hover group border border-earth-100"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300">
                <Instagram className="text-pink-600 group-hover:text-white transition-colors" size={26} />
              </div>
              <div className="flex-1">
                <h3 className="font-cairo font-bold text-earth-900 text-lg mb-0.5">تابعنا على الانستغرام</h3>
                <p className="font-tajawal text-earth-500">@{instagramUser}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-earth-100">
              <div className="w-14 h-14 bg-cream-200 rounded-xl flex items-center justify-center">
                <Clock className="text-earth-700" size={26} />
              </div>
              <div>
                <h3 className="font-cairo font-bold text-earth-900 text-lg mb-0.5">ساعات العمل</h3>
                <p className="font-tajawal text-earth-500">يومياً من 11 الصبح لـ 12 بليل</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-earth-100 h-full min-h-[400px]">
            <div className="p-4 bg-earth-800 flex items-center gap-2">
              <MapPin className="text-brand-400" size={18} />
              <span className="font-cairo font-bold text-cream-100">موقعنا على الخريطة</span>
            </div>
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12000!2d${mapLocation.split(',')[1]}!3d${mapLocation.split(',')[0]}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3e2!4v1700000000000`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع بيت شويطي"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
