'use client';

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Scene, { SceneData } from '@/components/Scene';
import { dummyScenes, DummySceneData } from '@/data/dummyScenes';

export default function Home() {
  const [scenes, setScenes] = useState<SceneData[]>(dummyScenes);
  const [dummyData, setDummyData] = useState<DummySceneData[]>(dummyScenes);

  const handleSceneChange = (id: number, data: SceneData) => {
    setScenes(prev => {
      const newScenes = [...prev];
      newScenes[id] = { ...newScenes[id], ...data };
      return newScenes;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Reorder scenes (with edited content)
    const newScenes = Array.from(scenes);
    const [movedScene] = newScenes.splice(sourceIndex, 1);
    newScenes.splice(destinationIndex, 0, movedScene);
    setScenes(newScenes);

    // Reorder dummy data (for thumbnails only)
    const newDummyData = Array.from(dummyData);
    const [movedDummy] = newDummyData.splice(sourceIndex, 1);
    newDummyData.splice(destinationIndex, 0, movedDummy);
    setDummyData(newDummyData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/generateClip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenes),
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.success) {
        throw new Error(data.message);
      }
      
      alert('Clip generation request sent successfully!');
    } catch (error) {
      console.error('Error generating clip:', error);
      alert('Failed to generate clip. Please try again.');
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-8">Scene Editor</h1>
        <form onSubmit={handleSubmit}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="scenes" direction="vertical">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-6"
                >
                  {scenes.map((scene, index) => (
                    <Draggable
                      key={index}
                      draggableId={`scene-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${snapshot.isDragging ? 'opacity-50' : ''}`}
                        >
                          <Scene
                            id={index}
                            onSceneChange={handleSceneChange}
                            thumbnailUrl={dummyData[index].thumbnailUrl}
                            initialData={scene}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Clip
          </button>
        </form>
      </div>
    </main>
  );
}
