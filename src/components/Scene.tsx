import React from 'react';
import Image from 'next/image';

interface SceneProps {
  id: number;
  onSceneChange: (id: number, data: SceneData) => void;
  thumbnailUrl?: string;
  initialData?: SceneData;
}

export interface SceneData {
  sceneDirection: string;
  dialogues: string;
  audioDirection: string;
}

const Scene: React.FC<SceneProps> = ({ id, onSceneChange, thumbnailUrl, initialData }) => {
  const handleChange = (field: keyof SceneData, value: string) => {
    const updatedData: Partial<SceneData> = { [field]: value };
    onSceneChange(id, updatedData as SceneData);
  };

  return (
    <div className="flex gap-4 p-4 border rounded-lg mb-4 bg-white shadow-sm relative group">
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 cursor-move"
        >
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="5" r="1" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="5" r="1" />
          <circle cx="15" cy="19" r="1" />
        </svg>
      </div>
      <div className="w-48 h-48 bg-gray-200 rounded overflow-hidden relative">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`Scene ${id + 1} thumbnail`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Thumbnail</span>
          </div>
        )}
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scene Direction
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange('sceneDirection', e.target.value)}
            defaultValue={initialData?.sceneDirection}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dialogues
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange('dialogues', e.target.value)}
            defaultValue={initialData?.dialogues}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Audio Direction
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            onChange={(e) => handleChange('audioDirection', e.target.value)}
            defaultValue={initialData?.audioDirection}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene; 