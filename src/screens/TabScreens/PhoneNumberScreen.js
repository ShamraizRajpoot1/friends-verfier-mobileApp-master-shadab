/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  Platform,
  Image
} from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import SearchScreen from "../SearchScreen";
import simpleAlertCall from "../../utils/alerts";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import GetRecentSearcheAPI from "../TabScreens/GetRecentSearchAPI";
import Device from "../../../src/constants/device";

const WIDTH = Dimensions.get("window").width;

export default function PhoneNUmberScreen({ navigation }) {
  const userData = useSelector((state) => state?.loginDetails);
  const [phone, onChangephone] = React.useState("");

  const onPressModal = () => {
    if (!phone) {
      simpleAlertCall("Please enter phone number.", () => {});
      return;
    }
    var obj = {
      fields: [{ phone: phone }],
    };
    navigation.navigate("ResultsScreen", { obj: obj });
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      onChangephone("");
    }
  }, [isFocused, userData]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.homeHeader}>
        <Pressable onPress={() => navigation.navigate("SideMenuScreen")}>
          <Feather name="menu" size={33} color="#fff" />
        </Pressable>
        <Text style={{ ...styles.headerTitle }}>
          friend
          <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}>
            verifier
          </Text>
        </Text>
        <Pressable onPress={() => navigation.navigate("InviteEmptyScreen")}>
          <Image source={require('../../assets/icons/inviteicon.png')} style={styles.icon} />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {!userData?.hasOwnProperty("Authorization") && (
          <View style={styles.underHeaderContainer}>
            <TouchableOpacity
              onPress={() => navigation.replace("LoginScreen")}
              activeOpacity={0.5}
            >
              <Text style={styles.loginorcreateAccount}>
                login or create an account here
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputAndSeachBtnContainer}>
          <View style={styles.HomeInputsContainer}>
            <View style={{ ...styles.textinputCOntainer }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangephone}
                value={phone}
                keyboardType="number-pad"
                placeholder="Phone Number"
                placeholderTextColor={"#000"}
              />
              <TouchableOpacity
                onPress={() => onChangephone("")}
                style={styles.crossButton}
              >
                <Feather name="x" size={19} color="#898F96" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchFilterContainer}>
            <TouchableOpacity
              onPress={() => {
                if (!userData?.hasOwnProperty("Authorization")) {
                  Alert.alert(
                    "Friend Verifier",
                    " In order to perform a search you must be logged in. Please login or create an account.",
                    [
                      {
                        text: "Login",
                        onPress: () => navigation.replace("LoginScreen"),
                      },
                      { text: "Cancel", onPress: () => {} },
                    ]
                  );
                } else if (userData?.hasOwnProperty("Authorization")) {
                  userData?.hasOwnProperty("Authorization")
                    ? onPressModal()
                    : navigation.replace("LoginScreen");
                }
              }}
              style={styles.searchButton}
            >
              <Text style={styles.loginButtonText}>search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <GetRecentSearcheAPI />
      </ScrollView>
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={false}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <SearchScreen />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputAndSeachBtnContainer: {
    minHeight: 350,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
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
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
  },
  underHeaderContainer: {
    width: WIDTH,
    height: RFValue(22),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F6F6F",
    paddingBottom: 2,
  },
  loginorcreateAccount: {
    fontSize: RFValue(12),
    color: "#fff",
    textDecorationLine: "underline",
    fontFamily: "BoldText",
  },
  icon:{
    height: RFValue(20),
    width: RFValue(20),
  },
  textinputCOntainer: {
    width: WIDTH - RFValue(24),
    height: RFValue(40),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(10),
   
  },
  inputContainer: {
    marginTop: RFValue(30),
  },
  input: {
    width: WIDTH - RFValue(70),
    height: RFValue(50),
    marginLeft: RFValue(5),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#000",
  },

  stateInput: {
    width: WIDTH - RFValue(80),

    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#000",
  },

  crossButton: {
    width: RFValue(24),
    height: RFValue(24),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
  },
  HomeInputsContainer: {
    marginTop: RFValue(25),
  },

  searchButton: {
    width: WIDTH - RFValue(25),
    height: RFValue(40),
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    marginTop: RFValue(2),
    elevation: 1,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontFamily: "RegularText",
  },
  filterIcon: {
    width: RFValue(20),
    height: RFValue(20),
  },
  filterButtonContainer: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#44CE91",
    marginLeft: RFValue(7),
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(12),
  },
  recentSearchesContainer: {
    width: WIDTH - RFValue(30),
    height: RFValue(40),
    backgroundColor: "#44CE91",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(12),
  },

  recentSearchesText: {
    fontSize: RFValue(20),
    color: "#fff",
    fontFamily: "Medium",
  },
  norecentSearchesText: {
    color: "#919191",
    fontFamily: "RegularText",
    fontSize: RFValue(12),
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 50,
  },
  recentSearchUpperContainer: {
    width: WIDTH - RFValue(30),
    backgroundColor: "#fff",
    marginTop: RFValue(150),
    alignSelf: "center",
    marginBottom: RFValue(50),
  },
});
