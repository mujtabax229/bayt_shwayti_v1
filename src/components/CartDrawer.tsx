import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageSquare, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'cart' | 'delivery' | 'confirmation';

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, settings } = useApp();
  const [step, setStep] = useState<Step>('cart');
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [address, setAddress] = useState('');

  const total = getCartTotal();
  const formatPrice = (price: number) => price.toLocaleString('ar-IQ');

  const handleClose = () => {
    onClose();
    if (step === 'confirmation') {
      clearCart();
      setStep('cart');
      setNote('');
      setName('');
      setPhone('');
      setGovernorate('');
      setAddress('');
    }
  };

  const handleConfirm = () => {
    setStep('confirmation');
    const whatsappNum = settings.whatsapp_number?.replace(/[^0-9+]/g, '') || '+9647884222240';
    const orderItems = cart.map(item => `${item.product.name} x${item.quantity} - ${formatPrice(item.product.price * item.quantity)} د.ع`).join('\n');
    const message = `طلب جديد من بيت شويطي\n\n${orderItems}\n\nالمجموع: ${formatPrice(total)} د.ع\n${note ? `ملاحظة: ${note}\n` : ''}\nمعلومات التوصيل:\nالاسم: ${name}\nالهاتف: ${phone}\nالمحافظة: ${governorate}\nالعنوان: ${address}`;
    const url = `https://wa.me/${whatsappNum.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-earth-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="bg-gradient-earth p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-cream-200" size={22} />
            <h2 className="font-cairo font-bold text-xl text-cream-100">
              {step === 'cart' ? 'سلة الطلب' : step === 'delivery' ? 'معلومات التوصيل' : 'تأكيد الطلب'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-cream-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === 'cart' && (
            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="mx-auto text-earth-300 mb-4" size={48} />
                  <p className="font-cairo text-earth-500 text-lg">السلة فاضية</p>
                  <p className="font-tajawal text-earth-400 text-sm mt-1">أضف أصناف من المنيو</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 bg-earth-50 rounded-xl p-3 animate-slide-right"
                    >
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-cairo font-bold text-earth-900 text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="font-cairo text-brand-600 font-bold text-sm mt-0.5">
                          {formatPrice(item.product.price * item.quantity)} د.ع
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="bg-white hover:bg-red-50 text-earth-600 hover:text-red-500 p-1 rounded-md transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-cairo font-bold text-earth-800 min-w-[1.5rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="bg-brand-600 hover:bg-brand-500 text-white p-1 rounded-md transition-all"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="mr-auto text-earth-400 hover:text-red-500 p-1 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4">
                    <label className="font-cairo font-semibold text-earth-700 text-sm mb-2 block">
                      <MessageSquare size={14} className="inline ml-1" />
                      ملاحظة على الطلب
                    </label>
                    <textarea
                      value={note}
                      onChange={e => setNote(e.target.value)}
                      placeholder="مثلاً: بدون بصل، حار زيادة..."
                      className="input-field text-sm resize-none h-20"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 'delivery' && (
            <div className="p-4 space-y-4">
              <div>
                <label className="font-cairo font-semibold text-earth-700 text-sm mb-2 block">الاسم</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="اسمك الكامل"
                  className="input-field"
                />
              </div>
              <div>
                <label className="font-cairo font-semibold text-earth-700 text-sm mb-2 block">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="07XXXXXXXX"
                  className="input-field"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="font-cairo font-semibold text-earth-700 text-sm mb-2 block">المحافظة</label>
                <select
                  value={governorate}
                  onChange={e => setGovernorate(e.target.value)}
                  className="input-field"
                >
                  <option value="">اختر المحافظة</option>
                  <option value="بغداد">بغداد</option>
                  <option value="البصرة">البصرة</option>
                  <option value="نينوى">نينوى</option>
                  <option value="أربيل">أربيل</option>
                  <option value="النجف">النجف</option>
                  <option value="كربلاء">كربلاء</option>
                  <option value="ذي قار">ذي قار</option>
                  <option value="ديالى">ديالى</option>
                  <option value="كركوك">كركوك</option>
                  <option value="الأنبار">الأنبار</option>
                  <option value="بابل">بابل</option>
                  <option value="واسط">واسط</option>
                  <option value="صلاح الدين">صلاح الدين</option>
                  <option value="القادسية">القادسية</option>
                  <option value="ميسان">ميسان</option>
                  <option value="المثنى">المثنى</option>
                  <option value="دهوك">دهوك</option>
                  <option value="السليمانية">السليمانية</option>
                </select>
              </div>
              <div>
                <label className="font-cairo font-semibold text-earth-700 text-sm mb-2 block">العنوان الكامل</label>
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="المنطقة، الشارع، أقرب نقطة دالة..."
                  className="input-field resize-none h-24"
                />
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="font-cairo font-bold text-2xl text-earth-900 mb-3">وصلنا طلبك</h3>
              <p className="font-tajawal text-earth-600 text-lg leading-relaxed mb-6">
                راح نتواصل وياك بأقرب وقت لتأكيد التوصيل
              </p>
              <p className="font-cairo text-brand-600 font-bold text-lg">
                {formatPrice(total)} د.ع
              </p>
            </div>
          )}
        </div>

        {step === 'cart' && cart.length > 0 && (
          <div className="border-t border-earth-200 p-4 bg-white shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className="font-cairo font-bold text-earth-700">المجموع</span>
              <span className="font-cairo font-extrabold text-2xl text-brand-600">
                {formatPrice(total)} <span className="text-sm">د.ع</span>
              </span>
            </div>
            <button
              onClick={() => setStep('delivery')}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-3.5"
            >
              إكمال الطلب
              <ArrowLeft size={18} />
            </button>
          </div>
        )}

        {step === 'delivery' && (
          <div className="border-t border-earth-200 p-4 bg-white shrink-0">
            <button
              onClick={() => setStep('cart')}
              className="w-full font-cairo text-earth-500 hover:text-earth-700 py-2 mb-2 transition-colors"
            >
              رجوع للسلة
            </button>
            <button
              onClick={handleConfirm}
              disabled={!name || !phone || !governorate || !address}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              تأكيد الطلب
              <CheckCircle size={18} />
            </button>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="border-t border-earth-200 p-4 bg-white shrink-0">
            <button
              onClick={handleClose}
              className="btn-secondary w-full py-3.5"
            >
              تمام
            </button>
          </div>
        )}
      </div>
    </>
  );
}
