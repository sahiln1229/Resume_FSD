"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const Card = ({ children, className, animate = true }: CardProps) => {
    return (
        <motion.div
            initial={animate ? { opacity: 0, y: 20 } : false}
            whileInView={animate ? { opacity: 1, y: 0 } : false}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className={cn('premium-card p-6 bg-card', className)}
        >
            {children}
        </motion.div>
    );
};
