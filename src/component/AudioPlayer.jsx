// AudioPlayer.js
import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ track, onEnded }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // If the component receives a new track, load and play it
    if (track) {
      audioRef.current.src = URL.createObjectURL(track);
      audioRef.current.play();
    }
  }, [track]);

  return (
    <div>
      <h2>Now Playing: {track && track.name}</h2>
      <audio ref={audioRef} controls onEnded={onEnded} />
    </div>
  );
};

export default AudioPlayer;
