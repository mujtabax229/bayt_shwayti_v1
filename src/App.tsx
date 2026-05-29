import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-earth-50 font-cairo">
      <Navbar
        onCartClick={() => setCartOpen(true)}
        onAdminClick={() => setAdminOpen(true)}
      />
      <Hero />
      <MenuSection />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
