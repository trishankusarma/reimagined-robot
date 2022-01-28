import { authConstant } from "../constants";

const initialState = {
  token: null,
  user: {
    name: "",
    email: "",
    profileImage: "",
  },
  authenticated: false,
  authenticating: false,
  loading: false,
  forgotReq: false,
  resetPassword: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticated: true,
        authenticating: false,
      };
      break;
    case "UPDATE_USER":
      console.log(action.payload.user, "user:action.payload.user");
      state = {
        ...state,
        user: action.payload.user,
      };
      break;
    case authConstant.LOGIN_FAIL:
      state = {
        ...state,
        authenticated: false,
        authenticating: false,
      };
      break;

    case authConstant.LOGOUT_SUCCESS:
      state = {
        ...initialState,
      };
      break;
    case authConstant.LOGOUT_FAIL:
      state = {
        ...state,
        loading: false,
      };
      break;

    case authConstant.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case authConstant.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstant.REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };

      break;
    case authConstant.REGISTER_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case authConstant.FORGOT_PASSWORD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstant.FORGOT_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgotReq: true,
        loading: false,
      };
      break;
    case authConstant.FORGOT_PASSWORD_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    case authConstant.RESET_PASSWORD_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstant.RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        resetPassword: true,
      };
      break;
    case authConstant.RESET_PASSWORD_FAIL:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    //   update profile

    case "uploading":
      state = {
        ...state,
        loading: true,
      };
      break;
    case "uploading_success":
      state = {
        ...state,
        loading: false,
        user: action.payload.user,
      };
      break;
    case "uploading_fail":
      state = {
        ...state,
        loading: false,
      };
      break;
      case "setDepartment":
        state = {
          ...state,
          user: action?.payload,
        };
        break;
  }

  return state;
};
