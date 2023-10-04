import React from "react";
import "./Loader.css";

const Loader = ({ loading }) => {
  return (
    <div className='loading'>
      <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
      <div className={loading ? "loading-text" : "display-none"}>
        Loading...
      </div>
    </div>
  );
};

export default Loader;
