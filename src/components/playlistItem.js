
import React from 'react';

const PlaylistItem = ({ video, onVideoClick, onDragStart, onDragOver, draggable }) => {

    const handleClick = () => {
        onVideoClick(video);
    };
    return (
        <li
            className="flex items-center py-2"
            onClick={handleClick}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            draggable={draggable}
        >
            <img src={video.thumb} alt="Thumbnail" className="w-56 rounded-xl shadow-lg" />
            <div className="flex flex-col p-2">
                <h3 className="text-xl font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500 description-text text-justify">{video.description}</p>
            </div>
        </li>
    );
};

export default PlaylistItem;
