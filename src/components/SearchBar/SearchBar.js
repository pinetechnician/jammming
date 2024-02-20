import React from "react";

function SearchBar({ keyWord, handleSearchInput }) {
    return (
        <>
            <form>
                <input id="searchBar" value={keyWord} onChange={handleSearchInput} />
            </form>
        </>

    );
}

export default SearchBar;