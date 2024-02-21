import React from "react";
import Track from "../Track/Track";

function Tracklist(props) {
    return (
        <div>
            {props.tracks.map(obj => (
                <Track 
                id={obj.id} 
                onAdd={props.addTrack}
                onDelete={props.deleteTrack}
                track={obj}
                isAdd={props.isAdd}
                />
            ))}
        </div>
    );
}

export default Tracklist;