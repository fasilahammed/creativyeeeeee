'use client';

import FloatingHearts from '@/components/FloatingHearts';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 to-rose-200 px-4">
      <FloatingHearts />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        className="z-10 text-center p-6 sm:p-8 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 max-w-md w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold text-rose-600 mb-6 font-romantic drop-shadow-md leading-tight"
        >
          Hi Hanana! ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl sm:text-2xl text-rose-800 mb-10 font-medium leading-relaxed"
        >
          I have a very special question for you...
        </motion.p>

        <Link href="/valentine">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileTap={{ scale: 0.92 }}
            className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-xl sm:text-2xl font-bold shadow-2xl active:shadow-lg transition-all flex items-center justify-center gap-3 touch-manipulation"
          >
            <span>Open Surprise</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              💌
            </motion.span>
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 text-rose-400 text-sm sm:text-base"
      >
        Made with ❤️ by Fasil
      </motion.div>
    </div>
  );
}
