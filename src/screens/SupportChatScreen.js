import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Feather, Entypo, Octicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Chat from "../components/Chat";
import Device from "../../src/constants/device";
import { axiosDELETECall, axiosPUTCall } from "../utils/axios.js"; // POST function for axios
import simpleAlertCall from "../utils/alerts";
import { useSelector } from "react-redux";

const WIDTH = Dimensions.get("window").width;
export default function SupportChatScreen({ navigation, route }) {
  const { ticket, ticketId, status } = route.params;
  const [showPopup, setShowPopup] = useState(false);
  const userData = useSelector((state) => state?.loginDetails);

  const TicketConf = (type) => {
    setShowPopup(false);
    var message =
      type == 1
        ? "Do you want to delete the ticket?"
        : "Do you want to close the ticket?";
    Alert.alert(message, "", [
      {
        text: "Yes",
        onPress: () => {
          if (type == 1) {
            DeleteTicketFun();
          } else {
            CloseTicketFun();
          }
        },
        style: "destructive",
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };
  const DeleteTicketFun = () => {
    var Token = userData?.Authorization;
    const url = "/ticket/" + ticketId;
    axiosDELETECall(url, Token, (callBack) => {
      console.log(
        "🚀 ~ file: SupportChatScreen.js:31 ~ axiosDELETECall ~ callBack:",
        callBack
      );
      if (callBack?.status == 200) {
        simpleAlertCall(callBack?.data, () => {
          navigation.goBack();
        });
      } else {
        alert("Something wrong.");
      }
    });
  };
  const CloseTicketFun = () => {
    var Token = userData?.Authorization;
    const url = "/ticket/close/" + ticketId;
    axiosPUTCall(url, {}, Token, (callBack) => {
      console.log(
        "🚀 ~ file: SupportChatScreen.js:31 ~ axiosDELETECall ~ callBack:",
        callBack
      );
      if (callBack?.status == 200) {
        simpleAlertCall(callBack?.data, () => {
          navigation.goBack();
        });
      } else {
        alert("Something wrong.");
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

        <Text
          style={[
            styles.headerTitle,
            {
              width: "65%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            },
          ]}
        >
          <Text
            style={{
              ...styles.headerTitle,
              fontFamily: "SemiBold",
            }}
            numberOfLines={1}
          >
            {ticket}
          </Text>
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setShowPopup(true);
          }}
        >
          <Entypo name="dots-three-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Chat ticketId={ticketId} status={status} />
      {showPopup && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowPopup(false)}
          style={styles.popUpContainer}
        >
          <View style={styles.popUp}>
            <TouchableOpacity
              onPress={() => TicketConf(2)}
              activeOpacity={0.5}
              style={{
                borderBottomWidth: 1,

                paddingVertical: 13,
                width: 150,
                alignItems: "center",
              }}
            >
              <Text style={styles.popUpText}>Close Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => TicketConf(1)}
              style={{
                paddingVertical: 13,
                width: 150,
                alignItems: "center",
              }}
            >
              <Text style={styles.popUpText}>Delete Ticket</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
  underHeaderContainer: {
    width: WIDTH,
    height: RFValue(22),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F6F6F",
    paddingBottom: 2,
  },

  dangerContainer: {
    width: WIDTH - RFValue(50),
    height: RFValue(50),
    padding: 2,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: RFValue(24),
    backgroundColor: "#44CE91",
    alignItems: "center",
    justifyContent: "center",
  },
  dangerIcon: {
    width: RFValue(20),
    height: RFValue(20),
    tintColor: "#000",
    marginRight: RFValue(5),
  },
  dangerLine: {
    fontSize: RFValue(12),
    color: "#fff",
    fontFamily: "RegularText",
  },

  totalResults: {
    color: "#000",
    fontFamily: "Medium",
    fontSize: RFValue(16),
    marginTop: RFValue(14),
    marginLeft: RFValue(24),
  },
  itemContainer: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RFValue(12),
    width: WIDTH - RFValue(40),
    padding: RFValue(12),
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  name: {
    fontSize: RFValue(13),
    color: "#000",
    fontFamily: "SemiBold",
    marginBottom: RFValue(5),
  },
  age: {
    color: "#8C929B",
    fontSize: RFValue(12),
    fontFamily: "RegularText",
  },

  viewReportContainer: {
    width: RFValue(90),
    height: RFValue(22),
    borderRadius: 20,
    backgroundColor: "#44CE91",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(6),
    paddingBottom: 2,
  },
  viewReportText: {
    fontSize: RFValue(12),
    color: "#fff",
    fontFamily: "BoldText",
  },
  itemRight: {
    flexDirection: "row",

    width: WIDTH / 2.7,
  },
  popUpContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    position: "absolute",
  },
  popUp: {
    position: "absolute",
    height: 100,
    width: 150,
    backgroundColor: "white",
    right: 35,
    top:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15 + RFValue(50)
        : Device.STATUS_BAR_HEIGHT + 20 + RFValue(35),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    alignItems: "center",
    // justifyContent: "center",
  },
  popUpText: { fontSize: 18 },
});
