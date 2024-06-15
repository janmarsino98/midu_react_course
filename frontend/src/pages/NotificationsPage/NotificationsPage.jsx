import React from "react";
import NotificationFeed from "./NotificationFeed";
import HeaderNav from "../../components/Header/HeaderNav";
import SelectSection from "../../components/SelectSection";

const NotificationsPage = () => {
  return (
    <div className="w-full">
      <main className="w-full flex flex-row">
        <div className="flex flex-col w-full">
          <h2 className="text-white font-bold p-2">Notifications</h2>
          <SelectSection></SelectSection>
          <NotificationFeed></NotificationFeed>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
