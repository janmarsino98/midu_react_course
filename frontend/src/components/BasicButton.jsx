import React from "react";

const BasicButton = ({ text }) => {
  return (
    <button className="rounded-3xl font-bold  min-h-[52px] text-btn bg-white text-black px-4 w-full mt-4">
      {text}
    </button>
  );
};

export default BasicButton;
