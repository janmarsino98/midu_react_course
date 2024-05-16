import { createContext, useState, useEffect } from "react";
import BACK_ADRESS from "../../back_address";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [needsToUpdate, setNeedsToUpdate] = useState(false);

  const handleClick = async ({ username, password }) => {
    try {
      const params = {
        username: username,
        password: password,
      };
      const response = await fetch(`${BACK_ADRESS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const data = await response.json();

      setCurrentUser(data);
      setNeedsToUpdate(true);

      console.log(data);
      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const fetchLoggedUser = async () => {
      try {
        const response = await fetch(
          `${BACK_ADRESS}/user/${currentUser.username}`
        );
        const data = await response.json();
        setCurrentUser(data);
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
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleClick }}>
      {children}
    </UserContext.Provider>
  );
};
