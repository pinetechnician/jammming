import React from "react";

function SearchResults({ matchingTracks }) {
    return (
        <div>
        {matchingTracks.map((obj, index) => (
            <div key={index}>
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