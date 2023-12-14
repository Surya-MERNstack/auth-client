import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./CSS/HomeMainBar.css";
import QuestionList from "../components/QuestionList";
import { useSelector } from "react-redux";

function HomeMainBar() {
  const questionsList = useSelector((state) => state.questionsReducer.data);
  const location = useLocation();
  if (!questionsList) {
    return <div className="spinner-border  isLoading"></div>;
  }
  return (
    <div className="HomeMainBarDiv mt-4 ms-2">
      <div className="row ms-2">
        <h1 className="col-10">
          {location.pathname === "/" ? "Top Questions" : "All Questions"}
        </h1>
        <Link to="/question/ask" className="btn btn-primary mt-3 mb-1 col-2">
          Ask Questions
        </Link>
      </div>
      <div className="mt-4">
        <div>
          <p className="ms-3">{questionsList.length} questions</p>
          <QuestionList questionsList={questionsList} />
        </div>
      </div>
    </div>
  );
}

export default HomeMainBar;
