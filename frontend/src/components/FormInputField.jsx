import { useState } from "react";

const FormInputField = ({
  regexPattern,
  fieldName,
  handleFocus,
  isFocused,
  handleBlur,
  field_type,
}) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const [value, setValue] = useState("");

  const re = new RegExp(regexPattern);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (!re.test(newValue) && newValue !== "") {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  };

  return (
    <div className="flex flex-col py-1">
      <div
        className={`h-[50px] rounded-md w-full ${
          !isCorrect && value != ""
            ? "border-red-500"
            : !isFocused
            ? "border-gray-username"
            : " border-blue-main"
        } border bg-transparent text-white mt-4 py-1 px-2 relative flex flex-col justify-center`}
      >
        {(isFocused || value) && (
          <label
            className={`${
              !isCorrect
                ? "text-red-500"
                : isFocused
                ? "text-blue-main"
                : "text-gray-username"
            } left-2 top-1 text-[12px]`}
          >
            {fieldName}
          </label>
        )}
        <input
          placeholder={fieldName}
          className={`bg-transparent border-none outline-none text-[15px]`}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={field_type}
        ></input>
      </div>
      {!isCorrect && (
        <p className="text-[10px] text-red-500 p-1">
          Please enter a valid {fieldName}
        </p>
      )}
    </div>
  );
};

export default FormInputField;
