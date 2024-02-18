
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PlaylistItem from './playlistItem';

const Playlist = ({ videos, onVideoClick, onReorder }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newVideos = Array.from(videos);
        const [removed] = newVideos.splice(result.source.index, 1);
        newVideos.splice(result.destination.index, 0, removed);

        onReorder(newVideos);
    };

    return (
        <div className='w-2/6 p-4 shadow-lg'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="playlist">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {videos.map((video, index) => (
                                <Draggable key={video.id} draggableId={video.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <PlaylistItem
                                                video={video}
                                                onVideoClick={() => onVideoClick(video)}
                                                draggable
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Playlist;
