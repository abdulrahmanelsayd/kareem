import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const EASE = [0.16, 1, 0.3, 1];

const NAV_ITEMS = [
    { label: 'الرئيسية', path: '/home' },
    { label: 'المشاريع', path: '/projects' },
    { label: 'الخدمات', path: '/services' },
    { label: 'تواصل', path: '/contact' },
];

export default function GlobalNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    if (location.pathname === '/') return null;

    const handleNav = (path) => {
        setMenuOpen(false);
        navigate(path);
        if (path === '/home') window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* ─── Desktop Sidebar ─── */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: EASE }}
                className="global-sidebar"
                role="banner"
            >
                <button
                    aria-label="Go to home"
                    style={{
                        position: 'relative', width: '45px', height: '40px',
                        cursor: 'pointer', display: 'flex', justifyContent: 'center',
                        background: 'none', border: 'none', padding: 0,
                    }}
                    onClick={() => handleNav('/home')}
                >
                    <span className="serif" style={{
                        position: 'absolute', left: '2px', top: 0,
                        fontSize: '2.5rem', fontWeight: 600, color: '#ffffff',
                        zIndex: 2, letterSpacing: '-2px',
                        textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    }}>K</span>
                    <span className="serif" style={{
                        position: 'absolute', left: '16px', top: '6px',
                        fontSize: '2.7rem', fontWeight: 200, fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.9)', mixBlendMode: 'overlay',
                        zIndex: 1, filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.8))',
                    }}>A</span>
                </button>

                <div className="sidebar-socials">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                        style={{ color: '#ffffff', opacity: 0.5, transition: 'opacity 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                        style={{ color: '#ffffff', opacity: 0.5, transition: 'opacity 0.4s ease' }}
                        onMouseEnter={e => e.currentTarget.style.opacity = 1}
                        onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                </div>

                <div className="sans" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: '8px', fontSize: '0.65rem', letterSpacing: '2px', opacity: 0.6,
                }}>
                    <span style={{ cursor: 'pointer', opacity: 1, color: '#ffffff' }}>AR</span>
                </div>
            </motion.div>

            {/* ─── Top Navbar (Desktop links + Mobile hamburger) ─── */}
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.6, ease: EASE }}
                className="global-navbar"
                aria-label="Main navigation"
            >
                {/* Mobile: KA Logo */}
                <button
                    className="mobile-menu-logo"
                    aria-label="Go to home"
                    onClick={() => handleNav('/home')}
                    style={{
                        display: 'none', background: 'none', border: 'none',
                        cursor: 'pointer', padding: 0, position: 'relative',
                        width: '36px', height: '32px',
                    }}
                >
                    <span className="serif" style={{
                        position: 'absolute', left: '0', top: 0,
                        fontSize: '2rem', fontWeight: 600, color: '#ffffff',
                        zIndex: 2, letterSpacing: '-2px',
                        textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                        mixBlendMode: 'difference',
                    }}>K</span>
                    <span className="serif" style={{
                        position: 'absolute', left: '12px', top: '4px',
                        fontSize: '2.2rem', fontWeight: 200, fontStyle: 'italic',
                        color: 'rgba(255,255,255,0.9)', mixBlendMode: 'difference',
                        zIndex: 1,
                    }}>A</span>
                </button>

                {/* Desktop: Nav Links */}
                <div className="sans navbar-links">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.path}
                            onClick={() => handleNav(item.path)}
                            className="nav-link"
                            aria-current={location.pathname === item.path ? 'page' : undefined}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Mobile: Hamburger */}
                <button
                    className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </motion.nav>

            {/* ─── Mobile Fullscreen Overlay ─── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-nav-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                    >
                        {NAV_ITEMS.map((item, i) => (
                            <motion.button
                                key={item.path}
                                className="mobile-nav-link"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 0.7, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                                onClick={() => handleNav(item.path)}
                                aria-current={location.pathname === item.path ? 'page' : undefined}
                            >
                                {item.label}
                            </motion.button>
                        ))}

                        {/* Social links in overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            style={{
                                display: 'flex', gap: '2rem', marginTop: '3rem',
                            }}
                        >
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                                style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s ease' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                                style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.3s ease' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Scoped Mobile Styles ─── */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .mobile-menu-logo { display: block !important; }
                }
            `}} />
        </>
    );
}
