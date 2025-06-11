'use client';

import { useState, useEffect } from 'react';
import Scene from '@/components/Scene';
import type { SceneData } from '@/components/Scene';
import { dummyScenes } from '@/data/dummyScenes';

interface Session {
    id: string;
    date: string;
    sceneCount: number;
    hasFinalVideo: boolean;
}

export default function Home() {
    const [scenes, setScenes] = useState<SceneData[]>(dummyScenes);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCombining, setIsCombining] = useState(false);
    const [combinedVideoUrl, setCombinedVideoUrl] = useState<string | null>(null);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoadingSessions, setIsLoadingSessions] = useState(false);

    useEffect(() => {
        // Create a new session ID on page load
        setCurrentSessionId(`session_${Date.now()}`);
        loadSessions();
    }, []);

    const loadSessions = async () => {
        setIsLoadingSessions(true);
        try {
            const response = await fetch('/api/listSessions');
            if (!response.ok) throw new Error('Failed to load sessions');
            const data = await response.json();
            if (data.success) {
                setSessions(data.sessions);
            }
        } catch (error) {
            console.error('Error loading sessions:', error);
        } finally {
            setIsLoadingSessions(false);
        }
    };

    const handleLoadSession = async (sessionId: string) => {
        setCurrentSessionId(sessionId);
        
        // Load session details
        try {
            const response = await fetch('/api/listSessions');
            if (!response.ok) throw new Error('Failed to load session details');
            const data = await response.json();
            if (data.success) {
                const session = data.sessions.find((s: Session) => s.id === sessionId);
                if (session) {
                    // Load combined video if it exists
                    if (session.hasFinalVideo) {
                        setCombinedVideoUrl(`/generations/${sessionId}/final_video.mp4`);
                    }
                    
                    // Update scenes with video URLs
                    const updatedScenes = scenes.map((scene, index) => {
                        const videoPath = `/generations/${sessionId}/scene_${index}_with_audio.mp4`;
                        return {
                            ...scene,
                            videoUrl: videoPath
                        };
                    });
                    setScenes(updatedScenes);
                }
            }
        } catch (error) {
            console.error('Error loading session details:', error);
        }
    };

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
                body: JSON.stringify({
                    scenes,
                    sessionId: currentSessionId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate video');
            }

            const data = await response.json();
            if (data.success) {
                setCombinedVideoUrl(`/generations/${currentSessionId}/final_video.mp4`);
            }
        } catch (error) {
            console.error('Error generating video:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateSingle = async (sceneIndex: number) => {
        try {
            const response = await fetch('/api/generateClip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    scenes,
                    sessionId: currentSessionId,
                    sceneIndex
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate video');
            }

            const data = await response.json();
            if (data.success) {
                return currentSessionId;
            }
        } catch (error) {
            console.error('Error generating video:', error);
        }
        return null;
    };

    const handleCombineVideos = async () => {
        if (!currentSessionId) return;
        
        setIsCombining(true);
        try {
            const response = await fetch('/api/combineVideos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: currentSessionId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to combine videos');
            }

            const data = await response.json();
            if (data.success) {
                setCombinedVideoUrl(data.videoPath);
            }
        } catch (error) {
            console.error('Error combining videos:', error);
        } finally {
            setIsCombining(false);
        }
    };

    const handleDownloadAllScenes = () => {
        // Create scenes array in the same format as dummyScenes
        const scenesData = scenes.map(scene => ({
            thumbnailUrl: scene.thumbnailUrl || '',
            sceneDirection: scene.sceneDirection,
            dialogues: scene.dialogues,
            audioDirection: scene.audioDirection,
            isLastFrame: scene.isLastFrame
        }));

        // Convert to JSON and create a blob
        const jsonString = JSON.stringify(scenesData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'all_scenes.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Storyboard Generator</h1>
                <div className="space-x-4">
                    <button
                        onClick={handleDownloadAllScenes}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        Download All Scenes
                    </button>
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
                    <button
                        onClick={handleCombineVideos}
                        disabled={isCombining || !currentSessionId}
                        className={`px-4 py-2 rounded-md text-white ${
                            isCombining || !currentSessionId
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-purple-500 hover:bg-purple-600'
                        }`}
                    >
                        {isCombining ? 'Combining...' : 'Combine Videos'}
                    </button>
                </div>
            </div>

            {/* Session List */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Previous Sessions</h2>
                    <button
                        onClick={loadSessions}
                        disabled={isLoadingSessions}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        {isLoadingSessions ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className={`p-4 rounded-lg border ${
                                session.id === currentSessionId
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="text-sm text-gray-500">{session.date}</p>
                                    <p className="font-medium">{session.sceneCount} scenes</p>
                                </div>
                                {session.hasFinalVideo && (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                        Has final video
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => handleLoadSession(session.id)}
                                className={`w-full mt-2 px-3 py-1 text-sm rounded ${
                                    session.id === currentSessionId
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {session.id === currentSessionId ? 'Current Session' : 'Load Session'}
                            </button>
                        </div>
                    ))}
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
                    currentSessionId={currentSessionId}
                    onGenerate={handleGenerateSingle}
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
