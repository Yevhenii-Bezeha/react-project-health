import axios from "axios";
import {
  registerAuthRequest,
  registerAuthSuccess,
  registerAuthError,
  loginAuthRequest,
  loginAuthSuccess,
  loginAuthError,
  logoutAuthRequest,
  logoutAuthSuccess,
  logoutAuthError,
  refreshAuthRequest,
  refreshAuthSuccess,
  refreshAuthError,
} from "./authActions";
import { apiBaseURL, endpoint } from "../../db.json";
import { userDataSuccess } from "../user/userActions";
import { getUserData } from "../user/userOperations";

axios.defaults.baseURL = apiBaseURL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const authLogin = (requestData) => async (dispatch) => {
  try {
    dispatch(loginAuthRequest());
    const { email, password } = requestData;
    const { data } = await axios.post(endpoint.login, {
      email,
      password,
    });
    token.set(data.accessToken);
    const { accessToken, refreshToken, sid, user } = data;
    const { email: userEmail, username, id, userData } = user;
    const {
      notAllowedProducts: needToPrepare,
      weigth,
      height,
      age,
      bloodType,
      desiredWeight,
      dailyRate,
    } = userData;
    const authData = {
      accessToken,
      refreshToken,
      sid,
      username,
      userEmail,
      id,
    };
    const notAllowedProducts = needToPrepare.slice(0, 10);
    const preparedUserData = {
      notAllowedProducts,
      userStat: { weigth, height, age, bloodType, desiredWeight, dailyRate },
    };
    dispatch(loginAuthSuccess(authData));
    dispatch(userDataSuccess(preparedUserData));
  } catch (error) {
    dispatch(loginAuthError(error.response.data.message));
  }
};

export const authRegistration = (requestData) => async (dispatch) => {
  try {
    dispatch(registerAuthRequest());
    await axios.post(endpoint.register, requestData);
    dispatch(registerAuthSuccess());
    dispatch(authLogin(requestData));
  } catch (error) {
    dispatch(registerAuthError(error.response.data.message));
  }
};

export const authLogout = () => async (dispatch) => {
  try {
    dispatch(logoutAuthRequest());
    await axios.post(endpoint.logout);
    token.unset();
    dispatch(logoutAuthSuccess());
  } catch (error) {
    dispatch(logoutAuthError(error.response.data.message));
  }
};

export const authRefresh = (refreshToken, sid) => async (dispatch) => {
  token.set(refreshToken);
  const sidForRefresh = { sid };
  try {
    dispatch(refreshAuthRequest());
    const { data } = await axios.post(endpoint.refresh, sidForRefresh);
    const {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      sid,
    } = data;
    token.set(accessToken);
    dispatch(
      refreshAuthSuccess({
        accessToken,
        refreshToken,
        sid,
      })
    );
    dispatch(getUserData());
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(logoutAuthSuccess());
      return;
    }
    dispatch(refreshAuthError(error.response.data.message));
  }
};
