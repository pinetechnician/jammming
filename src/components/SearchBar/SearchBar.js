//SearchBar.js

import React from "react";
import styles from './SearchBar.module.css';

function SearchBar({ keyWord, handleSearchInput, handleSearch }) {
    function handleSubmit(e) {
        e.preventDefault();
        handleSearch(keyWord);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.SearchBar} >
                <input id="searchBar" value={keyWord} onChange={handleSearchInput}/>
                <button type="submit" className={styles.SearchButton} >SEARCH</button>
            </form>
        </>

    );
}

export default SearchBar;