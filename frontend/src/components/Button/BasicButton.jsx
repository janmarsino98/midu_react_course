import React from "react";

const BasicButton = ({
  text,
  onClick,
  colorStyle,
  type,
  disabled,
  formatting,
}) => {
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
      className={`${formatting} rounded-3xl font-bold py-2 text-btn whitespace-nowrap 
      ${renderFormat(colorStyle, disabled)} 
      px-4 w-full`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default BasicButton;
