/** @format */

import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Platform,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import SelectPicker from "react-native-form-select-picker";
import SearchScreen from "../SearchScreen";
import { axiosGETCall } from "../../utils/axios.js";
import { useSelector } from "react-redux";
import simpleAlertCall from "../../utils/alerts";
import Device from "../../../src/constants/device";
import { useIsFocused } from "@react-navigation/native";
import GetRecentSearcheAPI from "../TabScreens/GetRecentSearchAPI";

const HIEGHT = Dimensions.get("window").height;
const options1 = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];

const WIDTH = Dimensions.get("window").width;
export default function HomeScreen({ navigation, route }) {
  const selectRef = React.useRef(null);
  const userData = useSelector((state) => state?.loginDetails);
  const [selected, setSelected] = React.useState();
  const [fname, onChangefName] = React.useState(__DEV__ ? "John" : "");
  const [lname, onChangelName] = React.useState(__DEV__ ? "Doe" : "");
  const [mname, onChangemName] = React.useState("");
  const [age, onChangeage] = React.useState("");
  const [city, onChangeCity] = React.useState("");
  const [display, setDisplay] = React.useState("none");
  const [color, setColor] = React.useState("#44CE91");
  const [Loading, setLoading] = React.useState(false);
  const [options, setOptions] = useState(options1);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS == "android") {
      options1.unshift({
        name: "All States",
        abbreviation: "",
      });
      setOptions(options1);
    }
  }, []);

  useEffect(() => {
    if (isFocused && !__DEV__) {
      if (!route?.params?.refine) {
        onChangefName("");
        onChangelName("");
        onChangemName("");
        onChangeage("");
        onChangeCity("");
        setDisplay("none");
        setSelected();
        setOptions([]);
        setTimeout(() => {
          setOptions(options1);
        }, 10);
      }
      if (userData?.hasOwnProperty("Authorization")) {
        GetStatus();
      }
    }
  }, [isFocused, userData]);

  const GetStatus = () => {
    if (userData?.hasOwnProperty("Authorization")) {
      var url = "/user/" + userData?.data?._id;
      var token = userData?.Authorization;
      axiosGETCall(url, token, (callBack) => {
        if (callBack?.status == 200) {
          if (!callBack?.data?.toc) {
            navigation.replace("TermsScreen", { notBTN: 1 });
          }
        }
        setLoading(false);
      });
    }
  };

  const onPressFilter = () => {
    if (display === "none" && color === "#44CE91") {
      setDisplay("flex");
      setColor("#A2A4A8");
    } else {
      setDisplay("none");
      setColor("#44CE91");
      onChangemName("");
      onChangeage("");
    }
  };

  const [showModal, setShowModal] = React.useState(false);
  const onPressModal = () => {
    if (!fname) {
      simpleAlertCall("Please enter your first name.", () => {});
      return;
    }
    if (!lname) {
      simpleAlertCall("First & Last Name is required.", () => {});
      return;
    }
    var fields = [];
    if (fname) {
      fields.push({ firstName: fname });
    }
    if (mname) {
      fields.push({ midName: mname });
    }
    if (lname) {
      fields.push({ lastName: lname });
    }
    if (city) {
      fields.push({ city: city });
    }
    if (age) {
      fields.push({ age: age });
    }
    if (selected) {
      fields.push({ state: selected });
    }

    var obj = {
      fields: fields,
    };

    if (
      (fname.trim() == "Joe" && lname.trim() == "Penora") ||
      (fname.trim() == "Joseph" && lname.trim() == "Penora")
    ) {
      Alert.alert(
        "🐝 Alert 🐝",
        "Puffy is good, but Wu-Tang is the best. Wu-Tang is for the children!",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }
    const data = options.find((items) => {
      return items.abbreviation == selected;
    });
    navigation.navigate("ResultsScreen", {
      obj: obj,
      selected: data?.name,
      city: city,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Pressable
          style={{}}
          onPress={() => navigation.navigate("SideMenuScreen")}
        >
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
            <View style={styles.textinputCOntainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangefName}
                value={fname}
                placeholder="First Name"
                placeholderTextColor={"#000"}
              />

              <TouchableOpacity
                onPress={() => onChangefName("")}
                style={styles.crossButton}
              >
                <Feather name="x" size={19} color="#898F96" />
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.textinputCOntainer, display: display }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangemName}
                value={mname}
                placeholder="Middle Initial"
                placeholderTextColor={"#000"}
              />

              <TouchableOpacity
                onPress={() => onChangemName("")}
                style={styles.crossButton}
              >
                <Feather name="x" size={19} color="#898F96" />
              </TouchableOpacity>
            </View>

            <View style={styles.textinputCOntainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangelName}
                value={lname}
                placeholder="Last Name"
                placeholderTextColor={"#000"}
              />

              <TouchableOpacity
                onPress={() => onChangelName("")}
                style={styles.crossButton}
              >
                <Feather name="x" size={19} color="#898F96" />
              </TouchableOpacity>
            </View>

            <View style={styles.textinputCOntainer}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeCity}
                value={city}
                placeholder="City"
                placeholderTextColor={"#000"}
              />

              <TouchableOpacity
                onPress={() => onChangeCity("")}
                style={styles.crossButton}
              >
                <Feather name="x" size={19} color="#898F96" />
              </TouchableOpacity>
            </View>

            <View style={styles.textinputCOntainer}>
              <TouchableOpacity>
                {options.length > 0 && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <SelectPicker
                      ref={selectRef}
                      dismissable={true}
                      style={styles.stateInput}
                      placeholder="All States"
                      onSelectedStyle={{
                        fontSize: RFValue(12),
                        color: "#000",
                        fontFamily: "RegularText",
                      }}
                      placeholderStyle={{
                        fontSize: RFValue(12),
                        color: "#000",
                        fontFamily: "RegularText",
                      }}
                      onValueChange={(value, label) => {
                        setSelected(value);
                      }}
                    >
                      {Object.values(options).map((val, index) => (
                        <SelectPicker.Item
                          label={val?.name}
                          value={val?.abbreviation}
                          key={index}
                        />
                      ))}
                    </SelectPicker>
                    <TouchableOpacity
                      onPress={(val) => {
                        // setSelected(val)
                        selectRef?.current?.stateSet({ visible: true });
                      }}
                    >
                      <Entypo name="chevron-down" size={28} color="#A0A5AA" />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.textinputCOntainer, display: display }}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeage}
                value={age}
                keyboardType="number-pad"
                placeholder="Age"
                placeholderTextColor={"#000"}
              />

              <TouchableOpacity
                onPress={() => onChangeage("")}
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
              {Loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Search</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPressFilter}
              style={{
                ...styles.filterButtonContainer,
                backgroundColor: color,
              }}
              activeOpacity={0.5}
            >
              <Image
                style={styles.filterIcon}
                source={require("../../assets/icons/filter.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <GetRecentSearcheAPI />
      </ScrollView>
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <SearchScreen screen={1} />
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputAndSeachBtnContainer: {
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
  text: {
    color: "#3f2949",
    marginTop: 10,
  },

  homeHeader: {
    width: WIDTH,
    height: HIEGHT/8,
    backgroundColor: "#305A9C",
    paddingHorizontal: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT 
        : Device.STATUS_BAR_HEIGHT + 20,
    alignItems: "center",
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
    height: RFValue(38),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
   paddingHorizontal: RFValue(5),
    marginBottom: RFValue(7),
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
    width: WIDTH - RFValue(65),
    height: RFValue(40),
    marginLeft: RFValue(5),
    fontSize: RFValue(12),
    fontFamily: "RegularText",
    color: "#000",
  },

  stateInput: {
    width: WIDTH - RFValue(62),

    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#000",
  },

  crossButton: {
    width: RFValue(23),
    height: RFValue(23),
    borderRadius: 20,
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
  },
  HomeInputsContainer: {
    marginTop: RFValue(15),
  },
  icon:{
    height: RFValue(20),
    width: RFValue(20),
  },
  searchButton: {
    width: WIDTH - RFValue(70),
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
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#44CE91",
    marginLeft: RFValue(7),
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(11),
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

    marginTop: RFValue(30),
    alignSelf: "center",
    marginBottom: RFValue(100),
  },
});
