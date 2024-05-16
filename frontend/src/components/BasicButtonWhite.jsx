import React from "react";

const BasicButton = ({ text }) => {
  return (
    <button className="rounded-3xl font-bold  min-h-8 text-btn bg-black text-white border border-white px-4 w-full">
      {text}
    </button>
  );
};

export default BasicButton;
