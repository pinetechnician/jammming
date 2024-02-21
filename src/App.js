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

  const matchingTracks = trackObjs.filter(track => {
    const lowerCaseKeyWord = keyWord.toLowerCase().replace(/[^\w\s]/gi, '');
    for (const key in track) { 
      if (track.hasOwnProperty(key) && track[key].toString().toLowerCase().replace(/[^\w\s]/gi, '').includes(lowerCaseKeyWord)) {
        return true;
      } 
    }
    return false;
  });

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      <SearchBar keyWord={keyWord} handleSearchInput={handleSearchInput} />
      {keyWord && <SearchResults matchingTracks={matchingTracks} handleSelectTracks={handleSelectTracks} />}
      <Playlist 
      selectedTracks={selectedTracks} 
      deleteTrack={handleRemoveTracks} 
      playlistName={playlistName}
      changePlaylistName={changePlaylistName} 
      />
    </div>
  );
}

export default App;
