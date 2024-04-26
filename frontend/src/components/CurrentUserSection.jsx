import { useContext } from "react";
import { UserContext } from "./CurrentUserContext";

const CurrentUserSection = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  if (!currentUser) {
    return null;
  }
  return (
    <div className="tf-currentUser-section">
      <div className="tf-currentUser-img">
        <img
          src={currentUser.avatar}
          alt="There is no avatar for this user..."
        />
      </div>
      <div className="tf-currentUser-text">
        Hello <strong>{currentUser.name} </strong>! Your current user is:
        <strong>{" " + currentUser.username}</strong>
      </div>
    </div>
  );
};

export default CurrentUserSection;
