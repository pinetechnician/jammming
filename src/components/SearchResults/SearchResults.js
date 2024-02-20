import React from "react";
import styles from './SearchResults.module.css';

function SearchResults({ matchingTracks, handleSelectTracks }) {
    
    return (
        <div className={styles.searchResultsWrapper}>
        {matchingTracks.map((obj, index) => (
            <div key={index} onClick={() => handleSelectTracks(obj)}>
                <p>Name: {obj.name}</p>
                <p>Artist: {obj.artist}</p>
                <p>Album: {obj.album}</p>
                <p>ID: {obj.id}</p>
            </div>
        ))}
    </div>
    );
}

export default SearchResults;