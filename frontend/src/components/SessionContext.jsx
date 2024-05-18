import { createContext, useState, useEffect } from "react";
import axios from "../../back_address";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLogged = async () => {
      try {
        const response = await axios.get("/check_login");
        const data = await response.data.logged;
        setLoggedIn(data);
        console.log("DATA: ", data);
      } catch (error) {
        console.error("Error trying to check login: ", error);
      }
    };
    fetchLogged();
  }, []);

  return (
    <SessionContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </SessionContext.Provider>
  );
};
