import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";

const { width, height } = Dimensions.get("window");
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosGETCall, axiosPOSTCall } from "../utils/axios.js"; // POST function for axios
import { useSelector } from "react-redux";
import moment from "moment";

const Chat = ({ ticketId, status }) => {
  const userData = useSelector((state) => state?.loginDetails);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);
  // setTimeout(() => {
  //   flatListRef.current.scrollTo({
  //     x: 0,
  //     y: 0,
  //     animated: false,
  //   });
  //   // flatListRef.current.scrollToEnd();
  // }, 3000);

  useEffect(() => {
    if (userData?.hasOwnProperty("Authorization")) {
      getMessages();
    }
  }, []);

  const getMessages = async () => {
    var Token = userData?.Authorization;
    console.log("🚀 ~ file: Chat.js:47 ~ getMessages ~ Token:", ticketId);
    var url = "/ticket/getComments/" + ticketId;
    axiosGETCall(url, Token, (callBack) => {
      if (callBack.status == 200) {
        var messagesArr = callBack.data?.map((item, index) => {
          return {
            id: item?.id,
            sent:
              item?.via?.channel == "api"
                ? true
                : item?.via?.channel == "web"
                ? false
                : true,
            msg: item?.body,
            date_time: moment(item?.created_at).format("DD/MM/YYYY hh:mm A"),
            //   image: require("../images/player3.png"),
          };
        });
        setMessages(messagesArr);
        // setTimeout(() => {
        //   flatListRef.current.scrollToEnd({ animated: true });
        // }, 1000);
      }
    });
  };

  const send = () => {
    Keyboard.dismiss();
    // console.log("🚀 ~ file: Chat.js:97 ~ send ~ flatListRef:");
    flatListRef.current.scrollToEnd({ animated: true });
    // flatListRef.current.scrollToEnd();
    if (msg.length > 0) {
      var messagess = messages;
      messagess.push({
        id: Math.floor(Math.random() * 99999999999999999 + 0),
        sent: true,
        msg: msg,
        date_time: moment().format("DD/MM/YYYY hh:mm A"),
        // image: require("../images/player.png"),
      });
      // this.setState({ messages: messagess });
      setMessages(messagess);
      setMsg("");

      var url = `/ticket/createComment/` + ticketId;
      var Token = userData?.Authorization;
      console.log("🚀 ~ file: Chat.js:90 ~ send ~ url:", Token);
      var obj = {
        comment: msg,
      };

      axiosPOSTCall(url, obj, Token, (callBack) => {
        console.log(
          "🚀 ~ file: Chat.js:101 ~ axiosPOSTCall ~ callBack:",
          callBack
        );
        if (callBack?.status == 200) {
        }
      });

      // setTimeout(() => {
      //   reply();
      // }, 2000);
    }
  };

  const _renderItem = ({ item }) => {
    if (item.sent === false) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.eachMsg}>
            {/* <Image source={item.image} style={styles.userPic} /> */}
            <View style={styles.msgBlock}>
              <Text style={styles.msgTxt}>
                {/* I have a crazy ex-boyfriend, how{"\n"}
                often are your databases updates? */}
                {item.msg}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: RFValue(13),
              color: "#8E8E8E",
              fontFamily: "Medium",
              marginTop: RFValue(8),
              marginHorizontal: RFValue(35),
            }}
          >
            {/* 10:34 PM */}
            {item?.date_time}
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.rightMsg}>
            <View style={styles.rightBlock}>
              <Text style={styles.rightTxt}>{item.msg}</Text>
            </View>
            <Image source={item.image} style={{ ...styles.rightuserPic }} />
          </View>
          <Text
            style={{
              fontSize: RFValue(13),
              color: "#8E8E8E",
              fontFamily: "Medium",
              marginTop: RFValue(8),
              marginHorizontal: RFValue(35),
              alignSelf: "flex-end",
            }}
          >
            {/* 09: 31 AM */}
            {item?.date_time}
          </Text>
        </View>
      );
    }
  };

  const scrollDown = () => {
    // console.log(
    //   "🚀 ~ file: Chat.js:160 ~ scrollDown ~ flatListRef.current:",
    //   flatListRef.current?._listRef?._scrollRef?.scrollToEnd()
    // );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "height" : "height"}
    >
      {/* <Text style={{ fontSize: 120, color: "red" }}>{status}</Text> */}

      <ScrollView>
        <View>
          <FlatList
            ref={flatListRef}
            // nestedScrollEnabled
            contentContainerStyle={{ marginTop: 20, paddingBottom: 100 }}
            // style={styles.list}
            style={{ flex: 1 }}
            // extraData={this.state}
            data={messages}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={_renderItem}
            // onContentSizeChange={() => {
            // scrollDown();
            // flatListRef.current.scrollToEnd();
            // console.log(
            //   "🚀 ~ file: Chat.js:178 ~ Chat ~ flatListRef.current.scrollToEnd():",
            //   flatListRef.current.scrollToOffset({ animated: true })
            // );
            // flatListRef.current.scrollToEnd({ animated: true });
            // flatListRef.current.scrollToOffset({ offset: 0 });
            // }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: RFValue(0),
          width: "100%",
        }}
      >
        {status != "closed" ? (
          <View
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              width: "100%",
              alignItems: "center",
              height: 80,
            }}
          >
            <View
              style={{
                backgroundColor: "#F5F5F5",
                width: width - 50,
                height: RFValue(52),
                borderRadius: 8,
                paddingHorizontal: 10,
                fontSize: RFValue(14),
                color: "#000A32",
                fontFamily: "Medium",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "80%" }}>
                <TextInput
                  style={{
                    // backgroundColor: "#F5F5F5",
                    // width: width - 50,
                    height: RFValue(52),
                    // borderRadius: 8,
                    // paddingHorizontal: 10,
                    fontSize: RFValue(14),
                    // color: "#000A32",
                    // fontFamily: "Medium",
                  }}
                  value={msg}
                  placeholderTextColor="#696969"
                  onChangeText={(msg) => setMsg(msg)}
                  blurOnSubmit={false}
                  onSubmitEditing={() => send()}
                  placeholder="Type here..."
                  returnKeyType="send"
                />
                {/* <TouchableOpacity
                  style={{
                    // position: "absolute",
                    // right: RFValue(10),
                    width: RFValue(37),
                    height: RFValue(37),
                    // top: RFValue(10),
                    // bottom:RFValue(30),
                    borderRadius: 8,
                    backgroundColor: "#315A9C",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => send()}
                >
                  <Feather name="send" size={18} color="#fff" />
                </TouchableOpacity> */}
              </View>

              <View style={{ width: "15%" }}>
                <TouchableOpacity
                  style={{
                    // position: "absolute",
                    // right: RFValue(10),
                    width: RFValue(37),
                    height: RFValue(37),
                    // top: RFValue(10),
                    // bottom:RFValue(30),
                    borderRadius: 8,
                    backgroundColor: "#315A9C",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => send()}
                >
                  <Feather name="send" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.input}>
            <TextInput
              style={{
                backgroundColor: "#F5F5F5",
                width: width - 50,
                height: RFValue(52),
                borderRadius: 8,
                paddingHorizontal: 10,
                fontSize: RFValue(14),
                color: "#000A32",
                fontFamily: "Medium",
              }}
              value={msg}
              placeholderTextColor="#696969"
              onChangeText={(msg) => setMsg(msg)}
              blurOnSubmit={false}
              onSubmitEditing={() => send()}
              placeholder="Type here..."
              returnKeyType="send"
            />

            <TouchableOpacity
              style={{
                position: "absolute",
                right: RFValue(30),
                width: RFValue(37),
                height: RFValue(37),
                // bottom:RFValue(30),
                borderRadius: 8,
                backgroundColor: "#315A9C",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => send()}
            >
              <Feather name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View> */}
          </View>
        ) : (
          <View
            style={[
              // styles.input,
              {
                backgroundColor: "#7f7c7c",
                height: RFValue(80),
                width: width,
                alignSelf: "center",
                position: "absolute",
                bottom: -15,
                alignSelf: "center",
                paddingHorizontal: RFValue(18),
                left: 0,
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.18,
                shadowRadius: 4.59,
                elevation: 5,
                justifyContent: "center",
              },
            ]}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
              Ticket is Closed, Please feel free to create new ticket for
              further queries/requests.
            </Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
// export default class Chat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       msg: "",
//     ,
//     };
//     this.send = this.send.bind(this);
//     this.reply = this.reply.bind(this);
//     this.renderItem = this._renderItem.bind(this);
//   }

//   render() {

//   }
// }

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: RFValue(80),
    width: width - RFValue(10),
    backgroundColor: "#fff",

    // bottom: RFValue(20),
    bottom: -15,

    alignSelf: "center",
    paddingHorizontal: RFValue(18),
    alignSelf: "center",
  },

  keyboard: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width,
    height,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
  },
  chatTitle: {
    color: "#fff",
    fontWeight: "600",
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },

  eachMsg: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  rightMsg: {
    flexDirection: "row",
    alignItems: "flex-end",

    alignSelf: "flex-end",
  },
  userPic: {
    // height: 35,
    // width: 35,
    // margin: 5,
    // borderRadius: 20,
    // backgroundColor: "#f8f8f8",
    // position: "absolute",
    // zIndex: 9999,
    // top: 25,
    // left: 5,
  },
  msgBlock: {
    width: RFValue(200),
    marginTop: RFValue(20),
    borderRadius: 12,
    borderTopLeftRadius: 0,
    marginLeft: RFValue(35),
    width: "70%",
    backgroundColor: "#F4F1F2",
    padding: RFValue(12),
  },

  msgTxt: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "RegularText",
    lineHeight: 18,
  },
  rightTxt: {
    fontSize: RFValue(14),
    color: "#fff",
    fontFamily: "RegularText",
  },

  personName: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    paddingTop: 10,
  },

  screenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 30,
  },

  rightuserPic: {
    // height: 35,
    // width: 35,
    // margin: 5,
    // borderRadius: 20,
    // position: "absolute",
    // right: 0,
    // top: 15,
  },
  rightBlock: {
    width: "70%",
    borderRadius: 12,
    borderTopRightRadius: 0,
    backgroundColor: "#4372BA",
    padding: 10,

    marginRight: RFValue(20),
    marginTop: RFValue(30),
  },
});
