import React from "react";
import Home from "./components/basic/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/loginlogout/Signup";
import Signin from "./components/loginlogout/Login";
import { Toaster } from "react-hot-toast";
import SelfProfile from "./components/selfProfile/SelfProfile";
import CreatePost from "./components/selfProfile/CreatePost";
import { useAuth } from "./context/AuthProvider";
import ShowUser from "./components/basic/ShowUser";
import EditProfile from "./components/selfProfile/EditProfile";
import ViewPost from "./components/basic/ViewPost";
import Feed from "./components/basic/Feed"
import OtherProfile from "./components/otherProfile/OtherProfile";
import OtherFeed from "./components/otherProfile/OtherFeed";
import ChatPage from "./components/chat/ChatPage";

function App() {
  const [authUser] = useAuth();

  return (
    <div >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/SelfProfile"
        element={authUser ? <SelfProfile /> : <Navigate to="/" />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/CreatePost" element={authUser ?<CreatePost />: <Navigate to="/signin" />} />
      <Route path="/ShowUser" element={authUser ?<ShowUser />: <Navigate to="/signin" />} />
      <Route path="/EditProfile" element={authUser ?<EditProfile />: <Navigate to="/signin" />} />
      <Route path="/ViewPost" element={authUser ?<ViewPost />: <Navigate to="/signin" />} />
      <Route path="/Feed" element={authUser ?<Feed />: <Navigate to="/signin" />} />
      <Route path="/OtherProfile" element={authUser ?<OtherProfile />: <Navigate to="/signin" />} />
      <Route path="/OtherFeed" element={authUser ?<OtherFeed />: <Navigate to="/signin" />} />
      <Route path="/ChatPage" element={authUser ?<ChatPage />: <Navigate to="/signin" />} />

    </Routes>
    <Toaster />
  </div>
  );
}

export default App;
