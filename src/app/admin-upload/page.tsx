'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, X, Lock } from 'lucide-react';

export default function AdminUploadPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const ADMIN_PASSWORD = 'hanana2026'; // Change this to your secret password

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            // Check if images are already in localStorage
            const stored = localStorage.getItem('valentineImages');
            if (stored) {
                setUploadedImages(JSON.parse(stored));
            }
        } else {
            alert('Wrong password!');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, photoKey: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check if this image was already uploaded
        const stored = localStorage.getItem('valentineImages');
        if (stored) {
            const existing = JSON.parse(stored);
            if (existing[photoKey]) {
                alert('This photo slot is already filled! To protect your privacy, you cannot change it from here. If you need to change it, clear your browser data first.');
                return;
            }
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;

            // Save to localStorage
            const newImages = { ...uploadedImages, [photoKey]: base64String };
            setUploadedImages(newImages);
            localStorage.setItem('valentineImages', JSON.stringify(newImages));

            setUploadStatus(`${photoKey} uploaded successfully! ✅`);
            setTimeout(() => setUploadStatus(''), 3000);
        };
        reader.readAsDataURL(file);
    };

    const allImagesUploaded = Object.keys(uploadedImages).length === 4;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-md w-full"
                >
                    <div className="flex justify-center mb-6">
                        <Lock className="w-16 h-16 text-rose-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-rose-600 text-center mb-6 font-romantic">
                        Private Upload Area
                    </h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Enter Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-full border-2 border-rose-300 focus:border-rose-500 focus:outline-none"
                                placeholder="Password"
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full font-bold hover:shadow-lg transition-all"
                        >
                            Unlock 🔓
                        </button>
                    </form>
                    <p className="text-sm text-gray-600 text-center mt-4">
                        Password hint: Her name + year
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl mb-8"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-4 font-romantic">
                        Upload Your Private Photos 📸
                    </h1>
                    <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 mb-6">
                        <p className="text-rose-800 font-medium">
                            🔒 <strong>Privacy Protected:</strong> Images are stored locally in your browser only.
                            They never leave your device or get uploaded to any server. Once uploaded, they cannot be
                            changed from this page to protect your privacy.
                        </p>
                    </div>

                    {uploadStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-100 border-2 border-green-300 rounded-2xl p-4 mb-6"
                        >
                            <p className="text-green-800 font-medium">{uploadStatus}</p>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {['photo1', 'photo2', 'photo3', 'photo4'].map((photoKey, index) => {
                            const captions = ['Our First Date', 'The time we laughed...', 'A perfect moment', 'Forever & always'];
                            const isUploaded = !!uploadedImages[photoKey];

                            return (
                                <div key={photoKey} className="bg-white rounded-2xl p-4 shadow-lg border-2 border-rose-200">
                                    <h3 className="font-bold text-rose-600 mb-2 font-romantic text-lg">
                                        {captions[index]}
                                    </h3>

                                    {isUploaded ? (
                                        <div className="relative">
                                            <img
                                                src={uploadedImages[photoKey]}
                                                alt={captions[index]}
                                                className="w-full aspect-[4/3] object-cover rounded-xl"
                                            />
                                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <p className="text-green-600 font-medium text-sm mt-2">✅ Uploaded & Protected</p>
                                        </div>
                                    ) : (
                                        <label className="block cursor-pointer">
                                            <div className="border-2 border-dashed border-rose-300 rounded-xl p-8 hover:bg-rose-50 transition-colors aspect-[4/3] flex flex-col items-center justify-center">
                                                <Upload className="w-12 h-12 text-rose-400 mb-2" />
                                                <p className="text-rose-600 font-medium">Click to Upload</p>
                                                <p className="text-sm text-gray-500 mt-1">JPG, PNG (max 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, photoKey)}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {allImagesUploaded && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-2xl p-6 text-center"
                        >
                            <h2 className="text-2xl font-bold text-green-700 mb-2">🎉 All Photos Uploaded!</h2>
                            <p className="text-green-800 mb-4">
                                Your private photos are ready! They will now appear on the celebration page.
                            </p>
                            <a
                                href="/yes"
                                className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                            >
                                Preview Celebration Page 💝
                            </a>
                        </motion.div>
                    )}

                    <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                        <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Notes:</h3>
                        <ul className="text-yellow-800 text-sm space-y-1 list-disc list-inside">
                            <li>Images are stored in your browser's localStorage (completely private)</li>
                            <li>Once uploaded, you cannot change them from this page</li>
                            <li>To change images: Clear browser data and re-upload</li>
                            <li>Images will be lost if you clear browser data</li>
                            <li>Recommended: Upload photos before sharing the site with Hanana</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
