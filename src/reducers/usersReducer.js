const usersReducer = (states = [], action) => {
  switch (action.type) {
    case "GetUsers":
      return action.data;
    case "UpdateCurrentuser":
      return states;
    default:
      return states;
  }
};

export default usersReducer;
