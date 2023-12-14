import { GetTagsListAPI } from "../api";

export const GetTagsList = () => async (dispatch) => {
  try {
    let reponse = await GetTagsListAPI();
    dispatch({ type: "Tags", data:reponse });
  } catch (error) {
    console.log(error);
  }
};
