'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function YesPage() {
    const [showGallery, setShowGallery] = useState(false);

    useEffect(() => {
        // Launch fireworks - more intense for celebration!
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // Fade in gallery after celebration starts
        setTimeout(() => setShowGallery(true), 1500);

        return () => clearInterval(interval);
    }, []);

    const photos = [
        { emoji: '📸', caption: 'Our First Date', gradient: 'from-pink-300 to-rose-400' },
        { emoji: '🥰', caption: 'The time we laughed...', gradient: 'from-purple-300 to-pink-400' },
        { emoji: '🌟', caption: 'A perfect moment', gradient: 'from-yellow-300 to-orange-400' },
        { emoji: '💕', caption: 'Forever & always', gradient: 'from-blue-300 to-indigo-400' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 relative overflow-x-hidden">
            <FloatingHearts />

            <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.h1
                        className="text-6xl sm:text-7xl md:text-8xl font-bold text-rose-600 mb-6 font-romantic drop-shadow-lg"
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        YAY! ❤️
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl sm:text-2xl text-rose-800 font-medium max-w-2xl mx-auto px-4 leading-relaxed"
                    >
                        I knew you'd say yes! You've made me the happiest person in the world, Hanana. 💝
                    </motion.p>
                </motion.div>

                {showGallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Mobile-optimized photo grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-4xl mx-auto">
                            {photos.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50, rotate: (index % 2 === 0 ? -3 : 3) }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    transition={{ delay: index * 0.2, type: "spring" }}
                                    whileTap={{ scale: 0.95, rotate: 0 }}
                                    className="bg-white p-4 rounded-2xl shadow-xl transform hover:rotate-0 transition-all duration-300"
                                    style={{
                                        transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`
                                    }}
                                >
                                    <div className={`aspect-[4/3] bg-gradient-to-br ${photo.gradient} rounded-xl flex items-center justify-center mb-4 overflow-hidden relative`}>
                                        <div className="text-center p-4">
                                            <span className="text-6xl sm:text-7xl mb-2 block">{photo.emoji}</span>
                                            <p className="text-sm sm:text-base font-medium text-gray-700">Add your photo:</p>
                                            <p className="text-xs sm:text-sm opacity-70 text-gray-600">public/photo{index + 1}.jpg</p>
                                        </div>
                                    </div>
                                    <p className="text-center text-rose-600 font-pacifico text-xl sm:text-2xl">{photo.caption}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Love Letter - Mobile optimized */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-2 border-rose-200 max-w-3xl mx-auto mb-12"
                        >
                            <motion.div
                                className="flex justify-center mb-6"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Heart className="text-rose-500 w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" />
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl text-rose-700 font-bold mb-6 sm:mb-8 text-center font-romantic leading-tight">
                                My Promise to You
                            </h2>

                            <div className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6">
                                <p className="font-medium">
                                    Dearest Hanana,
                                </p>
                                <p>
                                    Being with you makes every day feel like a celebration. Your smile is my favorite sight, and your laughter is my favorite sound.
                                    I promise to always be there for you, to support your dreams, and to love you more with each passing day.
                                </p>
                                <p>
                                    Thank you for being my Valentine, today and always.
                                </p>
                                <motion.p
                                    className="text-right font-bold mt-8 text-xl sm:text-2xl text-rose-600 font-romantic"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    - Forever Yours, Fasil ❤️
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Bottom message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-center pb-8"
                        >
                            <p className="text-rose-400 text-sm sm:text-base font-medium">
                                Happy Valentine's Day, my love! 🌹
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
