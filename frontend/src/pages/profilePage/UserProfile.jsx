import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../back_address";
import UserProfileField from "./UserProfileField";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { data } from "autoprefixer";
import { SessionContext } from "../../contexts/SessionContext";

const UserProfile = () => {
  const { currentUser } = useContext(SessionContext);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

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
        setLoading(false); // Indica que la carga ha terminado
      } catch (error) {
        console.error("Error while fetching user: ", error);
        setLoading(false); // Indica que la carga ha terminado incluso en caso de error
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (!user) {
    return <div className="text-white">No se encontró el usuario.</div>;
  }

  return (
    <div className=" bg-transparent-white h-full w-full flex items-center justify-center">
      <div className="flex flex-col max-w-[500px] gap-4 bg-black p-5  rounded-3xl">
        <div className="rounded-full relative w-full flex justify-center">
          <img
            src={user.avatar}
            alt="No image"
            className="h-[150px] rounded-full"
          />
          <div
            className="absolute z-40 flex items-center justify-center h-[150px] w-[150px] top-0 cursor-pointer"
            onClick={handleIconClick}
          >
            <MdOutlineAddAPhoto color="gray" size={"30px"} />
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
            currentValue={user.name}
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
