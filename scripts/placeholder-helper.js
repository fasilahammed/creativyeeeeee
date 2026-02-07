// Simple script to create placeholder images for your Valentine's website
// This creates colorful gradient placeholders until you add your real photos

const fs = require('fs');
const path = require('path');

console.log('📸 Creating placeholder images...\n');

const placeholders = [
    {
        name: 'photo1.jpg',
        emoji: '📸',
        text: 'Our First Date',
        colors: 'from-pink-400 via-rose-400 to-red-400'
    },
    {
        name: 'photo2.jpg',
        emoji: '🥰',
        text: 'The time we laughed...',
        colors: 'from-purple-400 via-pink-400 to-rose-400'
    },
    {
        name: 'photo3.jpg',
        emoji: '🌟',
        text: 'A perfect moment',
        colors: 'from-yellow-400 via-orange-400 to-pink-400'
    },
    {
        name: 'photo4.jpg',
        emoji: '💕',
        text: 'Forever & always',
        colors: 'from-blue-400 via-indigo-400 to-purple-400'
    }
];

console.log('ℹ️  Note: This script creates HTML placeholders, not actual images.\n');
console.log('To add real photos:\n');
console.log('1. Take 4 photos from your gallery');
console.log('2. Rename them to: photo1.jpg, photo2.jpg, photo3.jpg, photo4.jpg');
console.log('3. Place them in the public/ folder');
console.log('4. Refresh the website - they will appear automatically!\n');
console.log('📖 For detailed instructions, see PHOTO_GUIDE.md\n');
console.log('✨ Your website is ready at: http://localhost:3000\n');

console.log('Current placeholder setup:');
placeholders.forEach((p, i) => {
    console.log(`  ${i + 1}. ${p.emoji} ${p.name} - "${p.text}"`);
});

console.log('\n💡 Pro tip: Use photos that are:');
console.log('   - At least 800x600 pixels');
console.log('   - 4:3 aspect ratio works best');
console.log('   - Clear and well-lit\n');

module.exports = { placeholders };
