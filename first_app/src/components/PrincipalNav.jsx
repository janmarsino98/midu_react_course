import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiFileListFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";

const PrincipalNav = () => {
  const [clickedChoice, setClickedChoice] = useState("home");

  const handleClick = (choice) => {
    setClickedChoice(choice);
  };

  return (
    <nav className="pnav">
      <a
        onClick={() => handleClick("home")}
        className={`pnav-item ${clickedChoice === "home" ? "selected" : ""}`}
        /* href="/home" */
      >
        <div className="pnav-iconContainer">
          <IoMdHome size={"19px"} style={{ verticalAlign: "baseline" }} />
        </div>
        <div className="pnav-itemName">
          <span>Home</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("explore")}
        className={`pnav-item ${clickedChoice === "explore" ? "selected" : ""}`}
        /* href="/explore" */
      >
        <div className="pnav-iconContainer">
          <FaSearch />
        </div>
        <div className="pnav-itemName">
          <span>Explore</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("notifications")}
        className={`pnav-item ${
          clickedChoice === "notifications" ? "selected" : ""
        }`}
        /* href="/notifications" */
      >
        <div className="pnav-iconContainer">
          <FaBell />
        </div>
        <div className="pnav-itemName">
          <span>Notifications</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("messages")}
        className={`pnav-item ${
          clickedChoice === "messages" ? "selected" : ""
        }`}
        /* href="/messages" */
      >
        <div className="pnav-iconContainer">
          <CiMail />
        </div>
        <div className="pnav-itemName">
          <span>Messages</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("lists")}
        className={`pnav-item ${clickedChoice === "lists" ? "selected" : ""}`}
        /* href="/lists" */
      >
        <div className="pnav-iconContainer">
          <RiFileListFill />
        </div>
        <div className="pnav-itemName">
          <span>Lists</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("communities")}
        className={`pnav-item ${
          clickedChoice === "communities" ? "selected" : ""
        }`}
        /* href="/communities" */
      >
        <div className="pnav-iconContainer">
          <FaUserFriends />
        </div>
        <div className="pnav-itemName">
          <span>Communities</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("premium")}
        className={`pnav-item ${clickedChoice === "premium" ? "selected" : ""}`}
        /* href="/premium" */
      >
        <div className="pnav-iconContainer">
          <FaXTwitter />
        </div>
        <div className="pnav-itemName">
          <span>Premium</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("profile")}
        className={`pnav-item ${clickedChoice === "profile" ? "selected" : ""}`}
        /* href="/profile" */
      >
        <div className="pnav-iconContainer">
          <FaRegUser />
        </div>
        <div className="pnav-itemName">
          <span>Profile</span>
        </div>
      </a>
      <a
        onClick={() => handleClick("more_options")}
        className={`pnav-item ${
          clickedChoice === "more_options" ? "selected" : ""
        }`}
        /* href="/more_options" */
      >
        <div className="pnav-iconContainer">
          <CiCircleMore />
        </div>
        <div className="pnav-itemName">
          <span>More options</span>
        </div>
      </a>
    </nav>
  );
};

export default PrincipalNav;
