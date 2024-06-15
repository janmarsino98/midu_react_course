import React from "react";
import HeaderNav from "./Header/HeaderNav";
import { Outlet } from "react-router-dom";
import RightBar from "./Sidebar/RightBar";
import DisplayUser from "./DisplayUser";

const LoggedLayout = () => {
  return (
    <div className="w-full flex items-start justify-end sm:justify-start flex-row lg:justify-center">
      <div className="hidden sm:flex flex-col pl-3 lg:items-end">
        <HeaderNav></HeaderNav>
        <DisplayUser></DisplayUser>
      </div>
      <div className="flex w-full max-w-[500px] flex-col items-end sm:items-start lg:items-center">
        <Outlet></Outlet>
      </div>
      <div className="hidden lg:flex lg:items-center">
        <RightBar></RightBar>
      </div>
    </div>
  );
};

export default LoggedLayout;
