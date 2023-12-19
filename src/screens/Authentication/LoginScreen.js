/** @format */

import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  KeyboardAvoidingView,
  ActionSheetIOS,
  Platform,
  Alert,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../../utils/alerts"; // Alert function for Mobile applications
import { axiosPOSTCall } from "../../utils/axios.js"; // POST function for axios
import { loginDetails } from "../../redux/action"; // Action function
import { useDispatch, useSelector } from "react-redux";
import { SaveStorageItems, GetStorageItems } from "../../utils/AsyncStorage";
import TouchID from "react-native-touch-id";
import messaging from "@react-native-firebase/messaging";
import * as Keychain from "react-native-keychain";
const WIDTH = Dimensions.get("window").width;
const HIEGHT = Dimensions.get("window").height;

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = React.useState(
    __DEV__ ? "shaaa+1122@gmail.com" : ""
  );
  const [password, onChangePassword] = React.useState(
    __DEV__ ? "Shadab@123" : ""
  );
  const [loading, setLoading] = React.useState(false);
  const [token, setToken] = useState("-");
  const userData = useSelector((state) => state?.loginDetails);
  const [secure, setSecure] = useState(true);

  const SaveToKeyChain = async () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Not Now", "Save Password", "Never fot This Website"],
          destructiveButtonIndex: 2,
          cancelButtonIndex: 0,
          title:
            "Would you like to save this password in your iCloud Keychain to use across apps and websites on al your devices?",
          message:
            "You can view and remove saved passwords in Passwords settings.",
          anchor: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            saveFun();
          }
        }
      );
    } else if (Platform.OS === "android") {
      Alert.alert(
        "Would you like to save this password in your Android keystore to use across apps and websites on al your devices?",
        "You can view and remove saved passwords in Passwords settings.",
        [
          // The "Yes" button
          {
            text: "Save Password",
            onPress: () => {
              saveFun();
            },
          },
          {
            text: "Not Now",
            onPress: () => {},
          },
          {
            text: "Never fot This Website",
            onPress: () => {},
          },
        ]
      );
    }
  };

  const LoginWithSavedAccount = (credentials1) => {
    Alert.alert("Friend Verifier", "Would you like to use saved account?", [
      {
        text: "Yes",
        onPress: () => {
          TouchFun(credentials1);
        },
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };
  const TouchFun = async (credentials1) => {
    var type = await TouchID.isSupported();
    if (type) {
      await TouchID.authenticate()
        .then((res) => {
          if (res) {
            onChangeEmail(credentials1?.username);
            onChangePassword(credentials1?.password);
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    GetKeyChain();
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    const FcmToken = await messaging().getToken();
    console.log(
      "🚀 ~ file: LoginScreen.js:133 ~ getFCMToken ~ FcmToken:",
      FcmToken
    );
    setToken(FcmToken);
    return;
  };

  const saveFun = async () => {
    try {
      await Keychain.setGenericPassword(email, password, {
        accessible: Keychain.ACCESSIBLE.ALWAYS,
        storage: Keychain.STORAGE_TYPE.FB,
      });
    } catch (error) {
      console.log("🚀 ~ file: LoginScreen.js:152 ~ saveFun ~ error:", error);
    }
  };

  const GetKeyChain = async () => {
    try {
      const credentials1 = await Keychain.getGenericPassword({
        storage: Keychain.STORAGE_TYPE.FB,
      });
      if (credentials1?.username) {
        setTimeout(() => {
          LoginWithSavedAccount(credentials1);
        }, 1000);
      }
    } catch (error) {}
  };

  const submitFun = () => {
    if (!email) {
      simpleAlertCall("Please enter your email.", () => {});
    } else if (!password) {
      simpleAlertCall("Please enter your password.", () => {});
    } else if (!email.includes("@" && ".")) {
      simpleAlertCall("Enter a valid email !", () => {});
    } else {
      setLoading(true);
      var url = "/user/login";
      var obj = {
        email: email,
        password: password,
        token: token,
      };

      axiosPOSTCall(url, obj, "", async (callBack) => {
        if (callBack?.status == 200) {
          SaveToKeyChain();
          callBack.data.firstVisit = 1;
          SaveStorageItems(
            "@loginDetails",
            JSON.stringify(callBack.data),
            0,
            () => {
              setLoading(false);
              dispatch(loginDetails({ payload: callBack?.data }));
              navigation.replace("tabs"); // Navigating to the next screen
            }
          );
        } else {
          setLoading(false);
        }
        setLoading(false);
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
       <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? -60 : -500}
      >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: "#fff" }}
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
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email Address"
                autoCapitalize="none"
                keyboardType="email-address"
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
          </View>
       

        <TouchableOpacity
          onPress={loading ? null : submitFun} 
          style={styles.loginButtonContainer}
        >
          {loading ? (
            <ActivityIndicator size="small" color={"#ffffff"} />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: "20%",
              marginTop: 25,
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                height: 3,
                flex: 1,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingHorizontal: 5,
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              OR
            </Text>
            <View
              style={{
                backgroundColor: "black",
                height: 3,
                flex: 1,
                alignSelf: "center",
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.replace("Terms")}
          style={styles.createAccountContainer}
        >
          <Text style={{ ...styles.loginButtonText, color: "#305A9C" }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ScreenHeaderContainer: {
    width: WIDTH,
    height: HIEGHT / 2,
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginTop:RFValue(60),
    width: WIDTH - RFValue(100),
    height: RFValue(152),
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
    marginTop: RFValue(14),
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
    marginBottom: RFValue(10)
  },
});
