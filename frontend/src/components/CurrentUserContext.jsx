import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
const activeUser = "afordigital";
export const UserProvider = ({ children }) => {
  //We will pass a currentUser and a method to update it to the children of the provider
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchUser = async (userToFetch) => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/${userToFetch}`
        );
        const newUser = await response.json();
        setCurrentUser(newUser);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchUser(activeUser);
    console.log(activeUser);
  }, []);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
