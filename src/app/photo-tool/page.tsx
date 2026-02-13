'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, RefreshCw, Scissors } from 'lucide-react';
import ImageCropper from '@/components/ImageCropper';
import Link from 'next/link';

export default function PhotoToolPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleCropComplete = (cropped: string) => {
        setCroppedImage(cropped);
        setPreviewImage(null);
    };

    const handleCropCancel = () => {
        setPreviewImage(null);
    };

    const handleDownload = () => {
        if (!croppedImage) return;
        const link = document.createElement('a');
        link.href = croppedImage;
        link.download = 'photo.jpeg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl mb-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 font-romantic">
                            Photo Adjuster Tool ✂️
                        </h1>
                        <Link href="/yes" className="text-indigo-500 hover:text-indigo-700 font-medium">
                            Back to Celebration
                        </Link>
                    </div>

                    <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 mb-8">
                        <p className="text-indigo-800 font-medium">
                            Use this tool to crop your photos perfectly for the card directly in your browser.
                            <br />
                            1. Upload → 2. Adjust/Crop → 3. Download → 4. Copy to public folder
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left: Upload Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-700">1. Upload Photo</h2>
                            <label className="block cursor-pointer">
                                <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 hover:bg-indigo-50 transition-colors aspect-[4/3] flex flex-col items-center justify-center bg-white">
                                    <Upload className="w-12 h-12 text-indigo-400 mb-2" />
                                    <p className="text-indigo-600 font-medium">Click to Choose Photo</p>
                                    <p className="text-sm text-gray-500 mt-1">Select original image</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Right: Result Section */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-700">2. Result</h2>
                            {croppedImage ? (
                                <div className="space-y-4">
                                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-green-200 relative bg-white">
                                        <img src={croppedImage} alt="Cropped result" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                                            {/* Overlay */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-6 h-6" />
                                        Download Cropped Image
                                    </button>
                                    <p className="text-sm text-center text-gray-500">
                                        Save as <strong>photo1.jpeg</strong> (or 2, 3, 4) and put in <strong>public/</strong> folder.
                                    </p>
                                </div>
                            ) : (
                                <div className="aspect-[4/3] rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-gray-400 border-2 border-gray-200">
                                    <Scissors className="w-12 h-12 mb-2 opacity-50" />
                                    <p>Cropped image will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Cropper Modal */}
            {previewImage && (
                <ImageCropper
                    image={previewImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                    aspectRatio={4 / 3}
                />
            )}
        </div>
    );
}
