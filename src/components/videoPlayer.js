import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoSource, videoDetails }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const video = videoRef.current;

    if (videoSource) {
      video.src = videoSource;
      video.play();
      setIsPlaying(true);
    } else {
      video.src = '';
      setIsPlaying(false);
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
    };
  }, [videoSource]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handlePlaybackSpeedChange = (e) => {
    const speed = parseFloat(e.target.value);
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed; // Corrected attribute name
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='w-4/6 p-4'>
      <video
        ref={videoRef}
        controls
        autoPlay={isPlaying}
        playbackRate={playbackSpeed}
        className='rounded-xl shadow-md'
      >
        Your browser does not support the video tag.
      </video>
      <div className='w-full'>
        <div className='flex justify-between'>
          <div>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <span className='ml-4'>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</span>
          </div>
          <select value={playbackSpeed} onChange={handlePlaybackSpeedChange}>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>

        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className='w-full'
        />
      </div>
      <h1 className="text-3xl font-bold my-4">{videoDetails.title}</h1>
      <p>{videoDetails.description}</p>
    </div>
  );
};

export default VideoPlayer;
