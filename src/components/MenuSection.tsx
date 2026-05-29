import { useState, useMemo } from 'react';
import { Plus, Minus, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MenuSection() {
  const { products, addToCart, updateQuantity, cart } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  const categories = useMemo(() => {
    const cats = ['الكل', ...Array.from(new Set(products.map(p => p.category)))];
    return cats;
  }, [products]);

  const filtered = useMemo(() => {
    if (activeCategory === 'الكل') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

  const getQuantity = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    return item?.quantity || 0;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ar-IQ');
  };

  return (
    <section id="menu" className="py-16 sm:py-24 bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block font-cairo text-brand-600 font-bold text-sm tracking-wider mb-3 bg-brand-50 px-4 py-1.5 rounded-full">
            منيو بيت شويطي
          </span>
          <h2 className="section-title mb-4">أصناف تفتح النفس</h2>
          <p className="font-tajawal text-earth-600 text-lg max-w-xl mx-auto">
            كل صنف محضر بأيادي خبيرة وبنكهة عراقية أصيلة
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-cairo font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-105'
                  : 'bg-white text-earth-700 hover:bg-brand-50 hover:text-brand-600 border border-earth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((product, index) => {
            const qty = getQuantity(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span className="absolute top-3 right-3 bg-earth-900/80 backdrop-blur-sm text-cream-200 font-cairo text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  {product.available_date && (
                    <span className="absolute top-3 left-3 bg-brand-600/90 backdrop-blur-sm text-white font-cairo text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(product.available_date).toLocaleDateString('ar-IQ')}
                    </span>
                  )}

                  <div className="absolute bottom-3 right-3 bg-brand-600 text-white font-cairo font-extrabold text-lg px-4 py-1.5 rounded-xl shadow-lg">
                    {formatPrice(product.price)} <span className="text-sm font-semibold">د.ع</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-cairo font-bold text-xl text-earth-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="font-tajawal text-earth-600 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    {qty === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5 rounded-xl"
                      >
                        <Plus size={16} />
                        أضف للسلة
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 bg-brand-50 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, qty - 1)}
                          className="bg-white hover:bg-red-50 text-earth-800 hover:text-red-600 p-1.5 rounded-lg transition-all active:scale-90"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-cairo font-bold text-brand-700 min-w-[2rem] text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, qty + 1)}
                          className="bg-brand-600 hover:bg-brand-500 text-white p-1.5 rounded-lg transition-all active:scale-90"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}

                    <span className="font-cairo font-extrabold text-brand-600 text-lg">
                      {formatPrice(product.price * (qty || 1))}
                      <span className="text-xs font-semibold text-earth-500 mr-1">د.ع</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-cairo text-earth-500 text-lg">ماكو أصناف بهالقسم حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
}
