import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

async function combineVideos(videoPaths: string[], outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const command = ffmpeg();
        videoPaths.forEach(path => command.input(path));

        const filterComplex = [
            ...videoPaths.map((_, i) => 
                `[${i}:v]fade=t=in:st=0:d=1:alpha=1,fade=t=out:st=4:d=1:alpha=1[v${i}]`
            ),
            `${videoPaths.map((_, i) => `[v${i}]`).join('')}concat=n=${videoPaths.length}:v=1:a=0[outv]`,
            `${videoPaths.map((_, i) => `[${i}:a]`).join('')}concat=n=${videoPaths.length}:v=0:a=1[outa]`
        ].join(';');

        command
            .outputOptions([
                '-filter_complex', filterComplex,
                '-map [outv]',
                '-map [outa]',
                '-c:v libx264',
                '-c:a aac',
                '-preset medium',
                '-crf 23',
                '-movflags +faststart',
                '-y'
            ])
            .output(outputPath)
            .on('start', (commandLine: string) => {
                console.log('FFmpeg started:', commandLine);
            })
            .on('progress', (progress: { percent?: number }) => {
                if (progress.percent !== undefined) {
                    console.log('Processing: ' + Math.floor(progress.percent) + '% done');
                }
            })
            .on('end', () => {
                console.log('Videos combined successfully!');
                resolve();
            })
            .on('error', (err: Error) => {
                console.error('Error combining videos:', err);
                reject(err);
            })
            .run();
    });
}

export async function POST(request: Request) {
    try {
        const { sessionId } = await request.json();
        
        if (!sessionId) {
            return NextResponse.json(
                { success: false, message: 'Session ID is required' },
                { status: 400 }
            );
        }

        const sessionPath = path.join(process.cwd(), 'public', 'generations', sessionId);
        
        if (!fs.existsSync(sessionPath)) {
            return NextResponse.json(
                { success: false, message: 'Session folder not found' },
                { status: 404 }
            );
        }

        // Get all scene videos
        const files = fs.readdirSync(sessionPath);
        const videoPaths = files
            .filter(file => file.startsWith('scene_') && file.endsWith('_with_audio.mp4'))
            .sort((a, b) => {
                const numA = parseInt(a.split('_')[1]);
                const numB = parseInt(b.split('_')[1]);
                return numA - numB;
            })
            .map(file => path.join(sessionPath, file));

        if (videoPaths.length === 0) {
            return NextResponse.json(
                { success: false, message: 'No videos found to combine' },
                { status: 404 }
            );
        }

        const finalVideoPath = path.join(sessionPath, 'final_video.mp4');
        await combineVideos(videoPaths, finalVideoPath);

        return NextResponse.json({
            success: true,
            message: 'Videos combined successfully',
            videoPath: `/generations/${sessionId}/final_video.mp4`
        });
    } catch (error) {
        console.error('Error combining videos:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to combine videos' },
            { status: 500 }
        );
    }
} 