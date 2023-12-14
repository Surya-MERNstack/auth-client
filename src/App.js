import React, { useEffect } from "react";
import { GetAllQuestions } from "./actions/questionsActions";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Routing from "./Routing";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllQuestions());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
