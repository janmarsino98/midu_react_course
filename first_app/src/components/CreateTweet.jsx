import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "./CurrentUserContext";

const CreateTweet = () => {
  const [tweet, setTweet] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await fetch(
        `http://localhost:5000/user/${currentUser.username}`
      );
      const data = await response.json();
      console.log(data);
      setUserAvatar(data["avatar"]);
    };

    fetchAvatar();
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
      .then(() => {
        setTweet("");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <div className="tf-NewTweet-container">
        <div className="tf-avatar-container">
          <img src={userAvatar} alt="avatar" />
        </div>
        <div className="tf-body-container">
          <div className="tf-body-message">
            <form id="tweetForm" method="Post" onSubmit={handleSubmit}>
              <textarea
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
};

export default CreateTweet;
