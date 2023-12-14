import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import "./CSS/QuestionDetails.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import upvote from "../images/sort-up.svg";
import downvote from "../images/sort-down.svg";
import moment from "moment";
import Avatar from "../components/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  PostAnswer,
  deleteQuestion,
  deleteAnswer,
  voteQuestion,
} from "../actions/questionsActions";

function QuestionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionsList1 = useSelector((state) => state.questionsReducer.data);
  const questionsList = questionsList1.filter((question) => question._id === id)
  let currentUser = useSelector((state) => state.currentUserReducer);
  const [Answer, setAnswer] = useState("");
  async function handlePostAnswer(e, answerLength) {
    e.preventDefault();
    if (currentUser?.status) {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        const reponse = await dispatch(
          PostAnswer({
            id: id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
          })
        );
        setAnswer("");
      }
    } else {
      alert("Login or signup to answer a question");
      navigate("/login");
    }
  }
  const handleDeleteQuestion = async () => {
    if (currentUser?.status) {
      const reponse = await dispatch(deleteQuestion(id));
      if (reponse.data === true) {
        alert("Question deleted successfully");
        navigate("/");
      } else if (reponse.data === "Invalid") {
        alert(" Question not found");
        navigate("/");
      } else if (reponse.data === "Server Busy") {
        alert("Session Expired");
        navigate("/login");
      }
    } else {
    }
  };

  const handleAnswerDelete = async (answerId, noOfAnswers) => {
    const reponse = await dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    if (reponse === true) {
      alert("Question deleted successfully");
      navigate("/");
    } else if (reponse === "Invalid") {
      alert(" Question not found");
      navigate("/");
    } else if (reponse === "Server Busy") {
      alert("Session Expired");
      navigate("/login");
    }
  };

  const handleUpVote = async () => {
    if (currentUser?.status) {
      let reponse = await dispatch(voteQuestion(id, "upVote"));
      if (reponse === true) {
        //window.location.reload() 
      } else if (reponse === "Invalid") {
        alert("Invalid request");
      } else if (reponse === "Server Busy") {
        alert("Server Busy! try again");
      }
    } else {
      alert("Login or Signup to up vote a question");
      navigate("/Login");
    }
  };

  const handleDownVote = async () => {
    if (currentUser?.status) {
      let reponse = await dispatch(voteQuestion(id, "downVote"));
      if (reponse === true) {
        //window.location.reload()
      } else if (reponse === "Invalid") {
        alert("Invalid request");
      } else if (reponse === "Server Busy") {
        alert("Server Busy! try again");
      }
    } else {
      alert("Login or Signup to down vote a question");
      navigate("/Login");
    }
  };
  if (!questionsList || questionsList.length === 0) {
    return <div className="spinner-border  isLoading"></div>;
  }
  return (
    <div className="containerHome mt-5 row">
      <div className="leftsidebarHome col-2">
        <LeftSideBar page="Questions" />
      </div>
      <div className="mainrightbarHome  col-8">
        <RightSideBar />
        <div className="DisplayQuestionMainDiv mt-4 ms-3">
          <div className="DisplayQuestionDiv">
            {questionsList
              .filter((question) => question._id === id)
              .map((question) => (
                <div key={question._id}>
                  <h3>{question.questionTitle}</h3>
                  <div className="row mt-3">
                    <div className="question-votes col-1">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p className="mb-0 ms-1">
                        {question.upVote.length - question.downVote.length}
                      </p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div className="col-10">
                      <p>{question.questionBody}</p>
                      <div className="displaytagsDiv mt-1">
                        <div className="displaytags ">
                          {question.questionTags.map((tag, index) => (
                            <p
                              className="displaytagsQuetions me-1 px-2"
                              key={index}
                            >
                              {tag}
                            </p>
                          ))}
                        </div>
                      </div>
                      {currentUser?.email === question?.userEmail && (
                        <button
                          type="button"
                          className="btn btn-link p-0 text-decoration-none text-secondary"
                          onClick={handleDeleteQuestion}
                        >
                          delete
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="askedOnmoment me-0 row">
                    <p className="col-12 pe-0">
                      asked {moment(question.askedOn).fromNow()}
                    </p>
                    <div className="col-3">
                      <Avatar
                        backgroundColor="orange"
                        px="6px"
                        py="3px"
                        borderRadius="4px"
                      >
                        {question.userPosted.charAt(0).toUpperCase()}
                      </Avatar>
                    </div>
                    <div className="col-6 px-0 userPosted mb-3">
                      {question.userPosted}
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="DisplayQuestionAnwserDiv">
            {questionsList.noOfAnswers !== 0 && (
              <div>
                <h3>{questionsList[0].noOfAnswers} Answers</h3>
                {questionsList[0].answer.map((answers) => (
                  <div key={answers._id}>
                    <p className="mt-4">{answers.answerBody}</p>
                    {currentUser?.email === answers?.userEmail && (
                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none text-secondary"
                        onClick={() =>
                          handleAnswerDelete(
                            answers._id,
                            questionsList[0].noOfAnswers
                          )
                        }
                      >
                        delete
                      </button>
                    )}
                    <div className="askedOnmoment me-0 row">
                      <p className="col-12 pe-0">
                        asked {moment(answers.answeredOn).fromNow()}
                      </p>
                      <div className="col-3">
                        <Avatar
                          backgroundColor="orange"
                          px="6px"
                          py="3px"
                          borderRadius="4px"
                        >
                          {answers.userAnswered.charAt(0).toUpperCase()}
                        </Avatar>
                      </div>
                      <div className="col-6 px-0 userPosted mb-3">
                        {answers.userAnswered}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="YourAnswer mt-3">
            <h4>Your Answer</h4>
            <form
              onSubmit={(e) =>
                handlePostAnswer(e, questionsList[0].answer.length)
              }
            >
              <textarea
                className="mt-2 mb-2"
                rows={10}
                cols={90}
                value={Answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mb-2">
                Post Your Answer
              </button>
            </form>
            <br />
            <Link to="/question/ask" className="text-decoration-none ">
              {" "}
              ask your own question.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetails;
