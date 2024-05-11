import { useContext, useEffect, useState } from "react";
import FollowCard from "./FollowCard";
import { UserContext } from "./CurrentUserContext";
import FollowBtn from "./FollowBtn";
import { PiArrowElbowDownLeftFill } from "react-icons/pi";

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
            `http://localhost:5000/random_users?currentUserUsername=${currentUser.username}&count=4`
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
        A quién seguir
      </h4>
      {userData &&
        userData
          .slice(0, showMore ? userData.length : 2)
          .map((userdata, index) => {
            console.log(currentUser.following);
            const isFollowing =
              currentUser &&
              currentUser.following &&
              currentUser.following.includes(userdata.username);
            return (
              <FollowCard
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
              </FollowCard>
            );
          })}
      <button
        className="flex text-blue-main text-4 w-full hover:bg-card-hover-bg h-max items-start justify-start p-4 rounded-bl-lg rounded-br-lg"
        onClick={() => handleClick()}
      >
        {showMore ? "Mostrar menos" : "Mostrar más"}
      </button>
    </div>
  );
};

export default WhoToFollow;
