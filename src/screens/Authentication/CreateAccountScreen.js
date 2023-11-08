/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosPOSTCall } from "../../utils/axios.js"; // POST function for axios
import simpleAlertCall from "../../utils/alerts"; // Alert function for Mobile applications

const WIDTH = Dimensions.get("window").width;
const HIEGHT = Dimensions.get("window").height;

export default function CreateAccountScreen({ navigation }) {
  const [fname, onChangefName] = React.useState("");
  const [lname, onChangelName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [cnfEmail, setCnfEmail] = useState("");
  const [password, onChangePassword] = React.useState("");
  const [confirmpassword, onChangeconfirmPassword] = React.useState("");
  const [ReferralId, setReferralId] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const mailCheck = /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

  const signUpFun = () => {
    if (!fname) {
      simpleAlertCall("Please enter your first name.", () => {});
    } else if (!lname) {
      simpleAlertCall("Please enter your last name.", () => {});
    } else if (!email) {
      simpleAlertCall("Please enter your email.", () => {});
    } else if (!password) {
      simpleAlertCall("Please enter your password.", () => {});
    } else if (!confirmpassword) {
      simpleAlertCall("Please enter confirm password.", () => {});
    } else if (password != confirmpassword) {
      simpleAlertCall(
        "The password and password confirmation do not match, please reenter.",
        () => {}
      );
    } else {
      if (email) {
        if (!mailCheck.test(email)) {
          simpleAlertCall("Please enter valid email", () => {});
          return;
        }
      }
      if (!cnfEmail) {
        simpleAlertCall("Please enter confirm email", () => {});
        return;
      }
      if (email != cnfEmail) {
        simpleAlertCall(
          "The email address entered does not match. Please re-enter the email address and try again.",
          () => {}
        );
        return;
      }

      var url = "/user/register";
      var obj = {
        email: email,
        password: password,
        fullName: fname + " " + lname,
        firstName: fname,
        lastName: lname,
        mode: "email",
        referallId: ReferralId,
      };
      setLoading(true);
      axiosPOSTCall(url, obj, "", (callBack) => {
        setLoading(false);
        if (callBack.status == 200) {
          if (callBack?.data?.hasOwnProperty("step")) {
            navigation.replace("SmsVerificationScreen", {
              data: callBack?.data?.userId,
              obj: obj,
            });
          } else {
            navigation.replace("SmsOtpVerificationScreen", {
              data: callBack,
              obj: obj,
              screen: "email",
            });
          }
        }
      });
    }
  };

  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={40}
        behavior={Platform.OS === "ios" ? "padding" : null}
        enabled
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0, backgroundColor: "#fff" }}
          bounces={false}
        >
          <View style={styles.ScreenHeaderContainer}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require("../../assets/icons/logo.png")}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.textinputCOntainer}>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/email.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangefName}
                value={fname}
                placeholder="First Name"
              />
            </View>

            <View style={styles.textinputCOntainer}>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/email.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangelName}
                value={lname}
                placeholder="Last Name"
              />
            </View>

            <View style={styles.textinputCOntainer}>
              <Image
                style={{ width: RFValue(14), height: RFValue(14) }}
                source={require("../../assets/icons/emailicon.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email Address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.textinputCOntainer}>
              <Image
                style={{ width: RFValue(14), height: RFValue(14) }}
                source={require("../../assets/icons/emailicon.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={setCnfEmail}
                value={cnfEmail}
                placeholder="Confirm Email Address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.textinputCOntainer}>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/password.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={secure}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Image
                  style={styles.icon}
                  source={
                    secure
                      ? require("../../assets/icons/invisible.png")
                      : require("../../assets/icons/eye.png")
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={styles.textinputCOntainer}>
              <Image
                style={styles.icon}
                source={require("../../assets/icons/password.png")}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeconfirmPassword}
                value={confirmpassword}
                placeholder="Confirm Password"
                secureTextEntry={confirmSecure}
              />
              <TouchableOpacity
                onPress={() => setConfirmSecure(!confirmSecure)}
              >
                <Image
                  style={styles.icon}
                  source={
                    confirmSecure
                      ? require("../../assets/icons/invisible.png")
                      : require("../../assets/icons/eye.png")
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={loading ? null : signUpFun}
            style={styles.loginButtonContainer}
          >
            {loading ? (
              <ActivityIndicator size="small" color={"#ffffff"} />
            ) : (
              <Text style={styles.loginButtonText}>Next</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
            <Text style={styles.forgotPasswordText}>
              Already have an account?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ScreenHeaderContainer: {
    width: WIDTH,
    height: HIEGHT / 4,
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: WIDTH - RFValue(100),
    height: RFValue(152),
    marginTop: RFValue(30),
  },

  textinputCOntainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(50),
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(25),
    marginBottom: RFValue(25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  inputContainer: {
    marginTop: RFValue(30),
  },
  icon: {
    width: RFValue(13),
    height: RFValue(13),
  },
  input: {
    width: WIDTH - RFValue(120),
    height: RFValue(60),
    marginLeft: RFValue(12),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#7A7A7A",
  },
  loginButtonContainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(50),
    alignSelf: "center",
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontFamily: "RegularText",
  },
  forgotPasswordText: {
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#7A7A7A",
    textAlign: "center",
    marginTop: RFValue(20),
    marginBottom: RFValue(12),
  },
  createAccountContainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(55),
    alignSelf: "center",
    borderColor: "#305A9C",
    backgroundColor: "#fff",
    borderWidth: 1.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginTop: RFValue(25),
  },
});
