/** @format */

import {
  LOGIN_DETAILS,
  TOTAL_SEARCH,
  LOG_OUT,
  PENDING_SEARCH,
} from "./actionType";
import { EmptyStorage } from "../utils/AsyncStorage";

const initialState = {
  loginDetails: {},
  total_search: 0,
  pendingSearch: {},
};
export const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_DETAILS:
      return { ...state, loginDetails: payload };
    case TOTAL_SEARCH:
      return { ...state, loginDetails: payload };
    case PENDING_SEARCH:
      return { ...state, pendingSearch: payload };
    case LOG_OUT:
      EmptyStorage();
      return { ...state, loginDetails: {}, userProfile: {} };
    default:
      return state;
  }
};
