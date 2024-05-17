import { UserContext } from "./CurrentUserContext";
import { useContext, useState, useEffect } from "react";
import axios from "../../back_address";

const CTAPremium = () => {
  const { currentUser } = useContext(UserContext);
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const fetchVerified = async () => {
      if (currentUser) {
        try {
          const response = await axios.get(
            `/${currentUser.username}/is_verified`
          );
          setIsVerified(response.data);
        } catch (error) {
          console.error("Error: ", error);
        }
      }
    };

    fetchVerified();
  }, [currentUser]);

  const handleClick = async () => {
    if (currentUser) {
      try {
        axios.put(`/verify_user/${currentUser.username}`);
      } catch (error) {
        console.error("Error while verifying a user: ", error);
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
