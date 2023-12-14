import { GetAllUsersApi, UpdateProfileAPI } from "../api";
import {currentUserActions} from "./currentUserActions"

export const GetAllUsers = () => async (dispatch) => {
    try {
      const  reponse  = await GetAllUsersApi();
      dispatch({ type: "GetUsers", data: reponse });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const UpdateProfile = (id, updateData) => async (dispatch) => {
    try {
      const reponse  = await UpdateProfileAPI(id, updateData);
      if(reponse === true){
        dispatch({ type: "UpdateCurrentuser",  data: updateData });
        console.log(true)
        return true;
      }
      else{
        return false
      } 
    } catch (error) {
      console.log(error);
    }
  };
  