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
import { TweetsContextProvider } from "./components/TweetsToDisplayContext";
import LoginBox from "./components/LoginBox";
import HeaderNav from "./components/HeaderNav";
import MainPage from "./components/MainPage";
import RightBar from "./components/RightBar";

function App() {
  return (
    <UserProvider>
      <SelectedSectionProvider>
        <div className="app-container h-max w-full flex flex-row justify-center font-seoge box-border">
          <Router>
            <Routes>
              <Route path="/" element={<MainPage></MainPage>} />
              <Route path="/login" element={<LoginBox></LoginBox>} />
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
            <RightBar />
          </Router>
        </div>
      </SelectedSectionProvider>
    </UserProvider>
  );
}

export default App;
