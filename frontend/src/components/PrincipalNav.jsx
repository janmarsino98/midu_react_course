import { useState, useContext } from "react";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiFileListFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import PrincipalNavItem from "./PrincipalNavItem";
import { UserContext } from "./CurrentUserContext";
import { useNavigate } from "react-router-dom";

const PrincipalNav = () => {
  const { currentUser } = useContext(UserContext);
  const [clickedChoice, setClickedChoice] = useState("home");

  const handleClick = (choice) => {
    setClickedChoice(choice);
  };

  return (
    currentUser && (
      <nav className="flex flex-wrap flex-col justify-between mr-2 w-60">
        <PrincipalNavItem
          icon={IoMdHome}
          label={"Home"}
          isSelected={clickedChoice === "home"}
          onClick={() => {
            handleClick("home");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={FaSearch}
          label={"Explore"}
          isSelected={clickedChoice === "explore"}
          onClick={() => {
            handleClick("explore");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={FaBell}
          label={"Notifications"}
          isSelected={clickedChoice === "notifications"}
          onClick={() => {
            handleClick("notifications");
          }}
          unread={
            currentUser.unread_notifications != 0 &&
            currentUser.unread_notifications.length
          }
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={CiMail}
          label={"Messages"}
          isSelected={clickedChoice === "messages"}
          onClick={() => {
            handleClick("messages");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={RiFileListFill}
          label={"Lists"}
          isSelected={clickedChoice === "lists"}
          onClick={() => {
            handleClick("lists");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={FaUserFriends}
          label={"Communities"}
          isSelected={clickedChoice === "communities"}
          onClick={() => {
            handleClick("communities");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={FaXTwitter}
          label={"Premium"}
          isSelected={clickedChoice === "premium"}
          onClick={() => {
            handleClick("premium");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={FaRegUser}
          label={"Profile"}
          isSelected={clickedChoice === "profile"}
          onClick={() => {
            handleClick("profile");
          }}
        ></PrincipalNavItem>
        <PrincipalNavItem
          icon={CiCircleMore}
          label={"More options"}
          isSelected={clickedChoice === "more options"}
          onClick={() => {
            handleClick("more options");
          }}
        ></PrincipalNavItem>
      </nav>
    )
  );
};

export default PrincipalNav;
