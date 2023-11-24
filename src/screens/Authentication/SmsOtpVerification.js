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
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../../utils/alerts"; // Alert function for Mobile applications
import { SaveStorageItems, GetStorageItems } from "../../utils/AsyncStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginDetails } from "../../redux/action"; // Action function
import { axiosPOSTCall, axiosGETCall } from "../../utils/axios";
import Device from "../../../src/constants/device";
import OtpVerification from "../../components/OtpVerification";

const WIDTH = Dimensions.get("window").width;
const HIEGHT = Dimensions.get("window").height;
export default function SmsOtpVerificationScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [seconds, setSeconds] = useState(60);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
    }
  }, [seconds]);
  const userData = useSelector((state) => state?.loginDetails);

  const resendOTP = () => {
    var Token = userData?.Authorization;
    setResendLoading(true);
    var url = "";
    if (route?.params?.screen == "forgotPassword") {
      url =
        "user/resendCode?email=" +
        route?.params?.data?.data?.attribute +
        "&type=email&purpose=forgotPassword";
    } else if (route?.params?.screen == "email") {
      url =
        "user/resendCode?email=" +
        route?.params?.data?.data?.attribute +
        "&type=email&purpose=email";
    } else if (route?.params?.screen == "updatePhone") {
      updatePhone();
      return;
    } else {
      url =
        "user/resendCode?phone=" +
        route?.params?.phone +
        "&type=phone&purpose=phone&countryCode=" +
        route?.params?.County;
    }
    axiosGETCall(url, Token, (callBack) => {
      if (callBack?.status == 200) {
        simpleAlertCall(callBack?.message, () => {
          setSeconds(60);
        });
      }
      if (route?.params?.screen == "forgotPassword") {
        setSeconds(60);
      }
      setResendLoading(false);
    });
  };

  const updatePhone = () => {
    url = "user/updatePhone";
    var obj = {
      code: value,
      phone: route?.params?.phone,
    };
    var Token = userData?.Authorization;

    axiosPOSTCall(url, obj, Token, (callBack) => {
      if (callBack?.status == 200) {
        simpleAlertCall("Mobile number updated successfully.", () => {
          navigation.goBack();
        });
      } else {
      }
      setLoading(false);
    });
  };

  const SubmitFun = () => {
    if (!value) {
      simpleAlertCall("Please enter OTP.", () => {});
      return;
    }
    if (route?.params?.screen == "email") {
      EmailVerification();
    } else if (route?.params?.screen == "forgotPassword") {
      ForgotPassword();
    } else if (route?.params?.screen == "updatePhone") {
      updatePhone();
      return;
    } else {
      MobileVerification();
    }
    setLoading(true);
  };

  const ForgotPassword = () => {
    var obj = {
      userId: route?.params?.data?.data?.userId,
      code: value,
      email: route?.params?.email,
    };
    var url = "user/verifyForgetPassword";
    axiosPOSTCall(url, obj, "", (callBack) => {
      if (callBack?.status == 200) {
        navigation.navigate("ResetPassword", {
          OTP: value,
          userId: route?.params?.data?.data?.userId,
          email: route?.params?.email,
        });
      }
      setLoading(false);
    });
  };

  const EmailVerification = () => {
    var obj = {
      userId: route?.params?.data?.data?.userId,
      emailCode: value,
      email: route?.params?.obj?.email,
    };
    var url = "user/verifyEmail";
    axiosPOSTCall(url, obj, "", (callBack) => {
      if (callBack?.status == 200) {
        navigation.replace("SmsVerificationScreen", {
          data: route?.params?.data?.data?.userId,
          obj: obj,
        });
      }
      setLoading(false);
    });
  };
  const MobileVerification = () => {
    var obj = {
      phone: route?.params?.phone,
      code: value,
      email: route?.params?.obj?.email,
    };
    var url = "user/verifyUser";
    axiosPOSTCall(url, obj, "", (callBack) => {
      if (callBack?.status == 200) {
        simpleAlertCall("Account created successfully.", () => {});
        var NewObj = callBack.data;
        NewObj.data = {
          _id: callBack.data.userId,
          fullName: callBack.data.fullName,
          phone: callBack.data.phone,
          email: callBack.data.email,
          firstVisit: 1,
        };
        SaveStorageItems("@loginDetails", JSON.stringify(NewObj), 0, () => {
          dispatch(loginDetails({ payload: NewObj }));
          navigation.replace("tabs"); // Navigating to the next screen
        });
      } else {
      }
      setLoading(false);
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.otpScrollViewContainer}
        bounces={false}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#305A9C"
        />
        <View style={styles.header}>
          <View style={styles.cancel_col}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Image
                style={{ width: RFValue(10), height: RFValue(20) }}
                source={require("../../assets/icons/back.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.email_col}>
            <Text style={styles.emailVerificationText}>
              {route?.params?.screen == "forgotPassword" ||
              route?.params?.screen == "email"
                ? "Email Verification"
                : " SMS Verification"}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.otpSecondScroolView}
          bounces={false}
        >
          <View style={styles.pleasecheck_container}>
            <Text style={styles.pleaseConfirmText}>
              Please check your{" "}
              {route?.params?.screen == "email" ||
              route?.params?.screen == "forgotPassword"
                ? "email"
                : "messages"}{" "}
              and enter the security code below.
            </Text>
          </View>
          <View style={styles.otpInputBox}>
            <OtpVerification
              setValue1={setValue}
              value1={value}
              onfocus="alert('You focused on this field!')"
            />
          </View>
          {seconds <= 0 ? (
            <TouchableOpacity onPress={() => !resendLoading && resendOTP()}>
              {resendLoading ? (
                <View style={styles.resendLoadingStyle}>
                  <ActivityIndicator size="small" color="#305A9C" />
                </View>
              ) : (
                <Text style={styles.OTPResendBtn}>
                  {/* {resendOtp && "Resend"} */}
                  {seconds <= 0 && "Resend"}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.resend_text}>
              <Text style={styles.OTPSeconds}>
                Didn't receive the{" "}
                {route?.params?.screen == "forgotPassword" ||
                route?.params?.screen == "email"
                  ? "OTP email"
                  : " SMS Verification"}
                ? You can request a new one in{" "}
                <Text style={styles.redCount}>
                  {
                    seconds
                    // seconds == 0 ? (resendOtp && + " " + "Resend") : ("error")
                  }{" "}
                </Text>
                <Text style={styles.redCount}>Seconds</Text>
              </Text>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          onPress={SubmitFun}
          style={styles.loginButtonContainer}
        >
          {loading ? (
            <ActivityIndicator size="small" color={"#ffffff"} />
          ) : (
            <Text style={styles.loginButtonText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    width: WIDTH,
    height: HIEGHT/8,
    backgroundColor: "#315A9C",
    paddingHorizontal: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT
        : Device.STATUS_BAR_HEIGHT + 20,
  },
  emailVerificationText: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "SemiBold",
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
    width: WIDTH - RFValue(40),
    height: RFValue(45),
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
    marginTop: RFValue(20),
  },

  otpCancel_btn: {
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
    marginTop: RFValue(20),
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

  pleaseConfirmText: {
    color: "#161616",
    fontFamily: "RegularText",
    fontSize: RFValue(14),

    marginTop: RFValue(42),
    textAlign: "center",
  },
  OTPSeconds: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: RFValue(13),
  },
  OTPResendBtn: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: RFValue(13),
    color: "#305A9C",
    textDecorationLine: "underline",
    fontFamily: "BoldText",
  },
  otpInputBox: {
    marginTop: RFValue(50),
    alignSelf: "center",
    marginBottom: -10,
  },
  OTPResendBtn: {
    textAlign: "center",
    marginVertical: 30,
    fontSize: RFValue(13),
    color: "#305A9C",
    textDecorationLine: "underline",
    fontFamily: "BoldText",
  },
  pleasecheck_container: {
    marginHorizontal: 30,
  },
  resend_text: {
    marginHorizontal: 50,
  },
  redCount: {
    color: "red",
  },
  cancelHeaderBtn: {
    color: "#fff",
    // alignSelf: "flex-end",
    fontSize: 15,
  },
  email_col: {
    width: "75%",
    alignItems: "flex-start",
  },
  cancel_col: {
   // marginTop: RFValue(15),
    width: "20%",
    alignItems: "flex-start",
  },
  resendLoadingStyle: {
    marginTop: RFValue(35),
  },
  otpScrollViewContainer: { paddingBottom: RFValue(50) },
  otpSecondScroolView: { paddingBottom: RFValue(0) },
});
