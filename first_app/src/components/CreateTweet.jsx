import { useState } from "react";
import axios from "axios";

const CreateTweet = () => {
  const [tweet, setTweet] = useState("");

  const handleChange = (e) => {
    setTweet(e.target.value);
  };

  const currentUsername = "wiskys98";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/tweet", {
        message: tweet,
        username: currentUsername,
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
          <img
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            alt="avatar"
          />
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
