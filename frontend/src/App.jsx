import "./App.css";
import { UserProvider } from "./components/CurrentUserContext";
import SelectSection from "./components/SelectSection";
import { SelectedSectionProvider } from "./components/SelectedSectionContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import NotificationFeed from "./components/NotificationFeed";
import LoginBox from "./components/LoginBox";
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
