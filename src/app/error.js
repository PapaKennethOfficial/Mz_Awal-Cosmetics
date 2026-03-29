"use client";

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

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
        <h1 style={{ fontSize: '4rem', color: '#cc0000', fontFamily: '"Playfair Display", serif', marginBottom: '10px' }}>Oops!</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--charcoal)' }}>Something went wrong!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '400px' }}>
          An unexpected error has occurred. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary"
          style={{ padding: '10px 20px', border: 'none', cursor: 'pointer' }}
        >
          Try again
        </button>
      </div>
      <Footer />
    </>
  );
}
