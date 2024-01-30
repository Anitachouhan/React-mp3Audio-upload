// Playlist.js
import React from 'react';

const Playlist = ({ playlist, currentTrack, onTrackSelect }) => {
  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => onTrackSelect(track)} style={{ fontWeight: track === currentTrack ? 'bold' : 'normal' }}>
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
