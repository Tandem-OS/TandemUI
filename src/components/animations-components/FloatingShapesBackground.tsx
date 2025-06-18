import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type ShapeType = 'square' | 'circle' | 'triangle' | 'diamond';

type Shape = {
    id: number;
    size: number;
    x: string;
    type: ShapeType;
    duration: number;
};

interface FloatingShapesProps {
    bgGradient?: string;
    shapeColor?: string;
    borderWidth?: number;
    maxShapes?: number;
    spawnInterval?: number;
    className?: string; // ✅ Add className here
}

const SHAPE_TYPES: ShapeType[] = ['square', 'circle', 'triangle', 'diamond'];

const createShape = (): Shape => ({
    id: Date.now() + Math.random(),
    size: 40 + Math.random() * 60,
    x: `${Math.random() * 100}%`,
    type: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
    duration: 7 + Math.random() * 4,
});

const FloatingShapesBackground: React.FC<FloatingShapesProps> = ({
    bgGradient = 'bg-gradient-to-t from-indigo-800 via-indigo-600 to-accent-default-dark',
    shapeColor = '#1f2937',
    borderWidth = 6,
    maxShapes = 80,
    spawnInterval = 500,
    className = '', // ✅ Destructure with default
}) => {
    const [shapes, setShapes] = useState<Shape[]>(() =>
        [...Array(5)].map(createShape)
    );

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const startInterval = () => {
            interval = setInterval(() => {
                setShapes(prev => [...prev, createShape()].slice(-maxShapes));
            }, spawnInterval);
        };

        const stopInterval = () => clearInterval(interval);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') startInterval();
            else stopInterval();
        };

        if (document.visibilityState === 'visible') startInterval();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            stopInterval();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [maxShapes, spawnInterval]);

    const removeShape = (id: number) => {
        setShapes(prev => prev.filter(shape => shape.id !== id));
    };

    return (
        <div className={`relative flex-1 overflow-hidden ${bgGradient} ${className}`}>
            {shapes.map(({ id, size, x, type, duration }) => {
                const commonStyle: React.CSSProperties = {
                    left: x,
                    width: size,
                    height: size,
                };

                if (type === 'triangle') {
                    const rotate = Math.random() < 0.5 ? 360 : 0;

                    return (
                        <motion.div
                            key={id}
                            initial={{ y: -size, rotate: 0 }}
                            animate={{ y: '100vh', rotate }}
                            transition={{ duration, ease: 'easeInOut' }}
                            onAnimationComplete={() => removeShape(id)}
                            className="absolute top-0 opacity-60"
                            style={{
                                ...commonStyle,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: 0,
                                    height: 0,
                                    borderLeft: `${size / 2}px solid transparent`,
                                    borderRight: `${size / 2}px solid transparent`,
                                    borderBottom: `${size}px solid ${shapeColor}`,
                                }}
                            />
                        </motion.div>
                    );
                }

                const shapeClass =
                    type === 'circle'
                        ? 'rounded-full'
                        : type === 'diamond'
                        ? 'rotate-45'
                        : '';

                return (
                    <motion.div
                        key={id}
                        initial={{ y: -size }}
                        animate={{ y: '100vh', rotate: type === 'diamond' ? 0 : 360 }}
                        transition={{ duration, ease: 'easeInOut' }}
                        onAnimationComplete={() => removeShape(id)}
                        className={`absolute top-0 opacity-60 ${shapeClass}`}
                        style={{
                            ...commonStyle,
                            border: `${borderWidth}px solid ${shapeColor}`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default FloatingShapesBackground;
