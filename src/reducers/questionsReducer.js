const questionsReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "PostAnswer":
      return { ...state };
    case "GetAllQuestions":
      return { ...state, data: action.data };
    case "PostQuestion":
      return { ...state };
    default:
      return state;
  }
};
export default questionsReducer;
