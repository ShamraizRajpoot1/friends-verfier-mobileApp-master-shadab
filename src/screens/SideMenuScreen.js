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
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { GetStorageItems } from "../utils/AsyncStorage";
const WIDTH = Dimensions.get("window").width;
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/action"; // Action function
import { axiosGETCall } from "../utils/axios.js";
import { useIsFocused } from "@react-navigation/native";
import { PermissionsAndroid, Platform } from "react-native";
import Device from "../../src/constants/device";
import DeviceInfo from "react-native-device-info";

export default function SideMenuScreen({ navigation }) {
  const userData = useSelector((state) => state?.loginDetails);
  const [isModalVisible, setModalVisible] = useState(false);
  const [planData, setPlanData] = useState({});
  const [freeSearch, setFreeSearch] = useState({});
  const isFocused = useIsFocused();
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userData?.data?.isSuperUser) {
      GetStorageItems("@loginDetails", (callBack) => {
        if (callBack?.Authorization) {
          var Token = userData?.Authorization;
          var url = "/getSearch";
          axiosGETCall(url, Token, (callBack) => {});
        }
      });
    }
  }, []);

  const logoutFun = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    dispatch(logOut({}));
  };

  const toggleModal = () => {
    setModalVisible(false);
    navigation.navigate("InviteEmptyScreen");
  };

  useEffect(() => {
    if (isFocused) {
      if (userData?.hasOwnProperty("Authorization")) {
        if (!userData?.data?.isSuperUser) {
          var Token = userData?.Authorization;
          var url = "/getSearch";
          axiosGETCall(url, Token, (callBack) => {
            if (callBack?.status == 200) {
              setTotalCount(callBack?.data?.totalSearch);
              setFreeSearch(callBack?.data);
              setPlanData(callBack?.data?.planId);
            }
          });
        }
      }
    }
  }, [userData, isFocused]);

  const PermissionAccessFunc = () => {
    if (Platform.OS === "android") {
      const granted = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ).then((res) => {
        if (res) {
          navigation.navigate("InviteDisplayScreen");
        } else {
          navigation.navigate("InviteEmptyScreen");
        }
      });
    } else {
      navigation.navigate("InviteDisplayScreen");
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
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-thin-left"
          size={24}
          color="#fff"
        />

        <Text style={styles.headerTitle}>
          friend
          <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}>
            verifier
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
        <View style={styles.underHeaderContainer}>
          <View style={styles.monthlyPlan}>
            {!userData?.hasOwnProperty("Authorization") ? (
              <View style={[styles.Login_acountContainer]}>
                <TouchableOpacity
                  onPress={() => navigation.replace("LoginScreen")}
                  activeOpacity={0.5}
                >
                  <Text style={styles.login_createAccount}>
                    Login or Create an Account
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={{ width: "70%" }}>
                  <Text style={styles.freeSearch}>
                    {userData?.data?.isSuperUser
                      ? "Super User"
                      : planData?.planType == "Per Background Check"
                      ? "Pay As You Go"
                      : (totalCount >= 0 ? totalCount : "-") +
                        " " +
                        "Remaining"}
                  </Text>
                  {userData?.data?.isSuperUser ? (
                    <Text>Free Access</Text>
                  ) : planData?.planType ? (
                    <TouchableOpacity
                      onPress={() =>
                        userData?.Authorization
                          ? navigation.navigate("SubscribeScreen")
                          : navigation.navigate("LoginScreen")
                      }
                      activeOpacity={0.5}
                    >
                      <Text style={styles.addSubscription}>
                        {/* Add Subscription */}${planData?.price} |{" "}
                        {planData?.planType}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        userData?.Authorization
                          ? navigation.navigate("SubscribeScreen")
                          : navigation.navigate("LoginScreen")
                      }
                      activeOpacity={0.5}
                    >
                      <Text style={styles.addSubscription}>
                        Add Subscription
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {!userData?.data?.isSuperUser && (
                  <View
                    style={{
                      width: "20%",
                      justifyContent: "center",
                      marginLeft: 30,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        paddingHorizontal: 0,
                        color: "black",
                      }}
                    >
                      {freeSearch?.freeSearches}
                    </Text>
                    <Text style={{ textAlign: "center" }}>Free</Text>
                  </View>
                )}
              </>
            )}
          </View>

          <View style={styles.blueBar} />

          <TouchableOpacity
            onPress={() =>
              userData?.Authorization
                ? navigation.navigate("SubscribeScreen")
                : navigation.navigate("LoginScreen")
            }
            style={styles.earnCheckButton}
            activeOpacity={0.5}
          >
            <Text style={styles.earnCheckText}>Subscriptions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <TouchableOpacity
            onPress={() => PermissionAccessFunc()}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              <Image
                style={{ width: RFValue(30), height: RFValue(30) }}
                source={require("../assets/icons/invite.png")}
              />

              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(17),
                  marginLeft: RFValue(25),
                }}
              >
                Invite Friends
              </Text>
            </View>

            <Entypo
              style={{ marginLeft: RFValue(10) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              userData?.Authorization
                ? navigation.navigate("AccountSelector")
                : navigation.navigate("LoginScreen");
            }}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              <Image
                style={{ width: RFValue(30), height: RFValue(30) }}
                source={require("../assets/icons/account.png")}
              />
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(17),
                  marginLeft: RFValue(25),
                }}
              >
                Account
              </Text>
            </View>
            <Entypo
              style={{ marginLeft: RFValue(10) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              <Image
                style={{ width: RFValue(30), height: RFValue(30) }}
                source={require("../assets/icons/notifi.png")}
              />
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(17),
                  marginLeft: RFValue(25),
                }}
              >
                Notification
              </Text>
            </View>
            <Entypo
              style={{ marginLeft: RFValue(10) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DoandDOntsScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              <Image
                style={{ width: RFValue(30), height: RFValue(30) }}
                source={require("../assets/icons/do.png")}
              />
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(17),
                  marginLeft: RFValue(25),
                }}
              >
                Do's & Don'ts
              </Text>
            </View>
            <Entypo
              style={{ marginLeft: RFValue(10) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SupportandLegalScreen")}
            activeOpacity={0.2}
            style={styles.itemContainer}
          >
            <View style={styles.listLeft}>
              <Image
                style={{ width: RFValue(30), height: RFValue(30) }}
                source={require("../assets/icons/support.png")}
              />
              <Text
                style={{
                  ...styles.addSubscription,
                  fontSize: RFValue(17),
                  marginLeft: RFValue(25),
                }}
              >
                Support & Legal
              </Text>
            </View>
            <Entypo
              style={{ marginLeft: RFValue(10) }}
              name="chevron-right"
              size={28}
              color="#C3C5D2"
            />
          </TouchableOpacity>
          {userData?.hasOwnProperty("Authorization") && (
            <TouchableOpacity
              onPress={logoutFun}
              activeOpacity={0.2}
              style={styles.itemContainer}
            >
              <View style={styles.listLeft}>
                <Image
                  style={{ width: RFValue(30), height: RFValue(30) }}
                  source={require("../assets/icons/logout.png")}
                />
                <Text
                  style={{
                    ...styles.addSubscription,
                    fontSize: RFValue(17),
                    marginLeft: RFValue(25),
                  }}
                >
                  Log Out
                </Text>
              </View>

              <Entypo
                style={{ marginLeft: RFValue(10) }}
                name="chevron-right"
                size={28}
                color="#C3C5D2"
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.footerText}>
          Friend Verifier Version {DeviceInfo.getVersion()}
        </Text>
        <Text style={styles.footerText}>
          Build Version: {DeviceInfo.getBuildNumber()}
        </Text>
      </ScrollView>

      <Modal
        backdropOpacity={0.6}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.seprator} />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={toggleModal}
              activeOpacity={0.5}
              style={styles.textinputCOntainer}
            >
              <Image
                style={styles.icon}
                source={require("../assets/icons/emailicon.png")}
              />
              <Text style={styles.emailmeCopy}>Invite Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              activeOpacity={0.5}
              style={styles.textinputCOntainer}
            >
              <Entypo
                style={styles.icon}
                name="circle-with-cross"
                size={24}
                color="#FF536F"
              />
              <Text style={{ ...styles.emailmeCopy, color: "#FF536F" }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: WIDTH - RFValue(30),
    borderRadius: 2,
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#F7F9FB",
    alignSelf: "center",
    marginTop: RFValue(12),
  },

  monthlyPlan: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },

  Login_acountContainer: {
    width: WIDTH - RFValue(30),
    borderRadius: 2,
    paddingVertical: RFValue(12),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#F7F9FB",
    alignSelf: "center",
    marginTop: RFValue(2),
  },
  login_createAccount: {
    fontSize: RFValue(16),
    textDecorationLine: "underline",
    fontFamily: "BoldText",
  },
  freeSearch: {
    color: "#000",
    fontFamily: "Medium",
    fontSize: RFValue(18),
  },
  addSubscription: {
    color: "#8C919F",
    fontFamily: "Medium",
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
    width: WIDTH - RFValue(50),
    justifyContent: "space-around",
    marginBottom: RFValue(50),
    alignSelf: "center",
  },
  listContainer: {
    marginTop: RFValue(35),
  },
  modalContainer: {
    width: WIDTH,
    height: "30%",
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
