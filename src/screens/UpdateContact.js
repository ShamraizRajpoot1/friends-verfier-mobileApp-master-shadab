import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  Platform, 
  PermissionsAndroid
} from "react-native";
import Modal from "react-native-modal";
import Contacts from "react-native-contacts";
import Device from "../../src/constants/device";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from "react-native";
const WIDTH = Dimensions.get("window").width;
const UpdateContact = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [input, setInput] = useState("");
  const [isaddModalVisible, setAddModalVisible] = useState(false);
  const [isadd1ModalVisible, setAdd1ModalVisible] = useState(false);
  const [isPermitted, setIsPermitted] = useState(false);
  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  useEffect(() => {
    if (isPermitted) {
      // Permission granted, fetch contacts
      fetchContacts();
    }
  }, [isPermitted]);

  const checkAndRequestPermission = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Contacts",
          message: "This app would like to view your contacts.",
        }
      )
        .then((res) => {
          if (res === "granted") {
            setIsPermitted(true);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      Contacts.requestPermission().then((permission) => {
        if (permission === "authorized") {
          setIsPermitted(true);
        }
      });
    }
  };


  const fetchContacts = async () => {
    try {
      const contactsData = await Contacts.getAll();
      
      setContacts(contactsData.sort(function (a, b) { if (a.givenName < b.givenName) { return -1; } if (a.givenName > b.givenName) { return 1; } return 0; }));
      filterContacts(input, contactsData);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const filterContacts = (searchText, contactsData) => {
    const query = searchText.toLowerCase();
    const filteredList = contactsData.filter((contact) => {
      const givenName = contact.givenName
        ? contact.givenName.toLowerCase()
        : "";
      const familyName = contact.familyName
        ? contact.familyName.toLowerCase()
        : "";

      return givenName.includes(query) || familyName.includes(query);
    });

    const sortedList = filteredList.sort((a, b) =>
      a.givenName
        .concat(a.familyName)
        .localeCompare(b.givenName.concat(b.familyName))
    );

    setFilteredContacts(sortedList);
  };
const oknavigate =()=>{
  setAdd1ModalVisible(false)
  navigation.goBack()
}
  const renderItem = ({ item }) => (
    <>
      {item?.phoneNumbers[0]?.number && (
        <TouchableOpacity
           onPress={()=>setAddModalVisible(true)}
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
                backgroundColor: "#F3F3F3",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgba(0,0,0,0.4)",
                  fontSize: RFValue(16),
                  fontFamily: "BoldText",
                }}
              >
                {item?.givenName[0]}
                {item?.familyName[0]}
              </Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "85%",
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 10, justifyContent: "center" }}>
              <Text style={styles.contact}>
                {item?.givenName} {item?.familyName}
              </Text>
              <Text style={{ color: "#888", fontSize: 12 }}>
                {item?.phoneNumbers[0]?.number}
              </Text>
            </View>
            <View
              style={{
                width: RFValue(65),
                height: RFValue(30),
                borderRadius: RFValue(50),
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#315A9C",
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(10),
                  color: "#FFFFFF",
                  fontFamily: "Heavy",
                }}
              >
                Update
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
  const okmodal = () => {
    setAddModalVisible(false);
    setAdd1ModalVisible(true);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.homeHeader}>
        <TouchableOpacity style={{width:RFValue(20)}} onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/icons/back.png")}
              style={{ width: RFValue(10), height: RFValue(20) }}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
              Update Contact
            </Text>
          </Text>
          <Pressable>
            <Feather name="menu" size={24} color="#305A9C" />
          </Pressable>
        </View>
        <View style={styles.textinputCOntainer}>
          <Ionicons name="search-sharp" size={24} color="rgba(0,0,0,0.5)" />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInput(text)}
            value={input}
            placeholder="Quick Find"
            placeholderTextColor={"#000"}
          />
        </View>
        <FlatList
          data={input ? filteredContacts : contacts}
          renderItem={renderItem}
          keyExtractor={(item) => item.recordID.toString()}
        />
      </View>
      <View>
       {isaddModalVisible && <Modal
          backdropOpacity={0.9}
          isVisible={isaddModalVisible}
          onBackdropPress={() => setAddModalVisible(false)}
        >
          <View style={[styles.modalaContainer,{height:'25%'}]}>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: "BoldText",
                marginTop: RFValue(14),
              }}
            >
              Confirm Contact Update
            </Text>

            <Text
              style={{
                fontSize: RFValue(12),
                textAlign: "center",
                color: "#000000",
              }}
            >
             We'll append phone numbers, email{"\n"}
addresses, addresses, and birthdates{"\n"}
to this contact without overwriting{"\n"}
existing information.{"\n"}
            </Text>
            <View style={styles.touchrow}>
              <TouchableOpacity
                onPress={okmodal}
                style={[
                  styles.ok,
                  { borderRightWidth: 1, borderColor: "rgba(0,0,0,0.5)" },
                ]}
              >
                <Text style={styles.oktext}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAddModalVisible(false)}
                style={styles.ok}
              >
                <Text style={[styles.oktext, { color: "#FF0000" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>}
         <Modal
          backdropOpacity={0.9}
          isVisible={isadd1ModalVisible}
          onBackdropPress={() => setAdd1ModalVisible(false)}
        >
          <View style={styles.modalaContainer}>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: "BoldText",
                marginTop: RFValue(14),
              }}
            >
              Contacts Updated!
            </Text>

            <Image
              style={{
                width: RFValue(15),
                height: RFValue(15),
                marginTop: RFValue(5),
                marginBottom: RFValue(15),
              }}
              source={require("../assets/icons/grencheck.png")}
            />
            <View style={[styles.touchrow, { height: RFValue(36) }]}>
              <TouchableOpacity
                onPress={oknavigate}
                style={[styles.ok, { width: "100%" }]}
              >
                <Text style={styles.oktext}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalContainer: {
    width: WIDTH,
    height: "25%",
    backgroundColor: "#fff",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 22,
    alignSelf: "center",
    position: "absolute",
    bottom: RFValue(-25),
  },
  touchrow: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    height: RFValue(45),
    marginTop: RFValue(15),
  },
  ok: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  oktext: {
    fontSize: RFValue(16),
    color: "#067AFD",
  },
  modalaContainer: {
    width: WIDTH / 1.3,
    height: "20%",
    backgroundColor: "#fff",
    borderRadius: 12,
    alignSelf: "center",
    position: "absolute",
    alignItems: "center",
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
  row: {
    flexDirection: "row",
    paddingHorizontal: RFValue(12),
    paddingTop: RFValue(20),
  },
  contact: {
    fontSize: RFValue(14),
    fontFamily: "BoldText",
    color: "#000",
  },
  textinputCOntainer: {
    marginTop: RFValue(20),
    width: WIDTH - RFValue(80),
    height: RFValue(30),
    alignSelf: "center",
    backgroundColor: "#F3F3F3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(10),
    shadowColor: "#000",
    borderRadius: RFValue(10),
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
  input: {
    width: WIDTH - RFValue(120),
    height: RFValue(50),
    marginLeft: RFValue(5),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#000",
  },
  headerTitle: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
});

export default UpdateContact;
