import React, { useEffect, useState } from "react";

const TweetKind = ({ onTweetKindChange }) => {
  const [forYou, setForYou] = useState(true);

  useEffect(() => {
    onTweetKindChange(forYou);
  }, [forYou, onTweetKindChange]);

  const handleClick = () => {
    setForYou(!forYou);
  };
  return (
    <div className="kindContainer">
      <div
        className={`kindSection ${forYou ? "selected" : ""}`}
        onClick={forYou ? () => {} : handleClick}
      >
        <span className="kindSection-text">Para ti</span>
        {forYou && <div className="kindSection-selectMark"></div>}
      </div>
      <div
        className={`kindSection ${forYou ? "" : "selected"}`}
        onClick={forYou ? handleClick : () => {}}
      >
        <span className="kindSection-text">Siguiendo</span>
        {!forYou && <div className="kindSection-selectMark"></div>}
      </div>
    </div>
  );
};

export default TweetKind;
