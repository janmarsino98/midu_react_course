import { useContext, useEffect, useState } from "react";
import { UserContext } from "./CurrentUserContext";
import FollowBtn from "./FollowBtn";
import { PiArrowElbowDownLeftFill } from "react-icons/pi";
import BACK_ADRESS from "../../back_address";
import SearchFollowCard from "./SearchFollowCard";

const WhoToFollow = () => {
  const [userData, setUserData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const handleFollow = (username) => {
    setFollowing([...following, username]);
  };

  const handleUnfollow = (username) => {
    setFollowing(
      [...following].filter((follower) => {
        follower !== username;
      })
    );
  };

  const handleClick = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (currentUser) {
        try {
          const response = await fetch(
            `${BACK_ADRESS}/${currentUser.username}/get_who_to_follow`
          );
          const users = await response.json();
          setUserData(users);
        } catch (error) {
          console.error("There was an error while fetching user data: ", error);
        }
      }
    };
    fetchUserInfo();
  }, [currentUser]);
  return (
    <div className="rounded-xl border border-gray-main-borders bg-custom-black flex flex-col flex-wrap w-full gap-2 h-max">
      <h4 className="text-white text-tweet-message px-4 py-3 font-bold">
        Suggested profiles
      </h4>
      {userData &&
        userData
          .slice(0, showMore ? userData.length : 2)
          .map((userdata, index) => {
            const isFollowing =
              currentUser &&
              currentUser.following &&
              currentUser.following.includes(userdata.username);
            return (
              <SearchFollowCard
                key={index}
                username={userdata.username}
                name={userdata.name}
                avatar={userdata.avatar}
                is_verified={userdata.is_verified}
              >
                <div className="flex h-full flex-col justify-center text-white items-end w-full">
                  <FollowBtn
                    usernameToFollow={userdata.username}
                    onClick={() => handleFollow(userdata.username)}
                  ></FollowBtn>
                </div>
              </SearchFollowCard>
            );
          })}
      <button
        className="flex text-blue-main text-4 w-full hover:bg-card-hover-bg h-max items-start justify-start p-4 rounded-bl-lg rounded-br-lg"
        onClick={() => handleClick()}
      >
        {showMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

export default WhoToFollow;
