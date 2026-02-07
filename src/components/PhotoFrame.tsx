import Image from 'next/image';

interface PhotoFrameProps {
    src: string;
    alt: string;
    caption: string;
    rotation?: number;
}

export default function PhotoFrame({ src, alt, caption, rotation = 0 }: PhotoFrameProps) {
    const rotationClass = rotation > 0 ? `rotate-${rotation}` : rotation < 0 ? `-rotate-${Math.abs(rotation)}` : '';

    return (
        <div className={`bg-white p-4 rounded-xl shadow-lg transform ${rotationClass} hover:rotate-0 transition-transform duration-300`}>
            <div className="aspect-[4/3] bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg overflow-hidden relative group">
                {src.startsWith('/photo') ? (
                    // Placeholder instruction
                    <div className="flex items-center justify-center h-full text-gray-600">
                        <div className="text-center p-4">
                            <span className="text-6xl mb-2 block">📸</span>
                            <p className="text-sm font-medium">Add your photo:</p>
                            <p className="text-xs opacity-70">{src}</p>
                            <p className="text-xs mt-2 opacity-50">Use Image component when adding real photos</p>
                        </div>
                    </div>
                ) : (
                    // Real image
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
            </div>
            <p className="text-center text-rose-600 font-pacifico text-xl mt-2">{caption}</p>
        </div>
    );
}
