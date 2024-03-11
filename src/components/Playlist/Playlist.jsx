import React from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({
  playlistName,
  selectedTracks,
  changePlaylistName,
  deleteTrack,
  savePlaylist,
}) {
  function handleSave() {
    localStorage.clear();
    savePlaylist(playlistName, selectedTracks);
  }

  return (
    <div className={styles.PlaylistWrapper}>
      <input
        value={playlistName}
        onChange={changePlaylistName}
        placeholder="Name This Playlist"
      />
      <Tracklist
        tracks={selectedTracks}
        deleteTrack={deleteTrack}
        isAdd={false}
      />
      <button className={styles.SaveButton} type="submit" onClick={handleSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;
