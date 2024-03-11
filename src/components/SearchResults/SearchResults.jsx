import React from "react";
import styles from "./SearchResults.module.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ matchingTracks, handleSelectTracks }) {
  return (
    <div className={styles.searchResultsWrapper}>
      <h2>Results</h2>
      <Tracklist tracks={matchingTracks} addTrack={handleSelectTracks} isAdd />
    </div>
  );
}

export default SearchResults;
