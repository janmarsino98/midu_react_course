import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { HiArrowSmLeft } from "react-icons/hi";
import BasicButton from "../../components/Button/BasicButton";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "../../../back_address";
import { useNavigate, useParams } from "react-router-dom";

const PublicProfilePage = () => {
  const { currentUser } = useContext(SessionContext);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileUser = async () => {
      setIsLoading(true);
      try {
        const [response, stats] = await Promise.all([
          axios.get(`/user/${id}`),
          axios.get(`/user_stats/${id}`),
        ]);

        console.log(stats);

        setProfileUser({ ...response.data, ...stats.data });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchProfileUser();
  }, [id]);

  const handleClick = () => {
    navigate(`/user/${currentUser._id}`);
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    profileUser &&
    currentUser && (
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-max flex flex-row border items-center border-gray-main-borders px-3">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="text-white pr-4 cursor-pointer"
          >
            <HiArrowSmLeft size={"20px"} />
          </div>
          <h2 className="text-white font-bold text-[20px]">
            {profileUser.username}
          </h2>
        </div>
        <div className="flex relative">
          <div className="w-full max-h-[200px] flex flex-col">
            <div className="flex w-full h-4/5 ">
              <img
                className="w-full object-cover"
                src={profileUser.avatar}
                alt="Background img"
              />
            </div>
            <div className="flex flex-col h-1/3 w-full items-end">
              {currentUser.username == profileUser.username && (
                <div className="flex h-full items-start mr-3 mt-2">
                  <BasicButton
                    text={"Edit profile"}
                    colorStyle={"black"}
                    type={""}
                    onClick={handleClick}
                  ></BasicButton>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-2 z-10">
              <img
                src={profileUser.avatar}
                alt="no image"
                className=" object-contain rounded-full h-[100px] w-[100px] border-4 border-black"
              />
            </div>
          </div>
        </div>
        <div className="px-3">
          <div className="flex flex-col">
            <h2 className="text-white font-bold text-[20px]">
              {profileUser.name}
            </h2>
            <h3 className=" text-gray-username text-[15px]">
              @{profileUser.username}
            </h3>
          </div>
          <div className="text-gray-username flex flex-row items-center mt-2">
            <FaRegCalendarAlt></FaRegCalendarAlt>
            <span className="text-gray-username ml-2">
              {`Joined the ${profileUser.joined_day} of ${profileUser.joined_month}`}
            </span>
          </div>
          <div className="flex flex-row text-white text-[15px] mt-2">
            <div className="hover:underline cursor-pointer">
              <span className="font-bold">{profileUser.following}</span>
              <span className=" text-gray-username"> following</span>
            </div>
            <div className="ml-5 hover:underline cursor-pointer">
              <span className="font-bold">{profileUser.followers}</span>
              <span className="text-gray-username "> followers</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PublicProfilePage;
