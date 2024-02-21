import React from "react";
import styles from './Playlist.module.css';
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {
    return (
        <div className={styles.PlaylistWrapper}>
            <input value={props.playlistName} onChange={props.changePlaylistName} placeholder="Name This Playlist"></input>
            <Tracklist 
            tracks={props.selectedTracks}
            deleteTrack={props.deleteTrack}
            isAdd={false}
            />
        </div>
    );
}

export default Playlist;