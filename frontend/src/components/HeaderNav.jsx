import React from "react";
import { useLocation } from "react-router-dom";
import PrincipalNav from "./PrincipalNav";

const HeaderNav = () => {
  const location = useLocation();
  const noShowLocations = ["/login"];
  return (
    !noShowLocations.includes(location.pathname) && (
      <div className="flex justify-end w-max relative ">
        <header className="hidden lg:flex flex-col items-end w-max sticky left-60 ">
          <PrincipalNav></PrincipalNav>
        </header>
      </div>
    )
  );
};

export default HeaderNav;
