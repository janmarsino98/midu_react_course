import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./CurrentUserContext";
import defaultAvatar from "../assets/default_user.jpg";
import LoadingCreateTweet from "./loading/LoadingCreateTweet";
import { LastTweetsContext } from "./LastTweetsContext";

const CreateTweet = ({ onTweetSubmit }) => {
  const [tweet, setTweet] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // At this component we just deconstruct the first variable of the context object because we won't need to update it according to the component.

  const { currentUser } = useContext(UserContext);
  const { lastTweets, setLastTweets } = useContext(LastTweetsContext);

  useEffect(() => {
    if (currentUser) {
      const fetchAvatar = async () => {
        setIsLoading(true);

        try {
          const response = await fetch(
            `http://localhost:5000/user/${currentUser.username}`
          );
          const data = await response.json();
          setUserAvatar(data["avatar"]);
          setIsLoading(false);
        } catch (error) {
          console.error("There was an error : ", error);
        }
      };
      fetchAvatar();
    } else {
      setUserAvatar(defaultAvatar);
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/tweet", {
        message: tweet,
        username: currentUser.username,
      })
      .then((response) => {
        setTweet(""); // Clear the input after posting
        if (response.data) {
          fetchLastTweets();
          onTweetSubmit(response.data);
        }
      })
      .catch((error) => {
        console.error("Error posting tweet: ", error);
      });
  };

  const fetchLastTweets = async () => {
    try {
      const response = await fetch("http://localhost:5000/last_tweets");
      const data = await response.json();
      setLastTweets(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  if (isLoading === false) {
    return (
      <>
        <div className="tf-NewTweet-container">
          <div className="tf-avatar-container">
            <img src={isLoading ? defaultAvatar : userAvatar} alt="avatar" />
          </div>
          <div className="tf-body-container">
            <div className="tf-body-message">
              <form id="tweetForm" method="Post" onSubmit={handleSubmit}>
                <textarea
                  value={tweet}
                  onChange={handleChange}
                  placeholder="Start tweeting..."
                ></textarea>
              </form>
            </div>
            <div className="tf-body-others">
              <div className="tf-body-others-icons"></div>
              <div className="tf-body-others-button">
                <button type="submit" form="tweetForm" disabled={tweet === ""}>
                  Submit
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
