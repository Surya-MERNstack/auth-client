const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case "CurrentUser":
      return action.data;
    default:
      return state;
  }
};

export default currentUserReducer;
