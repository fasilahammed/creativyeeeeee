'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, Lock, AlertCircle } from 'lucide-react';
import ImageCropper from '@/components/ImageCropper';

export default function AdminUploadPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<{ [key: string]: string }>({});
    const [uploadStatus, setUploadStatus] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [currentPhotoKey, setCurrentPhotoKey] = useState<string | null>(null);

    const ADMIN_PASSWORD = 'hanana2026';

    useEffect(() => {
        if (isAuthenticated) {
            loadPhotos();
        }
    }, [isAuthenticated]);

    const loadPhotos = async () => {
        try {
            const response = await fetch('/api/photos');
            const data = await response.json();
            if (data.photos) {
                setUploadedImages(data.photos);
            }
        } catch (err) {
            setError('Failed to load photos');
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Wrong password!');
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, photoKey: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Read file and show cropper
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
            setCurrentPhotoKey(photoKey);
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = async (croppedImage: string) => {
        if (!currentPhotoKey) return;

        setLoading(true);
        setError('');
        setPreviewImage(null);

        try {
            // Send to API
            const response = await fetch('/api/photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photoKey: currentPhotoKey, imageData: croppedImage }),
            });

            const result = await response.json();

            if (response.ok) {
                setUploadedImages(result.photos);
                setUploadStatus(`${currentPhotoKey} uploaded successfully! ✅`);
                setTimeout(() => setUploadStatus(''), 3000);
            } else {
                setError(result.error || 'Upload failed');
            }
        } catch (err) {
            setError('Upload failed');
        } finally {
            setLoading(false);
            setCurrentPhotoKey(null);
        }
    };

    const handleCropCancel = () => {
        setPreviewImage(null);
        setCurrentPhotoKey(null);
    };

    const allImagesUploaded = Object.values(uploadedImages).filter(Boolean).length === 4;

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
                        Upload Your Photos 📸
                    </h1>

                    <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 mb-6">
                        <p className="text-rose-800 font-medium">
                            📸 <strong>Admin Panel:</strong> Upload or replace photos anytime. Hover over uploaded photos to see the replace option.
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

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-100 border-2 border-red-300 rounded-2xl p-4 mb-6 flex items-center gap-2"
                        >
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <p className="text-red-800 font-medium">{error}</p>
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
                                        <div className="relative group">
                                            <img
                                                src={uploadedImages[photoKey]}
                                                alt={captions[index]}
                                                className="w-full aspect-[4/3] object-cover rounded-xl"
                                            />
                                            <div className="absolute top-2 right-2 bg-green-500 rounded-full p-2">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer rounded-xl">
                                                <div className="text-center">
                                                    <Upload className="w-12 h-12 text-white mb-2 mx-auto" />
                                                    <p className="text-white font-bold">Click to Replace</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageSelect(e, photoKey)}
                                                    className="hidden"
                                                    disabled={loading}
                                                />
                                            </label>
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
                                                onChange={(e) => handleImageSelect(e, photoKey)}
                                                className="hidden"
                                                disabled={loading}
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
                                Your photos are saved! They will now appear on the celebration page.
                            </p>
                            <a
                                href="/yes"
                                className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                            >
                                Preview Celebration Page 💝
                            </a>
                        </motion.div>
                    )}

                    <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                        <h3 className="font-bold text-blue-800 mb-2">ℹ️ How It Works:</h3>
                        <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
                            <li>Images are stored in db.json file on the server</li>
                            <li>You can replace photos anytime - just hover and click</li>
                            <li>Photos will persist across browser sessions</li>
                            <li>Photos will be visible to anyone who accesses the site</li>
                        </ul>
                    </div>
                </motion.div>
            </div>

            {/* Image Cropper Modal */}
            {previewImage && (
                <ImageCropper
                    image={previewImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}
        </div>
    );
}
