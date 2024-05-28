import React, { useState } from "react";

const UserProfileField = ({ label, editable, currentValue }) => {
  const [value, setValue] = useState(currentValue);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  return (
    <div className="relative border border-gray-main-borders h-[50px] flex items-center px-3">
      <label
        htmlFor=""
        className="absolute top-1 text-[10px] text-gray-username"
      >
        {label}
      </label>
      {editable ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e)}
          className="bg-black text-white h-max w-full outline-none flex flex-col items-end mt-3"
        />
      ) : (
        <span className="h-max w-full text-gray-username mt-3">
          {currentValue}
        </span>
      )}
    </div>
  );
};

export default UserProfileField;
