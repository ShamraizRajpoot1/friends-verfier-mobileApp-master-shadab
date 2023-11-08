/** @format */

import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React from "react";
import simpleAlertCall from "../../utils/alerts"; // Alert function for Mobile applications
import { axiosPOSTCall } from "../../utils/axios.js"; // POST function for axios
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../../src/constants/device";

const WIDTH = Dimensions.get("window").width;

import PhoneInput from "react-native-phone-number-input";
export default function SmsVerificationScreen({ navigation, route }) {
  const {
    params: { data, obj },
  } = route;
  const [phone, setPhone] = React.useState("");
  const phoneInput = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [County, setCounty] = React.useState("+1");

  const submitFun = () => {
    if (!phone) {
      simpleAlertCall("Please enter your mobile number.", () => {});
    } else {
      setLoading(true);
      var url = "/user/register";
      var obj1 = {
        phone: phone,
        id: data,
        countryCode: County,
        mode: "phone",
      };

      axiosPOSTCall(url, obj1, "", (callBack) => {
        setLoading(false);
        if (callBack.status == 200) {
          navigation.replace("SmsOtpVerificationScreen", {
            data: callBack,
            obj: obj,
            phone: phone,
            County: County,
            screen: "phone",
          });
        }
      });
    }
  };
  return (
    <KeyboardAvoidingView
      enabled
      keyboardVerticalOffset={0}
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={styles.container}
    >
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />

      <View style={styles.header}>
        <View style={styles.cancel_col}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SmsOtpVerificationScreen")}
          >
            <Image
              style={{ height: RFValue(15), width: RFValue(30) }}
              source={require("../../assets/icons/back.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.email_col}>
          <Text style={styles.emailVerificationText}>SMS Verification</Text>
        </View>
      </View>

      <ScrollView
        style={{flex:1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(100) }}
      >
        <Text style={styles.verifyEmailtext}>Welcome to Friend Verifier!</Text>

        <Text style={styles.pleaseConfirmText}>
          Please confirm your mobile{"\n"}
          number. We ask you to do so, to{"\n"}
          prevent bots.
        </Text>

        <View>
          <PhoneInput
            keyboardType="numeric"
            ref={phoneInput}
            defaultCode="US"
            layout="first"
            textInputProps={{ placeholderTextColor: "#000" }}
            placeholder="  (000)   000   000"
            codeTextStyle={{ color: "#092058", fontFamily: "SemiBold" }}
            containerStyle={{
              borderRadius: 12,
              height: RFValue(59),
              marginTop: RFValue(70),
              marginBottom: RFValue(50),
              backgroundColor: "#F4F4F4",
              borderWidth: 1,
              borderColor: "#BBB9CB",
              alignSelf: "center",
              width: WIDTH - RFValue(50),
              paddingVertical: RFValue(5),
            }}
            disableArrowIcon
            autoFocus
            textContainerStyle={{
              backgroundColor: "#F4F4F4",
              marginLeft: -10,
              borderLeftWidth: 1,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
              borderLeftColor: "#BBB9CB",
            }}
            textInputStyle={{
              color: "#000",
              height: RFValue(59),
              fontSize: RFValue(16),
              fontFamily: "SemiBold",
            }}
            onChangeText={(verificationCode) => {
              setPhone(verificationCode);
            }}
            onChangeCountry={(code) => {
              setCounty("+" + code?.callingCode[0]);
            }}
          />
          <TouchableOpacity
          onPress={loading ? null : submitFun}
          style={styles.loginButtonContainer}
        >
          {loading ? (
            <ActivityIndicator size="small" color={"#ffffff"} />
          ) : (
            <Text style={styles.loginButtonText}>Send SMS</Text>
          )}
        </TouchableOpacity>
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: WIDTH,
    height: RFValue(100),
    backgroundColor: "#315A9C",
    paddingHorizontal: RFValue(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15
        : Device.STATUS_BAR_HEIGHT + 20,
  },
  emailVerificationText: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "SemiBold",
    textAlign: "center",
  },
  frameImage: {
    width: RFValue(200),
    height: RFValue(150),
    alignSelf: "center",
    marginTop: RFValue(70),
  },
  verifyEmailtext: {
    fontSize: RFValue(17),
    color: "#000",
    fontFamily: "SemiBold",
    marginLeft: RFValue(25),
    marginTop: RFValue(60),
  },
  loginButtonContainer: {
    marginTop: RFValue(40),
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
    cancel_col: {
      marginTop: RFValue(15),
      width: "20%",
      alignItems: "flex-start",
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
    marginTop: RFValue(70),
    bottom: RFValue(50),
  },
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontFamily: "RegularText",
  },
  forgotPasswordText: {
    fontSize: RFValue(11),
    fontFamily: "RegularText",
    color: "#7A7A7A",
    textAlign: "center",
    marginTop: RFValue(8),
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
  email_col: {
    width: "75%",
    alignItems: "flex-start",
    marginTop: RFValue(15),
  },
  cancel_col: {
    marginTop: RFValue(15),
    width: "20%",
    alignItems: "flex-start",
  },
  pleaseConfirmText: {
    color: "#000000",
    fontFamily: "RegularText",
    fontSize: RFValue(17),
    marginLeft: RFValue(25),
    marginTop: RFValue(13),
  },
});
