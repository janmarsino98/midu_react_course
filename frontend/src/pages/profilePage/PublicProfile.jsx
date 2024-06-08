import React from "react";
import HeaderNav from "../../components/Header/HeaderNav";
import PublicProfilePage from "./PublicProfilePage";

const PublicProfile = () => {
  return (
    <div>
      <div className="flex flex-col">
        <PublicProfilePage></PublicProfilePage>
      </div>
    </div>
  );
};

export default PublicProfile;
