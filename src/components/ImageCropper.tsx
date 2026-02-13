'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCropperProps {
    image: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: () => void;
    aspectRatio?: number;
}

export default function ImageCropper({ image, onCropComplete, onCancel, aspectRatio = 4 / 3 }: ImageCropperProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number; height: number; x: number; y: number } | null>(null);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropAreaChange = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createCroppedImage = async () => {
        if (!croppedAreaPixels) return;

        const canvas = document.createElement('canvas');
        const img = new Image();
        img.src = image;

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to cropped area
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        // Apply rotation
        if (rotation !== 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
        }

        // Draw cropped image
        ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return canvas.toDataURL('image/jpeg', 0.95);
    };

    const handleSave = async () => {
        const croppedImage = await createCroppedImage();
        if (croppedImage) {
            onCropComplete(croppedImage);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-black/50">
                    <h2 className="text-white text-xl font-bold">Adjust Your Photo</h2>
                    <button
                        onClick={onCancel}
                        className="text-white hover:text-rose-400 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cropper Area */}
                <div className="flex-1 relative">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={aspectRatio}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropAreaChange}
                    />
                </div>

                {/* Controls */}
                <div className="bg-black/50 p-4 space-y-4">
                    {/* Zoom Control */}
                    <div>
                        <label className="text-white text-sm mb-2 block">Zoom</label>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Rotation Control */}
                    <div>
                        <label className="text-white text-sm mb-2 block">Rotation</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="range"
                                min={0}
                                max={360}
                                step={1}
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <button
                                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                            >
                                <RotateCw className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3 bg-gray-600 text-white rounded-full font-bold hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <Check className="w-5 h-5" />
                            Use This Crop
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
