'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function YesPage() {
    const [showGallery, setShowGallery] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Load images from public folder (works on Netlify!)
        const publicImages: { [key: string]: string } = {
            photo1: '/photo1.jpeg',
            photo2: '/photo2.jpeg',
            photo3: '/photo3.jpeg',
            photo4: '/photo4.jpeg',
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24 max-w-6xl mx-auto px-4">
                            {photos.map((photo, index) => {
                                const hasImage = uploadedImages[photo.key];

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
                                        whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, delay: index * 0.2, type: "spring", bounce: 0.4 }}
                                        whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
                                        className="group bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 transform transition-all duration-500 hover:shadow-[0_30px_60px_rgba(244,63,94,0.2)]"
                                    >
                                        <div className={`aspect-[4/3] rounded-2xl flex items-center justify-center mb-6 overflow-hidden relative shadow-inner ${hasImage ? 'bg-black/5' : `bg-gradient-to-br ${photo.gradient}`}`}>
                                            {hasImage ? (
                                                <motion.img
                                                    src={uploadedImages[photo.key]}
                                                    alt={photo.caption}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                    initial={{ scale: 1.1 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.5 }}
                                                />
                                            ) : (
                                                <div className="text-center p-6 w-full h-full flex flex-col items-center justify-center bg-white/30 backdrop-blur-md">
                                                    <span className="text-5xl sm:text-6xl md:text-7xl mb-4 block drop-shadow-md animate-bounce">{photo.emoji}</span>
                                                    <p className="text-sm font-medium text-gray-600 bg-white/60 px-4 py-2 rounded-full shadow-sm border border-white/50">
                                                        Add <strong>{photo.key}.jpeg</strong> to public folder
                                                    </p>
                                                </div>
                                            )}

                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 bg-rose-100 rounded-full shadow-inner flex items-center justify-center z-10">
                                                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                                            </div>
                                            <h3 className="text-center text-2xl sm:text-3xl font-romantic text-rose-600 drop-shadow-sm pt-2 group-hover:text-rose-500 transition-colors">
                                                {photo.caption}
                                            </h3>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Love Letter */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(255,255,255,0.5)] border border-white/60 max-w-4xl mx-auto mb-20 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-200 via-pink-400 to-rose-200" />

                            <motion.div
                                className="flex justify-center mb-8 relative"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="absolute inset-0 bg-rose-400 blur-2xl opacity-20 rounded-full" />
                                <Heart className="text-rose-500 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md relative z-10" fill="currentColor" />
                            </motion.div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl text-rose-600 font-bold mb-10 text-center font-romantic leading-tight drop-shadow-sm">
                                My Promise to You
                            </h2>

                            <div className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed space-y-8 font-medium text-center">
                                <p>
                                    Dearest Hanana,
                                </p>
                                <p className="text-gray-600 italic">
                                    "Being with you makes every day feel like a celebration. Your smile is my favorite sight, and your laughter is my favorite sound."
                                </p>
                                <p>
                                    I promise to always be there for you, to support your dreams, and to love you more with each passing day.
                                </p>
                                <p className="text-rose-500 font-semibold">
                                    Thank you for being my Valentine, today and always.
                                </p>
                                <motion.div
                                    className="mt-12 pt-8 border-t border-rose-200/50"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="text-3xl sm:text-4xl text-rose-600 font-romantic">
                                        Forever Yours, <br />
                                        <span className="text-4xl sm:text-5xl mt-2 inline-block">Fasil ❤️</span>
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Bottom Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-center pb-8"
                        >
                            <p className="text-rose-400 text-sm sm:text-base md:text-lg font-medium mb-4">
                                Happy Valentine's Day, my love! 🌹
                            </p>
                            <Link href="/photo-tool" className="text-xs text-rose-300 hover:text-rose-500 transition-colors">
                                Need to adjust photos? Click here
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
