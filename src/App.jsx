import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import { searchTracks, saveTracks } from "./Spotify";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem("savedData");
    if (savedData) {
      const { name, tracks, searchTerm } = JSON.parse(savedData);
      setPlaylistName(name);
      setSelectedTracks(tracks);
      setKeyWord(searchTerm);
    }
  }, []);

  function saveDataToLocalStorage(name, tracks, searchWord) {
    const savedData = {
      name,
      tracks,
      searchTerm: searchWord,
    };

    localStorage.setItem("savedData", JSON.stringify(savedData));
  }
  function handleSearchInput(e) {
    setKeyWord(e.target.value);

    saveDataToLocalStorage(playlistName, selectedTracks, keyWord);
  }
  function handleSelectTracks(track) {
    setSelectedTracks([...selectedTracks, track]);

    saveDataToLocalStorage(playlistName, selectedTracks, keyWord);
  }
  function handleRemoveTracks(trackToRemove) {
    const updatedTracks = selectedTracks.filter(
      (track) => track.id !== trackToRemove.id,
    );
    setSelectedTracks(updatedTracks);
  }
  function changePlaylistName(e) {
    setPlaylistName(e.target.value);

    saveDataToLocalStorage(playlistName, selectedTracks, keyWord);
  }

  const searchTerm = async (term) => {
    const matchingTracks = await searchTracks(term);
    setSearchResults(matchingTracks);
  };

  return (
    <div className="App">
      <div className="App-cover">
        <SearchBar
          keyWord={keyWord}
          handleSearchInput={handleSearchInput}
          handleSearch={searchTerm}
        />
        <div className="App-body">
          <SearchResults
            matchingTracks={searchResults}
            handleSelectTracks={handleSelectTracks}
            keyWord={keyWord}
          />
          <Playlist
            selectedTracks={selectedTracks}
            deleteTrack={handleRemoveTracks}
            playlistName={playlistName}
            changePlaylistName={changePlaylistName}
            savePlaylist={saveTracks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
