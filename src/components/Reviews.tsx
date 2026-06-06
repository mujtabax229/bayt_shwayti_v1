import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Reviews() {
  const { reviews } = useApp();

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-gradient-earth relative overflow-hidden">
      <div className="absolute top-10 left-10 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-cream-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block font-cairo text-brand-400 font-bold text-sm tracking-wider mb-3 bg-brand-600/20 px-4 py-1.5 rounded-full">
            آراء زبائننا
          </span>
          <h2 className="font-cairo font-extrabold text-3xl md:text-4xl text-cream-100 mb-4">
            شنو يگولون عنّا
          </h2>
          <p className="font-tajawal text-cream-300/80 text-lg max-w-xl mx-auto">
            رأي زبائننا أحلى شهادة لنّا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 card-hover"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Quote className="text-brand-400/40 mb-3" size={28} />

              <p className="font-tajawal text-cream-200 text-base leading-relaxed mb-5">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-600/30 flex items-center justify-center">
                    <span className="font-cairo font-bold text-brand-300 text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-cairo font-bold text-cream-100">{review.name}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'text-brand-400 fill-brand-400' : 'text-earth-600'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
const [showForm, setShowForm] = useState(false);
        {reviews.length === 0 && (
          <div className="text-center py-8">
            <p className="font-cairo text-cream-400 text-lg">ماكو آراء بعد.. كون أول من يقيم!</p>
          </div>
        )}
        <div className="mt-12 max-w-lg mx-auto">
  {!showForm ? (
    <button onClick={() => setShowForm(true)} className="btn-primary mx-auto block">
      أضف رأيك
    </button>
  ) : (
    <div className="bg-white/10 rounded-2xl p-6 space-y-3">
      <h4 className="font-cairo font-bold text-cream-100 text-center">شاركنا رأيك</h4>
      <input id="rv-name" className="input-field" placeholder="اسمك" />
      <textarea id="rv-comment" className="input-field resize-none h-20" placeholder="رأيك..." />
      <div className="flex justify-center gap-2">
        {[1,2,3,4,5].map(n => (
          <button key={n} id={`star-${n}`} onClick={() => {
            document.querySelectorAll('[id^=star-]').forEach((el,i) => {
              (el as HTMLElement).style.opacity = i < n ? '1' : '0.3';
            });
            (document.getElementById('rv-rating') as HTMLInputElement).value = String(n);
          }} className="text-brand-400 text-2xl">★</button>
        ))}
      </div>
      <input type="hidden" id="rv-rating" defaultValue="5" />
      <button className="btn-primary w-full" onClick={async () => {
        const name = (document.getElementById('rv-name') as HTMLInputElement).value;
        const comment = (document.getElementById('rv-comment') as HTMLTextAreaElement).value;
        const rating = Number((document.getElementById('rv-rating') as HTMLInputElement).value);
        if (!name || !comment) return;
        await supabase.from('reviews').insert([{ name, comment, rating }]);
        setShowForm(false);
        window.location.reload();
      }}>إرسال</button>
    </div>
  )}
</div>
      </div>
    </section>
  );
}
