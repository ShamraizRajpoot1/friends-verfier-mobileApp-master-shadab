import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import GetStarted from "../../assets/icons/GetStarted.svg";
import { RFValue } from "react-native-responsive-fontsize";

const GetStartedScreen = ({ navigation }) => {
  const OptOut = () => {
    Alert.alert(
      "Opt Out Process",
      'To remove your data from our platform, create a free account & perform a search on yourself. Then, tap the three dots in the top right corner, press "Request Removal," & create a ticket.',
      // {planPrice?.price}
      [
        // The "Yes" button
        {
          text: "Got it!",
          onPress: () => {},
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <GetStarted />
      </View>
      <View style={styles.bottom}>
        <View style={{ marginVertical: 30 }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Friend or Foe
          </Text>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            You Need to Know
          </Text>
        </View>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Friend Verifier empowers you to recognize potential individuals who
          pose a risk to you and those you love.
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.replace("LoginScreen")}
            style={[
              styles.createAccountContainer,
              { backgroundColor: "#305a9c" },
            ]}
          >
            <Text style={{ ...styles.loginButtonText, color: "white" }}>
              Get Started!
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => OptOut()}
            style={styles.createAccountContainer}
          >
            <Text style={{ ...styles.loginButtonText, color: "#305A9C" }}>
              Opt Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  top: {
    flex: 1,
    backgroundColor: "#3C5997",
  },
  bottom: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 90,
    fontWeight: "3900",
  },
  createAccountContainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(40),
    alignSelf: "center",
    borderColor: "#305A9C",
    backgroundColor: "#fff",
    borderWidth: 1.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginTop: RFValue(15),
  },
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontFamily: "RegularText",
  },
});
export default GetStartedScreen;
