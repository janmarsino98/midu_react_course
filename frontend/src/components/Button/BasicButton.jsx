import React from "react";

const BasicButton = ({ text, onClick, colorStyle, type }) => {
  return (
    <button
      className={`rounded-3xl font-bold  min-h-[52px] text-btn 
      ${
        colorStyle == "white"
          ? "bg-white text-black"
          : colorStyle == "black"
          ? "bg-black text-white border-white"
          : ""
      } 
      px-4 w-full mt-4`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default BasicButton;
