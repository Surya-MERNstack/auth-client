import axios from "axios";
import Cookies from "js-cookie";
const API = axios.create({ baseURL: "https://stack-overflow-clone-j3nr.onrender.com/" });
const cookieValue = Cookies.get("Profile");
const authToken = cookieValue ? JSON.parse(cookieValue) : null;

export const LoginAPI = async (loginData) => {
  try {
    const response = await API.post("login", loginData);
    return response.data;
  } catch (error) {
    console.error(error);
    return "Server Busy";
  }
};

export const SignUPAPI = async (loginData) => {
  try {
    const response = await API.post("/signin/verify", loginData);
    return response.data;
  } catch (error) {
    console.error(error);
    return "Server Busy";
  }
};

export const AskQuestionAPI = async (questionData) => {
  try {
    const response = await API.post("/questions/ask", questionData, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
    return response;
  } catch (error) {
    return "Server Busy";
  }
};

export const GetQuestionListAPI = async () => {
  try {
    const response = await API.get("/questions");
    return response.data;
  } catch (error) {
    return "Server Busy";
  }
};

export const PostAnswerAPI = async (answer) => {
  try {
    const response = await API.post("/answer/new/" + answer.id, answer, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
    return response;
  } catch (error) {
    return "Server Busy";
  }
};

export const deleteQuestionAPI = async (id) => {
  try {
    const response = await API.delete("/questions/delete/" + id, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
    return response;
  } catch (error) {
    return "Server Busy";
  }
};

export const deleteAnswerAPI = async (id, answerId, noOfAnswers) => {
  const payLoad = {
    answerId,
    noOfAnswers,
  };
  try {
    const response = await API.post("/answer/delete/" + id, payLoad, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
    return response;
  } catch (error) {
    return "Server Busy";
  }
};

export const GetTagsListAPI = async () => {
  try {
    const response = await API.get("/tags");
    return response.data;
  } catch (error) {
    return "Server Busy";
  }
};

export const GetAllUsersApi = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    return "Server Busy";
  }
};

export const ForgetPasswordApi = async (email) => {
  try {
    const response = await API.post("/forgetpassword", { email });
    if (response.data === true) {
      const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      Cookies.set("forget_password", JSON.stringify(email), {
        expires: expiryDate,
      });
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return "Server Busy";
  }
};

export const NewPasswordApi = async (otp, newPassword, confirmPassword) => {
  try {
    const cookieValue = Cookies.get("forget_password");
    const email = cookieValue ? JSON.parse(cookieValue) : null;
    if (email === null) {
      return "login";
    } else {
      const payLoad = {
        email,
        otp,
        newPassword,
        confirmPassword,
      };
      const response = await API.post("/forgetpassword/new", payLoad);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return "Server Busy";
  }
};

export const UpdateProfileAPI = async (profileData) => {
  try {
    const response = await API.post("/users/update/",profileData, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return "Server Busy";
  }
};


export const voteQuestionAPI = async (id,voteValue) => {
  try {
    const response = await API.post("/questions/vote/"+id,{voteValue}, {
      headers: {
        Authorization: `Bearer ${authToken.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return "Server Busy";
  }
};