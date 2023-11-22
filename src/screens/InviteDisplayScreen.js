import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
// import Contacts from "react-native-contacts";
import { Platform, Linking } from "react-native";
import Device from "../../src/constants/device";

const WIDTH = Dimensions.get("window").width;

const DATA = [
  {
    id: "1",
    firstname: "Vin",
    lastname: "Gupta",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: true,
  },
  {
    id: "2",
    firstname: "Matt",
    lastname: "FIne",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: false,
  },
  {
    id: "3",
    firstname: "Chris",
    lastname: "Romanello",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: true,
  },
  {
    id: "4",
    firstname: "Jerry",
    lastname: "Robinson",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: false,
  },
  {
    id: "5",
    firstname: "Caitlin",
    lastname: "Bell",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: false,
  },

  {
    id: "6",
    firstname: "Andrew",
    lastname: "Marcus",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: true,
  },
  {
    id: "7",
    firstname: "Billl",
    lastname: "Span",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: false,
  },

  {
    id: "8",
    firstname: "Michael",
    lastname: "Pallenchia",
    subtitle: "100+ friends on Friend Verifier",
    image: require("../assets/icons/profile.png"),
    profile: true,
  },
];
export default function InviteDisplayScreen({ navigation, ContactsDatas }) {
  const [phone, onChangePhone] = useState("");
  const [contactsState, setContactsState] = useState([]);
  const [getContact, setGetContact] = useState([]);
  const [filteredList, setFilteredList] = new useState([]);
  const [input, setInput] = useState("");

  const newContact = contactsState;
  // console.log("Contacts",Contacts)

  useEffect(() => {
    // phoneContact();
  }, []);

  const phoneContact = () => {
    // Contacts.getAll()
    //   .then((response) => {
    //     // console.log(response)
    //     // setContactsState(response);
    //     getData(response);
    //     setFilteredList(response);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     alert("Permission to access contacts was denied");
    //     console.warn("Permission to access contacts was denied");
    //   });
  };

  // getting Contact Data

  const getData = (newContact) => {
    var newData = newContact?.map((item, index) => {
      if (item?.givenName) {
        item.givenName = capitalize(item?.givenName);
        return item;
      }
    });

    // newData.filter(x => x !== undefined);
    newData = newData.filter((item) => item);

    newData.sort(function (a, b) {
      // a = a.givenName.charAt(0).toUpperCase() + a.givenName.slice(1)
      // b.givenName.charAt(0).toUpperCase() + b.givenName.slice(1)
      if (a.givenName < b.givenName) {
        return -1;
      }
      if (a.givenName > b.givenName) {
        return 1;
      }
      return 0;
    });
    // console.log('newData',newData);

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    setGetContact(newData);

    return;
    let contactsArr = [];
    let aCode = "A".charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };

      let currContacts = newContact.filter((item) => {
        // console.log(item?.givenName?.charAt(0));
        // return
        return item?.givenName?.charAt(0).toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
        obj.data = currContacts;
        contactsArr.push(currContacts);
      }
    }
    setGetContact(contactsArr[1]);
    // console.log('contactsArr',JSON.stringify(contactsArr[0]));
  };

  // filtering contact by name
  const filterBySearch = (searchText) => {
    // Access input value
    const query = searchText;
    // Create copy of item list
    var updatedList = [...filteredList];
    // console.log("updatedList",updatedList);
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item?.givenName?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    getData(updatedList);
  };

  // inviteFriend
  const phoneNumber1 = "1234567890";
  const separator = Platform.OS === "android";
  const message1 = "Friend Verifier Inviting you ";
  const inviteFriend = (item) => {
    Linking.openURL(
      `sms:${
        item?.phoneNumbers[0]?.number
      }?body=Hey, check out Friend Verifier, run a free background check on anyone privately. ${
        // item?.givenName + " " + item?.familyName
        "http://friendverifier.com/invite/"
      } 
      `
      // Friend Verifier Inviting you
    );
    // if(Platform.OS === 'android'){
    //   // const url = `sms:${phoneNumber1}${separator}body=${'Friend Verifier Inviting you '}`;
    //   // //  Linking.openURL(`sms:${phoneNumber1}&body=${'phoneNumber1'}`);
    //   // // Linking.openURL(`sms:/open?addresses=923335251661,9231213341&body=My sms text`);
    //   // var phoneNumber2 = '1234567890';
    //   // if (Platform.OS === 'android') {
    //   //   phoneNumber2 = `tel:${phoneNumber1}`;
    //   // } else {
    //   //   phoneNumber2 = `telprompt:${phoneNumber1}`;
    //   // }

    // }else{
    //   alert("SMS Not Sended")
    // }

    // const url = `sms:${phoneNumber}${separator}body=${message}`;
    //  Linking.openURL(url);
  };

  const Item = ({ item }) => (
    <View style={styles.inviteitem}>
      <View style={styles.inviteItemLeft}>
        {/* {console.log("items",item)} */}
        {item?.profile === true ? (
          <Image
            style={{ width: RFValue(50), height: RFValue(50) }}
            source={item?.thumbnailPath}
          />
        ) : (
          <View
            style={{
              width: RFValue(50),
              height: RFValue(50),
              borderRadius: 20,
              backgroundColor: "#F4F3ED",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Text
              style={{
                fontSize: RFValue(22),
                color: "#889095",
                fontFamily: "RegularText",
              }}
            >
              
                 {item?.thumbnailPath}
            </Text> */}
            {item?.thumbnailPath && (
              <Image
                style={{
                  width: RFValue(50),
                  height: RFValue(50),
                  borderRadius: 20,
                }}
                source={{ uri: item?.thumbnailPath }}
              />
            )}
          </View>
        )}

        <View>
          <Text style={styles.nameText}>
            {/* {item.firstname + " " + item.lastname} */}
            {item?.givenName} {item?.familyName}
          </Text>

          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => {
          inviteFriend(item);
        }}
      >
        <Text style={styles.inviteText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
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
        {/* <TouchableOpacity>
          <View>
            <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
              Scan For Your Contact
            </Text>
          </View>
        </TouchableOpacity> */}

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

        <View style={styles.textinputCOntainer}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/search.png")}
          />
          <TextInput
            style={styles.input}
            // onChangeText={onChangePhone}
            // value={phone}
            onChangeText={(text) => {
              setInput(text);
              filterBySearch(text);
            }}
            value={input}
            placeholder="Quick Find"
            // keyboardType="number-pad"
          />
          
        </View>

        <View style={styles.inviteListContainer}>
          <FlatList
            data={getContact}
            renderItem={Item}
            contentContainerStyle={{ marginTop: RFValue(50) }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
          />
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
  crossButton: {
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 50,
    backgroundColor: "#DEDEDE",
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
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "#FCFCFC",
    elevation: 1,
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
  topText: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "RegularText",
    marginTop: RFValue(30),
    textAlign: "center",
  },
  textinputCOntainer: {
    width: WIDTH - RFValue(100),
    marginTop: RFValue(12),
    height: RFValue(28),
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
    width: "100%",
    height: RFValue(50),
    marginLeft: RFValue(12),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#F5F5F5",
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
  nameText: {
    fontSize: RFValue(14),
    fontFamily: "SemiBold",
    color: "#000",
    marginLeft: RFValue(5),
  },
 

  inviteItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  inviteButton: {
    width: RFValue(70),
    height: RFValue(32),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#108AFF",
  },
  inviteText: {
    fontFamily: "BoldText",
    color: "#fff",
    fontSize: RFValue(13),
  },
  inviteitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: RFValue(14),
    marginBottom: RFValue(20),
  },
});
