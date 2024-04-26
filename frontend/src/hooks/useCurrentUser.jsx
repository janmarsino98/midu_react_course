import { useState, useEffect } from "react";

function useCurrentUser(currentUser) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/${currentUser}`
        );
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("There was an error while fetching the user: ", error);
      }
    };

    fetchUserInfo();
  }, [currentUser]);

  return userInfo;
}

export default useCurrentUser;
