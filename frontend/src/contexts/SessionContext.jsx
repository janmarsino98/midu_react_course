import { createContext, useState, useEffect } from "react";
import axios from "../../back_address";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null); // null: loading, false: not logged in, true: logged in
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      console.log("Looking for active session...");
      try {
        const response = await axios.get("/check_login");
        const data = response.data;
        console.log("Response data:", data);

        if (data.is_logged) {
          setLoggedIn(true);
          setCurrentUser(data.user);
          console.log("Current user set:", data.user);
        } else {
          setLoggedIn(false);
          console.log("No active session found.");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ loggedIn, currentUser, loading }}>
      {children}
    </SessionContext.Provider>
  );
};
