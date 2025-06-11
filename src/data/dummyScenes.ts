import type { SceneData } from '@/components/Scene';

export interface DummySceneData extends SceneData {
  thumbnailUrl: string;
}

export const dummyScenes: DummySceneData[] = [
  {
    "thumbnailUrl": "https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_A_cluttered_film_production_office._A_director_sit_3235dd05-677b-41aa-8ef7-627468a31a04_0.png",
    "sceneDirection": "Wide shot of a cluttered film production workspace. Director is at a desk filled with open tabs, notes, coffee mugs. Papers are stacked, a WhatsApp group is open on his phone, script PDF is on his screen. Camera pushes in slowly. Assistant enters near the end.",
    "dialogues": [
      {
        "character": "mike",
        "text": "Wait, didn't we update this last night?\""
      },
      {
        "character": "mike",
        "text": "This is still version two. That scene got cut."
      },
      {
        "character": "sarah",
        "text": "That's the one I got in the group. Was there another?"
      },
      {
        "character": "mike",
        "text": "There's always another"
      },
      {
        "character": "alex",
        "text": "This is what pre-production still looks like."
      }
    ],
    "audioDirection": " Ambient cinematic music with a slow, low drone. Sparse, slightly uneasy atmosphere. No melody. Include soft static, subtle ticking, or light industrial hums to convey disorganization. Should feel like a quiet moment before something breaks.\nTempo: 60–65 BPM\nMood: Tense, disoriented, introverted\nInstruments: Ambient pads, low textures, soft glitch sounds"
  },
  {
    "thumbnailUrl": "https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_Medium_shot_of_a_film_director_looking_at_a_laptop_4bd18aaa-864f-4f26-a53c-617e193e46c3_0.png",
    "sceneDirection": "Close-up of tabs switching: script, Google Sheets, Dropbox, Final Draft. Crew is waiting in the background. Director turns to assistant.",
    "dialogues": [
      {
        "character": "mike",
        "text": "I've got six versions of this script and none of them match the call sheet."
      },
      {
        "character": "sarah",
        "text": "Same scene has three different shot lists."
      },
      {
        "character": "mike",
        "text": "We're spending more time syncing files than planning the shoot."
      },
      {
        "character": "alex",
        "text": "Everyone's working. No one's aligned."
      }
    ],
    "audioDirection": "Soft ambient underscore with light tension. Introduce a faint rhythmic pulse underneath to mirror rising frustration. Add a distant piano note or soft percussive texture to suggest thought or struggle.\nTempo: 65–70 BPM\nMood: Quiet urgency, mental friction\nInstruments: Ambient textures, light pulse, deep piano hits, soft percussion"
  },
  {
    "thumbnailUrl": "https://mimg2video.s3.us-east-2.amazonaws.com/thumbnails/session_1749603404674/scene_2_thumbnail.png",
    "sceneDirection": "Bright, modern creative space. Team around a large monitor. Murphy UI is clean — script, auto-generated storyboard, locations, and shot plan all connected. Camera arcs smoothly around them.",
    "dialogues": [
      {
        "character": "sarah",
        "text": "This is Murphy. Pulled everything straight from the script."
      },
      {
        "character": "mike",
        "text": "Storyboard's built. Budget's syncing. Even the shot list's mapped."
      },
      {
        "character": "alex",
        "text": "Script to screen — without the guesswork."
      }
    ],
    "audioDirection": "Cinematic ambient music with a subtle build. Introduce warm piano or soft synths over a steady, calm rhythm. The music should feel clean, optimistic, and intelligent — like the beginning of alignment.\nTempo: 70–75 BPM\nMood: Hopeful, innovative, clear\nInstruments: Soft piano, ambient pads, plucks, light pulsing textures"
  },
  {
    "thumbnailUrl": "https://mimg2video.s3.us-east-2.amazonaws.com/test/immersfyer_Calm_workspace._Director_reviews_a_storyboard_on_s_45470335-1772-4030-8cae-bc0aa383dd11_2.png",
    "sceneDirection": "Team is reviewing the visuals together. One person draws on a frame. Director adds a note, relaxed. Camera pulls back slowly. Logo fade-in starts at 0:28.",
    "dialogues": [
      {
        "character": "mike",
        "text": "This... finally makes sense."
      },
      {
        "character": "sarah",
        "text": "Right? It's like the first time it all speaks the same language."
      },
      {
        "character": "alex",
        "text": "Murphy. The OS for media production."
      }
    ],
    "audioDirection": "Inspiring ambient theme with a soft resolution. Use warm chords and gentle textures. Avoid heavy builds — just a soft emotional close that feels modern and thoughtful. Let the music breathe to support a voiceover or fade to logo.\nTempo: 65–70 BPM\nMood: Resolved, thoughtful, modern\nInstruments: Soft synths, ambient strings, warm pads, light piano"
  }
]; 