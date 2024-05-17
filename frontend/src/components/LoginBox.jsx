import { useState, useContext } from "react";
import BasicButton from "./BasicButton";
import BasicButtonWhite from "./BasicButtonWhite";
import { UserContext } from "./CurrentUserContext";

const LoginBox = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleClick } = useContext(UserContext);

  return (
    <div className="bg-black flex flex-col text-white  border border-red-500 h-max py-4">
      <div className="mx-28 flex flex-col">
        <h2 className="font-bold text-[31px]">Sign in to X</h2>
        <div className="flex flex-row justify-evenly items-center">
          <div className="h-[1px] bg-transparent border border-transparent border-b-gray-main-borders w-full mr-2"></div>
          <div className="h-full items-center text-[15px]">or</div>
          <div className="h-[1px] bg-transparent border border-transparent border-b-gray-main-borders w-full ml-2 "></div>
        </div>
        <div className="my-3">
          <input
            className="border border-gray-main-borders bg-transparent p-2 pt-3"
            placeholder="username, email"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="my-3">
          <input
            className="border border-gray-main-borders bg-transparent p-2 pt-3"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="my-3"
          onClick={() => handleClick({ username, password })}
        >
          <BasicButton text="Continue"></BasicButton>
        </div>
        <div className="my-3">
          <BasicButtonWhite text="Forgot password?"></BasicButtonWhite>
        </div>
        <div className="text-[15px]">
          <span className=" text-gray-username">
            {"You don't have an account?"}
          </span>
          <a href="" className="ml-2 text-blue-main hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
