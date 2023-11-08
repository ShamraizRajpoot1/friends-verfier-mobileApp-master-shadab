import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, Feather, Zocial } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../utils/alerts";
import Device from "../../src/constants/device";
import { useSelector, useDispatch } from "react-redux";
import { axiosPUTCall } from "../utils/axios.js"; // POST function for axios
import { GetStorageItems, SaveStorageItems } from "../utils/AsyncStorage";
import { loginDetails } from "../redux/action"; // Action function
import PhoneInput from "react-native-phone-number-input";

const WIDTH = Dimensions.get("window").width;
export default function SettingScreen({ navigation, route }) {
  const phoneInput = React.useRef(null);
  const [County, setCounty] = React.useState("+1");

  const { screen } = route?.params;
  const [emailState, onChangeEmail] = useState("");
  const [newemail, onChangeNewEmail] = useState("");
  const [confirmemail, onChangeconfirmEmail] = useState("");
  const [password, onChangePassword] = React.useState("");
  const [newpassword, onChangenewPassword] = React.useState("");
  const [confirmnewpassword, onChangeconfirmnewPassword] = React.useState("");
  const userData = useSelector((state) => state?.loginDetails);
  const { _id, email, phone } = userData?.data;
  const mailCheck = /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])(?=.{8,})/;
  const dispatch = useDispatch();
  const [mobileNumberState, setMobileNumberState] = useState("");

  // password Eye
  const [eyeOldPassword, setEyeOldPassword] = useState(true);
  const [eyeNewPassword, setEyeNewPassword] = useState(true);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(true);

  const oldPasswordUpdate = () => {
    if (!password) {
      simpleAlertCall("Please enter old password", () => {});
    } else if (!newpassword) {
      simpleAlertCall("Please enter new password", () => {});
    } else if (!confirmnewpassword) {
      simpleAlertCall("Please enter confirm password", () => {});
    } else {
      if (newpassword != confirmnewpassword) {
        simpleAlertCall(
          "New password and Confirm password should be same.",
          () => {}
        );
      } else {
        if (!check.test(newpassword)) {
          simpleAlertCall(
            "Your password must be at least 8 characters long and contain at least one upper case letter, a special character (@#$*!) and a number.",
            () => {}
          );
          return;
        } else {
          const url = "/user/" + _id;
          var Token = userData?.Authorization;
          var obj = {
            password: newpassword,
          };
          axiosPUTCall(url, obj, Token, (callBack1) => {
            if (callBack1.status == 200) {
              simpleAlertCall("Password updated successfully", () => {
                navigation.goBack();
              });
              // saveNewEmail();
            }
            return;
          });
        }
      }
    }
  };

  const saveNewEmail = () => {
    GetStorageItems("@loginDetails", (callBack) => {
      callBack.email = newemail;
      callBack.data.email = newemail;
      dispatch(loginDetails({ payload: callBack }));
      SaveStorageItems("@loginDetails", JSON.stringify(callBack), 0, () => {});
    });
  };
  const saveNewPhone = () => {
    GetStorageItems("@loginDetails", (callBack) => {
      callBack.phone = mobileNumberState;
      callBack.data.phone = mobileNumberState;
      dispatch(loginDetails({ payload: callBack }));
      SaveStorageItems("@loginDetails", JSON.stringify(callBack), 0, () => {});
    });
  };

  const updateMobile = () => {
    if (!mobileNumberState) {
      simpleAlertCall("Please enter mobile number", () => {});
    } else if (phone == mobileNumberState) {
      simpleAlertCall(
        "New mobile number can't be same as old number",
        () => {}
      );
    } else {
      const url = "/user/" + _id;
      var Token = userData?.Authorization;
      var obj = {
        phone: mobileNumberState,
        countryCode: County,
      };
      axiosPUTCall(url, obj, Token, (callBack1) => {
        if (callBack1.status == 200) {
          simpleAlertCall(callBack1.message, () => {
            navigation.replace("SmsOtpVerificationScreen", {
              data: callBack1,
              obj: obj,
              phone: mobileNumberState,
              County: County,
              screen: "updatePhone",
            });
          });
          // saveNewPhone();
        }
        return;
      });
    }
  };

  const UpdateEmailFun = () => {
    if (!emailState) {
      simpleAlertCall("Please enter your email", () => {});
    } else if (!newemail) {
      simpleAlertCall("Please enter new email", () => {});
    } else if (emailState != email) {
      simpleAlertCall("Wrong current email", () => {});
    } else {
      if (!mailCheck.test(emailState)) {
        simpleAlertCall("Please enter valid current email", () => {});
        return;
      } else if (!mailCheck.test(newemail)) {
        simpleAlertCall("Please enter valid new email", () => {});
        return;
      } else {
        const url = "/user/" + _id;
        var Token = userData?.Authorization;
        var obj = {
          email: newemail,
        };
        axiosPUTCall(url, obj, Token, (callBack1) => {
          if (callBack1.status == 200) {
            simpleAlertCall("Email updated successfully", () => {
              navigation.goBack();
            });
            saveNewEmail();
          }
          return;
        });
      }
    }
  };

  const UpdateEmail = () => (
    <>
      <View style={styles.textinputCOntainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/password.png")}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={emailState}
          placeholder="Current Email"
          // secureTextEntry={eyeOldPassword}
        />
        {/* <TouchableOpacity onPress={() => setEyeOldPassword(!eyeOldPassword)}>
          <Image
            style={styles.icon}
            source={
              eyeOldPassword
                ? require("../assets/icons/invisible.png")
                : require("../assets/icons/eye.png")
            }
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.textinputCOntainer}>
        <Image
          style={styles.icon}
          source={require("../assets/icons/password.png")}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNewEmail}
          value={newemail}
          placeholder="New Email"
          // secureTextEntry={eyeOldPassword}
        />
        {/* <TouchableOpacity onPress={() => setEyeOldPassword(!eyeOldPassword)}>
          <Image
            style={styles.icon}
            source={
              eyeOldPassword
                ? require("../assets/icons/invisible.png")
                : require("../assets/icons/eye.png")
            }
          />
        </TouchableOpacity> */}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.homeHeader}>
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-thin-left"
          size={24}
          color="#fff"
        />

        <Text style={styles.headerTitle}>
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            {screen == 1
              ? "Email"
              : screen == 2
              ? "Password"
              : screen == 3
              ? "Mobile Number"
              : null}
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.updateText}>
            {screen == 1
              ? "Update Email Address"
              : screen == 2
              ? "Update Password"
              : screen == 3
              ? "Update Mobile Number"
              : null}
          </Text>

          {screen == 1 && (
            <>
              <View style={styles.textinputCOntainer}>
                <Zocial name="email" size={20} color="#000000" />

                {/* <Image
                  style={styles.icon}
                  source={require("../assets/icons/password.png")}
                /> */}
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeEmail}
                  value={emailState}
                  placeholder="Current Email"
                  autoCapitalize={false}
                />
              </View>
              <View style={styles.textinputCOntainer}>
                {/* <Image
                  style={styles.icon}
                  source={require("../assets/icons/password.png")}
                /> */}
                <Zocial name="email" size={20} color="#000000" />

                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNewEmail}
                  value={newemail}
                  placeholder="New Email"
                  autoCapitalize={false}
                />
              </View>
            </>
          )}

          {screen == 2 && (
            <>
              <View style={styles.textinputCOntainer}>
                <Image
                  style={styles.icon}
                  source={require("../assets/icons/password.png")}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Old Password"
                  secureTextEntry={eyeOldPassword}
                />
                <TouchableOpacity
                  onPress={() => setEyeOldPassword(!eyeOldPassword)}
                >
                  <Image
                    style={styles.icon}
                    source={
                      eyeOldPassword
                        ? require("../assets/icons/invisible.png")
                        : require("../assets/icons/eye.png")
                    }
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textinputCOntainer}>
                <Image
                  style={styles.icon}
                  source={require("../assets/icons/password.png")}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangenewPassword}
                  value={newpassword}
                  placeholder="New Password"
                  secureTextEntry={eyeNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setEyeNewPassword(!eyeNewPassword)}
                >
                  <Image
                    style={styles.icon}
                    source={
                      eyeNewPassword
                        ? require("../assets/icons/invisible.png")
                        : require("../assets/icons/eye.png")
                    }
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.textinputCOntainer}>
                <Image
                  style={styles.icon}
                  source={require("../assets/icons/password.png")}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeconfirmnewPassword}
                  value={confirmnewpassword}
                  placeholder="Confirm New Password"
                  secureTextEntry={eyeConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setEyeConfirmPassword(!eyeConfirmPassword)}
                >
                  <Image
                    style={styles.icon}
                    source={
                      eyeConfirmPassword
                        ? require("../assets/icons/invisible.png")
                        : require("../assets/icons/eye.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {screen == 3 && (
            <>
              <View style={{ marginBottom: 40 }}>
                <PhoneInput
                  keyboardType="numeric"
                  ref={phoneInput}
                  // defaultValue={phone}
                  // value={phone}
                  defaultCode="US"
                  layout="first"
                  textInputProps={{ placeholderTextColor: "#000" }}
                  placeholder="  (000)   000   000"
                  codeTextStyle={{ color: "#092058", fontFamily: "SemiBold" }}
                  containerStyle={{
                    borderRadius: 12,
                    height: RFValue(59),
                    marginTop: RFValue(70),
                    backgroundColor: "#FBFBFB",
                    borderWidth: 1,
                    borderColor: "#BBB9CB",
                    alignSelf: "center",
                    width: WIDTH - RFValue(50),
                  }}
                  disableArrowIcon
                  autoFocus
                  textContainerStyle={{
                    backgroundColor: "#FBFBFB",
                    marginLeft: -10,
                    borderLeftWidth: 1,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    borderLeftColor: "#BBB9CB",
                  }}
                  textInputStyle={{
                    color: "#000",
                    height: RFValue(59),
                    fontSize: RFValue(16),
                    fontFamily: "SemiBold",
                  }}
                  onChangeText={(verificationCode) => {
                    setMobileNumberState(verificationCode);
                  }}
                  onChangeCountry={(code) => {
                    setCounty("+" + code?.callingCode[0]);
                  }}
                />
              </View>
            </>
          )}

          <TouchableOpacity
            onPress={() =>
              screen == 1
                ? UpdateEmailFun()
                : screen == 2
                ? oldPasswordUpdate()
                : screen == 3
                ? updateMobile()
                : null
            }
            style={styles.loginButtonContainer}
          >
            <Text style={styles.loginButtonText}>
              {screen == 1
                ? "Update New Email"
                : screen == 2
                ? "Update New Password"
                : screen == 3
                ? "Update New Mobile"
                : null}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  homeHeader: {
    width: WIDTH,
    height: RFValue(75),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15
        : Device.STATUS_BAR_HEIGHT + 20,

    // paddingTop:Platform.OS==='android'?0:RFValue(12),
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  topText: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "RegularText",
    marginTop: RFValue(30),
    textAlign: "center",
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
    height: RFValue(50),
    marginLeft: RFValue(12),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#7A7A7A",
  },
  searchByContactContainer: {
    width: WIDTH - RFValue(60),
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 5,
  },
  iconinvite: {
    width: RFValue(24),
    height: RFValue(24),
    alignSelf: "center",
  },

  boxtitle: {
    fontSize: RFValue(14),
    fontFamily: "BoldText",
    color: "#000",
    textAlign: "center",
    marginTop: RFValue(8),
  },
  searchbyContactbutton: {
    width: WIDTH / 1.6,
    padding: RFValue(5),
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: RFValue(15),
  },
  updateText: {
    fontSize: RFValue(15),
    fontFamily: "SemiBold",
    color: "#757575",
    marginLeft: RFValue(8),
    marginTop: RFValue(30),
    marginBottom: 30,
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
    fontSize: RFValue(16),
    fontFamily: "RegularText",
  },

  seprator: {
    height: 1,
    backgroundColor: "#D7D8DD",
    width: WIDTH - RFValue(25),
    alignSelf: "center",
    marginTop: RFValue(30),
  },
});
