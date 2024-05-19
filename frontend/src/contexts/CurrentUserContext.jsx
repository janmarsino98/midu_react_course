import { createContext, useState, useEffect } from "react";
import axios from "../../back_address";

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
      const response = await axios
        .post("/login", params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(console.log("Logged in: "));

      setCurrentUser(response.data);
      setNeedsToUpdate(true);
    } catch (error) {
      console.error("Error: ", error);
    }
    console.log("Actual user: ", currentUser);
  };

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
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleClick }}>
      {children}
    </UserContext.Provider>
  );
};
