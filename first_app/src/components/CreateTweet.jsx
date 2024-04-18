import React, { useState } from "react";

const CreateTweet = () => {
  const [tweet, setTweet] = useState("");

  const handleChange = (e) => {
    setTweet(e.target.value);
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
            <form>
              <textarea
                onChange={handleChange}
                placeholder="Start tweeting..."
              ></textarea>
            </form>
          </div>
          <div className="tf-body-others">
            <div className="tf-body-others-icons"></div>
            <div className="tf-body-others-button">
              <button aria-disabled={tweet === ""}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTweet;
