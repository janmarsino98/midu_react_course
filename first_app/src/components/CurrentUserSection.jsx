import { useContext } from "react";
import UserContext from "./CurrentUserContext";

const CurrentUserSection = () => {
  const currentUserInfo = useContext(UserContext);
  console.log("Current user: ", currentUserInfo);
  if (!currentUserInfo) {
    return null;
  }
  return (
    <div className="tf-currentUser-section">
      <div className="tf-currentUser-img">
        <img
          src={currentUserInfo.avatar}
          alt="There is no avatar for this user..."
        />
      </div>
      <div className="tf-currentUser-text">
        Hello <strong>{currentUserInfo.name} </strong>! Your current user is:
        <strong>{" " + currentUserInfo.username}</strong>
      </div>
    </div>
  );
};

export default CurrentUserSection;
