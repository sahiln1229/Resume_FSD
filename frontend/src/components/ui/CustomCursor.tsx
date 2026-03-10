"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [clickEffect, setClickEffect] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
            }
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, input, textarea, [role="button"]');
            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setClickEffect(true);
        const handleMouseUp = () => setClickEffect(false);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHover);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHover);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <motion.div
                ref={ringRef}
                className="cursor-ring"
                style={{
                    x: ringX,
                    y: ringY,
                }}
                animate={{
                    width: isHovering ? 80 : (clickEffect ? 30 : 40),
                    height: isHovering ? 80 : (clickEffect ? 30 : 40),
                    backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0)',
                    borderColor: isHovering ? '#06B6D4' : '#3B82F6',
                    scale: clickEffect ? 0.8 : 1,
                }}
            />
        </>
    );
}
