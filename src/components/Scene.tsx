import React, { useState } from 'react';
import Image from 'next/image';

interface SceneProps {
  scene: SceneData;
  onUpdate: (updatedScene: SceneData) => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
  index: number;
  currentSessionId: string | null;
  onGenerate: (sceneIndex: number) => Promise<string | null>;
}

export interface Dialogue {
  character: string;
  text: string;
  emotion: string;
}

export interface SceneData {
  sceneDirection: string;
  dialogues: Dialogue[];
  audioDirection: string;
  thumbnailUrl?: string;
  videoUrl?: string;
}

export default function Scene({ 
  scene, 
  onUpdate, 
  onDelete, 
  onMove, 
  isFirst, 
  isLast, 
  index,
  currentSessionId,
  onGenerate
}: SceneProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!onGenerate) return;
    
    setIsGenerating(true);
    try {
      const sessionId = await onGenerate(index);
      if (sessionId) {
        setGeneratedVideoUrl(`/generations/${sessionId}/scene_${index}_with_audio.mp4`);
      }
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteDialogue = (dialogueIndex: number) => {
    const newDialogues = scene.dialogues.filter((_, i) => i !== dialogueIndex);
    onUpdate({ ...scene, dialogues: newDialogues });
  };

  // Use either the loaded video URL or the generated one
  const videoUrl = scene.videoUrl || generatedVideoUrl;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Scene {index + 1}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onMove('up')}
            disabled={isFirst}
            className={`p-2 rounded ${isFirst ? 'bg-gray-200' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            ↑
          </button>
          <button
            onClick={() => onMove('down')}
            disabled={isLast}
            className={`p-2 rounded ${isLast ? 'bg-gray-200' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            ↓
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scene Direction
            </label>
            <textarea
              value={scene.sceneDirection}
              onChange={(e) => onUpdate({ ...scene, sceneDirection: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="Describe the scene..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audio Direction
            </label>
            <textarea
              value={scene.audioDirection}
              onChange={(e) => onUpdate({ ...scene, audioDirection: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={2}
              placeholder="Describe the background music..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dialogues
            </label>
            {scene.dialogues.map((dialogue, dialogueIndex) => (
              <div key={dialogueIndex} className="mb-2 p-2 border rounded-md relative">
                <button
                  onClick={() => handleDeleteDialogue(dialogueIndex)}
                  className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <input
                  type="text"
                  value={dialogue.character}
                  onChange={(e) => {
                    const newDialogues = [...scene.dialogues];
                    newDialogues[dialogueIndex] = { ...dialogue, character: e.target.value };
                    onUpdate({ ...scene, dialogues: newDialogues });
                  }}
                  className="w-full p-2 border rounded-md mb-2"
                  placeholder="Character name"
                />
                <textarea
                  value={dialogue.text}
                  onChange={(e) => {
                    const newDialogues = [...scene.dialogues];
                    newDialogues[dialogueIndex] = { ...dialogue, text: e.target.value };
                    onUpdate({ ...scene, dialogues: newDialogues });
                  }}
                  className="w-full p-2 border rounded-md"
                  rows={2}
                  placeholder="Dialogue text..."
                />
                <select
                  value={dialogue.emotion}
                  onChange={(e) => {
                    const newDialogues = [...scene.dialogues];
                    newDialogues[dialogueIndex] = { ...dialogue, emotion: e.target.value };
                    onUpdate({ ...scene, dialogues: newDialogues });
                  }}
                  className="w-full p-2 border rounded-md mt-2"
                >
                  <option value="">Select emotion</option>
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="angry">Angry</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
            ))}
            <button
              onClick={() => {
                const newDialogues = [...scene.dialogues, { character: '', text: '', emotion: '' }];
                onUpdate({ ...scene, dialogues: newDialogues });
              }}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Dialogue
            </button>
          </div>

          {/* Generate Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !currentSessionId}
              className={`px-4 py-2 rounded-md text-white ${
                isGenerating || !currentSessionId
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Video'}
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Thumbnail */}
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              {scene.thumbnailUrl ? (
                <Image
                  src={scene.thumbnailUrl}
                  alt={`Scene ${index + 1} storyboard`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Storyboard Image</span>
                </div>
              )}
            </div>

            {/* Video Preview */}
            {videoUrl && (
              <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full h-full"
                  src={videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 