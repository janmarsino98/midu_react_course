import React, { useContext, useEffect, useState } from "react";
import StandardForm from "../../components/Forms/StandardForm";
import axios from "../../../back_address";
import { Navigate } from "react-router-dom";
import {SessionContext} from "../../contexts/SessionContext"



const LoginForm = () => {

  
  const {currentUser, setCurrentUser} = useContext(SessionContext)
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setRedirect(true)
    }
  }, [currentUser])
  
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
      if (response.data && response.data.user) {
        setCurrentUser(response.data.user)
      }
    } catch (error) {
      console.error("Error trying to log in: ", error);
    }
  };

  if (redirect || currentUser) {
    return <Navigate to="/"/>
  }

  return (
    <StandardForm
      fields={[
        {
          category: "button",
          text: "Login with Google",
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
