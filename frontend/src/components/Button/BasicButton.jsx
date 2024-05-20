import React from "react";

const BasicButton = ({ text, onClick, colorStyle, type, disabled }) => {
  const renderFormat = (colorStyle, disabled) => {
    if (colorStyle == "white") {
      if (disabled) {
        return "text-balck bg-gray-username";
      } else {
        return "bg-white text-black";
      }
    }
  };

  return (
    <button
      className={`rounded-3xl font-bold  min-h-[52px] text-btn 
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
