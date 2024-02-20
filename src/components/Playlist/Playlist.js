import React from "react";
import styles from './Playlist.module.css';

function Playlist({ selectedTracks }) {
    return (
        <div className={styles.PlaylistWrapper}>
            {selectedTracks.map((obj, index) => (
            <div key={index} >
                <p>Name: {obj.name}</p>
                <p>Artist: {obj.artist}</p>
                <p>Album: {obj.album}</p>
                <p>ID: {obj.id}</p>
            </div>
        ))}
        </div>
    );
}

export default Playlist;