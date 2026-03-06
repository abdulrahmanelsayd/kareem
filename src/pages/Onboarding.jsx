import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Refined easing curve for Apple-like smoothness
const EASE = [0.16, 1, 0.3, 1];

const Onboarding = () => {
    const navigate = useNavigate();
    const [phase, setPhase] = useState(0);

    // Sequence timing
    useEffect(() => {
        // Phase 1: AE Logo
        const t1 = setTimeout(() => setPhase(1), 800);
        // Phase 2: Full Name
        const t2 = setTimeout(() => setPhase(2), 2400);
        // Phase 3: Transition Out
        const t3 = setTimeout(() => setPhase(3), 4000);

        // Navigate
        const navTimer = setTimeout(() => {
            navigate('/home');
        }, 5200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(navTimer);
        };
    }, [navigate]);

    return (
        <AnimatePresence>
            {phase < 3 && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -100, // Slide up slightly as it fades
                        filter: 'blur(10px)' // Blur out
                    }}
                    transition={{ duration: 1.2, ease: EASE }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: '#000000', // Pure cinematic black
                        zIndex: 99999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>

                        {/* Phase 0 & 1: The Monogram 'KA' */}
                        <AnimatePresence>
                            {phase < 2 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)', transition: { duration: 0.8, ease: EASE } }}
                                    transition={{ duration: 1.5, ease: EASE }}
                                    style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <span className="serif" style={{ fontSize: '4rem', fontWeight: 600, color: '#ffffff', letterSpacing: '-2px' }}>K</span>
                                    <span className="serif" style={{ fontSize: '4.5rem', fontWeight: 200, fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', marginLeft: '-10px' }}>A</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Phase 2: Full Name Reveal */}
                        <AnimatePresence>
                            {phase === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
                                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: EASE }}
                                    style={{ position: 'absolute', textAlign: 'center' }}
                                >
                                    <motion.h1
                                        className="serif"
                                        style={{
                                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                                            color: '#ffffff',
                                            margin: 0,
                                            fontWeight: 300,
                                            letterSpacing: '0.05em',
                                            lineHeight: 1
                                        }}
                                    >
                                        كريم عدوي
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 1, ease: EASE }}
                                        className="sans"
                                        style={{
                                            fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                                            color: 'var(--color-accent)',
                                            letterSpacing: '4px',
                                            marginTop: '1.5rem',
                                            fontWeight: 500,
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        Architecture & Interior
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Onboarding;
