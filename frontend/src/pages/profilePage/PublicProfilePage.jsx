import { useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import { HiArrowSmLeft } from "react-icons/hi";
import BACKADDRESS from "../../../back_address";
import BasicButton from "../../components/Button/BasicButton";
import { FaRegCalendarAlt } from "react-icons/fa";

const PublicProfilePage = () => {
  const { currentUser } = useContext(SessionContext);
  return (
    currentUser && (
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-max flex flex-row border items-center border-gray-main-borders px-3">
          <div className="text-white pr-4">
            <HiArrowSmLeft size={"40px"} />
          </div>
          <h2 className="text-white font-bold text-[20px]">
            {currentUser.username}
          </h2>
        </div>
        <div className=" max-h-[200px] flex relative">
          <div className="w-full h-full flex flex-col">
            <div className="flex w-full h-1/2 ">
              <img
                className="w-full object-cover"
                src={currentUser.avatar}
                alt="Background img"
              />
            </div>
            <div className="flex flex-col h-1/2 w-full items-end">
              <div className="flex h-full items-start mr-3">
                <BasicButton
                  text={"Edit profile"}
                  colorStyle={"black"}
                  type={""}
                ></BasicButton>
              </div>
            </div>
            <div className="absolute bottom-0 z-10">
              <img
                src={`http://localhost:5000/avatar/664e4d6eb4fe8a7e991ccc33`}
                alt="no image"
                className=" object-contain rounded-full h-[150px] w-[150px] border-4 border-black"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white font-bold text-[20px]">
            {currentUser.name}
          </h2>
          <h3 className=" text-gray-username text-[15px]">
            @{currentUser.username}
          </h3>
        </div>
        <div className="text-gray-username flex flex-row items-center">
          <FaRegCalendarAlt></FaRegCalendarAlt>
          <span className="text-gray-username ml-2">
            Se unió el 12 de junio
          </span>
        </div>
        <div className="flex flex-row text-white text-[15px]">
          <div className="hover:underline cursor-pointer">
            <span className="font-bold">{`30`}</span>
            <span className=" text-gray-username"> following</span>
          </div>
          <div className="ml-5 hover:underline cursor-pointer">
            <span className="font-bold">{`60`}</span>
            <span className="text-gray-username"> followers</span>
          </div>
        </div>
      </div>
    )
  );
};

export default PublicProfilePage;
