import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import CTAPremium from "../../pages/loggedPages/CTAPremium";
import WhoToFollow from "../../pages/loggedPages/WhoToFollow";
import { SessionContext } from "../../contexts/SessionContext";

const RightBar = () => {
  const { currentUser } = useContext(SessionContext);
  return (
    currentUser?.name && (
      <div className="hidden lg:flex flex-col right-container w-[350px] mt-1 ml-2">
        <SearchBar />
        <CTAPremium />
        <WhoToFollow />
      </div>
    )
  );
};

export default RightBar;
