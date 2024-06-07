import React from "react";

const BasicButton = ({ text, onClick, colorStyle, type, disabled }) => {
  const renderFormat = (colorStyle, disabled) => {
    if (colorStyle == "white") {
      if (disabled) {
        return "text-black bg-gray-username";
      } else {
        return "bg-white text-black";
      }
    } else if (colorStyle == "black") {
      return "text-white bg-black border border-disabled-button hover:bg-card-hover-bg";
    }
  };

  return (
    <button
      className={`rounded-3xl font-bold py-2 text-btn 
      ${renderFormat(colorStyle, disabled)} 
      px-4 w-full mt-4`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BasicButton;
