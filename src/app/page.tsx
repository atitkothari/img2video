'use client';

import { useState } from 'react';
import Scene from '@/components/Scene';
import type { SceneData } from '@/components/Scene';
import { dummyScenes } from '@/data/dummyScenes';

export default function Home() {
    const [scenes, setScenes] = useState<SceneData[]>(dummyScenes);
    const [isGenerating, setIsGenerating] = useState(false);
    const [combinedVideoUrl, setCombinedVideoUrl] = useState<string | null>(null);

    const handleAddScene = () => {
        setScenes([...scenes, {
            sceneDirection: '',
            dialogues: [],
            audioDirection: ''
        }]);
    };

    const handleUpdateScene = (index: number, updatedScene: SceneData) => {
        const newScenes = [...scenes];
        newScenes[index] = updatedScene;
        setScenes(newScenes);
    };

    const handleDeleteScene = (index: number) => {
        const newScenes = scenes.filter((_, i) => i !== index);
        setScenes(newScenes);
    };

    const handleMoveScene = (index: number, direction: 'up' | 'down') => {
        const newScenes = [...scenes];
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        [newScenes[index], newScenes[newIndex]] = [newScenes[newIndex], newScenes[index]];
        setScenes(newScenes);
    };

    const handleGenerateAll = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/generateClip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scenes),
            });

            if (!response.ok) {
                throw new Error('Failed to generate video');
            }

            const data = await response.json();
            if (data.success) {
                setCombinedVideoUrl(`/generations/${data.sessionId}/final_video.mp4`);
            }
        } catch (error) {
            console.error('Error generating video:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Storyboard Generator</h1>
                <div className="space-x-4">
                    <button
                        onClick={handleAddScene}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Add Scene
                    </button>
                    <button
                        onClick={handleGenerateAll}
                        disabled={isGenerating || scenes.length === 0}
                        className={`px-4 py-2 rounded-md text-white ${
                            isGenerating || scenes.length === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {isGenerating ? 'Generating...' : 'Generate All Videos'}
                    </button>
                </div>
            </div>

            {scenes.map((scene, index) => (
                <Scene
                    key={index}
                    scene={scene}
                    onUpdate={(updatedScene) => handleUpdateScene(index, updatedScene)}
                    onDelete={() => handleDeleteScene(index)}
                    onMove={(direction) => handleMoveScene(index, direction)}
                    isFirst={index === 0}
                    isLast={index === scenes.length - 1}
                    index={index}
                />
            ))}

            {combinedVideoUrl && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Combined Video</h2>
                    <div className="aspect-video w-full max-w-4xl mx-auto bg-black rounded-lg overflow-hidden">
                        <video
                            controls
                            className="w-full h-full"
                            src={combinedVideoUrl}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </main>
    );
}
