import React from "react";
import { BsTwitterX } from "react-icons/bs";
import StandardForm from "../../components/Forms/StandardForm";

const SignUp = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <StandardForm
      fields={[
        {
          category: "input",
          name: "Username",
          pattern: "^[A-Za-z0-9_]+$",
          type: "text",
        },
        {
          category: "input",
          name: "Name",
          pattern: /^[A-Za-záéíóúÁÉÍÓÚ]+(\s[A-Za-záéíóúÁÉÍÓÚ]+)*$/,
          type: "text",
        },
        {
          category: "input",
          name: "Email",
          pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
          type: "text",
        },
        {
          category: "input",
          name: "Password",
          pattern: "^(?=.*[A-Z])(?=.*[^a-zA-Z0-9s]).+$",
          type: "password",
        },
        {
          category: "button",
          text: "Continue",
          type: "BasicButton",
          onClick: handleClick,
        },
        {
          category: "button",
          text: "Back",
          type: "BasicButtonWhite",
          onClick: handleClick,
        },
      ]}
      title={"First form"}
    ></StandardForm>
  );
};

export default SignUp;
