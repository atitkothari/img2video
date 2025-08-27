import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

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
        const { filePath, sessionId } = await request.json();
        
        if (!filePath || !sessionId) {
            return NextResponse.json(
                { success: false, message: 'File path and session ID are required' },
                { status: 400 }
            );
        }

        const fullPath = path.join(process.cwd(), 'public', filePath);
        
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json(
                { success: false, message: 'File not found' },
                { status: 404 }
            );
        }

        const fileContent = fs.readFileSync(fullPath);
        const fileName = path.basename(filePath);
        const s3Key = `videos/${sessionId}/${fileName}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME || '',
            Key: s3Key,
            Body: fileContent,
            ContentType: 'video/mp4'
        });

        await s3Client.send(command);

        const s3Url = `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${s3Key}`;

        return NextResponse.json({
            success: true,
            message: 'File uploaded to S3 successfully',
            s3Url
        });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to upload to S3' },
            { status: 500 }
        );
    }
}
