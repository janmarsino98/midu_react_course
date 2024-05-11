import "./App.css";
import CreateTweet from "./components/CreateTweet";
import PrincipalNav from "./components/PrincipalNav";
import ForYouTweetFeed from "./components/ForYouTweetFeed";
import { UserProvider } from "./components/CurrentUserContext";
import WhoToFollow from "./components/WhoToFollow";
import SearchBar from "./components/SearchBar";
import CTAPremium from "./components/CTAPremium";
import SelectSection from "./components/SelectSection";
import { SelectedSectionProvider } from "./components/SelectedSectionContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import NotificationFeed from "./components/NotificationFeed";

function App() {
  return (
    <UserProvider>
      <SelectedSectionProvider>
        <Router>
          <div className="app-container w-full flex flex-row justify-center font-seoge box-border">
            <header className="hidden lg:flex flex-col items-end w-max">
              <PrincipalNav></PrincipalNav>
            </header>
            <Routes>
              <Route
                path="/"
                element={
                  <main className="w-full max-w-screen-sm">
                    <SelectSection></SelectSection>
                    <CreateTweet></CreateTweet>
                    <ForYouTweetFeed></ForYouTweetFeed>
                  </main>
                }
              />
              <Route
                path="/notifications"
                element={
                  <main className="w-full max-w-screen-sm">
                    <h2 className="text-white font-bold p-2">Notifications</h2>
                    <SelectSection></SelectSection>
                    <NotificationFeed></NotificationFeed>
                  </main>
                }
              />
            </Routes>
            <div className="hidden lg:flex flex-col right-container w-[350px] mt-1">
              <SearchBar></SearchBar>
              <CTAPremium></CTAPremium>
              <WhoToFollow></WhoToFollow>
            </div>
          </div>
        </Router>
      </SelectedSectionProvider>
    </UserProvider>
  );
}

export default App;
