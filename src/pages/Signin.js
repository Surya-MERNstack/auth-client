import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logosignin from "../images/icon.png";
import "./CSS/Signin.css";
import { SignUPAPI } from "../api";

function Signin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setsignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function HandleSignUpData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setsignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  async function HandleSignUpSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    HandleSignUpResponse(await SignUPAPI(signupData));
  }
  function HandleSignUpResponse(response) {
    if (response === true) {
      alert("Registration link sent to your mail id");
      navigate("/login");
    } else if (response === false) {
      setisVisible({
        status: "visually-true",
        message: "Already registered",
      });
    } else {
      setisVisible({
        status: "visually-true",
        message: "Server Busy",
      });
    }
    setIsLoading(false);
  }
  const [isVisible, setisVisible] = useState({
    status: "visually-hidden",
    message: "null",
  });

  return (
    <div className=" row mt-5 signinDiv">
      <div className="col-6 paraSignin">
        <h5>Join the Stack Overflow community</h5>
        <p>
          <svg width="26" height="26">
            <path
              opacity=".5"
              d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
            ></path>
            <path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path>
          </svg>{" "}
          Get unstuck — ask a question
        </p>
        <p>
          <svg width="26" height="26">
            <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path>
            <path
              opacity=".5"
              d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
            ></path>
          </svg>{" "}
          Unlock new privileges like voting and commenting
        </p>
        <p>
          <svg width="26" height="26">
            <path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path>
            <path
              opacity=".5"
              d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
            ></path>
          </svg>{" "}
          Save your favorite tags, filters, and jobs
        </p>
        <p>
          <svg width="26" height="26">
            <path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path>
          </svg>{" "}
          Earn reputation and badges
        </p>
        <p className="text-secondary small mb-0">
          Collaborate and share knowledge with a private group for
        </p>
        <p className="text-primary small">
          Get Stack Overflow for Teams free for up to 50 users.
        </p>
      </div>
      <div className="col-6 mainsigninDiv">
        <div className="SigninBoxDiv ms-2">
          <img className="signinLogo mb-3" src={logosignin} alt="Logo" />
          <form className="bg-white signinForm" onSubmit={HandleSignUpSubmit}>
            <div className=" ms-4">
              <label className="mt-4 labelFont">Display Name</label>
              <br />
              <input
                className=" mt-1 logsignwidth"
                type="text"
                onChange={HandleSignUpData}
                name="name"
                id="name"
                value={signupData.name}
                required
              />
              <br />
              <label className="mt-4 labelFont">Email</label>
              <br />
              <input
                className=" mt-1 logsignwidth"
                type="email"
                onChange={HandleSignUpData}
                name="email"
                id="emailid"
                value={signupData.email}
                required
              />
              <br />
              <label className="labelFont mt-3">Password</label>
              <br />
              <input
                className=" mt-1 logsignwidth"
                type="password"
                onChange={HandleSignUpData}
                name="password"
                value={signupData.password}
                required
              />
              <label
                htmlFor="emailIdLogin"
                className={
                  isVisible.status === "visually-hidden"
                    ? "visually-hidden"
                    : isVisible.status
                }
              >
                {isVisible.message}
              </label>
              <p className="small">
                Passwords must contain at least eight characters, including at
                least 1 letter and 1 number.
              </p>
              <button
                className="btn btn-primary mt-3 mb-5 pt-1 pb-2 logsignwidth"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="loginLink">
            Already have an account?
            <Link className="text-decoration-none" to={`/login`}>
              {" "}
              Log in
            </Link>
          </p>
        </div>
      </div>
      {isLoading && (
        <div className="isLoadingLogin">
          <div className="spinner-border text-primary "></div>
        </div>
      )}
    </div>
  );
}

export default Signin;
