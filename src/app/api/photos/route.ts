import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export async function GET() {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        const db = JSON.parse(data);
        return NextResponse.json(db);
    } catch (error) {
        return NextResponse.json({ photos: {}, uploadedAt: null });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { photoKey, imageData } = body;

        // Read current db
        let db;
        try {
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            db = JSON.parse(data);
        } catch {
            db = { photos: {}, uploadedAt: null };
        }

        // Update db
        db.photos[photoKey] = imageData;
        db.uploadedAt = new Date().toISOString();

        // Write to file
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

        return NextResponse.json({ success: true, photos: db.photos });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to save photo' },
            { status: 500 }
        );
    }
}
