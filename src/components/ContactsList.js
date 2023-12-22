/** @format */

import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  // ScrollView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
// import ScanPhoneScreen from "../screens/TabScreens/ScanPhoneScreen";
import simpleAlertCall from "../utils/alerts";
import { useRoute } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;

const contacts = [
  {
    index: 0,
    name: "Allison Yurman",
  },
  {
    index: 1,
    name: "Amanda",
  },
  {
    index: 2,
    name: "Amanda Schrama",
  },
  {
    index: 3,
    name: "Amy Wan",
  },
  {
    index: 4,
    name: "Ana Cuenca",
  },
  {
    index: 5,
    name: "Andrea Mancuso",
  },
  {
    index: 6,
    name: "Andrew MArcus",
  },
  {
    index: 7,
    name: "Andrew Turk",
  },
  {
    index: 8,
    name: "Anna",
  },
  {
    index: 9,
    name: "Anna Haro",
  },
  {
    index: 10,
    name: "Annie Calabrese",
  },
  {
    index: 11,
    name: "Ramos Bauer",
  },
  {
    index: 12,
    name: "Beach Crane",
  },
  {
    index: 13,
    name: "Cathryn Pearson",
  },
  {
    index: 14,
    name: "Kent Haney",
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    marginBottom:450
  
  },
  row: {
    flexDirection:'row',
    paddingHorizontal: RFValue(25),
    paddingTop:RFValue(20)
  },
  sectionHeader: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 20,
    paddingVertical: 6,
    // marginTop: RFValue(20),
  },

  title: {
    fontFamily: "Heavy",
    color: "#8A8A8C",
  },
  contact: {
    fontSize: RFValue(14),
    fontFamily: "BoldText",
    color: "#000",
  },
});

const ContactsList = ({ navigation, dataArray }) => {
  // console.log(navigation);
  // console.log(dataArray,'dataArray');
  const route = useRoute();

  const [name, setName] = useState("Aa");

  const getData = (dataArray) => {
    if (route.name == "ScanPhoneScreen") {
      let contactsArr = [];
      let aCode = "A".charCodeAt(0);
      for (let i = 0; i < 26; i++) {
        let currChar = String.fromCharCode(aCode + i);
        let obj = {
          title: currChar,
        };

        let currContacts = dataArray.filter((item) => {
          // console.log(item?.displayName?.charAt(0));
          // return
          return item?.givenName?.charAt(0).toUpperCase() === currChar;
        });
        if (currContacts.length > 0) {
          currContacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
          obj.data = currContacts;
          contactsArr.push(obj);
        }
      }

      // console.log(JSON.stringify(contactsArr[1]));
      return contactsArr;
    }
  };

  const detailsList = (mobile) => {
    // return;
    // alert('frghj')
    // console.log(mobile);
    // return
    // if (!name) {
    //   simpleAlertCall("Please enter phone number.", () => {});
    //   return;
    // }
    // removeCountryCode(mobile);
    mobile = mobile.replace(/\s/g, "");

    var newFormattedNumber = removeCountryCode(mobile);
    // alert(newFormattedNumber);
    // return;
    var obj = {
      fields: [{ phone: newFormattedNumber }],
    };
    navigation.navigate("ResultsScreen", { obj: obj });
  };

  {
    /* <FlatList
  data={filteredData}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/> */
  }

  function removeCountryCode(phoneNumberString) {
    if (phoneNumberString && phoneNumberString.indexOf("+1") === 0) {
      phoneNumberString = phoneNumberString.substring(2);
    }
    phoneNumberString = phoneNumberString.replace(/[^\d]/g, "");
    // var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    // var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    // if (match) {
    //   return "(" + match[1] + ") " + match[2] + "-" + match[3];
    // }
    return phoneNumberString;
  }

  // const removeCountryCode = (phoneNumber) => {
  //   if (phoneNumber && phoneNumber.indexOf("+1") === 0) {
  //     return phoneNumber.substring(2);
  //   } else {
  //     return phoneNumber;
  //   }
  // };

  // render() {
  return (
    <View style={styles.container}>
      <SectionList
       
        contentContainerStyle={{ paddingBottom: RFValue(300), }}
        sections={getData(dataArray)}
        //   ListHeaderComponent={() => <Button title="Add Contact" />}
        renderItem={({ item }) => (
          <>
            {item?.phoneNumbers[0]?.number && (
              <TouchableOpacity
                onPress={() => detailsList(item?.phoneNumbers[0]?.number)}
                style={[styles.row]}
              >
               {item?.image ? (
            <Image
              source={{ uri: item?.image?.uri }}
              style={{ width: 40, height: 40, borderRadius: 10 }}
            />
          ) : (
            <View
              style={{
                width: RFValue(50),
                height: RFValue(50),
                borderRadius: RFValue(15),
                backgroundColor: "#F7F5EF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "rgba(0,0,0,0.4)", fontSize: RFValue(16), fontFamily:'BoldText' }}>
                {item?.givenName[0]}{item?.familyName[0]}
              </Text>
            </View>
          )}
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'85%', alignItems:'center'}}>
          <View style={{ marginLeft: 10, justifyContent:'center' }}>
            <Text style={styles.contact}>
              {item?.givenName} {item?.familyName}
            </Text>
            <Text style={{ color: "#888", fontSize: 12 }}>
              {item?.phoneNumbers[0]?.number}
            </Text>
          </View>
          <View style={{width:RFValue(65),height:RFValue(30),
            borderRadius: RFValue(50),
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'#315A9C'}}>
            <Text style={{fontSize:RFValue(10),color:'#FFFFFF', fontFamily:'Heavy'}}>Search</Text>
          </View>
          </View>
              </TouchableOpacity>
            )}
          </>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />

    </View>
  );

  // }
};
export default ContactsList;
