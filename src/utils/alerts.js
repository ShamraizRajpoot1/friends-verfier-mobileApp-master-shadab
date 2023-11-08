import React from "react";
import { Alert } from "react-native";

const simpleAlertCall = (message, okFunction) => {
  Alert.alert("Alert", message, [{ text: "OK", onPress: () => okFunction() }]);
};

export default simpleAlertCall;
