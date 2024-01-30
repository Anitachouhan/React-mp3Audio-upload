
import React, { useState, useEffect } from 'react';
import AudioPlayer from './component/AudioPlayer';
import Playlist from './component/PlayList';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    // Load playlist and current track from localStorage on page load
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    const storedCurrentTrack = JSON.parse(localStorage.getItem('currentTrack')) || null;

    setPlaylist(storedPlaylist);
    setCurrentTrack(storedCurrentTrack);
  }, []);

  useEffect(() => {
    // Save playlist and current track to localStorage
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('currentTrack', JSON.stringify(currentTrack));
  }, [playlist, currentTrack]);

  const handleFileUpload = (files) => {
    const updatedPlaylist = [...playlist, ...files];
    setPlaylist(updatedPlaylist);

    // If no current track is set, set the first track as the current track
    if (!currentTrack) {
      setCurrentTrack(updatedPlaylist[0]);
    }
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  const handleTrackEnd = () => {
    // Find the index of the current track
    const currentIndex = playlist.findIndex((track) => track === currentTrack);

    // Set the next track as the current track
    const nextTrack = playlist[currentIndex + 1] || null;
    setCurrentTrack(nextTrack);
  };

  return (
    <div>
      <h1>React Audio Player</h1>
      <input type="file" accept=".mp3" multiple onChange={(e) => handleFileUpload(e.target.files)} /> 
      <input type="file" accept="audio/*" multiple onChange={(e) => handleFileUpload(e.target.files)} />

      <Playlist playlist={playlist} currentTrack={currentTrack} onTrackSelect={handleTrackSelect} />
      {currentTrack && <AudioPlayer track={currentTrack} onEnded={handleTrackEnd} />}
    </div>
  );
};

export default App;


