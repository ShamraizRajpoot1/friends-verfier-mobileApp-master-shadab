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
  Image,
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
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
export default function SupportTicketScreen({ navigation }) {
  const selectRef = React.useRef(null);

  const userData = useSelector((state) => state?.loginDetails);
  const [list, setList] = useState([]);
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const isFocused = useIsFocused();

  const DATA = [
    {
      id: "1",
      date: "12/01/2022",
      subtitle: "Ticket # 101010101",
      status: "Open",
    },
    {
      id: "2",
      date: "11/21/2022",
      subtitle: "Ticket # 101010102",
      status: "Closed",
    },
  ];

  const getTickets = () => {
    var Token = userData?.Authorization;
    var url = `ticket/list`;
    var obj = {
      subject: "Shadab",
      comment: "some comment",
    };
    axiosGETCall(url, Token, (callBack) => {
      setList(callBack?.data);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getTickets();
    }
  }, [isFocused]);

  const createTicket = () => {
    navigation.navigate("CreateTicket");
    // setShowModal(true);
    // axiosPOSTCall(url, obj, Token, (callBack) => {
    // })
  };

  const renderItem = ({ item }) => {
    console.log(
      "🚀 ~ file: SupportTicketScreen.js:73 ~ SupportTicketScreen ~ item:",
      JSON.stringify(item)
    );
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          console.log(
            "🚀 ~ file: SupportTicketScreen.js:90 ~ renderItem ~ JSON.stringify(item):",
            JSON.stringify(item)
          );
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

          <Text numberOfLines={4} style={styles.subtitle}>
            {item.raw_subject}
          </Text>

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
          getTickets();
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
            Support Tickets
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View>

      <TouchableOpacity
        onPress={createTicket}
        style={styles.createTicketButton}
      >
        <Text style={styles.createTicketText}>Create Ticket</Text>
      </TouchableOpacity>
      <View style={[styles.heading,{marginLeft: RFValue(20),marginTop:RFValue(60)}]}>
              <Image
                source={require("../assets/icons/openticket.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Open Tickets</Text>
            </View>
            <View style={[styles.heading,{marginLeft: RFValue(20),marginTop:RFValue(45), marginBottom: RFValue(15),}]}>
              <Image
                source={require("../assets/icons/supporticon1.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Ticket Topic</Text>
            </View>
                 
      <View style={{marginBottom: RFValue(50),}}>
        {/* <Text>{JSON.stringify(list)}</Text> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 300 }}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* <View style={{ marginBottom: 1000 }} /> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "height" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0, backgroundColor: "#fff" }}
          bounces={true}
        >
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={showModal}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            <View style={styles.homeHeader}>
              <Entypo
                onPress={() => setShowModal(false)}
                name="chevron-thin-left"
                size={24}
                color="#fff"
              />

              <Text style={styles.headerTitle}>
                <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
                  Support
                </Text>
              </Text>
              <Pressable>
                <Feather name="menu" size={24} color="#305A9C" />
              </Pressable>
            </View>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <View style={{ marginVertical: 40 }}>
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
                            fontSize: RFValue(14),
                            color: "#000",
                            fontFamily: "RegularText",
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
                  <View style={[styles.textinputCOntainer, { height: 320 }]}>
                    <TextInput
                      style={{
                        textAlignVertical: "top",
                        height: 300,
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
                  height: 50,
                  width: WIDTH / 2,
                  borderRadius: 10,
                  backgroundColor: "#43ce91",
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
              {/* <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ color: "blue" }}>Cancel</Text>
          </TouchableOpacity> */}
            </View>

            {/* <View
          style={{
            height: "100%",
            width: "100%",
            // backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
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
            }}
          >
            <TextInput
              style={{
                width: WIDTH - RFValue(80),
                height: RFValue(50),
                marginLeft: RFValue(5),
                fontSize: RFValue(14),
                fontFamily: "RegularText",
                color: "#000",
              }}
              onChangeText={setSubject}
              value={subject}
              placeholder="Subject"
              placeholderTextColor={"#000"}
            />
          </View>
          <View
            style={{
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
            }}
          >
            <TextInput
              style={{
                width: WIDTH - RFValue(80),
                height: RFValue(50),
                marginLeft: RFValue(5),
                fontSize: RFValue(14),
                fontFamily: "RegularText",
                color: "#000",
              }}
              onChangeText={setComment}
              value={comment}
              placeholder="Comment"
              placeholderTextColor={"#000"}
            />
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              width: WIDTH - RFValue(24),
              borderRadius: 10,
              backgroundColor: "#43ce91",
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
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ color: "blue" }}>Cancel</Text>
          </TouchableOpacity>
        </View> */}
          </Modal>
        </ScrollView>
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
    height: RFValue(50),
    alignSelf: "center",
    backgroundColor: "#F8F8F8",
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
    paddingTop: 10,
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
  heading: {
    backgroundColor: "#F5F5F5",
    width: WIDTH - RFValue(55),
    height: RFValue(28),
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: RFValue(12),
  },
  do: {
    width: RFValue(12),
    height: RFValue(12),
    marginRight: RFValue(5),
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
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
    // marginLeft: RFValue(40),
  },
  // subtitle: {
  //   fontSize: RFValue(15),
  //   color: "#000",
  //   fontFamily: "Medium",
  //   textAlign: "left",
  //   marginLeft: RFValue(40),
  //   marginTop: RFValue(10),
  // },

  faqsText: {
    fontSize: RFValue(16),
    color: "#000",
    fontFamily: "Medium",
    textAlign: "center",
  },
  supportItemContainer: {
    width: WIDTH - RFValue(58),
    padding: RFValue(10),
    paddingTop:RFValue(5),
    paddingBottom:0,
    elevation:4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginLeft:RFValue(23),
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: RFValue(20),
  },
  createTicketButton: {
    width: WIDTH - RFValue(40),
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(10),
    backgroundColor: "#315A9C",
    alignSelf: "center",
    marginTop: RFValue(24),
  },

  createTicketText: {
    fontSize: RFValue(12),
    color: "#fff",
    fontFamily: "SemiBold",
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
    fontSize: RFValue(12),
    fontFamily: "SemiBold",
    color: "#363535",
  },
  subtitle: {
    color: "rgba(0,0,0,0.7)",
    fontSize: RFValue(10),
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
    fontSize:RFValue(10),
    color: "#FFFFFF",
    fontFamily: "SemiBold",
  },
  viewButtonContainer: {
    width: '108%',
    marginLeft:'-4%',
    height: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: RFValue(3),
    borderBottomLeftRadius: RFValue(3),
    borderWidth: 1,
    backgroundColor:'#32589B',
    borderColor: "#33599C",
    marginTop: RFValue(10),
  },
  itemLeftContainer: {
    width: "100%",
    height:RFValue(40)
  },
});
