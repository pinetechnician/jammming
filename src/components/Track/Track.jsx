import React from "react";
import styles from "./Track.module.css";

function Track(props) {
  function handleAddClick() {
    props.onAdd(props.track);
  }
  function handleDeleteClick() {
    props.onDelete(props.track);
  }

  return (
    <div className={styles.trackCard}>
      <div className={styles.trackBody}>
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      {props.isAdd ? (
        <button onClick={handleAddClick} className={styles.trackButton}>
          +
        </button>
      ) : (
        <button onClick={handleDeleteClick} className={styles.trackButton}>
          -
        </button>
      )}
    </div>
  );
}

export default Track;
