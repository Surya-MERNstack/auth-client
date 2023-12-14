import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Questions from "./pages/Questions";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import UserDetails from "./pages/UserDetails";
import Header from "./components/Header";
function Routing() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signin />} />
      {/* <Route path="/questions" element={<Questions />} />
      <Route path="/question/ask" element={<AskQuestion />} />
      <Route path="/question/details/:id" element={<QuestionDetails />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/users" element={<Users />} />
      <Route path="/password/forget" element={<ForgetPassword />} /> */}
      <Route path="/password/new" element={<NewPassword />} />
      <Route path="/user/details/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default Routing;
