import React, { useState } from "react";
import "./CSS/AskQuestion.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AskQuestionAction } from "../actions/questionsActions";
function AskQuestion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newQuestion, setnewQuestion] = useState({
    questionTitle: "",
    questionBody: "",
    questionTags: "",
  });
  let currentUser = useSelector((state) => state.currentUserReducer);
  async function HandleAskQuestionSubmit(event) {
    event.preventDefault();
    if (currentUser?.status) {
      let response = await dispatch(AskQuestionAction(newQuestion));
      if (response.data === true) {
        alert("Question posted successfully");
        navigate("/");
      } else if (response.data === "Server Busy") {
        alert("Session Expired");
        navigate("/login");
      } else if (response.data === "Invalid") {
        alert("Permission Denied");
      }
    } else {
      alert("Login to ask a question");
      navigate("/login");
    }

    // setIsLoading(true);
  }
  function HandleData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setnewQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="AskQuestion pt-5 ps-5 ">
      <h3 className="pt-4">Ask a public Question</h3>
      <form onSubmit={HandleAskQuestionSubmit}>
        <div className="AskQuestionFormDiv bg-white mt-5 pt-3 ps-3 me-5 pb-4">
          <p className="mb-0">
            <b>Title</b>
          </p>
          <p className="small mb-0">
            Be specific and imagine you’re asking a question to another person
          </p>
          <input
            name="questionTitle"
            value={newQuestion.questionTitle}
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            onChange={HandleData}
            required
          />
          <br />
          <br />
          <p className="mb-0">
            <b>Body</b>
          </p>
          <p className="small mb-0">
            Include all the information someone would need to answer your
            question
          </p>
          <textarea
            name="questionBody"
            value={newQuestion.questionBody}
            rows={10}
            cols={148}
            onChange={HandleData}
            required
          />
          <br />
          <br />
          <p className="mb-0">
            <b>Tags</b>
          </p>
          <p className="small mb-0">
            Add up to 5 tags to describe what your question is about
          </p>
          <input
            name="questionTags"
            value={newQuestion.questionTags}
            placeholder="e.g. (xml typescript wordpress)"
            onChange={HandleData}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary my-5 ms-3">
          Post your question
        </button>
      </form>
    </div>
  );
}

export default AskQuestion;
