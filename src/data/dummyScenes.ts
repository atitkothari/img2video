import { SceneData } from '@/components/Scene';

export interface DummySceneData extends SceneData {
  thumbnailUrl: string;
}

export const dummyScenes: DummySceneData[] = [
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-2.jpeg',
    sceneDirection: 'A dimly lit room with a single lamp casting long shadows. Camera slowly pans from left to right.',
    dialogues: 'Narrator: "In the quiet hours of the night, secrets come alive."',
    audioDirection: 'Ambient background music with subtle wind sounds. Volume fades in gradually.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-3.jpeg',
    sceneDirection: 'Close-up shot of a weathered hand holding an old photograph. Camera zooms out slowly.',
    dialogues: 'Character: "I remember that day like it was yesterday..."',
    audioDirection: 'Soft piano melody playing in the background. Add slight echo effect to dialogue.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-4.jpeg',
    sceneDirection: 'Wide shot of a bustling city street. Camera follows a mysterious figure walking through the crowd.',
    dialogues: 'Background voices: "Did you hear about what happened last night?"',
    audioDirection: 'Mix of city sounds - traffic, footsteps, distant conversations. Music fades out.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-5.jpeg',
    sceneDirection: 'Overhead shot of a chess board. Camera slowly rotates 360 degrees.',
    dialogues: 'Player 1: "Checkmate." Player 2: "Not quite..."',
    audioDirection: 'Tense orchestral music building up. Add subtle clock ticking sound.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-6.jpeg',
    sceneDirection: 'Slow motion shot of raindrops falling on a window. Camera focuses on a single drop.',
    dialogues: 'Voiceover: "Sometimes the smallest moments hold the biggest truths."',
    audioDirection: 'Gentle rain sounds with soft piano notes. Voiceover with slight reverb.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-7.jpeg',
    sceneDirection: 'A dramatic sunset over the city skyline. Camera slowly zooms out to reveal the full scene.',
    dialogues: 'Narrator: "As the day comes to an end, new possibilities begin."',
    audioDirection: 'Epic orchestral music building to a crescendo. Add subtle city ambience.'
  }
]; 