import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Edit3, Tag, Settings, Star, Lock } from 'lucide-react';
import { supabase, Product, Review, SettingsMap } from '../lib/supabase';
import { useApp } from '../context/AppContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'products' | 'reviews' | 'settings';

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { products, reviews, settings, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [password, setPassword] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [pName, setPName] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pPrice, setPPrice] = useState(0);
  const [pImage, setPImage] = useState('');
  const [pCategory, setPCategory] = useState('مشويات');
  const [pDate, setPDate] = useState('');
  const [pAvailable, setPAvailable] = useState(true);
  const [pSortOrder, setPSortOrder] = useState(0);

  const [editSettings, setEditSettings] = useState<SettingsMap>({});

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rName, setRName] = useState('');
  const [rRating, setRRating] = useState(5);
  const [rComment, setRComment] = useState('');

  useEffect(() => {
    setEditSettings({ ...settings });
  }, [settings]);

const showMessage = (msg: string) => {
  setMessage(msg);
  setTimeout(() => setMessage(''), 3000);
};
  
 const handleLogin = async () => {
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'admin_password')
    .single();
  
  if (data?.value === password) {
    setIsAuthed(true);
  } else {
    showMessage('كلمة المرور غلط');
  }
};

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setPName('');
    setPDesc('');
    setPPrice(0);
    setPImage('');
    setPCategory('مشويات');
    setPDate('');
    setPAvailable(true);
    setPSortOrder(0);
    setShowProductForm(false);
  };

  const editProduct = (p: Product) => {
    setEditingProduct(p);
    setPName(p.name);
    setPDesc(p.description);
    setPPrice(p.price);
    setPImage(p.image_url);
    setPCategory(p.category);
    setPDate(p.available_date || '');
    setPAvailable(p.is_available);
    setPSortOrder(p.sort_order);
    setShowProductForm(true);
  };

  const saveProduct = async () => {
    setSaving(true);
    try {
      const data = {
        name: pName,
        description: pDesc,
        price: pPrice,
        image_url: pImage,
        category: pCategory,
        available_date: pDate || null,
        is_available: pAvailable,
        sort_order: pSortOrder,
        updated_at: new Date().toISOString(),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(data)
          .eq('id', editingProduct.id);
        if (error) throw error;
        showMessage('تم تعديل الصنف');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([data]);
        if (error) throw error;
        showMessage('تم إضافة الصنف');
      }
      resetProductForm();
      await refreshData();
    } catch (err) {
      console.error(err);
      showMessage('صار خطأ، حاول مرة ثانية');
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('متأكد تريد حذف هذا الصنف؟')) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      showMessage('تم حذف الصنف');
      await refreshData();
    } catch (err) {
      console.error(err);
      showMessage('صار خطأ بالحذف');
    } finally {
      setSaving(false);
    }
  };

  const resetReviewForm = () => {
    setEditingReview(null);
    setRName('');
    setRRating(5);
    setRComment('');
    setShowReviewForm(false);
  };

  const editReview = (r: Review) => {
    setEditingReview(r);
    setRName(r.name);
    setRRating(r.rating);
    setRComment(r.comment);
    setShowReviewForm(true);
  };

  const saveReview = async () => {
    setSaving(true);
    try {
      const data = { name: rName, rating: rRating, comment: rComment };
      if (editingReview) {
        const { error } = await supabase.from('reviews').update(data).eq('id', editingReview.id);
        if (error) throw error;
        showMessage('تم تعديل الرأي');
      } else {
        const { error } = await supabase.from('reviews').insert([data]);
        if (error) throw error;
        showMessage('تم إضافة الرأي');
      }
      resetReviewForm();
      await refreshData();
    } catch (err) {
      console.error(err);
      showMessage('صار خطأ');
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('متأكد تريد حذف هذا الرأي؟')) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) throw error;
      showMessage('تم حذف الرأي');
      await refreshData();
    } catch (err) {
      console.error(err);
      showMessage('صار خطأ بالحذف');
    } finally {
      setSaving(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(editSettings)) {
        const { error } = await supabase
          .from('settings')
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        if (error) throw error;
      }
      showMessage('تم حفظ الإعدادات');
      await refreshData();
    } catch (err) {
      console.error(err);
      showMessage('صار خطأ بحفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: 'products', label: 'المنتجات', icon: <Tag size={16} /> },
    { key: 'reviews', label: 'الآراء', icon: <Star size={16} /> },
    { key: 'settings', label: 'الإعدادات', icon: <Settings size={16} /> },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-earth-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-[520px] bg-white z-50 shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-gradient-earth p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Settings className="text-cream-200" size={22} />
            <h2 className="font-cairo font-bold text-xl text-cream-100">لوحة التحكم</h2>
          </div>
          <button
            onClick={onClose}
            className="text-cream-200 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthed ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <div className="text-center mb-8">
                <Lock className="mx-auto text-earth-400 mb-4" size={48} />
                <h3 className="font-cairo font-bold text-xl text-earth-800 mb-2">دخول لوحة التحكم</h3>
                <p className="font-tajawal text-earth-500 text-sm">اكتب كلمة المرور للدخول</p>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="كلمة المرور"
                className="input-field text-center mb-4"
              />
              <button
                onClick={handleLogin}
                className="btn-primary w-full py-3"
              >
                دخول
              </button>
              {message && (
                <p className="font-cairo text-red-500 text-sm text-center mt-3">{message}</p>
              )}
              <p className="font-tajawal text-earth-400 text-xs text-center mt-4">
                كلمة المرور الافتراضية: ********
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex border-b border-earth-200 shrink-0">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-cairo font-semibold text-sm transition-all ${
                    activeTab === tab.key
                      ? 'text-brand-600 border-b-2 border-brand-600 bg-brand-50'
                      : 'text-earth-500 hover:text-earth-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {message && (
              <div className="mx-4 mt-3 bg-green-50 border border-green-200 text-green-700 font-cairo text-sm px-4 py-2 rounded-xl">
                {message}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'products' && (
                <div>
                  <button
                    onClick={() => setShowProductForm(true)}
                    className="btn-primary flex items-center gap-2 mb-4 text-sm py-2 px-4"
                  >
                    <Plus size={16} />
                    إضافة صنف جديد
                  </button>

                  {showProductForm && (
                    <div className="bg-earth-50 rounded-2xl p-4 mb-4 border border-earth-200 space-y-3">
                      <h4 className="font-cairo font-bold text-earth-800">
                        {editingProduct ? 'تعديل الصنف' : 'صنف جديد'}
                      </h4>
                      <div>
                        <label className="font-cairo text-sm text-earth-600 mb-1 block">اسم الصنف</label>
                        <input value={pName} onChange={e => setPName(e.target.value)} className="input-field" placeholder="مثلاً: كباب عراقي" />
                      </div>
                      <div>
                        <label className="font-cairo text-sm text-earth-600 mb-1 block">الوصف</label>
                        <textarea value={pDesc} onChange={e => setPDesc(e.target.value)} className="input-field resize-none h-20" placeholder="وصف قصير للصنف" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-cairo text-sm text-earth-600 mb-1 block">السعر (د.ع)</label>
                        <input
  type="number"
  value={pPrice === 0 ? '' : pPrice}
  onChange={e => setPPrice(e.target.value === '' ? 0 : Number(e.target.value))}
  className="input-field"
  placeholder="0"
/>
                        </div>
                        <div>
                          <label className="font-cairo text-sm text-earth-600 mb-1 block">الترتيب</label>
                          <input type="number" value={pSortOrder} onChange={e => setPSortOrder(Number(e.target.value))} className="input-field" />
                        </div>
                      </div>
                      <div>
                        <label className="font-cairo text-sm text-earth-600 mb-1 block">الصورة</label>
<div className="flex gap-2">
  <input value={pImage} onChange={e => setPImage(e.target.value)} className="input-field" dir="ltr" placeholder="https://..." />
  <label className="btn-primary text-sm py-2 px-3 cursor-pointer shrink-0">
    📷
    <input type="file" accept="image/*" className="hidden" onChange={async e => {
      const file = e.target.files?.[0];
      if (!file) return;
      const { data, error } = await supabase.storage.from('product-images').upload(`${Date.now()}-${file.name}`, file);
      if (!error && data) {
        const { data: url } = supabase.storage.from('product-images').getPublicUrl(data.path);
        setPImage(url.publicUrl);
      }
    }} />
  </label>
</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="font-cairo text-sm text-earth-600 mb-1 block">القسم</label>
                          <select value={pCategory} onChange={e => setPCategory(e.target.value)} className="input-field">
                            <option>مشويات</option>
                            <option>أكلات عراقية</option>
                            <option>مقبلات</option>
                            <option>شوربات</option>
                            <option>مشروبات</option>
                            <option>حلويات</option>
                          </select>
                        </div>
                        <div>
                          <label className="font-cairo text-sm text-earth-600 mb-1 block">تاريخ (اختياري)</label>
                          <input type="date" value={pDate} onChange={e => setPDate(e.target.value)} className="input-field" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={pAvailable}
                          onChange={e => setPAvailable(e.target.checked)}
                          className="w-4 h-4 rounded border-earth-300 text-brand-600 focus:ring-brand-500"
                        />
                        <label className="font-cairo text-sm text-earth-600">متوفر</label>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveProduct} disabled={saving} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                          <Save size={14} />
                          {saving ? 'جاري الحفظ...' : 'حفظ'}
                        </button>
                        <button onClick={resetProductForm} className="font-cairo text-sm text-earth-500 hover:text-earth-700 py-2 px-4">
                          إلغاء
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-earth-100">
                        <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-cairo font-bold text-earth-900 text-sm truncate">{p.name}</h5>
                          <p className="font-cairo text-brand-600 text-xs">{p.price.toLocaleString('ar-IQ')} د.ع - {p.category}</p>
                        </div>
                        <button onClick={() => editProduct(p)} className="text-earth-400 hover:text-brand-600 p-1.5 transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="text-earth-400 hover:text-red-500 p-1.5 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="btn-primary flex items-center gap-2 mb-4 text-sm py-2 px-4"
                  >
                    <Plus size={16} />
                    إضافة رأي جديد
                  </button>

                  {showReviewForm && (
                    <div className="bg-earth-50 rounded-2xl p-4 mb-4 border border-earth-200 space-y-3">
                      <h4 className="font-cairo font-bold text-earth-800">
                        {editingReview ? 'تعديل الرأي' : 'رأي جديد'}
                      </h4>
                      <div>
                        <label className="font-cairo text-sm text-earth-600 mb-1 block">الاسم</label>
                        <input value={rName} onChange={e => setRName(e.target.value)} className="input-field" />
                      </div>
                      <div>
                        <label className="font-cairo text-sm text-earth-600 mb-1 block">التقييم (1-5)</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(n => (
                            <button
                              key={n}
                              onClick={() => setRRating(n)}
                              className={`p-2 rounded-lg transition-all ${n <= rRating ? 'bg-brand-100 text-brand-600' : 'bg-earth-100 text-earth-400'}`}
                            >
                              <Star size={20} className={n <= rRating ? 'fill-brand-600' : ''} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="font-cairo text-sm text-earth-600 mb-1 block">التعليق</label>
                        <textarea value={rComment} onChange={e => setRComment(e.target.value)} className="input-field resize-none h-20" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={saveReview} disabled={saving} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                          <Save size={14} />
                          {saving ? 'جاري الحفظ...' : 'حفظ'}
                        </button>
                        <button onClick={resetReviewForm} className="font-cairo text-sm text-earth-500 hover:text-earth-700 py-2 px-4">
                          إلغاء
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {reviews.map(r => (
                      <div key={r.id} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-earth-100">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-cairo font-bold text-earth-900 text-sm">{r.name}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} size={10} className={i < r.rating ? 'text-brand-500 fill-brand-500' : 'text-earth-300'} />
                              ))}
                            </div>
                          </div>
                          <p className="font-tajawal text-earth-600 text-xs leading-relaxed">{r.comment}</p>
                        </div>
                        <button onClick={() => editReview(r)} className="text-earth-400 hover:text-brand-600 p-1.5 transition-colors shrink-0">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => deleteReview(r.id)} className="text-earth-400 hover:text-red-500 p-1.5 transition-colors shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <h4 className="font-cairo font-bold text-earth-800 flex items-center gap-2">
                    <Settings size={18} />
                    إعدادات المطعم
                  </h4>
                  <p className="font-tajawal text-earth-500 text-sm">غيّر الإعدادات وحفظها.. بتنطبق على الموقع فوراً</p>

                  <div className="space-y-3">
                    <div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">اسم المطعم</label>
                      <input
                        value={editSettings.restaurant_name || ''}
                        onChange={e => setEditSettings(prev => ({ ...prev, restaurant_name: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">رقم الواتساب</label>
<div className="flex gap-2" dir="ltr">
  <span className="bg-earth-100 border-2 border-earth-200 rounded-xl px-3 flex items-center font-cairo text-earth-700 shrink-0">+964</span>
  <input
    value={(editSettings.whatsapp_number || '').replace('+964', '')}
    onChange={e => {
      const digits = e.target.value.replace(/\D/g, '');
      setEditSettings(prev => ({ ...prev, whatsapp_number: '+964' + digits }));
    }}
    className="input-field"
    placeholder="7XXXXXXXX"
    maxLength={10}
  />
</div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">يوزر الانستغرام</label>
                      <input
                        value={editSettings.instagram_username || ''}
                        onChange={e => setEditSettings(prev => ({ ...prev, instagram_username: e.target.value }))}
                        className="input-field"
                        dir="ltr"
                        placeholder="username"
                      />
                    </div>
                    <div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">عنوان الصفحة الرئيسية</label>
                      <input
                        value={editSettings.hero_title || ''}
                        onChange={e => setEditSettings(prev => ({ ...prev, hero_title: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">وصف الصفحة الرئيسية</label>
                      <textarea
                        value={editSettings.hero_subtitle || ''}
                        onChange={e => setEditSettings(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                        className="input-field resize-none h-20"
                      />
                    </div>
                    <div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">نص زر الطلب</label>
                      <input
                        value={editSettings.hero_button_text || ''}
                        onChange={e => setEditSettings(prev => ({ ...prev, hero_button_text: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="font-cairo text-sm text-earth-600 mb-1 block">موقع الخريطة (خط عرض, خط طول)</label>
                      <input
                        value={editSettings.map_location || ''}
                        onChange={e => setEditSettings(prev => ({ ...prev, map_location: e.target.value }))}
                        className="input-field"
                        dir="ltr"
                        placeholder="33.3128,44.3615"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3"
                  >
                    <Save size={18} />
                    {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
