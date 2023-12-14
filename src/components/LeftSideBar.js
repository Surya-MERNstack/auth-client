import React, { useState } from "react";
import { Link } from "react-router-dom";
import Globe from "../images/Globe.svg";
import "./CSS/LeftSideBar.css";

function LeftSideBar(data) {
  const [buttonClick, setbuttonClick] = useState(data.page);

  return (
    <div className="leftsideNavBar ms-4">
      <nav className="navbar navbar-expand-sm bg-white">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="leftsideHomeNavBar">
            <ul className="navbar-nav flex-column mt-3">
              <li
                className={`${
                  buttonClick === "Home" ? "activeleftsideBarBtn" : ""
                } nav-item small py-1 mt-1`}
                onClick={() => setbuttonClick("Home")}
              >
                <Link to="/" className={` text-decoration-none text-dark px-2`}>
                  Home
                </Link>
              </li>
              <li className="nav-item small mt-2 ">
                <Link className="nav-link text-secondary">Public</Link>
              </li>
              <li
                className={`${
                  buttonClick === "Questions" ? "activeleftsideBarBtn" : ""
                } nav-item small ms-3 mt-2 `}
                onClick={() => setbuttonClick("Questions")}
              >
                <Link className="nav-link" to="/questions">
                  <img
                    src={Globe}
                    alt="Globe"
                    className="mb-1 text-secondary"
                  />
                  <span className="text-secondary">Questions</span>
                </Link>
              </li>
              <li
                className={`${
                  buttonClick === "Tags" ? "activeleftsideBarBtn" : ""
                } nav-item small ms-3 mt-2`}
                onClick={() => setbuttonClick("Tags")}
              >
                <Link to="/tags" className={`nav-link text-secondary`}>
                  Tags
                </Link>
              </li>
              <li
                className={`${
                  buttonClick === "Users" ? "activeleftsideBarBtn" : ""
                } nav-item small ms-3 mt-2`}
                onClick={() => setbuttonClick("Users")}
              >
                <Link to="/users" className="nav-link text-secondary">
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LeftSideBar;
