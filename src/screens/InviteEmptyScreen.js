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
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-thin-left"
          size={24}
          color="#fff"
        />

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
        <Text style={styles.topText}>
          Invite one of your contacts, and earn a{"\n"}
          credit to run a free background check{"\n"}if they create an account.
        </Text>

        <View style={styles.textinputCOntainer}>
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
        </View>

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
              fontSize: RFValue(14),
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
              Search using my contacts
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
    height: RFValue(100),
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
    width: WIDTH - RFValue(60),
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#F3F3F3",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: Dimensions.get("window").height / 5,
  },
  iconinvite: {
    width: RFValue(24),
    height: RFValue(24),
    alignSelf: "center",
  },

  boxtitle: {
    fontSize: RFValue(14),
    fontFamily: "BoldText",
    color: "#000",
    textAlign: "center",
    marginTop: RFValue(8),
  },
  searchbyContactbutton: {
    width: WIDTH / 1.6,
    padding: RFValue(5),
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: RFValue(15),
  },
});
