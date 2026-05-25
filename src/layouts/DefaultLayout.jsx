import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal overflow-x-hidden dark:bg-charcoal dark:text-ivory light-surface-overlay">
      <Navbar />
      <main id="main-content">{children}</main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default DefaultLayout;
