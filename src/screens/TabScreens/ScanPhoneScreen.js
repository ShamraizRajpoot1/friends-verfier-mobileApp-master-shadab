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
import { Image } from "react-native";
import Modal1 from "../../components/Modal1";

const WIDTH = Dimensions.get("window").width;

export default function ScanPhoneScreen({ navigation }) {
  const userData = useSelector((state) => state?.loginDetails);
  const [filteredList, setFilteredList] = new useState([]);
  const [input, setInput] = useState("");
  const [isPermitted, setIsPermitted] = useState(false);
  const [contactsState, setContactsState] = useState([]);
  const [isTab1Active, setTab1Active] = useState(true);
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState();
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
    // <View
    //   style={{
    //     justifyContent: "center",
    //     alignItems: "center",
    //     paddingHorizontal: 10,
    //     top: 150,
    //   }}
    // >
    <View style={styles.searchByContactContainer}>
      <Image
        style={{ ...styles.iconinvite }}
        source={require("../../assets/icons/invitesearch.png")}
      />

      <Text style={styles.boxtitle}>Search Your Saved Contacts</Text>

      <Text
        style={{
          ...styles.topText,
          marginTop: RFValue(14),
          fontSize: RFValue(12),
        }}
      >
        Reverse search any saved contact
      </Text>
      <Text
        style={{
          ...styles.topText,
          fontSize: RFValue(12),
        }}
      >
        number. Each search is done on a
      </Text>
      <Text
        style={{
          ...styles.topText,
          fontSize: RFValue(12),
        }}
      >
        per-instance basis.
      </Text>

      <TouchableOpacity
        onPress={getPermission}
        // onPress={givePermission}
        style={styles.searchbyContactbutton}
      >
        <Text style={{ ...styles.boxtitle, marginTop: 0 }}>Continue</Text>
      </TouchableOpacity>
    </View>
    //   {/* <Text style={{ textAlign: "center", fontSize: 14 }}>
    //     By using the contact search feature, you can swiftly perform a reverse
    //     phone lookup on someone stored in your contact list. Rest assured, we
    //     never store your contacts on our servers. This process is handled on a
    //     per-case basis, and you have the freedom to revoke access at any time,
    //     with all other functionalities remaining unaffected.
    //   </Text>
    //   <TouchableOpacity
    //     activeOpacity={0.5}
    //     onPress={getPermission}
    //     style={{
    //       height: 50,
    //       width: "50%",
    //       borderRadius: 5,
    //       backgroundColor: "#dddadb",
    //       alignItems: "center",
    //       justifyContent: "center",
    //       marginTop: 40,
    //     }}
    //   >
    //     <Text>Grant Access</Text>
    //   </TouchableOpacity> */}
    // {/* </View> */}
  );
  const toggle = () => {
    setModal((prev) => !prev);
  };
  const toggle1 = () => {
    setResult(true);
    setModal((prev) => !prev);
  };
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
        <Pressable onPress={() => navigation.navigate("InviteEmptyScreen")}>
          <Image
            source={require("../../assets/icons/inviteicon.png")}
            style={styles.icon}
          />
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
        ></TouchableOpacity>
        <View style={styles.topTab}>
          <TouchableOpacity
            style={isTab1Active ? styles.topTabbtn : styles.topTabbtn2}
            disabled
            // onPress={() => {
            //   setTab1Active(true);
            //   // Additional logic or navigation can be added here
            // }}
          >
            <Text
              style={isTab1Active ? styles.tabactiveText : styles.inActiveText}
            >
              Criminal Screening
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            disabled={!isPermitted}
            style={!isTab1Active ? styles.topTabbtn : styles.topTabbtn2}
            onPress={() => {
              setTab1Active(false);
              // Additional logic or navigation can be added here
            }}
          >
            <Text
              style={!isTab1Active ? styles.tabactiveText : styles.inActiveText}
            >
              Sex Offender Screening
            </Text>
          </TouchableOpacity> */}
        </View>
        {isTab1Active ? (
          <View>
            <View style={{ marginTop: RFValue(20) }}>
              <View style={[styles.paragraph]}>
                <View style={styles.heading}>
                  <Image
                    source={require("../../assets/icons/copcar.png")}
                    style={styles.do}
                  />
                  <Text style={styles.title}>Criminal Screening</Text>
                </View>

                <Text style={[styles.subtitle, { marginTop: RFValue(5) }]}>
                  Reverse-search the saved phone
                </Text>
                <Text style={styles.subtitle}>
                  numbers for each of your contacts to
                </Text>
                <Text style={styles.subtitle}>
                  screen them for criminal records.
                </Text>
              </View>
            </View>
            {isPermitted ? (
              <View style={{ ...styles.textinputCOntainer }}>
                <Ionicons
                  name="search-sharp"
                  size={24}
                  color="rgba(0,0,0,0.5)"
                />
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
              </View>
            ) : null}

            {isFocused && (
              <>
                {isPermitted ? (
                  <ContactsList
                    dataArray={contactsState}
                    navigation={navigation}
                  />
                ) : (
                  <AccessComp />
                )}
              </>
            )}
          </View>
        ) : (
          <View>
            <View style={[styles.paragraph, { height: RFValue(125) }]}>
              <View style={styles.heading}>
                <Image
                  source={require("../../assets/icons/alerticon.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>Sex Offender Screening</Text>
              </View>

              <Text
                style={[
                  styles.subtitle,
                  { marginTop: RFValue(5), textAlign: "center" },
                ]}
              >
                Scan your entire contacts list for{"\n"}
                potential sex offenders. The accuracy{"\n"}
                of each match depends on how{"\n"}
                complete the information is saved in{"\n"}
                your contacts.{"\n"}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.innerRow}>
                <View style={[styles.box, { backgroundColor: "#FFEC01" }]} />
                <Text style={styles.small}>Just Name</Text>
              </View>
              <View style={styles.innerRow}>
                <View style={[styles.box, { backgroundColor: "#FFAC00" }]} />
                <Text style={styles.small}>Name and Location</Text>
              </View>
              <View style={styles.innerRow}>
                <View style={[styles.box, { backgroundColor: "#FF0116" }]} />
                <Text style={styles.small}>Name, Location & DOB</Text>
              </View>
            </View>
            {result ? (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#07B341" }]}
                onPress={toggle}
              >
                <Text style={styles.btnText}>View Results</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={toggle}>
                <Text style={styles.btnText}>Scan Contacts</Text>
              </TouchableOpacity>
            )}

            {modal && <Modal1 onBackdropPress={toggle} onPress={toggle1} />}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "7%",
    marginTop: RFValue(8),
  },
  box: {
    width: RFValue(12),
    height: RFValue(12),
    backgroundColor: "#000000",
  },
  small: {
    fontSize: RFValue(9),
    color: "rgba(0,0,0,0.8)",
    marginLeft: "5%",
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#315A9C",
    width: "90%",
    alignSelf: "center",
    height: RFValue(43),
    marginTop: WIDTH / 2.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(10),
  },
  btnText: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "BoldText",
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
  heading: {
    backgroundColor: "#F5F5F5",
    width: WIDTH - RFValue(50),
    height: RFValue(30),
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: RFValue(12),
  },
  do: {
    alignSelf: "center",
    width: RFValue(16),
    height: RFValue(16),
    marginRight: RFValue(5),
    marginLeft: RFValue(5),
  },
  paragraph: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "#FCFCFC",
    elevation: 4,
    borderWidth: 0,
    height: RFValue(100),
    borderRadius: RFValue(10),
    marginTop: RFValue(10),

    marginHorizontal: RFValue(25),
  },
  title: {
    marginLeft: RFValue(5),
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
  },
  subtitle: {
    marginHorizontal: RFValue(10),
    fontSize: RFValue(14),
    color: "#000000",

    textAlign: "left",
    // marginLeft: RFValue(40),
    alignSelf: "center",
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
  icon: {
    height: RFValue(20),
    width: RFValue(20),
  },
  topText: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "RegularText",
    textAlign: "center",
    marginBottom: 0,
  },
  topTab: {
    flexDirection: "row",
    height: RFValue(40),
    width: WIDTH,
    //backgroundColor: "#ebebeb",
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    marginLeft: '12%'
    // justifyContent: "space-evenly",
    // borderColor: "#cecbd5",
    // borderWidth: 0.5,
  },
  topTabbtn: {
    height: "80%",
    backgroundColor: "#E8EFFF",
    borderRadius: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
  },
  topTabbtn2: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
  },
  tabactiveText: {
    fontFamily: "BoldText",
    fontWeight: "RegularText",
    color: "#000000",
    fontSize: RFValue(12),
  },
  inActiveText: {
    fontFamily: "BoldText",
    fontWeight: "RegularText",
    color: "#000000",
    fontSize: RFValue(12),
  },
  textinputCOntainer: {
    marginTop: RFValue(20),
    width: WIDTH - RFValue(80),
    height: RFValue(30),
    alignSelf: "center",
    backgroundColor: "#F3F3F3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(10),
    shadowColor: "#000",
    borderRadius: RFValue(10),
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
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // // borderBottomWidth: 1,
    // elevation: 3,
  },
  searchByContactContainer: {
    width: WIDTH - RFValue(90),
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 20,
  },
  iconinvite: {
    width: RFValue(24),
    height: RFValue(24),
    alignSelf: "center",
  },

  boxtitle: {
    fontSize: RFValue(11),
    fontFamily: "BoldText",
    color: "#000",
    textAlign: "center",
    marginTop: RFValue(8),
  },
  searchbyContactbutton: {
    width: WIDTH / 2,
    padding: RFValue(5),
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: RFValue(20),
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
