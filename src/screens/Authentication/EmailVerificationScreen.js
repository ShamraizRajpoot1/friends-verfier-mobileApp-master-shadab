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
  AppState,
  Platform,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosGETCall } from "../../utils/axios";
import Device from "../../../src/constants/device";

const WIDTH = Dimensions.get("window").width;

export default function EmailVerificationScreen({ navigation, route }) {
  const {
    params: { data, obj },
  } = route;
  const [email, onChangeEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [seconds, setSeconds] = React.useState(90);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        setLoading(true);
        appState.current = nextAppState;
        GetStatus();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const GetStatus = () => {
    var url = "/user/" + data?.userId;
    axiosGETCall(url, "", (callBack) => {
      if (callBack?.status == 200) {
        if (callBack?.data?.emailVerified == true) {
          navigation.navigate("SmsVerificationScreen", {
            data: data?.userId,
            obj: obj,
          });
        }
      }
      setLoading(false);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />

      <View style={styles.header}>
        <Text style={styles.emailVerificationText}>Email Verification</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <Image
          style={styles.frameImage}
          source={require("../../assets/icons/frame.png")}
        />

        <Text style={styles.verifyEmailtext}>
          Please verify your email address
        </Text>

        <TouchableOpacity
          onPress={() =>
            seconds > 0 ? null : navigation.navigate("SmsVerificationScreen")
          }
          style={
            seconds > 0
              ? [styles.loginButtonContainer, { backgroundColor: "gray" }]
              : styles.loginButtonContainer
          }
        >
          <Text style={styles.loginButtonText}>Send Email Again</Text>
        </TouchableOpacity>

        {seconds != 0 && (
          <Text style={styles.forgotPasswordText}>
            Please wait {seconds} seconds before requesting again
          </Text>
        )}

        <View style={styles.footerTextInputContainer}>
          <View style={styles.textinputCOntainer}>
            <Image
              style={{ width: RFValue(14), height: RFValue(14) }}
              source={require("../../assets/icons/email.png")}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="name@domain.com"
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            // onPress={() => navigation.navigate("EmailVerificationScreen")}
            style={styles.changeemailadreessbutton}
          >
            <Text style={styles.loginButtonText}>Change Email Address</Text>
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

  header: {
    // width: WIDTH,
    // height: RFValue(65),
    // backgroundColor: "#305A9C",
    // justifyContent: "center",
    // alignItems: "center",
    width: WIDTH,
    height: RFValue(75),
    backgroundColor: "#305A9C",
    // alignItems: "center",
    paddingHorizontal: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15
        : Device.STATUS_BAR_HEIGHT + 20,
    alignItems: "center",
  },
  emailVerificationText: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "SemiBold",
    textAlign: "center",
    paddingTop: RFValue(10),
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
    fontFamily: "BoldText",
    textAlign: "center",
    marginTop: RFValue(50),
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
    marginTop: RFValue(35),
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

  footerTextInputContainer: {
    marginTop: RFValue(70),
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
  input: {
    width: WIDTH - RFValue(120),
    height: RFValue(50),
    marginLeft: RFValue(12),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#7A7A7A",
  },
  changeemailadreessbutton: {
    backgroundColor: "#00995A",
    width: WIDTH - RFValue(40),
    height: RFValue(50),
    alignSelf: "center",
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
});
