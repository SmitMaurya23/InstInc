import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import SelfProfile from "./components/SelfProfile";
import CreatePost from "./components/CreatePost";
import { useAuth } from "./context/AuthProvider";
import ShowUser from "./components/ShowUser";
import EditProfile from "./components/EditProfile";
import ViewPost from "./components/ViewPost";
import Feed from "./components/Feed"
import OtherProfile from "./components/OtherProfile";
import OtherFeed from "./components/OtherFeed";

function App() {
  const [authUser] = useAuth();

  return (
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/SelfProfile"
        element={authUser ? <SelfProfile /> : <Navigate to="/signup" />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/CreatePost" element={<CreatePost />} />
      <Route path="/ShowUser" element={<ShowUser />} />
      <Route path="/EditProfile" element={<EditProfile />} />
      <Route path="/ViewPost" element={<ViewPost />} />
      <Route path="/Feed" element={<Feed />} />
      <Route path="/OtherProfile" element={<OtherProfile />} />
      <Route path="/OtherFeed" element={<OtherFeed />} />

    </Routes>
    <Toaster />
  </div>
  );
}

export default App;
