import { BsTwitterX } from "react-icons/bs";
import FormInputField from "./FormInputField";
import { useState, useEffect } from "react";
import BasicButton from "../Button/BasicButton";
import BasicButtonWhite from "../Button/BasicButtonWhite";

const StandardForm = ({ title, fields, onSubmit }) => {
  const [focused, setFocused] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const validateForm = () => {
    let complete = true;
    let correct = true;
    fields.forEach((field) => {
      if (field.category === "input") {
        const input = inputValues[field.name];
        if (!input || input.value.trim() === "") {
          complete = false;
        }
        if (!input || !input.isValid) {
          correct = false;
        }
      }
    });
    setIsComplete(complete);
    setIsCorrect(correct);
  };

  useEffect(() => {
    validateForm();
  }, [inputValues]);

  const handleFocus = (name) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isCorrect && isComplete) {
      onSubmit(inputValues);
    }
  };

  const renderField = (field) => {
    if (field.category == "button") {
      return renderButton(field);
    } else if (field.category == "input") {
      return renderInput(field);
    } else if (field.category == "div") {
      return renderDiv(field);
    }
  };

  const renderDiv = (field) => {
    return <>{field.content}</>;
  };

  const renderInput = (field) => (
    <FormInputField
      isFocused={focused == field.name}
      fieldName={field.name}
      fieldLabel={field.label}
      regexPattern={field.pattern}
      handleFocus={() => handleFocus(field.name)}
      handleBlur={handleBlur}
      handleChange={(value, isValid) =>
        handleChange(field.name, value, isValid)
      }
      field_type={field.type}
      id={field.name}
      maxLength={field.maxLength ? field.maxLength : 100}
      minLength={field.minLength ? field.minLength : 0}
    />
  );
  const renderButton = (button) => {
    return (
      <BasicButton
        onClick={button.onClick}
        text={button.text}
        colorStyle={button.colorStyle}
        type={button.type}
        disabled={
          button.disabled != null ? button.disabled : !isCorrect || !isComplete
        }
        formatting={button.formatting}
      ></BasicButton>
    );
  };

  const handleChange = (name, value, isValid) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: { value, isValid },
    }));
  };

  return (
    <div className="w-full mt-5 px-5 py-2">
      <div className="w-full items-center flex flex-col py-1">
        <BsTwitterX color="white" size={"20px"} />
      </div>
      <h2 className="text-white text-[31px] py-1 font-bold">{title}</h2>
      <form onSubmit={handleFormSubmit}>
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
