import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen bg-ivory text-charcoal overflow-x-hidden dark:bg-charcoal dark:text-ivory">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
