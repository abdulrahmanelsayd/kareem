import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--color-bg-primary)',
                        zIndex: 9999,
                        padding: '2rem',
                    }}
                >
                    <motion.img
                        src="/logo.jpg"
                        alt="Kareem Adawy Logo"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                        style={{
                            width: 'min(250px, 55vw)',
                            height: 'auto',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 10px 30px rgba(0,0,0,0.1))',
                        }}
                    />
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        style={{
                            marginTop: '2rem',
                            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                            fontWeight: 300,
                            color: 'var(--color-accent)',
                            letterSpacing: '2px',
                            textAlign: 'center',
                        }}
                    >
                        كريم عدوي للتشطيبات
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Onboarding;
