'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 10 + Math.random() * 10,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 1, 0] }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: 'linear',
                    }}
                    className="absolute text-pink-300/40 text-4xl"
                    style={{ left: `${heart.left}%` }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
}
