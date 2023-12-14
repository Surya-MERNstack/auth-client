import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginReducer";
import currentUserReducer from "../reducers/currentUserReducer";
import questionsReducer from "../reducers/questionsReducer";
import tagsReducer from "../reducers/tagsReducer";
import usersReducer from "../reducers/usersReducer";


const rootReducer = combineReducers({
  loginReducer: loginReducer,
  currentUserReducer: currentUserReducer,
  questionsReducer: questionsReducer,
  tagsReducer:tagsReducer,
  usersReducer:usersReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  currentUserReducer,
  middleware: [thunk],
});
