import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Permission,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
// import { Contact } from "react-native-contacts";
import { useIsFocused } from "@react-navigation/native";
import { PermissionsAndroid, Platform } from "react-native";
import { useSelector } from "react-redux";
import InviteDisplayScreen from "./InviteDisplayScreen";
import Device from "../../src/constants/device";

const WIDTH = Dimensions.get("window").width;
export default function InviteEmptyScreen({ navigation }) {
  const [phone, onChangePhone] = useState("");
  const [contactPermission, setContactPermission] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const userData = useSelector((state) => state?.loginDetails);
  // const [contactsState, setContactsState] = useState([]);

  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   if (isFocused) {
  //      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS).then(response => {
  //        if (response === true){
  //         permissionFun();
  //         // console.log("contact Response",response)
  //       }
  //     else {
  //     }

  //     })

  //   }

  // }, [isFocused,userData]);
  // const [contactsState, setContactsState] = useState([]);

  const permissionFun = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
      }).then(() => {
        // console.log("read",PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        navigation.navigate("InviteDisplayScreen");
      });
    } else {
      navigation.navigate("InviteDisplayScreen");
    }
  };

  //  const givePermission()
  //  .then(permission => {
  //     // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
  //     if (permission === 'undefined') {
  //       requestPermission().then(permission => {
  //         if(contactPermission){
  //           setContactPermission(permission)
  //         }else{
  //           alert('denied')
  //         }
  //       })
  //     }

  //   })

  // const givePermission =  () => {
  //   if (Platform.OS === 'android') {
  //   const granted =  PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {

  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can access');
  //     } else {
  //       console.log(' permission denied');
  //     }
  //   } else {
  //     // phoneContact();
  //   }

  // };

  // useEffect(() => {
  //   const requestContactPermission = async () => {
  //     try {
  //       const granted = await contacts.requestPermission();
  //       setContactPermission(granted === 'authorized');
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   requestContactPermission();
  // }, []);

  const givePermission = () => {
    if (contactPermission) {
      setContactPermission();
    } else {
      // alert('denied')
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            Invite
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
        <View style={{ marginTop: RFValue(20), marginHorizontal: RFValue(20) }}>
          <View style={[styles.paragraph]}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/partypopper.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Earn Free Credits!</Text>
            </View>

            <Text style={[styles.subtitle, { marginTop: RFValue(8) }]}>
              You'll earn 1 free credit for each friend
            </Text>
            <Text style={styles.subtitle}>
              you invite who accepts your invitation.
            </Text>
            <Text style={styles.subtitle}>
              There is no limit, 500 friends accept,
            </Text>
            <Text style={styles.subtitle}>you'll get 500 free credits!</Text>
          </View>
        </View>

        {/* <View style={styles.textinputCOntainer}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/search.png")}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePhone}
            value={phone}
            placeholder="Invite by phone#"
            keyboardType="number-pad"
          />
        </View> */}

        <View style={styles.searchByContactContainer}>
          <Image
            style={{ ...styles.iconinvite }}
            source={require("../assets/icons/invitesearch.png")}
          />

          <Text style={styles.boxtitle}>Have your friend's back!</Text>

          <Text
            style={{
              ...styles.topText,
              marginTop: RFValue(14),
              fontSize: RFValue(12),
            }}
          >
            We will show you who’s already here{"\n"}and show you friends you
            can invite!
          </Text>

          <TouchableOpacity
            onPress={() =>
              // navigation.navigate("InviteDisplayScreen")
              permissionFun()
            }
            // onPress={givePermission}
            style={styles.searchbyContactbutton}
          >
            <Text style={{ ...styles.boxtitle, marginTop: 0 }}>
              Continue
            </Text>
          </TouchableOpacity>
          {/* <Text>hchhg</Text> */}

          {/* <Modal isVisible={isModalVisible} >
          <TouchableOpacity
          disabled={true}
          activeOpacity={0.5}
            // onPress={() => navigation.navigate("InviteDisplayScreen")}
            onPress={toggleModal}
            style={styles.searchbyContactbutton}
          >
            <View style={{ flex: 1 }}>
            <Text style={{ ...styles.boxtitle, marginTop: 0 }}>
              Search using my contacts
            </Text>
            </View>
          </TouchableOpacity>
          </Modal> */}
        </View>
        <View style={{ marginTop: RFValue(90), marginHorizontal: RFValue(20), }}>
          <View
            style={[
              styles.heading,
              { paddingLeft: RFValue(12), width: WIDTH - RFValue(60), },
            ]}
          >
            <Image
              source={require("../assets/icons/info.png")}
              style={styles.do}
            />
            <Text style={[styles.title,{fontFamily: 'BoldText',}]}>Disclaimer</Text>
          </View>
          <View
            style={[
              styles.paragraph,
              {
               
                backgroundColor: "#FFFFFF",
                width: WIDTH - RFValue(60),
                alignSelf: "center",
                height:RFValue(90),
                borderRadius: 3,
              },
            ]}
          >
            <Text
              style={[
                styles.subtitle,
                {
                  marginTop: RFValue(8),
                  fontSize: RFValue(6.8),
                  lineHeight: RFValue(10),
                },
              ]}
            >
              By using the contact search feature, you can swiftly perform a
              reverse phone
              lookup on someone stored in your contact list.
              
              Rest assured,{"\n"} we never store your contacts on our servers. This
              process is
              handled on a per-case basis, and you have the freedom to revoke
              access at any
              time, with all other functionalities remaining unaffected.
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* <InviteDisplayScreen ContactsDatas={contactsState} /> */}
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
    // paddingTop:Platform.OS==='android'?0:RFValue(12),
    paddingHorizontal: RFValue(20),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT
        : Device.STATUS_BAR_HEIGHT + 20,
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  topText: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "RegularText",
    marginTop: RFValue(30),
    textAlign: "center",
  },
  textinputCOntainer: {
    width: WIDTH - RFValue(60),
    marginTop: RFValue(12),
    height: RFValue(38),
    alignSelf: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
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
  heading: {
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
    width: WIDTH - RFValue(40),
    height: RFValue(30),
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: RFValue(20),
  },
  do: {
    width: RFValue(12),
    height: RFValue(12),
    marginRight: RFValue(5),
  },
  paragraph: {
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    
    elevation: 2,
    backgroundColor: "#FCFCFC",
    // elevation: 1,
    borderWidth: 0,
    height: RFValue(110),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: RFValue(10),
    borderRadius: 10,
  },
  title: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
  },
  subtitle: {
    marginHorizontal: RFValue(10),
    fontSize: RFValue(13),
    color: "#000000",
    fontFamily: "RegularText",
    textAlign: "left",
    lineHeight: RFValue(15),
  },
  icon: {
    width: RFValue(20),
    height: RFValue(20),
  },
  input: {
    width: WIDTH - RFValue(120),
    height: RFValue(50),
    marginLeft: RFValue(12),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#7A7A7A",
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
    marginTop: RFValue(15),
  },
});
