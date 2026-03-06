import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import GlobalNavigation from '../components/GlobalNavigation';
import { projectsData } from '../data/projects';

const EASE = [0.16, 1, 0.3, 1];

const ProjectCard = ({ project, index }) => {
    const navigate = useNavigate();
    const isEven = index % 2 === 0;

    return (
        <section
            className="project-card-section"
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12vh var(--content-pr) 12vh var(--content-pl)',
                position: 'relative',
            }}
        >
            <div
                className="project-card-layout"
                style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    width: '100%',
                    gap: 'clamp(2rem, 6vw, 10rem)',
                }}
            >
                {/* ─── Image ─── */}
                <div
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="project-card-img-wrap"
                    style={{ flex: '0 0 65%', position: 'relative', cursor: 'pointer' }}
                >
                    <motion.div
                        initial={{ clipPath: 'inset(10% 0 10% 0)', scale: 0.98 }}
                        whileInView={{ clipPath: 'inset(0% 0 0% 0)', scale: 1 }}
                        viewport={{ once: true, margin: '-20%' }}
                        transition={{ duration: 1.6, ease: EASE }}
                        style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}
                    >
                        <motion.img
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true, margin: '-20%' }}
                            transition={{ duration: 2, ease: EASE }}
                            src={project.heroImage}
                            alt={project.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(0.95)',
                                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </motion.div>
                </div>

                {/* ─── Text ─── */}
                <motion.div
                    className="project-card-text"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                    style={{ flex: 1, textAlign: isEven ? 'left' : 'right' }}
                >
                    <div className="project-card-meta" style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        justifyContent: isEven ? 'flex-start' : 'flex-end',
                        marginBottom: '2rem',
                    }}>
                        <span className="serif" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div style={{ width: '20px', height: '1px', backgroundColor: 'var(--color-accent)' }} />
                        <span className="sans" style={{
                            fontSize: '0.65rem', letterSpacing: '3px',
                            color: 'var(--color-accent)', textTransform: 'uppercase',
                        }}>
                            {project.category}
                        </span>
                    </div>

                    <h2 className="serif" style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 4rem)',
                        lineHeight: 1.1, margin: '0 0 1.5rem 0',
                        fontWeight: 300, color: 'var(--color-text-primary)',
                    }}>
                        {project.title}
                    </h2>

                    <p className="sans" style={{
                        fontSize: 'clamp(0.85rem, 1vw, 1.05rem)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.8, marginBottom: '3rem',
                        maxWidth: '400px',
                        marginLeft: isEven ? '0' : 'auto',
                        marginRight: isEven ? 'auto' : '0',
                    }}>
                        {project.shortDesc}
                    </p>

                    <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="sans"
                        style={{
                            background: 'none', border: 'none',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.75rem', letterSpacing: '2px',
                            cursor: 'pointer', padding: '8px 0',
                            borderBottom: '1px solid rgba(0,0,0,0.15)',
                            transition: 'border-color .4s ease, letter-spacing .4s ease, color .4s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.color = 'var(--color-accent)';
                            e.currentTarget.style.letterSpacing = '3px';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                            e.currentTarget.style.color = 'var(--color-text-primary)';
                            e.currentTarget.style.letterSpacing = '2px';
                        }}
                    >
                        عرض المشروع
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default function Projects() {
    return (
        <PageTransition>
            <GlobalNavigation />

            <div style={{
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-primary)',
                minHeight: '100vh',
                overflowX: 'hidden',
            }}>
                {/* ─── Hero Heading ─── */}
                <section style={{
                    height: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    paddingLeft: 'var(--content-pl)',
                    paddingRight: 'var(--content-pr)',
                }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4, ease: EASE }}
                        className="serif"
                        style={{
                            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
                            fontWeight: 300,
                            margin: 0,
                            letterSpacing: '-3px',
                            lineHeight: 0.95,
                        }}
                    >
                        أعمالنا.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, delay: 0.35, ease: EASE }}
                        className="sans"
                        style={{
                            marginTop: '1.5rem',
                            fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                            color: 'var(--color-text-secondary)',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                        }}
                    >
                        حيث يلتقي الخيال بالحرفية
                    </motion.p>
                </section>

                {/* ─── Divider ─── */}
                <div style={{
                    width: `calc(100% - var(--content-pl) - var(--content-pr))`,
                    height: '1px',
                    backgroundColor: 'rgba(0,0,0,0.06)',
                    marginLeft: 'var(--content-pl)',
                }} />

                {/* ─── Project Cards ─── */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {projectsData.map((project, index) => (
                        <React.Fragment key={project.id}>
                            <ProjectCard project={project} index={index} />
                            {index < projectsData.length - 1 && (
                                <div style={{
                                    width: `calc(100% - var(--content-pl) - var(--content-pr))`,
                                    height: '1px',
                                    backgroundColor: 'rgba(0,0,0,0.06)',
                                    marginLeft: 'var(--content-pl)',
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div style={{ height: '15vh' }} />
            </div>

            {/* Scoped responsive styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .project-card-section {
                        padding: 6vh var(--content-pr) 6vh var(--content-pl) !important;
                    }
                    .project-card-layout {
                        flex-direction: column !important;
                        gap: 2.5rem !important;
                    }
                    .project-card-img-wrap {
                        flex: 0 0 auto !important;
                        width: 100% !important;
                    }
                    .project-card-text {
                        text-align: center !important;
                    }
                    .project-card-meta {
                        justify-content: center !important;
                    }
                    .project-card-text p {
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .project-card-text button {
                        display: block;
                        margin: 0 auto;
                    }
                }
            `}} />
        </PageTransition>
    );
}
