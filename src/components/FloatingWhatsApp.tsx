import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FloatingWhatsApp() {
  const { settings } = useApp();
  const whatsappNum = settings.whatsapp_number || '+9647884222240';

  return (
    <a
      href={`https://wa.me/${whatsappNum.replace(/[^0-9]/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-110 active:scale-95 animate-float"
      aria-label="تواصل واتساب"
    >
      <MessageCircle size={28} />
    </a>
  );
}
