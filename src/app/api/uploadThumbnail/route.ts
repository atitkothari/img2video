import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Validate required environment variables
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials environment variables are required');
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'mimg2video';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const sessionId = formData.get('sessionId') as string;
        const sceneIndex = formData.get('sceneIndex') as string;

        if (!file || !sessionId || !sceneIndex) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate S3 key
        const fileName = `thumbnails/${sessionId}/scene_${sceneIndex}_thumbnail${file.name.substring(file.name.lastIndexOf('.'))}`;
        
        // Upload to S3
        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type
        }));

        // Return the S3 URL
        const fileUrl = `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${fileName}`;
        
        return NextResponse.json({
            success: true,
            thumbnailUrl: fileUrl
        });
    } catch (error) {
        console.error('Error uploading thumbnail:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload thumbnail' },
            { status: 500 }
        );
    }
}
