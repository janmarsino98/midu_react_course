import { createContext, useState, useEffect, useContext } from "react";
import axios from "../../back_address";
import { SessionContext } from "./SessionContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { activeSession } = useContext(SessionContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [needsToUpdate, setNeedsToUpdate] = useState(false);

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const response = await axios.get(`/user/${currentUser.username}`);
        setCurrentUser(response.data);
        setNeedsToUpdate(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (needsToUpdate) {
      fetchLoggedUser();
    }
  }, [needsToUpdate]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
