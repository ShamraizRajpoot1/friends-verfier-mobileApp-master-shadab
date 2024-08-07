import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
  Pressable,
  Platform,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../src/constants/device";
import { axiosPOSTCall, axiosGETCall } from "../utils/axios.js";
import { useSelector } from "react-redux";
import moment from "moment";
import simpleAlertCall from "../utils/alerts";
import SelectPicker from "react-native-form-select-picker";
import { Image } from "react-native";

const WIDTH = Dimensions.get("window").width;
export default function CreateTicket({ navigation }) {
  const selectRef = React.useRef(null);

  const userData = useSelector((state) => state?.loginDetails);
  const [list, setList] = useState([]);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(
            "SupportChatScreen",

            {
              ticket: item?.subject,
              ticketId: item?.id,
              status: item?.status,
            }
          );
        }}
        style={styles.supportItemContainer}
      >
        <View style={styles.itemLeftContainer}>
          <Text style={styles.date}>
            {moment(item?.updated_at).format("DD/MM/YYYY")}
          </Text>

          <Text style={styles.subtitle}>{item.raw_subject}</Text>

          <View
            style={{
              ...styles.openCloseButton,
              backgroundColor: item.status === "new" ? "#4DFA6D" : "#CDCBCC",
            }}
          >
            <Text style={styles.statusText}>{item?.status}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            //   navigation.navigate(
            //     "SupportChatScreen",

            //     {
            //       ticket: item.subtitle,
            //     }
            //   )
            navigation.navigate(
              "SupportChatScreen",

              {
                ticket: item?.subject,
                ticketId: item?.id,
                status: item?.status,
              }
            );
          }}
          activeOpacity={0.5}
          style={styles.viewButtonContainer}
        >
          <Text style={styles.statusText}>View</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const SubmitFun = () => {
    if (!subject) {
      simpleAlertCall("Please enter subject", () => {});
      return;
    }
    if (!comment) {
      simpleAlertCall("Please enter your comment", () => {});
      return;
    }
    var url = `/ticket/createNew`;
    var Token = userData?.Authorization;
    var obj = {
      subject: subject,
      comment: comment,
    };
    setLoadingSubmit(true);
    axiosPOSTCall(url, obj, Token, (callBack) => {
      setLoadingSubmit(false);

      if (callBack.status == 200) {
        simpleAlertCall("Ticket generated successfully.", () => {
          //   getTickets();
          navigation.goBack();
        });
        setShowModal(false);
      }
    });
  };

  const options = [
    {
      name: "Feature Request",
      abbreviation: "Feature Request",
    },
    {
      name: "Technical Question",
      abbreviation: "Technical Question",
    },
    {
      name: "System Bug",
      abbreviation: "System Bug",
    },
    {
      name: "User Interface Bug",
      abbreviation: "User Interface Bug",
    },
    {
      name: "Database / Background Check Questions",
      abbreviation: "Database / Background Check Questions",
    },
    {
      name: "Feedback & Testimonials",
      abbreviation: "Feedback & Testimonials",
    },
    {
      name: "General Support",
      abbreviation: "General Support",
    },
    {
      name: "Billing Question",
      abbreviation: "Billing Question",
    },
    {
      name: "Change or Update My Subscription",
      abbreviation: "Change or Update My Subscription",
    },
    {
      name: "Partnership Request",
      abbreviation: "Partnership Request",
    },
    {
      name: "Contact CEO",
      abbreviation: "Contact CEO",
    },
    {
      name: "Privacy Question",
      abbreviation: "Privacy Question",
    },
    {
      name: "Opt-Out",
      abbreviation: "Opt-Out",
    },
    {
      name: "Account Reinstatement",
      abbreviation: "Account Reinstatement",
    },
    {
      name: "Press",
      abbreviation: "Press",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
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
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            Create Ticket
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 0,
              backgroundColor: "#fff",
            }}
            bounces={false}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: RFValue(25),marginBottom:RFValue(16) }}>
                <View style={styles.textinputCOntainer}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      selectRef?.current?.stateSet({ visible: true })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "80%",
                        //paddingTop:RFValue()
                      }}
                    >
                      <View>
                        <Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
                          Topic
                        </Text>
                        <SelectPicker
                          ref={selectRef}
                          dismissable={true}
                          style={styles.stateInput}
                          placeholder="Please Pick"
                          onSelectedStyle={{
                            fontSize: RFValue(14),
                            color: "#000",
                            fontFamily: "RegularText",
                          }}
                          placeholderStyle={{
                            fontSize: RFValue(16),
                            color: "#000",
                           
                          }}
                          onValueChange={(value, label) => {
                            // Do anything you want with the value.
                            // For example, save in state.
                            setSubject(value);
                            // alert(value);
                          }}
                          // selected={selected?.name}
                        >
                          {/* {Platform.OS == "android" ? (
                  <SelectPicker.Item label={"All States"} value={""} key={-1} />
                ) : (
                  <></>
                )} */}
                          {Object.values(options).map((val, index) => (
                            <SelectPicker.Item
                              label={val?.name}
                              value={val?.abbreviation}
                              key={index}
                            />
                          ))}
                          {/* icon={} */}
                          {/* selected={} */}
                        </SelectPicker>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={(val) => {
                            // setSelected(val)
                            selectRef?.current?.stateSet({ visible: true });
                          }}
                        >
                          <Entypo
                            name="chevron-down"
                            size={28}
                            color="#A0A5AA"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={[styles.textinputCOntainer, { paddingTop: RFValue(20), height: 260 }]}>
                    <TextInput
                      style={{
                        textAlignVertical: "top",
                        height: 250,
                      }}
                      onChangeText={setComment}
                      value={comment}
                      placeholder="Message"
                      placeholderTextColor={"#6D6D6D"}
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  height: RFValue(30),
                  width: WIDTH / 1.19 ,
                  borderRadius: 10,
                  backgroundColor: "#315A9C",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={SubmitFun}
              >
                {loadingSubmit ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* <View style={{ marginBottom: 1000 }} /> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textinputCOntainer: {
    width: WIDTH - RFValue(35),
    height: RFValue(65),
    alignSelf: "center",
    backgroundColor: "#F8F8F8",
    paddingBottom:RFValue(5),
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
    paddingTop: RFValue(14),
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
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  topText: {
    fontFamily: "Heavy",
    fontSize: RFValue(36),
    color: "#000",
    alignSelf: "center",
    marginTop: RFValue(22),
  },

  title: {
    fontSize: RFValue(15),
    color: "#000",
    textDecorationLine: "underline",
    fontFamily: "RegularText",
    marginLeft: RFValue(40),
  },
  subtitle: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "Medium",
    textAlign: "left",
    marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },

  faqsText: {
    fontSize: RFValue(16),
    color: "#000",
    fontFamily: "Medium",
    textAlign: "center",
  },
  supportItemContainer: {
    width: WIDTH - RFValue(30),
    padding: RFValue(10),
    backgroundColor: "#F5F5F5",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: RFValue(15),
  },
  createTicketButton: {
    width: WIDTH - RFValue(50),
    height: RFValue(35),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#4079D4",
    alignSelf: "center",
    marginTop: RFValue(24),
  },

  createTicketText: {
    fontSize: RFValue(14),
    color: "#fff",
    fontFamily: "BoldText",
  },
  supportTicketTexts: {
    fontSize: RFValue(16),
    color: "#000",
    fontFamily: "SemiBold",
    marginHorizontal: RFValue(16),
    marginTop: RFValue(40),
    marginBottom: RFValue(18),
  },

  date: {
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#363535",
  },
  subtitle: {
    color: "#858585",
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    marginTop: RFValue(3),
  },
  openCloseButton: {
    width: RFValue(80),
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4DFA6D",
    marginTop: RFValue(10),
  },
  statusText: {
    color: "#7C7C7C",
    fontFamily: "SemiBold",
  },
  viewButtonContainer: {
    width: RFValue(80),
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7C7B7C",
    marginTop: RFValue(10),
  },
});
