import "./App.css";
import { UserProvider } from "./contexts/CurrentUserContext";
import SelectSection from "./components/SelectSection";
import { SelectedSectionProvider } from "./contexts/SelectedSectionContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import NotificationFeed from "./pages/NotificationsPage/NotificationFeed";
import LoginBox from "./pages/LoginPage/LoginBox";
import MainPage from "./pages/loggedPages/MainPage/MainPage";
import RightBar from "./components/Sidebar/RightBar";
import { SessionProvider } from "./contexts/SessionContext";
import FormInputField from "./components/Forms/FormInputField";
import SignUp from "./pages/SignupPage/SignUp";
import LoginMain from "./pages/LoginPage/LoginMain";
import LoginForm from "./pages/LoginPage/LoginForm";
import HeaderNav from "./components/Header/HeaderNav";
import PrincipalNav from "./components/Header/PrincipalNav";
import DisplayUser from "./components/DisplayUser";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import UserProfile from "./pages/profilePage/UserProfile";
import PublicProfilePage from "./pages/profilePage/PublicProfilePage";
import PublicProfile from "./pages/profilePage/PublicProfile";
import LoggedLayout from "./components/LoggedLayout";

function App() {
  return (
    <>
      <SessionProvider>
        {/* <UserProvider> */}
        <SelectedSectionProvider>
          <div className="app-container h-full w-full flex flex-row justify-center font-seoge box-border">
            <Router>
              <Routes>
                <Route element={<LoggedLayout></LoggedLayout>}>
                  <Route
                    path="/"
                    element={
                      <div className="w-full flex">
                        <MainPage></MainPage>
                      </div>
                    }
                  />
                  <Route
                    path="/profile/:id"
                    element={<PublicProfilePage></PublicProfilePage>}
                  />
                  <Route
                    path="/notifications"
                    element={<NotificationsPage></NotificationsPage>}
                  />
                </Route>
                <Route
                  path="/login"
                  element={
                    <div className="w-full h-full bg-slate-500 flex items-center justify-center">
                      <div className="w-[500px] bg-black rounded-xl pb-3 px-6">
                        <LoginForm></LoginForm>
                      </div>
                    </div>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <div className="w-full h-full bg-slate-500 flex items-center justify-center">
                      <div className="w-[500px] bg-black rounded-xl pb-3 px-6">
                        <SignUp> </SignUp>
                      </div>
                    </div>
                  }
                />
                <Route path="/user/:id" element={<UserProfile></UserProfile>} />
              </Routes>
              {/* <RightBar /> */}
            </Router>
          </div>
        </SelectedSectionProvider>
        {/* </UserProvider> */}
      </SessionProvider>
    </>
  );
}

export default App;
