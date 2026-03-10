"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-white hover:opacity-90 shadow-soft hover:shadow-premium',
            secondary: 'bg-secondary text-white hover:opacity-90 shadow-soft hover:shadow-premium',
            outline: 'border-2 border-primary text-primary hover:bg-primary/5',
            ghost: 'text-foreground hover:bg-foreground/5',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base font-semibold',
            lg: 'px-8 py-4 text-lg font-bold',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
