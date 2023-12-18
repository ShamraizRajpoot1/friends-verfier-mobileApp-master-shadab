/** @format */

import { View, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import React, { useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../../utils/alerts";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Device from "../../../src/constants/device";
import { logOut } from "../../redux/action"; // Action function

const WIDTH = Dimensions.get("window").width;

export default function SearchAddressScreen({ navigation }) {
  const userData = useSelector((state) => state?.loginDetails);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const logoutFun = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    dispatch(logOut({}));
  };
  useEffect(() => {
    if (isFocused) {
      if (userData?.hasOwnProperty("Authorization")) {
        Alert.alert("Alert", "Do want to log out?", [
          {
            text: "No",
            onPress: () => navigation.navigate("HomeScreen"),
          },
          { text: "Yes", onPress: () => logoutFun() },
        ]);
      }
    }  
    
  }, [isFocused, userData]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
