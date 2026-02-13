'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FloatingHearts from '@/components/FloatingHearts';

export default function ValentinePage() {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [noAttempts, setNoAttempts] = useState(0);
    const [canClickYes, setCanClickYes] = useState(false);

    const moveNoButton = () => {
        // Mobile-friendly random movement
        const maxMove = typeof window !== 'undefined' && window.innerWidth < 640 ? 100 : 150;
        const x = (Math.random() - 0.5) * maxMove;
        const y = (Math.random() - 0.5) * maxMove;
        setNoBtnPosition({ x, y });
        setNoAttempts(prev => prev + 1);

        // Enable YES button after 2 attempts
        if (noAttempts >= 1) {
            setCanClickYes(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 p-4 sm:p-8">
            <FloatingHearts />

            <div className="z-10 text-center max-w-2xl w-full px-4">
                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="mb-8 sm:mb-12"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-rose-600 font-bold mb-4 sm:mb-6 font-romantic drop-shadow-md leading-tight px-2"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        kunjaa.. Will you be my Valentine? 💝
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-base sm:text-lg md:text-xl text-rose-800/90 mb-4 px-4 leading-relaxed"
                    >
                        You make my world brighter every day...
                    </motion.p>


                </motion.div>

                {/* Buttons Container - Fixed positioning for mobile */}
                <div className="relative flex flex-col items-center gap-6 sm:gap-8 min-h-[280px] sm:min-h-[300px]">

                    {/* YES Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="w-full sm:w-auto z-20"
                    >
                        {canClickYes ? (
                            <Link href="/yes" className="block w-full sm:w-auto">
                                <motion.button
                                    whileTap={{ scale: 0.92 }}
                                    className="w-full sm:w-auto px-12 py-5 sm:py-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-xl sm:text-2xl md:text-3xl font-bold shadow-2xl active:shadow-lg transition-all touch-manipulation"
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
                        ) : (
                            <motion.button
                                onClick={() => alert("Try clicking 'No' at least 2 times first! 😉")}
                                className="w-full sm:w-auto px-12 py-5 sm:py-6 bg-gray-400 text-gray-200 rounded-full text-xl sm:text-2xl md:text-3xl font-bold shadow-xl cursor-not-allowed opacity-60"
                            >
                                YES! 💖
                            </motion.button>
                        )}
                    </motion.div>

                    {/* NO Button - Mobile Fixed */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            x: noBtnPosition.x,
                            y: noBtnPosition.y
                        }}
                        transition={{
                            opacity: { delay: 1 },
                            x: { type: "spring", stiffness: 300, damping: 20 },
                            y: { type: "spring", stiffness: 300, damping: 20 },
                        }}
                        onTouchStart={moveNoButton}
                        onClick={moveNoButton}
                        className="px-8 sm:px-10 py-4 bg-gray-300 text-gray-700 rounded-full text-lg sm:text-xl md:text-2xl font-bold active:bg-gray-400 touch-manipulation shadow-lg"
                    >
                        No 😢
                    </motion.button>
                </div>

                {/* Hints */}
                <AnimatePresence>
                    {noAttempts > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-8 sm:mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-rose-200"
                        >
                            <p className="text-rose-600 font-medium text-base sm:text-lg">
                                (Nayeekutyee ink ariyaa iyj noo nekum nn noki irinaalum madhi..😏)
                            </p>
                        </motion.div>
                    )}

                    {canClickYes && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-4 sm:mt-8 bg-gradient-to-r from-rose-100 to-pink-100 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-rose-300"
                        >
                            <motion.p
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-rose-600 font-bold text-lg sm:text-xl"
                            >
                                Now you can click "YES!" 💕✨
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
