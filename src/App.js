
import './App.css';
import VideoPlayer from './components/videoPlayer';
import Playlist from './components/playlist';
import videoData from '../src/mocked-data/video.json';
import { useState } from 'react';

function App() {
  const [playlist, setPlaylist] = useState(videoData);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [videoDetails, setVideoDetails] = useState(videoData[0])

  const handleVideoClick = (video) => {
    setCurrentVideo(video.sources[0]);
    setVideoDetails(video)
  };

  const handleReorder = (newPlaylist) => {
    setPlaylist(newPlaylist);
  };
  return (
    <div>
      <div className='w-full flex justify-center p-4 shadow-xl'>
        <img src='https://app.rigi.club/wp-content/themes/Rigi/assets/img/logo.svg' alt='rigi-logo' className='p4' />
      </div>
      <div className="flex justify-center">
        <VideoPlayer videoSource={currentVideo} videoDetails={videoDetails} />
        <Playlist videos={playlist} onVideoClick={handleVideoClick} onReorder={handleReorder} />
      </div>
    </div>
  );
}

export default App;
