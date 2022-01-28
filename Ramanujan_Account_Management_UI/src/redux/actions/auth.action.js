import { Toastify } from "../../App";
import axios from "../../helpers/axios";
import { authConstant } from "../constants";


export const login = (user,history) => {
  
  
    return async (dispatch) => {
      try {
        dispatch({ type: authConstant.LOGIN_REQUEST });
        let res = await axios().post("/admin/signin", { ...user });
  
        if (res.status == 200) {
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          history.push("/")
          Toastify("success", "Login successfully");
          dispatch({
            type: authConstant.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
          
        } else {
          if (res.status == 401) {
            Toastify("error", "Unable to Login");
            dispatch({
              type: authConstant.LOGIN_FAIL,
              payload: {
                error: res.data.error,
              },
            });
          }
        }
      } catch (error) {
        console.log(error.response.data.message,"error")
        Toastify("error", error.response.data.message);
        dispatch({
          type: authConstant.LOGIN_FAIL,
          payload: { error: error.message },
        });
      }
    };
  };
  

  export const signout = (token,history) => {
    return async (dispatch) => {
      try {
    
        dispatch({ type: authConstant.LOGOUT_REQUEST });
        let res = await axios(token).post("/admin/logoutAll");
        if (res.status == 200) {
          localStorage.clear();
          Toastify("success", "Logout Sucessfully");
          dispatch({ type: authConstant.LOGOUT_SUCCESS });
        } else {
          localStorage.clear();
          Toastify("error", "Token may be expired");
          dispatch({
            type: authConstant.LOGOUT_FAIL,
          });
        }
      } catch (error) {
        localStorage.clear();
        Toastify("error", error.response.message);
        dispatch({
          type: authConstant.LOGOUT_FAIL
        });
      }
    };
  };


  export const isUserLoggedIn = () => {
    return async (dispatch) => {
      try{
        const token = localStorage.getItem("token");
        if (token) {
          const user = JSON.parse(localStorage.getItem("user"));
          dispatch({
            type: authConstant.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        } else {
          localStorage.clear();
          dispatch({
            type: authConstant.LOGIN_FAIL,
            payload: { error: "Failed to login" },
          });
        }
    } 
    catch (error){
      
      localStorage.clear();
      // Toastify("error", "token expire");
      dispatch({ type: authConstant.LOGOUT_SUCCESS });
    }
    };
  };