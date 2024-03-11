import React from "react";
import Track from "../Track/Track";

function Tracklist(props) {
  return (
    <div>
      {props.tracks &&
        props.tracks.map((obj) => (
          <Track
            key={obj.id}
            trackURI={obj.uri}
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
