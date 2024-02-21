import React from "react";
import styles from './Track.module.css';

function Track(props) {
    function handleAddClick() {
        props.onAdd(props.track);
    }
    function handleDeleteClick() {
        props.onDelete(props.track);
    }
    
    return (
       <div>
            <div>
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            {props.isAdd ? <button onClick={handleAddClick}>+</button> : <button onClick={handleDeleteClick}>-</button>}
       </div> 
    );
}

export default Track;