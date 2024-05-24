import React, { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { MdMoreHoriz } from "react-icons/md";

const DisplayUser = () => {
  const { currentUser, loggedIn, loading } = useContext(SessionContext);

  if (loading) {
    return <div className="text-white">Loading</div>;
  }

  if (loggedIn === false) {
    return <div className="text-white">There is no current user...</div>;
  }

  return (
    <div className="text-white cursor-pointer flex flex-row w-full p-3 mt-4 hover:bg-lighter-gray items-center   rounded-full">
      <div>
        <img
          className="rounded-full max-w-10"
          src={currentUser.avatar}
          alt="No profile image"
        />
      </div>
      <div className="ml-3 flex flex-col">
        <span className="font-bold">{currentUser.name}</span>
        <span>{`@${currentUser.username}`}</span>
      </div>
      <div className="flex w-full justify-end">
        <MdMoreHoriz size={"25px"} />
      </div>
    </div>
  );
};

export default DisplayUser;
