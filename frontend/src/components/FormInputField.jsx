import { useState } from "react";

const FormInputField = ({ regex_pattern, field_name }) => {
  const [isFocused, setIsFocused] = useState(null);
  const [isCorrect, setIsCorrect] = useState(true);
  const [value, setValue] = useState("");

  const handleChange
  return (
    <div className="border border-white">
      <label>{field_name}</label>
      <input value={value} onChange={handleChange}></input>
    </div>
  );
};

export default FormInputField;
