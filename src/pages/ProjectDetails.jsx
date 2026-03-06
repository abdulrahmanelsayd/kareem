import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import GlobalNavigation from '../components/GlobalNavigation';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { projectsData } from '../data/projects';

const EASE = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════
   Cinema Gallery — horizontal scroll + snap + lightbox
   ═══════════════════════════════════════════════ */
const HorizontalGallery = ({ project }) => {
    const [lightboxIdx, setLightboxIdx] = React.useState(null);
    const scrollRef = React.useRef(null);
    const galleryCount = project.gallery.length;

    React.useEffect(() => {
        if (lightboxIdx === null) return;
        const handler = (e) => {
            if (e.key === 'Escape') setLightboxIdx(null);
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const dir = e.key === 'ArrowRight' ? -1 : 1;
                setLightboxIdx(prev => {
                    const next = prev + dir;
                    if (next < 0 || next >= galleryCount) return prev;
                    return next;
                });
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxIdx, galleryCount]);

    const isVideoUrl = (url) => /\.(mp4|webm|mov)(\?|$)/i.test(url);

    return (
        <>
            <section style={{ backgroundColor: '#080808', padding: 'var(--section-py) 0 8vh 0' }}>
                {/* Header */}
                <div style={{
                    padding: '0 var(--content-pr) 0 var(--content-pl)',
                    marginBottom: '3rem',
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: '0.5rem',
                }}>
                    <h2 className="serif" style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 300, margin: 0, color: '#ffffff',
                    }}>المعرض.</h2>
                    <span className="sans" style={{
                        fontSize: '0.65rem', letterSpacing: '3px',
                        color: 'rgba(255,255,255,0.3)',
                    }}>
                        {String(galleryCount).padStart(2, '0')} عنصر — مرر جانبياً
                    </span>
                </div>

                {/* Horizontal Scroll Strip */}
                <div
                    ref={scrollRef}
                    className="gallery-scroll-strip"
                    style={{
                        display: 'flex',
                        gap: 'clamp(1rem, 3vw, 2.5rem)',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingLeft: 'var(--content-pl)',
                        paddingRight: 'var(--content-pr)',
                        paddingBottom: '2rem',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {project.gallery.map((media, idx) => {
                        const isVideo = isVideoUrl(media);
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: '-5%' }}
                                transition={{ duration: 0.8, ease: EASE }}
                                style={{
                                    flex: '0 0 clamp(280px, 75vw, 900px)',
                                    scrollSnapAlign: 'center',
                                    position: 'relative',
                                    cursor: isVideo ? 'default' : 'pointer',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                }}
                                onClick={() => !isVideo && setLightboxIdx(idx)}
                                whileHover={!isVideo ? { scale: 1.015 } : {}}
                            >
                                <span className="sans" style={{
                                    position: 'absolute', bottom: '1rem', left: '1rem',
                                    zIndex: 2, fontSize: '0.6rem', letterSpacing: '2px',
                                    color: 'rgba(255,255,255,0.5)',
                                    background: 'rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '5px 12px', borderRadius: '2px',
                                }}>
                                    {String(idx + 1).padStart(2, '0')} / {String(galleryCount).padStart(2, '0')}
                                </span>

                                {isVideo ? (
                                    <video
                                        src={media} controls playsInline muted
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                ) : (
                                    <img
                                        src={media}
                                        alt={`${project.title} — ${idx + 1}`}
                                        loading="lazy"
                                        style={{ width: '100%', height: 'auto', display: 'block' }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ Lightbox ═══ */}
            <AnimatePresence>
                {lightboxIdx !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        onClick={() => setLightboxIdx(null)}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'zoom-out',
                        }}
                    >
                        <button
                            onClick={() => setLightboxIdx(null)}
                            aria-label="Close"
                            style={{
                                position: 'absolute', top: 'clamp(1rem, 3vw, 3rem)', right: 'clamp(1rem, 3vw, 3rem)',
                                background: 'none', border: 'none',
                                color: 'rgba(255,255,255,0.5)', fontSize: '1.5rem',
                                cursor: 'pointer', zIndex: 10, transition: 'color .3s ease',
                                width: '48px', height: '48px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            ✕
                        </button>

                        <span className="sans" style={{
                            position: 'absolute', bottom: 'clamp(1.5rem, 3vw, 3rem)',
                            left: '50%', transform: 'translateX(-50%)',
                            fontSize: '0.7rem', letterSpacing: '3px',
                            color: 'rgba(255,255,255,0.35)',
                        }}>
                            {String(lightboxIdx + 1).padStart(2, '0')} / {String(galleryCount).padStart(2, '0')}
                        </span>

                        {lightboxIdx > 0 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
                                aria-label="Previous"
                                style={{
                                    position: 'absolute', left: 'clamp(0.5rem, 2vw, 2rem)',
                                    top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none',
                                    color: 'rgba(255,255,255,0.4)', fontSize: '2rem',
                                    cursor: 'pointer', padding: '1rem',
                                    transition: 'color .3s ease',
                                    width: '48px', height: '48px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                            >‹</button>
                        )}
                        {lightboxIdx < galleryCount - 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
                                aria-label="Next"
                                style={{
                                    position: 'absolute', right: 'clamp(0.5rem, 2vw, 2rem)',
                                    top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none',
                                    color: 'rgba(255,255,255,0.4)', fontSize: '2rem',
                                    cursor: 'pointer', padding: '1rem',
                                    transition: 'color .3s ease',
                                    width: '48px', height: '48px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                            >›</button>
                        )}

                        <motion.img
                            key={lightboxIdx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            src={project.gallery[lightboxIdx]}
                            alt=""
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: 'min(90vw, 1200px)',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                                cursor: 'default',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};


/* ═══════════════════════════════════════════════
   Project Details Page
   ═══════════════════════════════════════════════ */
export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = React.useMemo(() => projectsData.find(p => p.id === id), [id]);
    const videoRef = React.useRef(null);
    const [isMuted, setIsMuted] = React.useState(true);

    React.useEffect(() => { window.scrollTo(0, 0); }, [id]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    if (!project) {
        return (
            <PageTransition>
                <GlobalNavigation />
                <div style={{
                    minHeight: '100vh', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'var(--color-bg-primary)',
                    padding: '2rem var(--content-pr) 2rem var(--content-pl)',
                }}>
                    <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem', color: 'var(--color-text-primary)', textAlign: 'center' }}>
                        عذراً، المشروع غير متوفر.
                    </h2>
                    <button
                        onClick={() => navigate('/projects')}
                        className="sans"
                        style={{
                            padding: '12px 30px', background: 'none',
                            border: '1px solid var(--color-text-secondary)',
                            color: 'var(--color-text-primary)',
                            cursor: 'pointer', letterSpacing: '2px', fontSize: '0.8rem',
                            transition: 'all .3s ease',
                        }}
                    >
                        العودة للمشاريع
                    </button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <GlobalNavigation />

            <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>

                {/* ═══ ACT 1 — Hero ═══ */}
                <section style={{
                    position: 'relative', height: '100vh', width: '100%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    paddingLeft: 'var(--content-pl)',
                    paddingRight: 'var(--content-pr)',
                    paddingBottom: '10vh',
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 0.75, scale: 1 }}
                        transition={{ duration: 2.5, ease: EASE }}
                        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
                    >
                        {project.videoUrl ? (
                            <video ref={videoRef} src={project.videoUrl} autoPlay loop muted playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <img src={project.heroImage} alt={project.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        )}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.3) 50%, transparent 100%)',
                        }} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
                        style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', marginBottom: '-5vh' }} // Negative margin to push text deeper into the background overlap
                    >
                        <p className="sans" style={{
                            color: 'var(--color-accent)', letterSpacing: '5px',
                            fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
                            textTransform: 'uppercase', marginBottom: '1.2rem', fontWeight: 600,
                        }}>
                            {project.category}
                        </p>
                        <h1 className="sans" style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)', // Reduced size, more elegant
                            lineHeight: 1.1, margin: 0, fontWeight: 700, letterSpacing: '-1px', // Modern bold weight
                            textShadow: '0 10px 30px rgba(0,0,0,0.8)'
                        }}>
                            {project.title}
                        </h1>
                    </motion.div>

                    {project.videoUrl && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 2 }}
                            onClick={toggleMute}
                            aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                            style={{
                                position: 'absolute', bottom: '4vh', left: 'max(4vw, 100px)', // Moved to the LEFT side, with a min-offset so it doesn't hit the sidebar
                                zIndex: 100, width: '48px', height: '48px', borderRadius: '50%',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#ffffff', transition: 'all .3s ease',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                        >
                            {isMuted ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <line x1="23" y1="9" x2="17" y2="15" />
                                    <line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                            )}
                        </motion.button>
                    )}
                </section>

                {/* ═══ ACT 2 — Statement ═══ */}
                <section style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 'var(--section-py) var(--content-pr) var(--section-py) var(--content-pl)',
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-15%' }}
                        transition={{ duration: 1.4, ease: EASE }}
                        style={{ maxWidth: '900px', textAlign: 'center' }}
                    >
                        <p className="serif" style={{
                            fontSize: 'clamp(1.4rem, 4vw, 3.2rem)',
                            lineHeight: 1.4, fontWeight: 300,
                        }}>
                            "{project.shortDesc}"
                        </p>
                    </motion.div>
                </section>

                {/* ═══ ACT 3 — Specs ═══ */}
                <section style={{ padding: `0 var(--content-pr) 12vh var(--content-pl)` }}>
                    <motion.div
                        className="specs-grid"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            borderTop: '1px solid rgba(255,255,255,0.08)',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            maxWidth: '1200px',
                        }}
                    >
                        {Object.entries(project.specs).map(([key, value], idx) => (
                            <div key={key} className="spec-item" style={{
                                padding: 'clamp(1.5rem, 3vw, 2.5rem) 1rem',
                                borderLeft: idx !== 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                textAlign: 'center',
                            }}>
                                <p className="sans" style={{
                                    fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)',
                                    letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.8rem',
                                }}>
                                    {key === 'duration' ? 'المدة' : key === 'area' ? 'المساحة' : key === 'style' ? 'النمط' : 'الموقع'}
                                </p>
                                <p className="sans" style={{
                                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                    fontWeight: 300, margin: 0,
                                }}>{value}</p>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* ═══ ACT 4 — Before / After ═══ */}
                <section style={{ padding: '12vh 0', backgroundColor: '#000' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-15%' }}
                        transition={{ duration: 1.4, ease: EASE }}
                        style={{
                            textAlign: 'center', marginBottom: '3.5rem',
                            paddingLeft: 'var(--content-pl)', paddingRight: 'var(--content-pr)',
                        }}
                    >
                        <h2 className="serif" style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 300, margin: 0,
                        }}>نقطة التحول.</h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: EASE }}
                        className="before-after-wrapper"
                        style={{
                            width: 'calc(100vw - var(--sidebar-width))',
                            height: 'clamp(350px, 60vh, 850px)',
                            marginLeft: 'var(--sidebar-width)',
                        }}
                    >
                        <BeforeAfterSlider beforeImage={project.beforeImage} afterImage={project.afterImage} />
                    </motion.div>
                </section>

                {/* ═══ ACT 5 — Phases Timeline ═══ */}
                <section style={{
                    padding: 'var(--section-py) var(--content-pr) var(--section-py) var(--content-pl)',
                    backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-primary)',
                }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="serif"
                            style={{
                                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                textAlign: 'center', marginBottom: '5rem', fontWeight: 300,
                            }}
                        >
                            مراحل التنفيذ.
                        </motion.h2>

                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute', right: '14px', top: 0, bottom: 0,
                                width: '1px', backgroundColor: 'rgba(0,0,0,0.08)',
                            }} />

                            {project.phases.map((phase, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-10%' }}
                                    transition={{ duration: 1, ease: EASE }}
                                    style={{
                                        position: 'relative',
                                        paddingRight: '55px',
                                        marginBottom: idx !== project.phases.length - 1 ? '4rem' : '0',
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', right: '9px', top: '6px',
                                        width: '11px', height: '11px', borderRadius: '50%',
                                        backgroundColor: 'var(--color-bg-primary)',
                                        border: '2px solid var(--color-accent)',
                                    }} />

                                    <span className="sans" style={{
                                        display: 'block', fontSize: '0.75rem',
                                        color: 'var(--color-accent)', letterSpacing: '2px',
                                        marginBottom: '0.4rem', fontWeight: 500,
                                    }}>
                                        {phase.date}
                                    </span>
                                    <h4 className="serif" style={{
                                        fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                                        fontWeight: 300, marginBottom: '0.6rem', lineHeight: 1.25,
                                    }}>
                                        {phase.title}
                                    </h4>
                                    <p className="sans" style={{
                                        fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.8, maxWidth: '520px',
                                    }}>
                                        {phase.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══ ACT 6 — Gallery ═══ */}
                <HorizontalGallery project={project} />

                {/* ═══ Back Link ═══ */}
                <section style={{
                    padding: '5vh var(--content-pr) 10vh var(--content-pl)',
                    backgroundColor: 'var(--color-bg-primary)', textAlign: 'center',
                }}>
                    <button
                        onClick={() => navigate('/projects')}
                        className="sans"
                        style={{
                            background: 'none', border: 'none',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.8rem', letterSpacing: '3px',
                            cursor: 'pointer', padding: '10px 0',
                            borderBottom: '1px solid rgba(0,0,0,0.15)',
                            transition: 'all .4s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                        }}
                    >
                        ← جميع المشاريع
                    </button>
                </section>
            </div>

            {/* Mobile specs grid fix */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .specs-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .spec-item {
                        border-left: none !important;
                    }
                    .spec-item:nth-child(even) {
                        border-left: 1px solid rgba(255,255,255,0.08) !important;
                    }
                    .spec-item:nth-child(n+3) {
                        border-top: 1px solid rgba(255,255,255,0.08) !important;
                    }
                    .before-after-wrapper {
                        width: 100vw !important;
                        margin-left: 0 !important;
                    }
                }
            `}} />
        </PageTransition >
    );
}
