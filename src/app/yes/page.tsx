'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';

export default function YesPage() {
    const [showGallery, setShowGallery] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Load images from public folder (works on Netlify!)
        const publicImages: { [key: string]: string } = {
            photo1: '/photo1.jpg',
            photo2: '/photo2.jpg',
            photo3: '/photo3.jpg',
            photo4: '/photo4.jpg',
        };

        // Check which images exist and load them
        const loadedImages: { [key: string]: string } = {};
        Object.keys(publicImages).forEach((key) => {
            // Try to load from public folder
            fetch(publicImages[key])
                .then(response => {
                    if (response.ok) {
                        loadedImages[key] = publicImages[key];
                        setUploadedImages({ ...loadedImages });
                    }
                })
                .catch(() => {
                    // Image doesn't exist, that's ok
                });
        });


        // Launch fireworks
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

        setTimeout(() => setShowGallery(true), 1500);

        return () => clearInterval(interval);
    }, []);

    const photos = [
        { key: 'photo1', emoji: '📸', caption: 'Our First Date', gradient: 'from-pink-300 to-rose-400' },
        { key: 'photo2', emoji: '🥰', caption: 'The time we laughed...', gradient: 'from-purple-300 to-pink-400' },
        { key: 'photo3', emoji: '🌟', caption: 'A perfect moment', gradient: 'from-yellow-300 to-orange-400' },
        { key: 'photo4', emoji: '💕', caption: 'Forever & always', gradient: 'from-blue-300 to-indigo-400' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 relative overflow-x-hidden">
            <FloatingHearts />

            <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-rose-600 mb-6 font-romantic drop-shadow-lg"
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
                        className="text-lg sm:text-xl md:text-2xl text-rose-800 font-medium max-w-2xl mx-auto px-4 leading-relaxed"
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
                        {/* Photo Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-5xl mx-auto">
                            {photos.map((photo, index) => {
                                const hasImage = uploadedImages[photo.key];

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50, rotate: (index % 2 === 0 ? -3 : 3) }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        transition={{ delay: index * 0.2, type: "spring" }}
                                        whileTap={{ scale: 0.95, rotate: 0 }}
                                        className="bg-white p-4 sm:p-5 rounded-2xl shadow-2xl transform hover:rotate-0 transition-all duration-300"
                                        style={{
                                            transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`
                                        }}
                                    >
                                        <div className={`aspect-[4/3] rounded-xl flex items-center justify-center mb-4 overflow-hidden relative bg-gray-100 ${hasImage ? '' : `bg-gradient-to-br ${photo.gradient}`}`}>
                                            {hasImage ? (
                                                <img
                                                    src={uploadedImages[photo.key]}
                                                    alt={photo.caption}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="text-center p-4">
                                                    <span className="text-5xl sm:text-6xl md:text-7xl mb-2 block">{photo.emoji}</span>
                                                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                                                        Upload in admin panel
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-center text-rose-600 font-pacifico text-lg sm:text-xl md:text-2xl">
                                            {photo.caption}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Love Letter */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border-2 border-rose-200 max-w-4xl mx-auto mb-12"
                        >
                            <motion.div
                                className="flex justify-center mb-6 sm:mb-8"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Heart className="text-rose-500 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" fill="currentColor" />
                            </motion.div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-rose-700 font-bold mb-6 sm:mb-8 text-center font-romantic leading-tight">
                                My Promise to You
                            </h2>

                            <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed space-y-4 sm:space-y-6">
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
                                    className="text-right font-bold mt-8 text-xl sm:text-2xl md:text-3xl text-rose-600 font-romantic"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    - Forever Yours, Fasil ❤️
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Bottom Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-center pb-8"
                        >
                            <p className="text-rose-400 text-sm sm:text-base md:text-lg font-medium">
                                Happy Valentine's Day, my love! 🌹
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
