import { useContext } from "react";
import UserContext from "./CurrentUserContext";

const CurrentUserSection = () => {
  const currentUser = useContext(UserContext);
  return (
    <div className="tf-currentUser-section">
      Current user: <strong>{currentUser}</strong>
    </div>
  );
};

export default CurrentUserSection;
