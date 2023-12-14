import React, { useState, useEffect } from "react";
import logo from "../images/icon.png";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../actions/loginActions";
import { currentUserActions } from "../actions/currentUserActions";
function Login() {
  const loginResponse = useSelector((state) => state.loginReducer?.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  function HandleLoginData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setloginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function HandleLoginSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    dispatch(loginAction(loginData));
  }
  useEffect(() => {
    if (loginResponse) {
      HandleLoginResponse(loginResponse);
    }
  }, [loginResponse]);

  async function HandleLoginResponse(response) {
    if (response === "Inavlid User name or Password") {
      setisVisible({
        status: "visually-true",
        message: response,
      });
    } else if (response === "Server Busy") {
      setisVisible({
        status: "visually-true",
        message: response,
      });
    } else if (response?.status) {
      dispatch(currentUserActions());
      navigate("/");
      window.location.reload();
    }
    setIsLoading(false);
  }
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setisVisible] = useState({
    status: "visually-hidden",
    message: "null",
  });

  return (
    <div className="mainLoginDiv">
      <div className="container mt-5">
        <img className="loginLogo" src={logo} alt="Logo" />
        <div className="loginBoxDiv">
          <form className="bg-white loginForm" onSubmit={HandleLoginSubmit}>
            <div className=" ms-4">
              <label className="mt-4 labelFont">Email</label>
              <br />
              <input
                className=" mt-1 logsignwidth"
                type="email"
                onChange={HandleLoginData}
                name="email"
                id="emailid"
                value={loginData.email}
                required
              />
              <br />
              <label className="labelFont mt-3">Password</label>
              <Link
                to="/password/forget"
                className="forgrtpasswordlink text-decoration-none"
              >
                Forget password?
              </Link>
              <br />
              <input
                className=" mt-1 logsignwidth"
                type="password"
                onChange={HandleLoginData}
                name="password"
                value={loginData.password}
                required
              />
              <p
                className={
                  isVisible.status === "visually-hidden"
                    ? "visually-hidden"
                    : isVisible.status
                }
              >
                {isVisible.message}
              </p>
              <button
                className="btn btn-primary mt-3 mb-5 pt-1 pb-2 logsignwidth"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="signupLink">
            Don’t have an account?
            <Link className="text-decoration-none" to={`/signin`}>
              {" "}
              Sign up
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

export default Login;
