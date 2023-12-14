import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import HomeMainBar from "../components/HomeMainBar";
import RightSideBar from "../components/RightSideBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "./CSS/Home.css";
function Home() {
  const navigate = useNavigate();


  return (
    <div className="containerHome mt-5 row">
      <Header/>
      <div className="leftsidebarHome col-2">
        <LeftSideBar page="Home" />
      </div>
      <div className="mainrightbarHome col-12">
        <RightSideBar />
        <HomeMainBar />
      </div>
    </div>
  );
}

export default Home;
