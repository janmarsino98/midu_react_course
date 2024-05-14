import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./CurrentUserContext";
import defaultAvatar from "../assets/default_user.jpg";
import LoadingCreateTweet from "./loading/LoadingCreateTweet";
import BACK_ADRESS from "../../back_address";
import { getFromCache } from "../cache";

const CreateTweet = ({ onTweetSubmit }) => {
  const [tweet, setTweet] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // At this component we just deconstruct the first variable of the context object because we won't need to update it according to the component.

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    currentUser ? setIsLoading(false) : setIsLoading(true);
  }, [currentUser]);

  const handleChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BACK_ADRESS}/tweet`, {
        message: tweet,
        username: currentUser.username,
      })
      .then((response) => {
        setTweet(""); // Clear the input after posting
        if (response.data) {
          // Assuming response.data contains the new tweet as it should be added to the state
          onTweetSubmit(response.data);
        }
      })
      .catch((error) => {
        console.error("Error posting tweet: ", error);
      });
  };

  if (isLoading === false) {
    return (
      <>
        <div className="flex flex-row p-2 border border-gray-main-borders">
          <div className="flex flex-wrap flex-col py-2 w-max mr-1">
            <img
              className="rounded-full w-16 flex flex-wrap"
              src={isLoading ? defaultAvatar : currentUser.avatar}
              alt="avatar"
            />
          </div>
          <div className="flex flex-wrap flex-col w-full">
            <div className="h-max">
              <form id="tweetForm" method="Post" onSubmit={handleSubmit}>
                <textarea
                  className=" bg-black resize-none text-white w-full border-none outline-none text-tweet-message h-max"
                  value={tweet}
                  onChange={handleChange}
                  placeholder="Start tweeting..."
                ></textarea>
              </form>
            </div>
            <div className="flex flex-wrap flex-row justify-between p-1">
              <div className="tf-body-others-icons"></div>
              <div className="tf-body-others-button">
                <button
                  className={`rounded-full px-3 py-2 font-bold ${
                    tweet == ""
                      ? "bg-bg-disabled-button text-disabled-button"
                      : "bg-blue-main text-white "
                  }`}
                  type="submit"
                  form="tweetForm"
                  disabled={tweet === ""}
                >
                  <div className="h-max">Submit</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingCreateTweet></LoadingCreateTweet>;
  }
};

export default CreateTweet;
