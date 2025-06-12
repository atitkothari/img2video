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
  s3VideoUrl?: string;
}

export interface Dialogue {
  character: string;
  text: string;
}

// Add character options
const CHARACTER_OPTIONS = [
  { value: 'sarah', label: 'Sarah' },
  { value: 'mike', label: 'Mike' },
  { value: 'emma', label: 'Emma' },
  { value: 'alex', label: 'Alex' }
];

export interface SceneData {
  sceneDirection: string;
  dialogues: Dialogue[];
  audioDirection: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  isLastFrame?: boolean;
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
  onGenerate,
  s3VideoUrl
}: SceneProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentSessionId) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sessionId', currentSessionId);
      formData.append('sceneIndex', index.toString());

      const response = await fetch('/api/uploadThumbnail', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload thumbnail');
      }

      const data = await response.json();
      if (data.success) {
        onUpdate({ ...scene, thumbnailUrl: data.thumbnailUrl });
      }
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadScene = () => {
    // Create a scene object in the same format as dummyScenes
    const sceneData = {
      thumbnailUrl: scene.thumbnailUrl || '',
      sceneDirection: scene.sceneDirection,
      dialogues: scene.dialogues,
      audioDirection: scene.audioDirection,
      isLastFrame: scene.isLastFrame
    };

    // Convert to JSON and create a blob
    const jsonString = JSON.stringify(sceneData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `scene_${index + 1}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Use either the S3 URL, loaded video URL, or the generated one
  const videoUrl = s3VideoUrl || scene.videoUrl || generatedVideoUrl;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-800">Scene {index + 1}</h3>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={scene.isLastFrame || false}
              onChange={(e) => onUpdate({ ...scene, isLastFrame: e.target.checked })}
              className="rounded border-gray-300"
            />
            Use as Last Frame
          </label>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleDownloadScene}
            className="p-2 rounded bg-gray-500 hover:bg-gray-600 text-white"
            title="Download Scene Data"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
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
                <select
                  value={dialogue.character}
                  onChange={(e) => {
                    const newDialogues = [...scene.dialogues];
                    newDialogues[dialogueIndex] = { ...dialogue, character: e.target.value };
                    onUpdate({ ...scene, dialogues: newDialogues });
                  }}
                  className="w-full p-2 border rounded-md mb-2"
                >
                  <option value="">Select character</option>
                  {CHARACTER_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
              </div>
            ))}
            <button
              onClick={() => {
                const newDialogues = [...scene.dialogues, { character: '', text: '' }];
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
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden relative group">
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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <label className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  {isUploading ? 'Uploading...' : 'Upload Thumbnail'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
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