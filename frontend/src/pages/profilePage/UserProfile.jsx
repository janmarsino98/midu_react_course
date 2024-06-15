import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../back_address";
import UserProfileField from "./UserProfileField";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { data } from "autoprefixer";
import { SessionContext } from "../../contexts/SessionContext";
import { RxCross2 } from "react-icons/rx";
import BasicButton from "../../components/Button/BasicButton";

const UserProfile = () => {
  const { currentUser } = useContext(SessionContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [displayedImg, setDisplayedImg] = useState();
  const [displayedUserName, setDisplayedUserName] = useState();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("user_id", currentUser._id);
        try {
          const response = await axios.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          const file_id = response.data.file_id;
          console.log("Uploaded file ID:", file_id);
          setDisplayedImg(`http://localhost:5000/${file_id}`);
        } catch (error) {
          console.error("Error while uploading profile pic: ", error);
        }
      };
      uploadFile();
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user profile...");
      try {
        const response = await axios.get(`/user/${id}`);
        console.log(response.data); // Asegúrate de que estás viendo los datos correctos
        setUser(response.data); // Almacena solo los datos necesarios
        setDisplayedImg(response.data.avatar);
        setLoading(false); // Indica que la carga ha terminado
      } catch (error) {
        console.error("Error while fetching user: ", error);
        setLoading(false); // Indica que la carga ha terminado incluso en caso de error
      }
    };
    fetchUser();
  }, [id]);

  const handleClick = () => {
    console.log("Submitting...");
  };

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (!user) {
    return <div className="text-white">No se encontró el usuario.</div>;
  }

  if (user && currentUser && user.username != currentUser.username) {
    return (
      <div className="text-white">
        You are not allowed to modify this profile!
      </div>
    );
  }

  return (
    <div className=" bg-transparent-white h-full w-full flex items-center justify-center">
      <div className="flex flex-col w-[1000px] gap-4 bg-black p-5  rounded-3xl">
        <div className="w-full h-max flex flex-row items-center text-white">
          <div className=" cursor-pointer">
            <RxCross2 size={"25px"} />
          </div>
          <h2 className="w-full text-[20px] font-bold ml-4">Edit profile</h2>
          <div className=" w-max h-max">
            <BasicButton
              className="mt-0"
              text={"Save info"}
              colorStyle={"white"}
              onClick={handleClick}
            ></BasicButton>
          </div>
        </div>
        <div className="rounded-full relative w-full flex justify-center h-[250px]">
          <div className="w-full h-2/3 bg-blue-200"></div>
          <div className="absolute bottom-0 left-0">
            <img
              src={displayedImg}
              alt="No image"
              className="h-[120px] rounded-full"
            />
            <div
              className="absolute z-40 flex items-center justify-center h-[120px] w-[120px] bottom-0 left-0 cursor-pointer"
              onClick={handleIconClick}
            >
              <div className="absolute border-[15px]  bg-[rgb(0,0,0,0.7)] rounded-full border-transparent ">
                <MdOutlineAddAPhoto color="white" size={"20px"} />
              </div>
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <div className="text-white flex flex-col gap-4">
          <UserProfileField
            label="Name"
            editable={true}
            currentValue={displayedUserName}
          ></UserProfileField>
          <UserProfileField
            label="Username"
            editable={false}
            currentValue={user.username}
          ></UserProfileField>
          <UserProfileField
            label="Email"
            editable={false}
            currentValue={user.email}
          ></UserProfileField>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
