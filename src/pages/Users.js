import React, { useEffect } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Link } from "react-router-dom";
import "./CSS/Users.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../actions/usersAction";
import Avatar from "../components/Avatar";

function Users() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
  const userList = useSelector((state) => state.usersReducer);
  if (!userList) {
    return <div className="spinner-border mt-5  isLoading"></div>;
  }
  return (
    <div className="containerHome mt-5 row">
      <div className="leftsidebarHome col-2">
        <LeftSideBar page="Users" />
      </div>
      <div className="mainrightbarHome col-12">
        <div className="ms-3 mt-5">
          <h3>Users</h3>
          <div className="row ms-1 mb-5">
            {userList.map((user, index) => (
              <div
                className="col-12 col-sm-3 col-md-6 row p-3 me-2 mb-3"
                key={index}
              >
                <div className="col-3">
                  <Link
                    to={`/user/${user?._id}`}
                    className="text-decoration-none"
                  >
                    <Avatar
                      backgroundColor="#009dff"
                      px="14px"
                      py="7px"
                      borderRadius="5%"
                      color="white"
                    >
                      {user.name[0]}
                    </Avatar>
                  </Link>
                </div>
                <div className="col-8 px-0 mt-2">
                  <Link
                    to={`/user/details/${user?._id}`}
                    className="text-decoration-none"
                  >
                    <span>{user.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
