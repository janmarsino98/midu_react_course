import React from "react";
import NotificationFeed from "./NotificationFeed";
import HeaderNav from "../../components/Header/HeaderNav";
import SelectSection from "../../components/SelectSection";

const NotificationsPage = () => {
  return (
    <div>
      <main className="w-full max-w-screen-sm flex flex-row">
        <div className="hidden sm:flex">
          <HeaderNav></HeaderNav>
        </div>
        <div className="flex flex-col">
          <h2 className="text-white font-bold p-2">Notifications</h2>
          <SelectSection></SelectSection>
          <NotificationFeed></NotificationFeed>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
