import axios from "axios";
import simpleAlertCall from "./alerts";
import { MainUrl } from "../utils/MainURL";
const axiosAPI = axios.create({
  baseURL: MainUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export function axiosPOSTCall(url, data, token, callback) {
  axiosAPI
    .post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err?.response?.data);
        if (
          err?.response?.data?.message !=
          "No Search Available, Please Purchase a plan!"
        ) {
          simpleAlertCall(err?.response?.data?.message, () => {});
        }
      } else {
        simpleAlertCall(
          "Network error please check your internet connection.",
          () => {}
        );
        callback(err);
      }
    });
}
export async function axiosGETCall(url, token, callback) {
  await axiosAPI
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(async (res) => {
      await callback(res.data);
    })
    .catch((err) => {
      if (err?.response?.data?.message) {
        simpleAlertCall(err?.response?.data?.message, () => {});
        callback();
        return;
      }
      simpleAlertCall("Network error please try again later.", () => {});
      callback(err);
    });
}

export function axiosPUTCall(url, data, token, callback) {
  axiosAPI
    .put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err?.response?.data);
        simpleAlertCall(err?.response?.data?.message, () => {});
      } else {
        simpleAlertCall(
          "Network error please check your internet connection.",
          () => {}
        );
        callback(err);
      }
    });
}

// Delete

export async function axiosDELETECall(url, token, callback) {
  await axiosAPI
    .delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(async (res) => {
      await callback(res.data);
    })
    .catch((err) => {
      if (err?.response?.data?.message) {
        simpleAlertCall(err?.response?.data?.message, () => {});
        callback();
        return;
      }

      simpleAlertCall("Network error please try again later.", () => {});
      callback(err);
    });
}
