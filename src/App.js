import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { trackObjs } from './trackObjData';
import SearchBar from './components/SearchBar/SearchBar.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import Playlist from './components/Playlist/Playlist';

function App() {
  const [keyWord, setKeyWord] = useState('');
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleSearchInput(e) {
    setKeyWord(e.target.value);
  } 
  function handleSelectTracks(track) {
    setSelectedTracks([...selectedTracks, track]);
  }
  function handleRemoveTracks(trackToRemove) {
    const updatedTracks = selectedTracks.filter(track => track.id != trackToRemove.id);
    setSelectedTracks(updatedTracks);
  }
  function changePlaylistName(e) {
    setPlaylistName(e.target.value);
  }

  function performSearch() {
    const lowerCaseKeyword = keyWord.toLowerCase().replace(/[^\w\s]/gi, '');
    const matchingTracks = trackObjs.filter(track => {
      for (const key in track) { 
        if (track.hasOwnProperty(key) && track[key].toString().toLowerCase().replace(/[^\w\s]/gi, '').includes(lowerCaseKeyword)) {
          return true;
        } 
      }
      return false;
    });
    setSearchResults(matchingTracks);
  };

  return (
    <div className="App">
      <SearchBar 
      keyWord={keyWord} 
      handleSearchInput={handleSearchInput} 
      handleSearch={performSearch} />
      <div className='App-body'>
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
        />
      </div>
    </div>
  );
}

export default App;
/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/