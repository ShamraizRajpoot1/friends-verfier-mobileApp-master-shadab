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
import React, { useState } from "react";
import { Entypo, Feather, Zocial, MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../utils/alerts";
import Device from "../../src/constants/device";

const WIDTH = Dimensions.get("window").width;
export default function SettingScreen({ navigation }) {
  const [email, onChangeEmail] = useState("");
  const [newemail, onChangeNewEmail] = useState("");
  const [confirmemail, onChangeconfirmEmail] = useState("");
  const [password, onChangePassword] = React.useState("");
  const [newpassword, onChangenewPassword] = React.useState("");
  const [confirmnewpassword, onChangeconfirmnewPassword] = React.useState("");

  // password Eye
  const [eyeOldPassword, setEyeOldPassword] = useState(true);
  const [eyeNewPassword, setEyeNewPassword] = useState(true);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(true);

  const oldPasswordUpdate = () => {
    simpleAlertCall("Password Confirm", () => {});
  };

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
            Account
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View>

      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingScreen", { screen: 1 })}
          activeOpacity={0.2}
          style={styles.itemContainer}
        >
          <View style={styles.listLeft}>
            <Zocial name="email" size={20} color="#000000" />

            <View>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(25),
                  color: "#000000",
                }}
              >
                Email Address
              </Text>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(12),
                  marginLeft: RFValue(25),
                  color: "#56606E",
                  width: "100%",
                }}
              >
                Update your email address
              </Text>
            </View>
          </View>

          <Entypo
            style={{ marginLeft: RFValue(10) }}
            name="chevron-right"
            size={28}
            color="#C3C5D2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingScreen", { screen: 2 })}
          activeOpacity={0.2}
          style={styles.itemContainer}
        >
          <View style={styles.listLeft}>
            <Entypo name="lock" size={20} color="#000000" />

            <View>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(25),
                  color: "#000000",
                }}
              >
                Password
              </Text>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(12),
                  marginLeft: RFValue(25),
                  color: "#56606E",
                  width: "100%",
                }}
              >
                Update your password
              </Text>
            </View>
          </View>

          <Entypo
            style={{ marginLeft: RFValue(10) }}
            name="chevron-right"
            size={28}
            color="#C3C5D2"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingScreen", { screen: 3 })}
          activeOpacity={0.2}
          style={styles.itemContainer}
        >
          <View style={styles.listLeft}>
            <MaterialIcons name="local-phone" size={20} color="#000000" />

            <View>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(25),
                  color: "#000000",
                }}
              >
                Mobile Number
              </Text>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(12),
                  marginLeft: RFValue(25),
                  color: "#56606E",
                  width: "100%",
                }}
              >
                Update your mobile number
              </Text>
            </View>
          </View>

          <Entypo
            style={{ marginLeft: RFValue(10) }}
            name="chevron-right"
            size={28}
            color="#C3C5D2"
          />
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        

        <View style={{ alignSelf: "center" }}>
          <Text style={styles.updateText}>Update Password</Text>

          <View style={styles.textinputCOntainer}>
            <Image
              style={styles.icon}
              source={require("../assets/icons/password.png")}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder=" Old Password"
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

          <TouchableOpacity
            onPress={oldPasswordUpdate}
            style={styles.loginButtonContainer}
          >
            <Text style={styles.loginButtonText}>Save New Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH / 1.8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH,
    justifyContent: "space-around",
    marginBottom: RFValue(50),
    alignSelf: "center",
  },
  addSubscription: {
    color: "#8C919F",
    fontFamily: "Medium",
    fontSize: RFValue(13),
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
