import React from "react";

const BasicButton = ({ text, onClick }) => {
  return (
    <button
      className="rounded-3xl font-bold  min-h-[52px] text-btn bg-black text-white border border-white px-4 mt-4 w-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default BasicButton;
