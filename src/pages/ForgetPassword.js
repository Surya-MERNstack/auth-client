import React, { useState } from "react";
import "./CSS/ForgetPassword.css";
import lock from "../images/lock.PNG";
import { ForgetPasswordApi } from "../api";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [isVisible, setisVisible] = useState({
    status: "false",
    message: "Email id is not register",
  });
  async function HandleSubmit(event) {
    event.preventDefault();
    const response = await ForgetPasswordApi(email);
    if (response === true) {
      navigate("/password/new");
    } else {
      setisVisible((prevState) => ({
        ...prevState,
        status: true,
      }));
    }
  }

  function HandleOnChange(event) {
    const value = event.target.value;
    SetEmail(value);
  }
  return (
    <div className="container-fluid mt-5 pt-2">
      <div className="container forgetpasswordDiv mt-5">
        <img alt="Logo" className="lock  mt-2" src={lock} />
        <p>
          <b>Trouble with logging in?</b>
        </p>
        <p className="text-secondary">
          Enter your email address, phone number or <br /> username, and we'll
          send you a link to get back <br /> into your account.
        </p>
        <form action="" onSubmit={HandleSubmit}>
          <input
            type="email"
            name=""
            placeholder="Email"
            id="forgetemail"
            value={email}
            onChange={HandleOnChange}
            className="forgetemail py-1 px-2"
            required
          />
          <label
            htmlFor="forgetemail"
            className={
              isVisible.status === true ? "visually-true" : "visually-hidden"
            }
          >
            {isVisible.message}
          </label>
          <br />
          <br />
          <button type="submit" className="forgetemailbtn">
            Send OTP
          </button>
        </form>
        <br />
        <div>
          <h6 className="text-secondary">OR</h6>
          <button
            className="mb-5 CreateNewAccountbtn"
            onClick={() => navigate("/")}
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
