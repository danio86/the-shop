import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <img src={NoResults} alt="No results found" className={styles.NotFoundImg} />
      <p>This page you're looking for doesn't exist. Sorry!</p>
    </div>
  );
};

export default NotFound;