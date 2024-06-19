// import axios from "axios";
// import {
//   USER_LOGIN_REQUEST,
//   USER_LOGIN_SUCCESS,
//   USER_LOGIN_FAIL,
//   USER_LOGOUT,
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_FAIL,
// } from "../constants/userConstants";

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOGIN_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "/api/auth/login",
//       { email, password },
//       config
//     );

//     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const register = (name, email, password) => async (dispatch) => {
//   try {
//     dispatch({ type: USER_REGISTER_REQUEST });

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const { data } = await axios.post(
//       "/api/auth/register",
//       { name, email, password },
//       config
//     );

//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

//     localStorage.setItem("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const logout = () => (dispatch) => {
//   localStorage.removeItem("userInfo");
//   dispatch({ type: USER_LOGOUT });
// };

import { login, register } from "./../utils/api";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await login(formData);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    console.log("User Data:", data); // Ensure this contains the token
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await register(formData);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
