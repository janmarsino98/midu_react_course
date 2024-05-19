import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import CTAPremium from "../../pages/loggedPages/CTAPremium";
import WhoToFollow from "../../pages/loggedPages/WhoToFollow";
import { UserContext } from "../../contexts/CurrentUserContext";

const RightBar = () => {
  const { currentUser } = useContext(UserContext);
  console.log("user", currentUser);
  return (
    currentUser?.name && (
      <div className="hidden lg:flex flex-col right-container w-[350px] mt-1">
        <SearchBar />
        <CTAPremium />
        <WhoToFollow />
      </div>
    )
  );
};

export default RightBar;
