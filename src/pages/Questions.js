import React from "react";
import "./CSS/Questions.css";
import LeftSideBar from "../components/LeftSideBar";
import HomeMainBar from "../components/HomeMainBar";
import RightSideBar from "../components/RightSideBar";

function Questions() {
  return (
    <div className="containerHome mt-5 row">
      <div className="leftsidebarHome col-2">
        <LeftSideBar page="Questions" />
      </div>
      <div className="mainrightbarHome col-8">
        <RightSideBar />
        <HomeMainBar />
      </div>
    </div>
  );
}

export default Questions;
