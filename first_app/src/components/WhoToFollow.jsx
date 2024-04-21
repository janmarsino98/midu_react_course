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
              name={userdata.username}
              avatar={userdata.avatar}
            ></FollowCard>
          );
        })}
    </div>
  );
};

export default WhoToFollow;
