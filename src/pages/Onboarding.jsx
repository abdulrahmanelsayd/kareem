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
                                    <span className="sans" style={{ fontSize: '3.5rem', fontWeight: 600, color: '#ffffff', letterSpacing: '-2px' }}>K</span>
                                    <span className="sans" style={{ fontSize: '3.5rem', fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginLeft: '2px' }}>A</span>
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
                                        className="sans"
                                        style={{
                                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                            color: '#ffffff',
                                            margin: 0,
                                            fontWeight: 600,
                                            letterSpacing: '-1px', // Tight modern tracking for Arabic
                                            lineHeight: 1.2, // Increased line-height to fix Arabic descenders overlapping
                                            paddingBottom: '0.5rem' // Extra breathing room at the bottom of the title
                                        }}
                                    >
                                        كريم عدوي
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, filter: 'blur(5px)', y: 5 }}
                                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                                        transition={{ delay: 0.8, duration: 1.4, ease: EASE }}
                                        className="sans"
                                        style={{
                                            fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)',
                                            color: 'rgba(255, 255, 255, 0.4)', // Premium stark architectural grey. No gold.
                                            letterSpacing: '12px', // Extreme luxurious wide tracking
                                            marginTop: '2.5rem', // Significantly increased margin to separate from the title
                                            fontWeight: 400,
                                            textTransform: 'uppercase',
                                            marginRight: '-12px' // Offset tracking for visual centering
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
