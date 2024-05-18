import React from "react";
import { BsTwitterX } from "react-icons/bs";
import StandardForm from "./StandardForm";

const SignUp = () => {
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
        },
        {
          category: "button",
          text: "Back",
          type: "BasicButtonWhite",
        },
      ]}
      title={"First form"}
    ></StandardForm>
  );
};

export default SignUp;
