import React, { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

const DisplayUser = () => {
  const { currentUser, loggedIn, loading } = useContext(SessionContext);

  if (loading) {
    return <div className="text-white">Loading</div>;
  }

  if (loggedIn === false) {
    return <div className="text-white">There is no current user...</div>;
  }

  return (
    <div className="text-white border border-red-500">
      {currentUser ? currentUser.name : "No user data"}
    </div>
  );
};

export default DisplayUser;
