import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import GlobalNavigation from '../components/GlobalNavigation';

const EASE = [0.16, 1, 0.3, 1];

export default function Home() {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <GlobalNavigation />

            <div style={{
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                minHeight: '100vh',
                overflowX: 'hidden',
            }}>
                {/* ─── Cinematic Hero ─── */}
                <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
                    <video
                        src="/hero.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 0,
                            filter: 'brightness(0.65) contrast(1.1) saturate(1.2)',
                        }}
                    />

                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.4) 100%), linear-gradient(to bottom, transparent 70%, var(--color-bg-primary) 100%)',
                        zIndex: 1,
                    }} />

                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        padding: '0 var(--content-pr)',
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.8, ease: EASE, delay: 0.2 }}
                            className="serif"
                            style={{
                                fontSize: 'clamp(3.2rem, 12vw, 9rem)',
                                letterSpacing: '0.02em',
                                color: '#ffffff',
                                margin: 0,
                                lineHeight: 1.1,
                                textAlign: 'center',
                                fontWeight: 300,
                                textShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            }}
                        >
                            كريم عدوي
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.8, delay: 0.6, ease: EASE }}
                            className="sans"
                            style={{
                                fontSize: 'clamp(0.85rem, 2vw, 1.3rem)',
                                letterSpacing: '2px',
                                color: 'var(--color-accent)',
                                margin: 0,
                                textAlign: 'center',
                                fontWeight: 500,
                                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
                            }}
                        >
                            بتستلم مننا البيت … فوق ما اتمنيت.
                        </motion.p>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        style={{ position: 'absolute', bottom: '5%', width: '100%', textAlign: 'center', zIndex: 2 }}
                    >
                        <p className="sans" style={{ letterSpacing: '4px', color: '#ffffff', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                            اكتشف المزيد
                        </p>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.6)', margin: '0 auto' }}
                        />
                    </motion.div>
                </section>

                {/* ─── Manifesto Section 1 ─── */}
                <section style={{
                    padding: 'var(--section-py) var(--content-pr)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 10,
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.6, ease: EASE }}
                        className="serif"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 5rem)',
                            lineHeight: 1.2,
                            color: 'var(--color-text-primary)',
                            fontWeight: 300,
                            marginBottom: '2rem',
                        }}
                    >
                        بنهتم بكل تفصيلة في بيتك.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
                        className="sans"
                        style={{
                            fontSize: 'clamp(1rem, 2.5vmin, 1.4rem)',
                            lineHeight: 1.9,
                            color: 'var(--color-text-secondary)',
                            fontWeight: 400,
                            maxWidth: '700px',
                            padding: '0 2vw',
                        }}
                    >
                        الموضوع بالنسبة لنا مش مجرد تشطيب ديكور، إحنا بنبني مساحة مريحة تعيش فيها، ونركز على جودة الخامات وتنسيق المساحات عشان تطلع النتيجة زي ما اتخيلتها بالظبط.
                    </motion.p>
                </section>

                {/* ─── Manifesto Section 2 ─── */}
                <section style={{
                    padding: 'calc(var(--section-py) * 0.3) var(--content-pr) var(--section-py) var(--content-pr)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 10,
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.6, ease: EASE }}
                        className="serif"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 5rem)',
                            lineHeight: 1.2,
                            color: 'var(--color-text-primary)',
                            fontWeight: 300,
                            marginBottom: '2rem',
                        }}
                    >
                        من الطوب الأحمر للتسليم.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.6, delay: 0.2, ease: EASE }}
                        className="sans"
                        style={{
                            fontSize: 'clamp(1rem, 2.5vmin, 1.4rem)',
                            lineHeight: 1.9,
                            color: 'var(--color-text-secondary)',
                            fontWeight: 400,
                            maxWidth: '700px',
                            padding: '0 2vw',
                        }}
                    >
                        إحنا بنشيل عنك صداع الصنايعية والمتابعة. بنحط خطة واضحة من أول يوم ونلتزم بيها، عشان تستلم شقتك متقفلة وجاهزة للسكن في وقتها.
                    </motion.p>
                </section>

                {/* ─── Editorial Portals ─── */}
                <section className="editorial-portals" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    minHeight: '50vh',
                }}>
                    {[
                        {
                            title: 'الأعمال السابقة',
                            subtitle: 'معرض الإنجازات',
                            path: '/projects',
                            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
                        },
                        {
                            title: 'الخدمات',
                            subtitle: 'إدارة متكاملة',
                            path: '/services',
                            img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
                        },
                    ].map((portal) => (
                        <div
                            key={portal.path}
                            onClick={() => navigate(portal.path)}
                            className="editorial-portal"
                            style={{
                                flex: '1 1 400px',
                                position: 'relative',
                                height: 'clamp(45vh, 65vh, 1000px)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <motion.img
                                initial={{ scale: 1.1 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2.5, ease: EASE }}
                                src={portal.img}
                                alt={portal.title}
                                className="portal-bg"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: 'brightness(0.5)',
                                    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease',
                                    zIndex: 0,
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                zIndex: 1,
                                textAlign: 'center',
                                pointerEvents: 'none',
                                padding: '0 1.5rem',
                            }}>
                                <span className="sans" style={{
                                    display: 'block',
                                    fontSize: 'clamp(0.65rem, 1vw, 0.8rem)',
                                    letterSpacing: '4px',
                                    color: 'var(--color-accent)',
                                    marginBottom: '1.5rem',
                                    textTransform: 'uppercase',
                                }}>
                                    {portal.subtitle}
                                </span>
                                <h3 className="serif portal-title" style={{
                                    fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                                    color: '#ffffff',
                                    fontWeight: 300,
                                    margin: 0,
                                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                                }}>
                                    {portal.title}
                                </h3>
                            </div>

                            <div
                                style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                                onMouseEnter={(e) => {
                                    const img = e.currentTarget.parentElement.querySelector('.portal-bg');
                                    const title = e.currentTarget.parentElement.querySelector('.portal-title');
                                    if (img) { img.style.transform = 'scale(1.05)'; img.style.filter = 'brightness(0.7)'; }
                                    if (title) { title.style.transform = 'translateY(-10px)'; }
                                }}
                                onMouseLeave={(e) => {
                                    const img = e.currentTarget.parentElement.querySelector('.portal-bg');
                                    const title = e.currentTarget.parentElement.querySelector('.portal-title');
                                    if (img) { img.style.transform = 'scale(1)'; img.style.filter = 'brightness(0.5)'; }
                                    if (title) { title.style.transform = 'translateY(0)'; }
                                }}
                            />
                        </div>
                    ))}
                </section>
            </div>
        </PageTransition>
    );
}
