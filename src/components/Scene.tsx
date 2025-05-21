import React from 'react';
import Image from 'next/image';

interface SceneProps {
  id: number;
  onSceneChange: (id: number, data: SceneData) => void;
  thumbnailUrl?: string;
  initialData?: SceneData;
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
}

const Scene: React.FC<SceneProps> = ({ id, onSceneChange, thumbnailUrl, initialData }) => {
  const [values, setValues] = React.useState<SceneData>({
    sceneDirection: initialData?.sceneDirection || '',
    dialogues: initialData?.dialogues || [],
    audioDirection: initialData?.audioDirection || ''
  });

  React.useEffect(() => {
    if (initialData) {
      setValues(initialData);
    }
  }, [initialData]);

  const handleChange = (field: keyof SceneData, value: string | Dialogue[]) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    onSceneChange(id, newValues);
  };

  const addDialogue = () => {
    const newDialogue: Dialogue = {
      character: '',
      text: '',
      emotion: ''
    };
    handleChange('dialogues', [...values.dialogues, newDialogue]);
  };

  const removeDialogue = (index: number) => {
    const newDialogues = values.dialogues.filter((_, i) => i !== index);
    handleChange('dialogues', newDialogues);
  };

  const updateDialogue = (index: number, field: keyof Dialogue, value: string) => {
    const newDialogues = values.dialogues.map((dialogue, i) => {
      if (i === index) {
        return { ...dialogue, [field]: value };
      }
      return dialogue;
    });
    handleChange('dialogues', newDialogues);
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
      <div className="w-64 h-64 bg-gray-200 rounded overflow-hidden relative flex-shrink-0">
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
      <div className="flex-1 space-y-4 min-w-[800px]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Scene Direction
          </label>
          <textarea
            className="w-full p-2 border rounded resize-none"
            value={values.sceneDirection}
            onChange={(e) => handleChange('sceneDirection', e.target.value)}
            rows={6}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Dialogues
            </label>
            <button
              onClick={addDialogue}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Dialogue
            </button>
          </div>
          <div className="space-y-3">
            {values.dialogues.map((dialogue, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Character"
                    className="w-full p-2 border rounded mb-2"
                    value={dialogue.character}
                    onChange={(e) => updateDialogue(index, 'character', e.target.value)}
                  />
                  <textarea
                    placeholder="Dialogue text"
                    className="w-full p-2 border rounded resize-none"
                    value={dialogue.text}
                    onChange={(e) => updateDialogue(index, 'text', e.target.value)}
                    rows={2}
                  />
                  <input
                    type="text"
                    placeholder="Emotion"
                    className="w-full p-2 border rounded mt-2"
                    value={dialogue.emotion}
                    onChange={(e) => updateDialogue(index, 'emotion', e.target.value)}
                  />
                </div>
                <button
                  onClick={() => removeDialogue(index)}
                  className="p-2 text-red-500 hover:text-red-700"
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
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Audio Direction
          </label>
          <textarea
            className="w-full p-2 border rounded resize-none"
            value={values.audioDirection}
            onChange={(e) => handleChange('audioDirection', e.target.value)}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default Scene; 