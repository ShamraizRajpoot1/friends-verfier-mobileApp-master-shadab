/** @format */

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
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosPOSTCall } from "../../utils/axios";
import simpleAlertCall from "../../utils/alerts"; // Alert function for Mobile applications
import Device from "../../../src/constants/device";

const WIDTH = Dimensions.get("window").width;
export default function ResetPassword({ navigation, route }) {
  const [newpassword, onChangenewPassword] = React.useState("");
  const [confirmnewpassword, onChangeconfirmnewPassword] = React.useState("");
  const check = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])(?=.{8,})/;
  const [loading, setLoading] = useState(false);

  // password eye
  const [newPassword, setNewPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);

  const Reset = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };
  const updatePassword = () => {
    if (!newpassword) {
      simpleAlertCall("Please enter the password.", () => {});
      return;
    }
    if (!confirmnewpassword) {
      simpleAlertCall("Please enter the confirm password.", () => {});
      return;
    }
    if (newpassword === confirmnewpassword) {
      if (!check.test(newpassword)) {
        simpleAlertCall(
          "Password must be at-least 8 digit long & contain Upper case, Special Characters & number",
          () => {}
        );
        return;
      }
      var obj = {
        password: newpassword,
        email: route?.params?.email,
        code: route?.params?.OTP,
      };

      setLoading(true);
      var url = "user/verifyForgetPassword";
      axiosPOSTCall(url, obj, "", (callBack) => {
        if (callBack?.status == 200) {
          simpleAlertCall("Password updated successfully.", () => {
            Reset();
          });
        }
        setLoading(false);
      });
    } else {
      simpleAlertCall("Password and confirm password did not match.", () => {});
      return;
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.homeHeader}>
        {/* <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-thin-left"
          size={24}
          color="#fff"
        /> */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            Change Password
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
          <Text style={styles.updateText}>Thank you for confirming your email{"\n"}
address, please change your password{"\n"}
below.</Text>
          <View style={styles.textinputCOntainer}>
          <View style={{height:'100%'}}>
              <Text style={styles.lebal}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangenewPassword}
                value={newpassword}
               // placeholder="New Password"
                secureTextEntry={newPassword}
              />
            </View>
            <TouchableOpacity onPress={() => setNewPassword(!newPassword)}>
              <Image
                style={styles.icon}
                source={
                  newPassword
                    ? require("../../assets/icons/invisible.png")
                    : require("../../assets/icons/eye.png")
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.textinputCOntainer}>
            <View style={{height:'100%'}}>
              <Text style={styles.lebal}>Password</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeconfirmnewPassword}
                value={confirmnewpassword}
               // placeholder="Confirm New Password"
                secureTextEntry={confirmPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => setConfirmPassword(!confirmPassword)}
            >
              <Image
                style={styles.icon}
                source={
                  confirmPassword
                    ? require("../../assets/icons/invisible.png")
                    : require("../../assets/icons/eye.png")
                }
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={!loading && updatePassword}
            style={styles.loginButtonContainer}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Confirm</Text>
            )}
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
    height: RFValue(90),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT
        : Device.STATUS_BAR_HEIGHT + 20,
  },

  headerTitle: {
    fontSize: RFValue(16),
    color: "#fff",
    fontFamily: "RegularText",
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
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: RFValue(15),
    marginBottom: RFValue(25),
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.3)",
  },
  
  lebal: {
    color:'rgba(0,0,0,0.5)',
    fontFamily:'BoldText',
    fontSize:RFValue(10),
    marginTop:RFValue(5),
    marginBottom: RFValue(-25),
  },
  icon: {
    opacity:0.5,
    width: RFValue(13),
    height: RFValue(13),
  },
  input: {
    marginTop:RFValue(10),
    width: WIDTH - RFValue(80),
    height: RFValue(50),
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
    color: "#000",
    marginVertical: RFValue(30),
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
