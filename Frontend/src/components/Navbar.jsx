import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, Menu } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="glass" style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            zIndex: 1000,
            borderRadius: '20px'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                    background: 'var(--grad-main)',
                    padding: '8px',
                    borderRadius: '10px',
                    display: 'flex'
                }}>
                    <Terminal size={24} color="white" />
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
                    DIFFY<span style={{ color: 'var(--accent-primary)' }}>.</span>
                </span>
            </Link>

            <div className="nav-links" style={{ display: 'flex', gap: '2rem', fontWeight: '500', color: 'var(--text-muted)' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Product</Link>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
                <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Docs</a>
            </div>

            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }} onClick={() => window.location.href = 'http://localhost:3030/api/auth/github'}>
                Get Started
            </button>
        </nav>
    );
};

export default Navbar;
