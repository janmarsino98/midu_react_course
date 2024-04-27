import { useContext, useEffect, useState } from "react";
import FollowCard from "./FollowCard";
import { UserContext } from "./CurrentUserContext";
import FollowBtn from "./FollowBtn";

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
    <div className="FollowCard">
      <h4>A quién seguir</h4>
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
                <div className="whoToFollowCard-followBtnContainer">
                  <FollowBtn
                    usernameToFollow={userdata.username}
                    onClick={() => handleFollow(userdata.username)}
                  ></FollowBtn>
                </div>
              </FollowCard>
            );
          })}
      <button className="FollowCard-showMoreBtn" onClick={() => handleClick()}>
        {showMore ? "Mostrar menos" : "Mostrar más"}
      </button>
    </div>
  );
};

export default WhoToFollow;
