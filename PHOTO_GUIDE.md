# 🎨 How to Add Real Photos

## Quick Method (Recommended)

1. **Add your photos to the `public` folder**:
   ```
   public/
   ├── photo1.jpg  (Your first date)
   ├── photo2.jpg  (A moment you laughed together)
   ├── photo3.jpg  (A perfect moment)
   └── photo4.jpg  (Forever & always)
   ```

2. **The photos will show automatically!** 
   - The website is already set up to display images from the `public` folder
   - Just make sure the filenames match exactly

## Photo Tips

### Best Formats
- `.jpg` or `.jpeg` - Best for photos
- `.png` - Good for images with transparency
- `.webp` - Modern, smaller file size

### Image Size Recommendations
- **Minimum**: 800x600px
- **Recommended**: 1200x900px or higher
- **Aspect Ratio**: 4:3 works best with the current design

### Optimizing Photos
If your photos are very large (over 2MB each):
1. Use an online tool like [TinyPNG.com](https://tinypng.com/)
2. Or resize in your photo editor
3. This will make the website load faster!

## Manual Method (Advanced)

If you want to use different filenames or add more control:

**Edit `src/app/yes/page.tsx`:**

```tsx
// Find this section (around line 71-92) and update it:

<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
  <div className="bg-white p-4 rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
    <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
      <Image
        src="/your-photo-name.jpg"
        alt="Our First Date"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
    <p className="text-center text-rose-600 font-pacifico text-xl">Our First Date</p>
  </div>
  
  {/* Repeat for other photos */}
</div>
```

**Don't forget to import Image at the top:**
```tsx
import Image from 'next/image';
```

## Adding More Photos

Want to add more than 4 photos?

1. Copy one of the photo frame `<div>` blocks
2. Paste it inside the grid
3. Change the image source and caption
4. The grid will automatically adjust!

## Photo Captions

Current captions:
- "Our First Date"
- "The time we laughed..."
- "A perfect moment"
- "Forever & always"

Feel free to change these to match your actual photos! Edit the `<p className="text-center...">` text in `yes/page.tsx`.

---

Need help? The photos should "just work" once you add them to the `public` folder with the right names! 📸💕
