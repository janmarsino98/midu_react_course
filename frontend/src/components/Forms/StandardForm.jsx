import { BsTwitterX } from "react-icons/bs";
import FormInputField from "./FormInputField";
import { useState } from "react";
import BasicButton from "../Button/BasicButton";
import BasicButtonWhite from "../Button/BasicButtonWhite";

const StandardForm = ({ title, fields }) => {
  const [focused, setFocused] = useState("");
  const handleFocus = (name) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const renderField = (field) => {
    if (field.category == "button") {
      return renderButton(field);
    } else if (field.category == "input") {
      return renderInput(field);
    }
  };

  const renderInput = (field) => (
    <FormInputField
      isFocused={focused == field.name}
      fieldName={field.name}
      regexPattern={field.pattern}
      handleFocus={() => handleFocus(field.name)}
      handleBlur={handleBlur}
      field_type={field.type}
      id={field.name}
    />
  );
  const renderButton = (button) => {
    return (
      <BasicButton
        onClick={button.onClick}
        text={button.text}
        colorStyle={button.colorStyle}
        type={button.type}
      ></BasicButton>
    );
  };

  return (
    <div className="w-full mt-5 px-5 py-2">
      <div className="w-full items-center flex flex-col py-1">
        <BsTwitterX color="white" size={"20px"} />
      </div>
      <h2 className="text-white text-[31px] py-1 font-bold">{title}</h2>
      <form>
        <div>
          {fields.map((field, index) => (
            <div key={index} className="">
              {renderField(field)}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default StandardForm;
