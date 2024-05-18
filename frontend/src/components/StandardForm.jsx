import { BsTwitterX } from "react-icons/bs";
import FormInputField from "./FormInputField";
import { useState } from "react";
import BasicButton from "./BasicButton";
import BasicButtonWhite from "./BasicButtonWhite";

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
    />
  );
  const renderButton = (button) => {
    if (button.type == "BasicButton") {
      return <BasicButton text={button.text}></BasicButton>;
    } else if (button.type == "BasicButtonWhite") {
      return <BasicButtonWhite text={button.text}></BasicButtonWhite>;
    }
  };

  return (
    <div className="w-full mt-5 px-5 py-2">
      <div className="w-full items-center flex flex-col py-1">
        <BsTwitterX color="white" size={"20px"} />
      </div>
      <h2 className="text-white text-[31px] py-1 font-bold">{title}</h2>
      <div>
        {fields.map((field, index) => (
          <div key={index} className="">
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StandardForm;
