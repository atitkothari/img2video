import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const generationsPath = path.join(process.cwd(), 'public', 'generations');
        
        // Create generations directory if it doesn't exist
        if (!fs.existsSync(generationsPath)) {
            fs.mkdirSync(generationsPath, { recursive: true });
        }

        const sessions = fs.readdirSync(generationsPath)
            .filter(file => {
                const fullPath = path.join(generationsPath, file);
                return fs.statSync(fullPath).isDirectory() && file.startsWith('session_');
            })
            .map(sessionId => {
                const sessionPath = path.join(generationsPath, sessionId);
                const files = fs.readdirSync(sessionPath);
                const hasFinalVideo = files.includes('final_video.mp4');
                const sceneCount = files.filter(f => f.startsWith('scene_') && f.endsWith('_with_audio.mp4')).length;
                const timestamp = parseInt(sessionId.split('_')[1]);
                const date = new Date(timestamp);
                
                return {
                    id: sessionId,
                    date: date.toLocaleString(),
                    sceneCount,
                    hasFinalVideo,
                    timestamp
                };
            })
            .sort((a, b) => b.timestamp - a.timestamp); // Sort by newest first

        return NextResponse.json({
            success: true,
            sessions
        });
    } catch (error) {
        console.error('Error listing sessions:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to list sessions' },
            { status: 500 }
        );
    }
} 