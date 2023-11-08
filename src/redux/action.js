/** @format */

import {
  LOGIN_DETAILS,
  TOTAL_SEARCH,
  LOG_OUT,
  PENDING_SEARCH,
} from "./actionType";

export const loginDetails = ({ payload }) => ({
  type: LOGIN_DETAILS,
  payload: payload,
});

export const totalSearch = ({ payload }) => ({
  type: TOTAL_SEARCH,
  payload: payload,
});

export const pendingSearch = ({ payload }) => ({
  type: PENDING_SEARCH,
  payload: payload,
});

export const logOut = ({ payload }) => ({
  type: LOG_OUT,
  payload: payload,
});
