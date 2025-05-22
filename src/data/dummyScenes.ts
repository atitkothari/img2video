import { SceneData } from '@/components/Scene';

export interface DummySceneData extends SceneData {
  thumbnailUrl: string;
}

export const dummyScenes: DummySceneData[] = [
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-2.jpeg',
    sceneDirection: 'A group of four friends hiking through a sunlit forest, laughing and chatting. Their expressions are carefree and happy. Suddenly, the sky darkens as clouds roll in. The sunlight starts to fade as thunder rumbles in the distance. Wind begins to rustle the leaves as the friends\' expressions shift to concern.',
    dialogues: [
      {
        character: 'Sarah',
        text: 'This trail is absolutely beautiful! Look at those wildflowers!',
        emotion: 'happy'
      },
      {
        character: 'Mike',
        text: 'Yeah, and the weather couldn\'t be more perfect for hiking.',
        emotion: 'cheerful'
      },
      {
        character: 'Emma',
        text: 'Guys, did you hear that? I think I heard thunder.',
        emotion: 'concerned'
      },
      {
        character: 'Alex',
        text: 'The sky is getting dark really fast. We should probably find shelter soon.',
        emotion: 'worried'
      }
    ],
    audioDirection: 'Upbeat forest ambience with birds chirping and gentle wind. Gradually transitions to ominous thunder and increasing wind sounds. Music shifts from cheerful to tense.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-3.jpeg',
    sceneDirection: 'Thunder rumbles loudly as rain begins to fall. The four friends quickly set up a tent in a small clearing among tall trees. They gather firewood and work together to prepare their campsite before the heavy rain hits. The forest grows darker as storm clouds completely block the sun. Wind whips through the trees as they secure the tent.',
    dialogues: [
      {
        character: 'Mike',
        text: 'Quick! Help me with the tent poles!',
        emotion: 'urgent'
      },
      {
        character: 'Sarah',
        text: 'I\'ll gather some firewood before it gets too wet!',
        emotion: 'determined'
      },
      {
        character: 'Emma',
        text: 'The wind is getting really strong. Hold the tent down!',
        emotion: 'anxious'
      },
      {
        character: 'Alex',
        text: 'Everyone inside! The rain\'s getting heavier!',
        emotion: 'commanding'
      }
    ],
    audioDirection: 'Heavy rain and thunder sounds. Strong wind through trees. Tension-building orchestral music with deep bass notes. Mix of natural storm sounds and dramatic score.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-5.jpeg',
    sceneDirection: 'Night has fallen. Inside the tent, three friends huddle around a lantern, playing games and telling stories. Rain patters on the tent canvas. Suddenly, they freeze as they hear a branch snap outside. They exchange worried glances. One of them slowly moves to peek outside but can\'t see anything in the darkness. The sounds of footsteps become louder and more frequent.',
    dialogues: [
      {
        character: 'Emma',
        text: 'Did you hear that? Something\'s moving outside.',
        emotion: 'fearful'
      },
      {
        character: 'Sarah',
        text: 'Maybe it\'s just the wind... or an animal?',
        emotion: 'nervous'
      },
      {
        character: 'Mike',
        text: 'That didn\'t sound like an animal. Those footsteps are too heavy.',
        emotion: 'serious'
      }
    ],
    audioDirection: 'Soft rain on tent canvas. Sudden branch snap sound effect. Building tension with subtle footsteps and rustling leaves. Suspenseful music with string instruments and low drones.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-6.jpeg',
    sceneDirection: 'One friend whispers that he\'s going to check outside. Despite protests from the others, he slowly unzips the tent and steps out into the darkness. The rain has stopped but the forest is pitch black. His friends watch anxiously from the tent entrance as he disappears among the trees. Moments pass, but he doesn\'t return. The remaining friends call his name but receive no answer.',
    dialogues: [
      {
        character: 'Alex',
        text: 'I\'m going to check what\'s out there. Stay here.',
        emotion: 'determined'
      },
      {
        character: 'Sarah',
        text: 'No, Alex! It\'s too dangerous!',
        emotion: 'fearful'
      },
      {
        character: 'Emma',
        text: 'Alex? Alex! Where are you?',
        emotion: 'panicked'
      },
      {
        character: 'Mike',
        text: 'This isn\'t right. He should have come back by now.',
        emotion: 'worried'
      }
    ],
    audioDirection: 'Tent zipper sound. Complete silence after rain stops. Occasional distant forest sounds. Building tension with minimal ambient music. Sudden silence when friend disappears.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-4.jpeg',
    sceneDirection: 'The three remaining friends gather their courage and exit the tent together. They call out for their missing friend but hear only the sounds of the forest. Their flashlight beams cut through the fog and darkness as they move cautiously between the trees. Their expressions show growing fear and concern. They realize they are lost in the unfamiliar woods as they search frantically.',
    dialogues: [
      {
        character: 'Mike',
        text: 'Alex! Can you hear us?',
        emotion: 'desperate'
      },
      {
        character: 'Sarah',
        text: 'I don\'t recognize any of these trees. We\'re lost.',
        emotion: 'frightened'
      },
      {
        character: 'Emma',
        text: 'Look! I see something moving in the fog!',
        emotion: 'terrified'
      }
    ],
    audioDirection: 'Echoing calls in the forest. Footsteps on wet ground. Flashlight beam sound effects. Increasingly tense music with percussion and strings. Mix of natural forest sounds and dramatic score.'
  },
  
]; 