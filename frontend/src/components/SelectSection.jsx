import React, { useState } from "react";

const SelectSection = () => {
  const [forYouSelected, setForYouSelected] = useState(false);

  return (
    <div className="flex flex-row w-full text-tweet h-max">
      <div
        className="w-full flex flex-col items-center"
        onClick={() => {
          if (forYouSelected) {
            return;
          } else {
            setForYouSelected(true);
          }
        }}
      >
        <div className="px-4 w-max">
          <div className="flex py-4 flex-col relative">
            <span
              className={`${
                forYouSelected
                  ? "text-white font-bold"
                  : "text-tweet-feed-light-gray"
              }`}
            >
              Para ti
            </span>
            {forYouSelected && (
              <div className="w-full h-1 bg-blue-main rounded-3xl absolute bottom-0 self-auto left-0"></div>
            )}
          </div>
        </div>
      </div>
      <div
        className="w-full flex flex-col items-center"
        onClick={() => {
          if (forYouSelected) {
            return;
          } else {
            setForYouSelected(false);
          }
        }}
      >
        <div className="px-4 w-max">
          <div className="flex py-4 flex-col relative">
            <span
              className={`${
                !forYouSelected
                  ? "text-white font-bold"
                  : "text-tweet-feed-light-gray"
              }`}
            >
              Siguiendo
            </span>
            {!forYouSelected && (
              <div className="w-full h-1 bg-blue-main rounded-3xl absolute bottom-0 self-auto left-0"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectSection;
