import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Link } from "react-router-dom";
import "./CSS/UserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../actions/usersAction";
import Avatar from "../components/Avatar";
import { useParams } from "react-router";
import moment from "moment";
import "./CSS/UserDetails.css";
import { UpdateProfile } from "../actions/usersAction";
import Cookies from "js-cookie";
import { currentUserActions } from "../actions/currentUserActions";

function UserDetails() {
  const dispatch = useDispatch();
  const [editProfile, seteditProfile] = useState({
    name: "",
    about: "",
    tags: "",
  });
  const { id } = useParams();
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);
  const userList = useSelector((state) => state.usersReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const currentProfile = userList.filter((user) => user._id === id);
  function HandUserDetailsData(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    seteditProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  function OnEdit() {
    seteditProfile({
      name: currentProfile[0].name,
      about: currentProfile[0].about,
      tags: currentProfile[0].tags.join(" "),
    });
  }

  async function HandleUdateProfileSubmit(event) {
    event.preventDefault();
    const reponse = await dispatch(UpdateProfile(editProfile));
    if (reponse === true) {
      const cookieValue = Cookies.get("Profile");
      const Profile = cookieValue ? JSON.parse(cookieValue) : null;
      Profile.name = editProfile.name;
      Profile.about = editProfile.about;
      Profile.tags = editProfile.tags.split(" ");
      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Cookies.set("Profile", JSON.stringify(Profile), {
        expires: expiryDate,
        sameSite: "None",
        secure: true,
      });
      dispatch(currentUserActions());
      window.location.reload();
    } else {
      alert("Server busy");
    }
  }
  if (!currentProfile) {
    return <div className="spinner-border mt-5  isLoading"></div>;
  }
  return (
    <div className="containerHome mt-5 row">
      <div className="leftsidebarHome col-2">
        <LeftSideBar page="Users" />
      </div>
      <div className="mainrightbarHome col-12">
        <div className="ms-2 mt-3">
          {currentUser?.id === id && (
            <button
              className="btn btn-primary mt-3  EditProfilebtn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#EditProfile"
              onClick={OnEdit}
            >
              Edit Profile
            </button>
          )}
          <div className="row ms-1 mb-5">
            {currentProfile.map((user, index) => (
              <div className="col-12 row p-3 me-2 mb-3 " key={index}>
                <div className="col-2 px-1 py-0">
                  <Link
                    to={`/user/details/${user?._id}`}
                    className="text-decoration-none AvatarUserDetails"
                  >
                    <Avatar
                      backgroundColor="#009dff"
                      px="14px"
                      py="50px"
                      borderRadius="0%"
                      color="white"
                      fontSize="30px"
                    >
                      {user.name[0]}
                    </Avatar>
                  </Link>
                </div>
                <div className="col-4 px-2 py-5">
                  <span>
                    <h4>{user.name}</h4>
                  </span>
                </div>
                <p className="mt-3 text-secondary">
                  {moment(user?.joinedOn).fromNow()}
                </p>
                {user.about === "" ? (
                  <div className="mt-1 text-secondary">No bio found</div>
                ) : (
                  <div className="mt-3">
                    <h6>About</h6>
                    <p>{user.about}</p>
                  </div>
                )}
                {user?.tags.length !== 0 ? (
                  <div className="mt-3 ">
                    <h4>Tags watched</h4>

                    <p className="ms-2">{user?.tags.join(" ")}</p>
                  </div>
                ) : (
                  <div className="mt-3 text-secondary">
                    <p>0 tags watched</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-end" id="EditProfile">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title">Edit Profile</h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form className="EditProfileForm" onSubmit={HandleUdateProfileSubmit}>
            <input
              value={editProfile.name}
              onChange={HandUserDetailsData}
              placeholder="Display Name"
              className="mt-3 ps-1"
              name="name"
            />
            <input
              value={editProfile.about}
              onChange={HandUserDetailsData}
              placeholder="About"
              className="mt-3 ps-1"
              name="about"
            />
            <input
              value={editProfile.tags}
              onChange={HandUserDetailsData}
              placeholder="Tags"
              className="mt-3 ps-1"
              name="tags"
            />
            <br />
            <button
              className="btn btn-primary mt-3"
              type="submit"
              data-bs-dismiss="offcanvas"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
