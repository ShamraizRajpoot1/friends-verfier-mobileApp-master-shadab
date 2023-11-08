/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import ContactsList from "../../components/ContactsList";
import Device from "../../../src/constants/device";
import { PermissionsAndroid, Platform } from "react-native";
import Contacts from "react-native-contacts";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;

export default function ScanPhoneScreen({ navigation }) {
  const userData = useSelector((state) => state?.loginDetails);
  const [filteredList, setFilteredList] = new useState([]);
  const [input, setInput] = useState("");
  const [isPermitted, setIsPermitted] = useState(false);
  const [contactsState, setContactsState] = useState([]);

  useEffect(() => {
    if (Platform.OS == "ios") {
      requestContactsPermission();
    } else {
      CheckPermission();
    }
  }, []);

  const requestContactsPermission = () => {
    Contacts.checkPermission().then((permission) => {
      if (permission == "authorized") {
        phoneContact();
        setIsPermitted(true);
      }
    });
  };

  const CheckPermission = async () => {
    var status = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    if (status) {
      setIsPermitted(status);
      phoneContact();
    }
  };

  const getPermission = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
      })
        .then((res) => {
          if (res == "granted") {
            phoneContact();
            setIsPermitted(true);
          }
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      Contacts.requestPermission().then((permission) => {
        if (permission == "authorized") {
          phoneContact();
          setIsPermitted(true);
        }
      });
    }
  };

  const isFocused = useIsFocused();

  const phoneContact = () => {
    Contacts.getAll()
      .then((response) => {
        setContactsState(response);
        setFilteredList(response);
      })
      .catch((e) => {
        console.log(e);
        alert("Permission to access contacts was denied");
        console.warn("Permission to access contacts was denied");
      });
  };
  const filterBySearch = (searchText) => {
    // Access input value
    const query = searchText;
    // Create copy of item list
    var updatedList = [...filteredList];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item?.givenName?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setContactsState(updatedList);
  };

  const AccessComp = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        top: 150,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        By using the contact search feature, you can swiftly perform a reverse
        phone lookup on someone stored in your contact list. Rest assured, we
        never store your contacts on our servers. This process is handled on a
        per-case basis, and you have the freedom to revoke access at any time,
        with all other functionalities remaining unaffected.
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={getPermission}
        style={{
          height: 50,
          width: "50%",
          borderRadius: 5,
          backgroundColor: "#dddadb",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <Text>Grant Access</Text>
      </TouchableOpacity>
    </View>
  );

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
        <Text style={styles.headerTitle}>
          friend
          <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}>
            verifier
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={33} color="#305A9C" />
        </Pressable>
      </View>

      {!userData?.hasOwnProperty("Authorization") && (
        <View style={styles.underHeaderContainer}>
          <TouchableOpacity
            onPress={() => navigation.replace("LoginScreen")}
            activeOpacity={0.5}
            then
          >
            <Text style={styles.loginorcreateAccount}>
              login or create an account here
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.HomeInputsContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!userData?.hasOwnProperty("Authorization")) {
              Alert.alert(
                "Friend Verifier",
                "In order to perform a search you must be logged in. Please login or create an account.",
                [
                  {
                    text: "Login",
                    onPress: () => navigation.replace("LoginScreen"),
                  },
                  { text: "Cancel", onPress: () => {} },
                ]
              );
            }
          }}
        >
          <View style={styles.recentSearchesContainer}>
            <Text style={styles.recentSearchesText} onPress={getPermission}>
              SCAN A PHONE CONTACT
            </Text>
            <View />
          </View>
        </TouchableOpacity>
        <View style={{ ...styles.textinputCOntainer }}>
          <Ionicons name="search-sharp" size={24} color="#DDDDDD" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setInput(text);
              filterBySearch(text);
            }}
            value={input}
            placeholder="Quick Find"
            placeholderTextColor={"#000"}
          />

          <TouchableOpacity
            onPress={() => {
              if (isFocused) {
                PermissionsAndroid.check(
                  PermissionsAndroid.PERMISSIONS.READ_CONTACTS
                ).then((response) => {
                  if (response === true) {
                    setInput();
                  } else {
                  }
                });
              }
            }}
            style={styles.crossButton}
          >
            <Feather name="x" size={19} color="#898F96" />
          </TouchableOpacity>
        </View>
      </View>

      {isFocused && (
        <>
          {isPermitted ? (
            <ContactsList dataArray={contactsState} navigation={navigation} />
          ) : (
            <AccessComp />
          )}
        </>
      )}
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
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15
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
  textinputCOntainer: {
    width: WIDTH - RFValue(24),
    height: RFValue(50),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(10),
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
    width: WIDTH - RFValue(100),
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
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
  },
  HomeInputsContainer: {
    width: WIDTH,
    backgroundColor: "#fff",
    paddingTop: RFValue(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderBottomWidth: 1,
    borderBottomColor: "#CFCFCF",
    elevation: 3,
  },

  searchButton: {
    width: WIDTH - RFValue(30),
    height: RFValue(50),
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
    marginTop: RFValue(5),
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
    marginLeft: RFValue(15),
  },
  recentSearchesContainer: {
    width: WIDTH - RFValue(30),
    height: RFValue(40),
    backgroundColor: "#44CE91",
    borderRadius: 2,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: RFValue(12),
  },

  recentSearchesText: {
    fontSize: RFValue(18),
    letterSpacing: 1,
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
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#E5E5E5",
    marginTop: RFValue(150),
    alignSelf: "center",
    marginBottom: RFValue(50),
  },
});
