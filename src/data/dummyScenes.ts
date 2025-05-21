import { SceneData } from '@/components/Scene';

export interface DummySceneData extends SceneData {
  thumbnailUrl: string;
}

export const dummyScenes: DummySceneData[] = [
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-2.jpeg',
    sceneDirection: 'A group of four friends hiking through a sunlit forest, laughing and chatting. Their expressions are carefree and happy. Suddenly, the sky darkens as clouds roll in. The sunlight starts to fade as thunder rumbles in the distance. Wind begins to rustle the leaves as the friends\' expressions shift to concern.',
    dialogues: '',
    audioDirection: 'Upbeat forest ambience with birds chirping and gentle wind. Gradually transitions to ominous thunder and increasing wind sounds. Music shifts from cheerful to tense.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-3.jpeg',
    sceneDirection: 'Thunder rumbles loudly as rain begins to fall. The four friends quickly set up a tent in a small clearing among tall trees. They gather firewood and work together to prepare their campsite before the heavy rain hits. The forest grows darker as storm clouds completely block the sun. Wind whips through the trees as they secure the tent.',
    dialogues: '',
    audioDirection: 'Heavy rain and thunder sounds. Strong wind through trees. Tension-building orchestral music with deep bass notes. Mix of natural storm sounds and dramatic score.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-4.jpeg',
    sceneDirection: 'Night has fallen. Inside the tent, three friends huddle around a lantern, playing games and telling stories. Rain patters on the tent canvas. Suddenly, they freeze as they hear a branch snap outside. They exchange worried glances. One of them slowly moves to peek outside but can\'t see anything in the darkness. The sounds of footsteps become louder and more frequent.',
    dialogues: '',
    audioDirection: 'Soft rain on tent canvas. Sudden branch snap sound effect. Building tension with subtle footsteps and rustling leaves. Suspenseful music with string instruments and low drones.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-5.jpeg',
    sceneDirection: 'One friend whispers that he\'s going to check outside. Despite protests from the others, he slowly unzips the tent and steps out into the darkness. The rain has stopped but the forest is pitch black. His friends watch anxiously from the tent entrance as he disappears among the trees. Moments pass, but he doesn\'t return. The remaining friends call his name but receive no answer.',
    dialogues: '',
    audioDirection: 'Tent zipper sound. Complete silence after rain stops. Occasional distant forest sounds. Building tension with minimal ambient music. Sudden silence when friend disappears.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-6.jpeg',
    sceneDirection: 'The three remaining friends gather their courage and exit the tent together. They call out for their missing friend but hear only the sounds of the forest. Their flashlight beams cut through the fog and darkness as they move cautiously between the trees. Their expressions show growing fear and concern. They realize they are lost in the unfamiliar woods as they search frantically.',
    dialogues: '',
    audioDirection: 'Echoing calls in the forest. Footsteps on wet ground. Flashlight beam sound effects. Increasingly tense music with percussion and strings. Mix of natural forest sounds and dramatic score.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/frames/frame-7.jpeg',
    sceneDirection: 'Lost in the dense forest, the friends stay close together. One suddenly points to a distant light moving through the trees. It\'s a flashlight beam. They call out and wave frantically. A park ranger appears, guiding them back to safety. In the ranger\'s station, they reunite with their missing friend who had become disoriented in the darkness. Dawn breaks as they all safely exit the woods together.',
    dialogues: '',
    audioDirection: 'Distant flashlight beam sound. Hopeful music building as ranger appears. Relief-filled orchestral score. Morning forest ambience with birds returning. Music resolves to peaceful, uplifting theme.'
  }
]; 