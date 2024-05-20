import React from "react";
import StandardForm from "../../components/Forms/StandardForm";
import axios from "../../../back_address";

const LoginForm = () => {
  const handleGoogleLog = () => {
    console.log("Loggin in with Google...");
  };
  const handleAppleLog = () => {
    console.log("Loggin in with Apple...");
  };

  const handleFormSubmit = async (formValues) => {
    try {
      console.log(formValues);
      const response = await axios.post("/login", {
        identifier: formValues.identifier.value,
        password: formValues.password.value,
      });
      console.log(response);
    } catch (error) {
      console.error("Error trying to log in: ", error);
    }
  };

  return (
    <StandardForm
      fields={[
        {
          category: "button",
          text: "Login with Gooogle",
          type: "",
          colorStyle: "white",
          disabled: false,
          onClick: handleGoogleLog,
        },
        {
          category: "button",
          text: "Login with Apple",
          type: "",
          colorStyle: "white",
          disabled: false,
          onClick: handleAppleLog,
        },
        {
          category: "div",
          content: (
            <div className="mt-4">
              <div className="flex flex-row justify-evenly items-center">
                <div className="h-[1px] bg-transparent border border-transparent border-b-gray-main-borders w-full mr-2"></div>
                <div className="h-full items-center text-[15px] text-white">
                  or
                </div>
                <div className="h-[1px] bg-transparent border border-transparent border-b-gray-main-borders w-full ml-2 "></div>
              </div>
            </div>
          ),
        },
        {
          category: "input",
          name: "identifier",
          label: "username / email",
          pattern: ".*",
          type: "text",
        },
        {
          category: "input",
          label: "password",
          name: "password",
          pattern: ".*",
          type: "password",
        },
        {
          category: "button",
          text: "Login",
          type: "submit",
          colorStyle: "white",
        },
        {
          category: "div",
          content: (
            <div className="mt-3 text-gray-username">
              Don't have an account yet?{" "}
              <a href="/register" className="  text-blue-main hover:underline">
                Register
              </a>
            </div>
          ),
        },
      ]}
      title={"Sign in to X"}
      onSubmit={handleFormSubmit}
    >
      LoginForm
    </StandardForm>
  );
};

export default LoginForm;
