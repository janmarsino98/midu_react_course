import { useEffect, useState } from "react";
import FollowCard from "./FollowCard";

const WhoToFollow = ({ usernames }) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/users?usernames=${usernames.join(",")}`
        );
        const users = await response.json();
        setUserData(users);
      } catch (error) {
        console.error("There was an error while fetching user data: ", error);
      }
    };
    fetchUserInfo();
  }, []);
  return (
    <div className="FollowCard">
      <h4>A quién seguir</h4>
      {userData &&
        userData.map((userdata, index) => {
          return (
            <FollowCard
              key={index}
              username={userdata.username}
              name={userdata.name}
              avatar={userdata.avatar}
              is_verified={userdata.is_verified}
            >
              <div className="whoToFollowCard-followBtnContainer">
                <button>Seguir</button>
              </div>
            </FollowCard>
          );
        })}
      <button className="FollowCard-showMoreBtn">Mostrar más</button>
    </div>
  );
};

export default WhoToFollow;
