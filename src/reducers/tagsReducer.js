const tagsReducer = (state = null, action) => {
  switch (action.type) {
    case "Tags":
      return { ...state, data: action?.data };
    default:
      return null;
  }
};

export default tagsReducer;
