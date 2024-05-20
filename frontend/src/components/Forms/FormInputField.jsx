import { useState } from "react";

const FormInputField = ({
  regexPattern,
  maxLength,
  minLength,
  fieldName,
  fieldLabel,
  handleFocus,
  isFocused,
  handleBlur,
  field_type,
  id,
  handleChange,
}) => {
  const [isCorrect, setIsCorrect] = useState(true);
  const [value, setValue] = useState("");

  const re = new RegExp(regexPattern);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    console.log(newValue.length, maxLength);
    const valid =
      re.test(newValue) &&
      newValue.length <= maxLength &&
      newValue.length >= minLength;
    setIsCorrect(valid);
    handleChange(newValue, valid);
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
            {fieldLabel}
          </label>
        )}
        <input
          required={true}
          placeholder={fieldLabel}
          className={`bg-transparent border-none outline-none text-[15px]`}
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={field_type}
          id={id}
        ></input>
      </div>
      {!isCorrect && (
        <p className="text-[10px] text-red-500 p-1">
          Please enter a valid {fieldLabel}
        </p>
      )}
    </div>
  );
};

export default FormInputField;
