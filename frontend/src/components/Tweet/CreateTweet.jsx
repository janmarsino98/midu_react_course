import { useState, useContext, useEffect, useRef } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import defaultAvatar from "../../assets/default_user.jpg";
import LoadingCreateTweet from "../loading/LoadingCreateTweet";
import axios from "../../../back_address";
import { getFromCache } from "../../cache";
import { TweetsContext } from "../../contexts/TweetsToDisplayContext";
import { BiWorld } from "react-icons/bi";

const CreateTweet = () => {
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const { forYouTweets, lastTweets, setForYouTweets, setLastTweets } =
    useContext(TweetsContext);

  const { currentUser } = useContext(SessionContext);
  const contentRef = useRef(null);

  useEffect(() => {
    currentUser ? setIsLoading(false) : setIsLoading(true);
  }, [currentUser]);

  const handleInput = (event) => {
    setTweet(event.currentTarget.textContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/tweet`, {
        message: tweet,
        username: currentUser.username,
      })
      .then((response) => {
        setTweet("");
        contentRef.current.textContent = "";
        if (response.data.tweet) {
          setForYouTweets((prevTweets) => [response.data.tweet, ...prevTweets]);
        }
      })
      .catch((error) => {
        console.error("Error posting tweet: ", error);
      });
  };

  if (isLoading === false) {
    return (
      <>
        <div className="flex flex-row py-2 px-4 border border-gray-main-borders">
          <div className="flex flex-wrap items-start align-top flex-col py-1 w-max mr-1">
            <img
              className="rounded-full w-14 flex flex-wrap"
              src={isLoading ? defaultAvatar : currentUser.avatar}
              alt="avatar"
            />
          </div>
          <div className="flex flex-wrap flex-col w-full">
            <div className="h-max max-w-[560.344px] pl-4 flex flex-wrap w-full break-words whitespace-normal">
              <span
                contentEditable={true}
                onInput={handleInput}
                ref={contentRef}
                role="textbox"
                aria-multiline="true"
                className=" bg-black resize-none text-white w-full border-none outline-none text-tweet-message h-max py-3"
              ></span>
            </div>
            <div className="flex flex-row pb-3 pl-4 items-center border-b border-b-gray-main-borders text-blue-main font-bold">
              <BiWorld></BiWorld>
              <span className="pl-2 text-[14px]">
                Anyone can reply to this tweet
              </span>
            </div>
            <div className="flex flex-wrap flex-row justify-between p-1">
              <div className="tf-body-others-icons"></div>
              <div className="tf-body-others-button my-2">
                <button
                  className={`rounded-full px-3 py-2 font-bold ${
                    tweet == "" || tweet.length > 150
                      ? "bg-bg-disabled-button text-disabled-button"
                      : "bg-blue-main text-white "
                  }`}
                  onClick={handleSubmit}
                  form="tweetForm"
                  disabled={tweet === ""}
                >
                  <div className="h-max px-2">Submit</div>
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
