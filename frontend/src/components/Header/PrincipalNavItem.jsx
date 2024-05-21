import React from "react";

const PrincipalNavItem = ({
  icon: Icon,
  label,
  isSelected,
  onClick,
  unread,
}) => {
  return (
    <a
      onClick={onClick}
      className={`flex items-center flex-wrap cursor-pointer w-full text-white h-max py-2 ${
        isSelected ? "font-bold " : " "
      }`}
    >
      <div className="text-white flex flex-wrap relative flex-row items-center p-1">
        <Icon
          className="text-icon-size "
          size="25"
          style={{ MdVerticalAlign: "baseline" }}
          color={isSelected ? "white" : "rgb(255, 255, 255, 0.5)"}
        >
          {" "}
        </Icon>
        {unread && (
          <div className="flex rounded-full items-center justify-center bg-blue-main absolute z-100 top-0 right-0 w-3 h-3">
            <div className="text-white text-[10px] h-max w-max">{unread}</div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center h-full text-tweet-message ml-2">
        <span>{label}</span>
      </div>
    </a>
  );
};

export default PrincipalNavItem;
