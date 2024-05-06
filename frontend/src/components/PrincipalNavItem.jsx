import React from "react";

const PrincipalNavItem = ({ icon: Icon, label, isSelected, onClick }) => {
  return (
    <a
      onClick={onClick}
      className={`flex items-center flex-wrap cursor-pointer w-full h-max py-2 ${
        isSelected ? "font-bold text-white" : "text-disabled-button "
      }`}
    >
      <div className="text-white flex flex-wrap flex-row items-center p-1">
        <Icon
          className="text-icon-size"
          size="25"
          style={{ MdVerticalAlign: "baseline" }}
          color={isSelected ? "white" : "rgb(255, 255, 255, 0.5)"}
        ></Icon>
      </div>
      <div className="flex flex-wrap items-center h-full text-tweet-message ml-2">
        <span>{label}</span>
      </div>
    </a>
  );
};

export default PrincipalNavItem;
