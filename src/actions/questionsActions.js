import { GetQuestionListAPI, AskQuestionAPI, PostAnswerAPI, deleteQuestionAPI, deleteAnswerAPI, voteQuestionAPI } from "../api";

export const GetAllQuestions = () => async (dispatch) => {
  try {
    const data = await GetQuestionListAPI();
    dispatch({ type: "GetAllQuestions", data: data });
  } catch (error) {
    console.log(error);
  }
};

export const AskQuestionAction = (questionData) => async (dispatch) => {
  try {
    const reponse = await AskQuestionAPI(questionData);
    dispatch({ type: "PostQuestion", data: reponse });
    dispatch(GetAllQuestions());
    return reponse;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id,answerId) => async (dispatch) => {
  try {
    const reponse = await deleteQuestionAPI(id,answerId);
    dispatch(GetAllQuestions());
    return reponse;
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value) => async (dispatch) => {
  try {
    let reponse = await voteQuestionAPI(id, value);
    dispatch(GetAllQuestions());
    return reponse;
  } catch (error) {
    console.log(error);
    return "Sever Busy";
  }
};

export const PostAnswer = (answer) => async (dispatch) => {
  try {
    const  data  = await PostAnswerAPI(answer);
    dispatch({ type: "PostAnswer", data: data });
    dispatch(GetAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
  try {
    let reponse =await deleteAnswerAPI(id, answerId, noOfAnswers);
    dispatch(GetAllQuestions());
    return reponse;
  } catch (error) {
    console.log(error);
  }
};