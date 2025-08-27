import { NextResponse } from 'next/server';
import type { SceneData } from '@/components/Scene';
import { LumaAI } from 'lumaai';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import type { FfmpegCommand } from 'fluent-ffmpeg';
import Replicate from "replicate";

const API_KEY = process.env.LUMA_API_KEY;
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

// Validate required environment variables
if (!API_KEY) {
    throw new Error('LUMA_API_KEY environment variable is required');
}
if (!REPLICATE_API_KEY) {
    throw new Error('REPLICATE_API_KEY environment variable is required');
}

const client = new LumaAI({ authToken: API_KEY });
const replicate = new Replicate({ auth: REPLICATE_API_KEY });

// Voice mapping for characters
const VOICE_MAPPING: Record<string, string> = {
    'sarah': 'af_sarah',    // Adult female voice for Sarah
    'mike': 'am_michael',   // Adult male voice for Mike
    'emma': 'af_bella',     // Adult female voice for Emma
    'alex': 'am_adam',      // Adult male voice for Alex
    'default': 'af_nicole'  // Default voice
};

// Keep track of pending generations
const pendingGenerations = new Set<string>();

// Handle process termination
process.on('SIGINT', async () => {
    console.log('\nCancelling all pending generations...');
    try {
        const cancelPromises = Array.from(pendingGenerations).map(async (generationId) => {
            try {
                // @ts-ignore - The LumaAI types are not complete
                await client.generations.cancel(generationId);
                console.log(`Cancelled generation: ${generationId}`);
            } catch (error) {
                console.error(`Error cancelling generation ${generationId}:`, error);
            }
        });
        await Promise.all(cancelPromises);
        console.log('All generations cancelled.');
    } catch (error) {
        console.error('Error during cancellation:', error);
    }
    process.exit(0);
});

function createSessionFolder(): string {
    const sessionId = `session_${Date.now()}`;
    const sessionPath = path.join(process.cwd(), 'public', 'generations', sessionId);
    fs.mkdirSync(sessionPath, { recursive: true });
    return sessionPath;
}

async function downloadVideo(url: string, outputPath: string): Promise<string> {
    const response = await fetch(url);
    if (!response.body) {
        throw new Error('No response body received');
    }
    const fileStream = fs.createWriteStream(outputPath);
    await new Promise<void>((resolve, reject) => {
        response.body!.pipe(fileStream);
        response.body!.on('error', reject);
        fileStream.on('finish', resolve);
    });
    return outputPath;
}

interface GenerationResponse {
    id: string;
    state: string;
    failure_reason?: string;
    assets?: {
        video: string;
    };
}

async function generateVideo(videoParams: any): Promise<string> {
    let generation = await client.generations.create({
        ...videoParams,
    }) as GenerationResponse;
    pendingGenerations.add(generation.id);

    let completed = false;
    while (!completed) {
        generation = await client.generations.get(generation.id) as GenerationResponse;

        if (generation.state === "completed") {
            completed = true;
            pendingGenerations.delete(generation.id);
        } else if (generation.state === "failed") {
            pendingGenerations.delete(generation.id);
            throw new Error(`Generation failed: ${generation.failure_reason || 'Unknown reason'}`);
        } else {
            console.log("Dreaming...", generation.id);
            await new Promise(r => setTimeout(r, 3000));
        }
    }

    if (!generation.assets?.video) {
        throw new Error('No video asset in generation response');
    }

    return generation.assets.video;
}

async function generateAudio(text: string, character: string): Promise<string> {
    const voice = VOICE_MAPPING[character.toLowerCase()] || VOICE_MAPPING.default;
    
                    const output = await replicate.run(
                    "meta/tts:8beff3369e81422112d93b89ca014783a47b0c8faa15a7ea17d2e0a68a3fdc6d1",
                    {
                        input: {
                            text: text,
                            voice: voice
                        }
                    }
                ) as unknown as string;

    return output;
}

async function combineVideoAndAudio(videoPath: string, audioPath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .outputOptions([
                '-c:v copy',
                '-c:a aac',
                '-shortest',
                '-y'
            ])
            .output(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err))
            .run();
    });
}

export async function POST(request: Request) {
    try {
        const { scenes, sessionId } = await request.json();
        
        if (!scenes || !Array.isArray(scenes) || scenes.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Scenes array is required' },
                { status: 400 }
            );
        }

        if (!sessionId) {
            return NextResponse.json(
                { success: false, message: 'Session ID is required' },
                { status: 400 }
            );
        }

        const sessionPath = path.join(process.cwd(), 'public', 'generations', sessionId);
        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }

        const sceneS3Urls: string[] = [];
        const sceneVideos: string[] = [];

        // Generate videos for each scene
        for (let i = 0; i < scenes.length; i++) {
            const scene = scenes[i];
            console.log(`Processing scene ${i + 1}/${scenes.length}`);

            try {
                // Generate video using Luma AI
                const videoParams = {
                    prompt: scene.prompt,
                    negative_prompt: scene.negativePrompt || "blurry, low quality, distorted",
                    num_frames: 120,
                    fps: 24,
                    aspect_ratio: "16:9",
                    motion_bucket_id: 127,
                    cond_aug: 0.02,
                    camera_motion: "fixed",
                    num_inference_steps: 14,
                    guidance_scale: 7.5,
                    enable_safety_checker: true,
                    enable_adm_guidance: true,
                    seed: Math.floor(Math.random() * 1000000)
                };

                const videoUrl = await generateVideo(videoParams);
                const videoPath = path.join(sessionPath, `scene_${i}_video.mp4`);
                await downloadVideo(videoUrl, videoPath);

                // Generate audio for dialogues
                let audioPath: string | null = null;
                if (scene.dialogues && scene.dialogues.length > 0) {
                    const dialogueText = scene.dialogues.map((d: any) => d.text).join(' ');
                    const character = scene.dialogues[0]?.character || 'default';
                    
                    try {
                        const audioUrl = await generateAudio(dialogueText, character);
                        audioPath = path.join(sessionPath, `scene_${i}_audio.wav`);
                        await downloadVideo(audioUrl, audioPath);
                    } catch (audioError) {
                        console.error(`Error generating audio for scene ${i}:`, audioError);
                    }
                }

                // Combine video and audio
                const finalVideoPath = path.join(sessionPath, `scene_${i}_with_audio.mp4`);
                if (audioPath && fs.existsSync(audioPath)) {
                    await combineVideoAndAudio(videoPath, audioPath, finalVideoPath);
                    // Clean up temporary files
                    fs.unlinkSync(videoPath);
                    fs.unlinkSync(audioPath);
                } else {
                    // If no audio, just rename the video
                    fs.renameSync(videoPath, finalVideoPath);
                }

                sceneVideos.push(finalVideoPath);
                sceneS3Urls.push(''); // Will be filled after S3 upload

                console.log(`Scene ${i + 1} completed successfully`);
            } catch (error) {
                console.error(`Error processing scene ${i}:`, error);
                // Continue with other scenes
                sceneS3Urls.push('');
            }
        }

        // Upload final videos to S3
        for (let i = 0; i < sceneVideos.length; i++) {
            if (sceneVideos[i] && fs.existsSync(sceneVideos[i])) {
                try {
                    const response = await fetch('/api/uploadToS3', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            filePath: `generations/${sessionId}/scene_${i}_with_audio.mp4`,
                            sessionId
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json() as any;
                        if (data.success) {
                            sceneS3Urls[i] = data.s3Url;
                        }
                    }
                } catch (error) {
                    console.error(`Error uploading scene ${i} to S3:`, error);
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: 'All scenes generated successfully',
            sessionId,
            sceneS3Urls,
            s3Url: sceneS3Urls[sceneS3Urls.length - 1] || null
        });

    } catch (error) {
        console.error('Error in generateClip:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to generate clips' },
            { status: 500 }
        );
    }
}
