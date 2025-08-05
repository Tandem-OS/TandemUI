import React from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
    // Keyframes animation ko component ke andar style tag mein daalna
    // isko self-contained rakhta hai.
    const keyframes = `
        @keyframes spinner-y0fdc1 {
            0% {
                transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
            }
            50% {
                transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
            }
            100% {
                transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
            }
        }
    `;

    return (
        <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-background-muted z-10"
        >
            <style>{keyframes}</style>
            
            <div
                className="w-11 h-11"
                style={{
                    animation: 'spinner-y0fdc1 2s infinite ease',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Spinner ke 6 faces. Yeh theme-aware classes istemal kar rahe hain. */}
                <div className="bg-accent-subtle/20 border-2 border-accent-default h-full w-full absolute" style={{ transform: 'translateZ(-22px) rotateY(180deg)' }}></div>
                <div className="bg-accent-subtle/20 border-2 border-accent-default h-full w-full absolute" style={{ transform: 'rotateY(-270deg) translateX(50%)', transformOrigin: 'top right' }}></div>
                <div className="bg-accent-subtle/20 border-2 border-accent-default h-full w-full absolute" style={{ transform: 'rotateY(270deg) translateX(-50%)', transformOrigin: 'center left' }}></div>
                <div className="bg-accent-subtle/20 border-2 border-accent-default h-full w-full absolute" style={{ transform: 'rotateX(90deg) translateY(-50%)', transformOrigin: 'top center' }}></div>
                <div className="bg-accent-subtle/20 border-2 border-accent-default h-full w-full absolute" style={{ transform: 'rotateX(-90deg) translateY(50%)', transformOrigin: 'bottom center' }}></div>
                <div className="bg-accent-subtle/20 border-2 border-accent-default h-full w-full absolute" style={{ transform: 'translateZ(22px)' }}></div>
            </div>
        </motion.div>
    );
};

export default Preloader;