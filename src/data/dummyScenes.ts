import type { SceneData } from '@/components/Scene';

export interface DummySceneData extends SceneData {
  thumbnailUrl: string;
}

export const dummyScenes: DummySceneData[] = [
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_A_cluttered_film_production_office._A_director_sit_3235dd05-677b-41aa-8ef7-627468a31a04_0.png',
    sceneDirection: 'A cluttered film production office. A director sits at a messy desk filled with papers, coffee cups, open laptop with WhatsApp and script, sunlight through a window. Slightly warm tone. Camera Movement- arrow_forward: Slow push-in toward the director\'s face (mild zoom-in), handheld feel. Purpose: Builds tension, immerses viewer in the disorganized space',
    dialogues: [     
      {
        character: 'Mike',
        text: 'You know this mess.'
      }
    ],
    audioDirection: 'Upbeat forest ambience with birds chirping and gentle wind. Gradually transitions to ominous thunder and increasing wind sounds. Music shifts from cheerful to tense.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_Medium_shot_of_a_film_director_looking_at_a_laptop_4bd18aaa-864f-4f26-a53c-617e193e46c3_0.png',
    sceneDirection: 'Medium shot of a film director looking at laptop and flipping through printed pages. Assistant stands beside him. Director looks slightly confused, ambient daylight.Camera Movement- arrow_forward: Over-the-shoulder pan, slowly tracking left to right as director gestures to screen. Purpose: Reveals dynamic between director and assistant, adds realism',
    dialogues: [
      {
        character: 'Mike',
        text: 'Quick! Help me with the tent poles!'
      },
      {
        character: 'Sarah',
        text: 'I\'ll gather some firewood before it gets too wet!'
      },
      {
        character: 'Emma',
        text: 'The wind is getting really strong. Hold the tent down!'
      },
      {
        character: 'Alex',
        text: 'Everyone inside! The rain\'s getting heavier!'
      }
    ],
    audioDirection: 'Heavy rain and thunder sounds. Strong wind through trees. Tension-building orchestral music with deep bass notes. Mix of natural storm sounds and dramatic score.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_Bright_clean_creative_studio._A_film_team_around_a_7e2e72d0-c82b-4cdc-b504-1e5d1043b834_1.png',
    sceneDirection: 'Night has fallen. Inside the tent, three friends huddle around a lantern, playing games and telling stories. Rain patters on the tent canvas. Suddenly, they freeze as they hear a branch snap outside. They exchange worried glances. One of them slowly moves to peek outside but can\'t see anything in the darkness. The sounds of footsteps become louder and more frequent.',
    dialogues: [
      {
        character: 'Emma',
        text: 'Did you hear that? Something\'s moving outside.'
      },
      {
        character: 'Sarah',
        text: 'Maybe it\'s just the wind... or an animal?'
      },
      {
        character: 'Mike',
        text: 'That didn\'t sound like an animal. Those footsteps are too heavy.'
      }
    ],
    audioDirection: 'Soft rain on tent canvas. Sudden branch snap sound effect. Building tension with subtle footsteps and rustling leaves. Suspenseful music with string instruments and low drones.'
  },
  {
    thumbnailUrl: 'https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_Calm_workspace._Director_reviews_a_storyboard_on_s_45470335-1772-4030-8cae-bc0aa383dd11_2.png',
    sceneDirection: 'One friend whispers that he\'s going to check outside. Despite protests from the others, he slowly unzips the tent and steps out into the darkness. The rain has stopped but the forest is pitch black. His friends watch anxiously from the tent entrance as he disappears among the trees. Moments pass, but he doesn\'t return. The remaining friends call his name but receive no answer.',
    dialogues: [
      {
        character: 'Alex',
        text: 'I\'m going to check what\'s out there. Stay here.'
      },
      {
        character: 'Sarah',
        text: 'No, Alex! It\'s too dangerous!'
      },
      {
        character: 'Emma',
        text: 'Alex? Alex! Where are you?'
      },
      {
        character: 'Mike',
        text: 'This isn\'t right. He should have come back by now.'
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
        text: 'Alex! Can you hear us?'
      },
      {
        character: 'Sarah',
        text: 'I don\'t recognize any of these trees. We\'re lost.'
      },
      {
        character: 'Emma',
        text: 'Look! I see something moving in the fog!'
      }
    ],
    audioDirection: 'Echoing calls in the forest. Footsteps on wet ground. Flashlight beam sound effects. Increasingly tense music with percussion and strings. Mix of natural forest sounds and dramatic score.'
  }
]; 