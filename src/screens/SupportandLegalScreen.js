import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { loginDetails } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { UserInterfaceIdiom } from "expo-constants";
import { axiosDELETECall } from "../utils/axios";
import { EmptyStorage, GetStorageItems } from "../utils/AsyncStorage";
import { logOut } from "../redux/action";
import Device from "../../src/constants/device";

const WIDTH = Dimensions.get("window").width;

export default function SupportandLegalScreen({ navigation, data }) {
  const userData = useSelector((state) => state?.loginDetails);
  const [delAccount, setDelAccount] = useState([]);
  const dispatch = useDispatch();

  // console.log( "userData" ,userData);

  // const url = "/user/" + userData?.data?._id;
  // console.log( "hhhhhhhhh",userData?.data?._id);

  // Do not sell my info Alert Modal
  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      "Opt Out",
      //body
      `This info can be viewed in Safari, press ok to launch Safari`,
      [
        { text: "OK", onPress: () => console.log("Yes Pressed") },
        {
          text: "Close",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  const onPressDeleteAccount = () => {
    //function to make two option alert
    Alert.alert(
      //title
      "Are you Sure?",
      //body
      `Deleting your account you will losse all of your search history and settings`,
      [
        { text: "Delete", onPress: () => deleteAccount() },
        {
          text: "Cancel",
          onPress: () => console.log("No Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  const deleteAccount = () => {
    // GetStorageItems("@loginDetails");
    // console.log("ssssssss",GetStorageItems)
    // var userId = "userData?.Authorization;"
    var userid = userData?.data?._id;

    const url = "/user/" + userid;
    console.log("hhhhhhhhh", userid);

    axiosDELETECall(url, "", (callBack) => {
      // console.log("callback",callBack);
      console.log("callBack", callBack?.data);

      if (callBack?.status == 200) {
        alert("Your Account Deleted");
        dispatch(logOut({}));
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        });
      } else {
        alert(" Account Not Deleted");
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <View style={styles.homeHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Support and Legal
          <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}></Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <View style={styles.listContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("FaqScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(15),
                  color: "#000000",
                }}
              >
                FAQs
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(50) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("TermsScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              

              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(15),
                  color: "#000000",
                }}
              >
                Terms & Privacy Policy
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(50) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SupportTicketScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
             

              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(15),
                  color: "#000000",
                }}
              >
                Support Tickets
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(50) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>

          

          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicyScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
             

              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(15),
                  color: "#000000",
                }}
              >
                App Permissions
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(50) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate("SellInfo")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
             

              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(15),
                  color: "#000000",
                }}
              >
                Do Not Sell My Info
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(50) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressDeleteAccount}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
             

              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(14),
                  marginLeft: RFValue(15),
                  
                  color: "#FF0203",
                }}
              >
                Delete My Account
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(50) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
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
  seprator: {
    width: RFValue(45),
    height: 6,
    borderRadius: 5,
    backgroundColor: "#DBDBDB",
    alignSelf: "center",
    marginTop: RFValue(12),
  },
  homeHeader: {
    width: WIDTH,
    height: RFValue(90),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT 
        : Device.STATUS_BAR_HEIGHT + 20,

    // paddingTop:Platform.OS==='android'?0:RFValue(12),
  },

  headerTitle: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "Medium",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },

  underHeaderContainer: {
    width: WIDTH - RFValue(30),
    borderRadius: 2,
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#F7F9FB",
    alignSelf: "center",
    marginTop: RFValue(12),
  },
  freeSearch: {
    color: "#000",
    fontFamily: "Medium",
    fontSize: RFValue(18),
  },
  addSubscription: {
    color: "#373737",
    fontSize: RFValue(13),
  },
  footerText: {
    color: "#8C919F",
    fontFamily: "Medium",
    fontSize: RFValue(12),
    textAlign: "center",
    marginTop: RFValue(0),
  },
  blueBar: {
    width: WIDTH - RFValue(55),
    height: RFValue(8),
    backgroundColor: "#315A9C",
    alignSelf: "center",
    marginTop: RFValue(10),
  },
  earnCheckButton: {
    width: WIDTH - RFValue(55),
    height: RFValue(50),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#848997",
    marginTop: RFValue(12),
    marginBottom: 5,
  },
  earnCheckText: {
    color: "#848997",
    fontFamily: "Heavy",
    fontSize: RFValue(17),
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH / 1.8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH - RFValue(20),
    height:RFValue(40),
    justifyContent: "space-around",
    marginBottom: RFValue(10),
    alignSelf: 'flex-start',
    backgroundColor:'#F7F9FB',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  listContainer: {
    marginTop: RFValue(35),
  },
  modalContainer: {
    width: WIDTH,
    height: "40%",
    backgroundColor: "#fff",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 22,
    alignSelf: "center",
    position: "absolute",
    bottom: RFValue(-25),
  },
  textinputCOntainer: {
    width: WIDTH - RFValue(40),
    height: RFValue(55),
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(25),
    marginBottom: RFValue(14),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  icon: {
    width: RFValue(20),
    height: RFValue(20),
    marginRight: RFValue(20),
  },

  emailmeCopy: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "Medium",
  },
  buttonsContainer: {
    marginTop: RFValue(20),
  },
});
