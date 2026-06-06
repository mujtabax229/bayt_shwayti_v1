import { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';

export default function Reviews() {
  const { reviews, refreshData } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [rName, setRName] = useState('');
  const [rComment, setRComment] = useState('');
  const [rRating, setRRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rName || !rComment) return;
    setSubmitting(true);
    await supabase.from('reviews').insert([{ name: rName, comment: rComment, rating: rRating }]);
    setRName('');
    setRComment('');
    setRRating(5);
    setShowForm(false);
    setSubmitting(false);
    await refreshData();
  };

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
              <input
                value={rName}
                onChange={e => setRName(e.target.value)}
                className="input-field"
                placeholder="اسمك"
              />
              <textarea
                value={rComment}
                onChange={e => setRComment(e.target.value)}
                className="input-field resize-none h-20"
                placeholder="رأيك..."
              />
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRRating(n)}
                    className={`text-2xl transition-all ${n <= rRating ? 'text-brand-400' : 'text-earth-600'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary w-full"
                >
                  {submitting ? 'جاري الإرسال...' : 'إرسال'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="font-cairo text-cream-300 hover:text-white py-2 px-4 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
