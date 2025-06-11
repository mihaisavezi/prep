import React, { useState, useEffect, useRef } from 'react';
import styles from './memory-leak-demo.module.css';

const MemoryLeakDemo = () => {
    const [components, setComponents] = useState<number[]>([]);

    // Add 100 animated components at once to make the leak more noticeable
    const addManyComponents = () => {
        const newComponents = Array.from({ length: 100 }, (_, i) => Date.now() + i);
        setComponents(prev => [...prev, ...newComponents]);
    };

    const clearAll = () => {
        setComponents([]);
    };

    return (
        <div>
            <h2>Memory Leak Demo</h2>
            <div className={styles.controls}>
                <button onClick={addManyComponents}>Add 100 Components</button>
                <button onClick={clearAll}>Clear All</button>
            </div>
            <div className={styles.container}>
                {components.map(id => (
                    <AnimatedComponent key={id} hasCleanup={true} />
                ))}
            </div>
        </div>
    );
};

interface AnimatedComponentProps {
    hasCleanup: boolean;
}

const AnimatedComponent = ({ hasCleanup }: AnimatedComponentProps) => {
    const [position, setPosition] = useState(0);
    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        // Create a memory-intensive object to make the leak more obvious
        const largeObject = new Array(10000).fill('🧟‍♂️');

        const animate = (timestamp: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const progress = (timestamp - startTimeRef.current) / 20;
            setPosition(Math.sin(progress / 20) * 10);
            
            // Store reference to the large object to prevent garbage collection
            (window as any).__leakedData = largeObject;
            
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // Only include cleanup if prop is true
        if (hasCleanup) {
            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
                delete (window as any).__leakedData;
            };
        }
    }, [hasCleanup]);

    return (
        <div 
            className={styles.animatedBox}
            style={{ 
                transform: `translateY(${position}px)`,
            }}
        >
            🔄
        </div>
    );
};

export default MemoryLeakDemo;
