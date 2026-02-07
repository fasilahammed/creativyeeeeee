'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FloatingHearts from '@/components/FloatingHearts';

export default function ValentinePage() {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [yesSize, setYesSize] = useState(1);
    const [noAttempts, setNoAttempts] = useState(0);

    const moveNoButton = () => {
        // Mobile-friendly random movement (smaller range for mobile screens)
        const maxMove = window.innerWidth < 640 ? 120 : 200;
        const x = (Math.random() - 0.5) * maxMove;
        const y = (Math.random() - 0.5) * maxMove;
        setNoBtnPosition({ x, y });
        setYesSize(prev => Math.min(prev + 0.15, 2.2)); // Cap the size
        setNoAttempts(prev => prev + 1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 to-pink-100 p-4 sm:p-8">
            <FloatingHearts />

            <div className="z-10 text-center max-w-2xl w-full px-4">
                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="mb-12 sm:mb-16"
                >
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl text-rose-600 font-bold mb-6 sm:mb-8 font-romantic drop-shadow-md leading-tight px-2"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Will you be my Valentine? 💝
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg sm:text-xl text-rose-800/90 mb-6 px-4 leading-relaxed"
                    >
                        You make my world brighter every day...
                    </motion.p>
                </motion.div>

                <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 relative min-h-[200px] sm:min-h-[250px]">
                    <Link href="/yes" className="w-full sm:w-auto z-20">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            whileTap={{ scale: 0.92 }}
                            style={{ scale: yesSize }}
                            className="w-full sm:w-auto px-12 py-5 sm:py-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-2xl sm:text-3xl font-bold shadow-2xl active:shadow-lg transition-all touch-manipulation"
                        >
                            <motion.span
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
                                className="inline-block"
                            >
                                YES! 💖
                            </motion.span>
                        </motion.button>
                    </Link>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: noBtnPosition.y, x: noBtnPosition.x }}
                        transition={{
                            opacity: { delay: 1 },
                            y: { type: "spring", stiffness: 300, damping: 20 },
                            x: { type: "spring", stiffness: 300, damping: 20 },
                        }}
                        onTouchStart={moveNoButton}
                        onClick={moveNoButton}
                        className="px-10 py-4 bg-gray-300 text-gray-600 rounded-full text-xl sm:text-2xl font-bold active:bg-gray-400 touch-manipulation shadow-lg absolute sm:static"
                    >
                        No 😢
                    </motion.button>
                </div>

                {noAttempts > 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 sm:mt-16 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-rose-200"
                    >
                        <motion.p
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-rose-600 font-medium text-lg sm:text-xl"
                        >
                            {noAttempts > 5 ? "Come on, you know you want to! 😘" : "Hmm, having trouble clicking 'No'? Maybe it's a sign... 😉"}
                        </motion.p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
