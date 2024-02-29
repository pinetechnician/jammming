import React from "react";
import styles from './Playlist.module.css';
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {
    function handleSave(e) {
        localStorage.clear();
        props.savePlaylist(props.playlistName, props.selectedTracks);
    }
    
    return (
        <div className={styles.PlaylistWrapper}>
            <input value={props.playlistName} onChange={props.changePlaylistName} placeholder="Name This Playlist"></input>
            <Tracklist 
            tracks={props.selectedTracks}
            deleteTrack={props.deleteTrack}
            isAdd={false}
            />
            <button className={styles.SaveButton} type="submit" onClick={handleSave}>SAVE TO SPOTIFY</button>
        </div>
    );
}

export default Playlist;