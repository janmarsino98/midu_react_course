import { UserContext } from "./CurrentUserContext";
import { useContext, useState, useEffect } from "react";
import BACK_ADRESS from "../../back_address";

const CTAPremium = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const fetchVerified = async () => {
      if (currentUser) {
        try {
          const response = await fetch(
            `${BACK_ADRESS}/${currentUser.username}/is_verified`
          );
          const data = await response.json();
          setIsVerified(data);
        } catch (error) {
          console.error(
            "There was an error while fetching the verification status of the user: ",
            error
          );
        }
      }
    };
    fetchVerified();
  }, [currentUser]);

  const handleClick = async () => {
    if (currentUser) {
      try {
        const response = await fetch(
          `${BACK_ADRESS}/verify_user/${currentUser.username}`,
          { method: "PUT" }
        );
        setIsVerified(true);
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };
  return (
    currentUser &&
    !isVerified && (
      <div className="border border-gray-main-borders rounded-xl mb-2 text-white px-4">
        <h4 className="text-tweet-message font-bold py-3">
          Verify your profile
        </h4>
        <h1></h1>
        <p>
          Verify your profile to unlock new functionalities and, if you are
          elegible, recieve profits for the adds.
        </p>
        <div className="py-3">
          <button
            className="rounded-full px-5 py-2 font-bold bg-blue-main text-white "
            onClick={() => handleClick()}
            hidden={!currentUser || (currentUser && isVerified)}
          >
            Verify
          </button>
        </div>
      </div>
    )
  );
};

export default CTAPremium;
