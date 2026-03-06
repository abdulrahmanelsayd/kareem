import React from 'react';

/**
 * Premium Before/After comparison slider with touch + mouse support.
 * No external dependencies — pure React for max performance.
 */
export default function BeforeAfterSlider({ beforeImage, afterImage }) {
    const [sliderPos, setSliderPos] = React.useState(50);
    const containerRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const handleMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let x = 0;
        if (e.touches && e.touches.length > 0) {
            x = e.touches[0].clientX - rect.left;
        } else {
            x = e.clientX - rect.left;
        }

        let percentage = (x / rect.width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        setSliderPos(percentage);
    };

    const handleUp = () => setIsDragging(false);

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleUp);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleUp);
        } else {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: 'clamp(8px, 1.5vw, 16px)',
                cursor: isDragging ? 'grabbing' : 'col-resize',
                userSelect: 'none',
                touchAction: 'none',
            }}
            onMouseDown={(e) => { setIsDragging(true); handleMove(e); }}
            onTouchStart={(e) => { setIsDragging(true); handleMove(e); }}
        >
            {/* After Image (Background) */}
            <img
                src={afterImage}
                alt="After"
                style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                }}
                draggable={false}
            />

            {/* Before Image (Foreground overlay) */}
            <div style={{
                position: 'absolute', top: 0, left: 0,
                width: `${sliderPos}%`, height: '100%',
                overflow: 'hidden', zIndex: 1,
            }}>
                <img
                    src={beforeImage}
                    alt="Before"
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: containerRef.current ? containerRef.current.clientWidth : '100%',
                        minWidth: '100%',
                        height: '100%', objectFit: 'cover',
                        filter: 'grayscale(0.5)',
                    }}
                    draggable={false}
                />
            </div>

            {/* Slider Line + Handle */}
            <div style={{
                position: 'absolute', top: 0, bottom: 0,
                left: `calc(${sliderPos}% - 2px)`,
                width: '4px', backgroundColor: '#ffffff',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <div style={{
                    width: '48px', height: '48px',
                    backgroundColor: '#ffffff', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    cursor: 'grab',
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                        <polyline points="9 18 15 12 9 6" style={{ transform: 'translateX(6px)' }} />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div style={{
                position: 'absolute', bottom: 'clamp(12px, 2vw, 20px)', right: 'clamp(12px, 2vw, 20px)',
                zIndex: 1, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white',
                padding: '5px 15px', borderRadius: '20px',
                fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', backdropFilter: 'blur(5px)',
                opacity: sliderPos > 20 ? 1 : 0, transition: 'opacity 0.3s',
            }}>
                قبل
            </div>
            <div style={{
                position: 'absolute', bottom: 'clamp(12px, 2vw, 20px)', left: 'clamp(12px, 2vw, 20px)',
                zIndex: 0, backgroundColor: 'rgba(0,0,0,0.6)', color: 'white',
                padding: '5px 15px', borderRadius: '20px',
                fontSize: 'clamp(0.75rem, 1vw, 0.9rem)', backdropFilter: 'blur(5px)',
            }}>
                بعد
            </div>
        </div>
    );
}
