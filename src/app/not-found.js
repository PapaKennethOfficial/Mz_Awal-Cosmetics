import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'var(--cream)'
      }}>
        <h1 style={{ fontSize: '6rem', color: 'var(--terracotta)', fontFamily: '"Playfair Display", serif', marginBottom: '10px' }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--charcoal)' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '400px' }}>
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-block' }}>
          Return to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
