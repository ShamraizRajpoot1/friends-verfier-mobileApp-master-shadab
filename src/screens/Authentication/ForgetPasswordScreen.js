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
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosGETCall } from "../../utils/axios";
import simpleAlertCall from "../../utils/alerts";
import { useSelector } from "react-redux";

const WIDTH = Dimensions.get("window").width;
const HIEGHT = Dimensions.get("window").height;

export default function ForgotPasswordScreen({ navigation }) {
  const [email, onChangeEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const reqNewPassword = () => {
    if (!email) {
      simpleAlertCall("Please enter your email.", () => {});
      return;
    }
    if (email) {
      setLoading(true);
      var url = "/user/forgetPassword?email=" + email;
      axiosGETCall(url, "", (callBack) => {
        setLoading(false);
        if (callBack?.status == 200) {
          navigation.replace("SmsOtpVerificationScreen", {
            data: callBack,
            screen: "forgotPassword",
            email: email,
          });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#315A9C"
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
                onChangeText={(email) => onChangeEmail(email.toLowerCase())}
                value={email}
                placeholder="Email Address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButtonContainer}
            onPress={loading ? null : reqNewPassword}
          >
            {loading ? (
              <ActivityIndicator size="small" color={"#ffffff"} />
            ) : (
              <Text style={styles.loginButtonText}>Request New Password</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.forgotPasswordText}>Login Instead</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontFamily: "RegularText",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ScreenHeaderContainer: {
    width: WIDTH,
    height: HIEGHT / 1.42,
    backgroundColor: "#315A9C",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: WIDTH - RFValue(100),
    height: RFValue(140),
    marginBottom: RFValue(80),
  },

  textinputCOntainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(40),
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
    width: RFValue(11),
    height: RFValue(11),
    opacity:0.7
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
    height: RFValue(40),
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
    marginTop: RFValue(15),
    elevation: 1,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(14),
    fontFamily: "RegularText",
  },
  forgotPasswordText: {
    fontSize: RFValue(12),
    fontFamily: "RegularText",
    color: "#757575",
    textAlign: "center",
    marginTop: RFValue(20),
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
