import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../constants/device";
import {
  Feather,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
const WIDTH = Dimensions.get("window").width;
const SexOffenderdetail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <View style={{ width: "15%" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/icons/back.png")}
              style={{ width: RFValue(10), height: RFValue(20) }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "70%", alignItems: "center" }}>
          <Text style={styles.headerTitle}>
            <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
              Sex Offender
            </Text>
          </Text>
        </View>
      </View>
      <ScrollView
        // ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <View style={styles.alertContainer}>
          <Image
            style={{ width: RFValue(19), height: RFValue(19) }}
            source={require("../assets/icons/alerticon.png")}
          />

          <Text style={styles.criminalRecordDetectedtext}>
            Alert! Sex Offender Record Detected
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={onPressOverView}
          style={styles.overViewContainer}
        >
          <View style={styles.overviewLeft}>
            <Ionicons name="person" size={24} color="#00B3EF" />
            <Text
              style={{
                ...styles.criminalRecordDetectedtext,
                fontSize: RFValue(14),
              }}
            >
              Overview
            </Text>
          </View>

          <Feather name="chevron-down" size={28} color="black" />
        </TouchableOpacity>
        <View style={{ ...styles.resultDetailContainer }}>
          <Text style={styles.nameAgeText}>Darla Baskin, 57</Text>

          <View
            style={{
              marginTop: RFValue(18),
              flexDirection: "row",
              paddingHorizontal: RFValue(20),
            }}
          >
            <Image
              source={require("../assets/icons/nomugshot.png")}
              style={{ width: "40%", height: RFValue(120) }}
            />
            <View style={{ marginTop: RFValue(5), marginLeft: "7%" }}>
              <Text style={styles.fullnameText}>Aliases</Text>

              <View style={{ marginTop: RFValue(6) }}>
                <Text style={styles.fullname}>Darla Kay Butler|</Text>

                <Text style={styles.fullname}>Darla Kay Howard</Text>
                <View>
                  <Text style={{ ...styles.fullname, marginTop: 0 }}>
                    Darla Kaykay Baskin{"\n"}Darla Kay Baskin{"\n"}
                    Darla Howard
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <Text style={[styles.fullnameText, { fontSize: RFValue(11) }]}>
              Date of Birth
            </Text>
            <Text style={[styles.fullname, { marginTop: RFValue(8) }]}>
              Jan 1, 1975
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={onPressOverView}
          style={styles.overViewContainer}
        >
          <View style={styles.overviewLeft}>
            <Image
              source={require("../assets/icons/crminal.png")}
              style={{ width: RFValue(25), height: RFValue(25) }}
            />
            <Text
              style={{
                ...styles.criminalRecordDetectedtext,
                fontSize: RFValue(14),
              }}
            >
              Sex Offender Records
            </Text>
          </View>

          <Feather name="chevron-down" size={28} color="black" />
        </TouchableOpacity>
        <View style={styles.paragraph}>
          <View style={styles.blue}>
            <Text style={{ fontSize: RFValue(8), color: "#ffffff" }}>
              Florida
            </Text>
          </View>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>County: </Text>Broward
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Date: </Text>01/13/2003
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Offense: </Text>SEX BAT BY
            ADULT/VCTM UNDER 12; F.S. 794.011(2){"\n"}
            {"\n"}
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Race: </Text>White
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Sex: </Text>Female
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Hair: </Text>Brown
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Eyes: </Text>Brown
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Height: </Text>5'00"
          </Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            <Text style={{ fontFamily: "BoldText" }}>Weight: </Text>124 lbs
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={onPressOverView}
          style={styles.overViewContainer}
        >
          <View style={styles.overviewLeft}>
            <Image
              source={require("../assets/icons/address.png")}
              style={{ width: RFValue(20), height: RFValue(20) }}
            />
            <Text
              style={{
                ...styles.criminalRecordDetectedtext,
                fontSize: RFValue(14),
              }}
            >
              Address Info
            </Text>
          </View>

          <Feather name="chevron-down" size={28} color="black" />
        </TouchableOpacity>
        <View style={[styles.paragraph, { height: RFValue(100) }]}>
          <Text style={styles.fullnameText}>Most Recent Address</Text>
          <Text style={{ ...styles.fullname, marginTop: 0 }}>
            2400 BLK Federal Hwy{"\n"}
            Fort Lauderdale, FL 33306
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={{fontSize: RFValue(14),color:'#ffffff'}}>Run Full Check</Text>
        </View>
        <TouchableOpacity style={{ ...styles.overViewContainer, marginTop:RFValue(40) }}>
          <View style={styles.overviewLeft}>
            <Ionicons
              name="md-information-circle-outline"
              size={24}
              color="#000000"
            />
            <Text
              style={{
                ...styles.criminalRecordDetectedtext,
                fontFamily: "BoldText",
              }}
            >
              Disclaimer
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.paragraph]}>
          <Text style={{ fontSize: RFValue(6.85) }}>
            Our service gathers public records, including criminal records from
            government {"\n"}agencies, affiliates, and third parties. However,
            as we are not the creators of {"\n"}these databases, we cannot
            ensure the accuracy of the information or attest to {"\n"}the
            person's character.
            {"\n"}
            {"\n"}
            Court records, which are publicly accessible through government
            agencies, {"\n"}may contain criminal details such as felonies,
            misdemeanors, arrests, or {"\n"}infractions.
            {"\n"}
            {"\n"}
            Nevertheless, these public records can be unreliable, incomplete, or
            unrelated {"\n"}to the individual in question. It is crucial to
            independently verify a person's {"\n"}criminal history at the
            appropriate courthouse and not solely depend on the {"\n"}
            information provided here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SexOffenderdetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  homeHeader: {
    width: WIDTH,
    height: RFValue(90),
    backgroundColor: "#305A9C",
    alignItems: "center",
    flexDirection: "row",
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
  },
  criminalRecordDetectedtext: {
    fontSize: RFValue(12),
    color: "#000",
    fontFamily: "Heavy",
    marginLeft: RFValue(5),
  },
  alertContainer: {
    width: WIDTH - RFValue(45),
    height: RFValue(30),
    backgroundColor: "#FBF9C2",
    borderRadius: RFValue(10),
    alignSelf: "center",
    marginTop: RFValue(16),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
  },
  overViewContainer: {
    width: WIDTH - RFValue(45),
    height: RFValue(30),
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: RFValue(12),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(8),
    justifyContent: "space-between",
  },
  overviewLeft: {
    flexDirection: "row",
  },
  nameAgeText: {
    marginLeft: "6.5%",
    marginTop: RFValue(12),
    fontSize: RFValue(27),
    fontFamily: "Medium",
    color: "#000",
  },
  fullname: {
    color: "#000",
    fontSize: RFValue(13),
    fontFamily: "Medium",
    fontWeight: "SemiBold",
  },
  detailText: {
    color: "#000",
    fontSize: RFValue(15),
  },
  fullnameText: {
    color: "#C4C4C5",
    fontSize: RFValue(13),
    fontFamily: "RegularText",
  },
  fullname_pastAddress: {
    color: "#000",
    fontSize: RFValue(15),
    fontFamily: "Medium",
    marginTop: RFValue(5),
    marginVertical: 5,
  },
  footerContainer: {
    justifyContent: "space-between",
    paddingHorizontal: "7%",
    marginTop: RFValue(20),
    marginBottom: 10,
  },
  paragraph: {
    backgroundColor: "#FFFFFF",
    elevation: 3,
    paddingHorizontal: RFValue(12),
    paddingVertical: RFValue(15),
    marginHorizontal: "8%",
    marginTop: RFValue(10),
    borderRadius: 2,
  },
  subtitle: {
    fontSize: RFValue(10),
    color: "#000",
    fontFamily: "RegularText",
    textAlign: "left",
    // marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },
  blue: {
    backgroundColor: "#476BA5",
    width: "30%",
    height: RFValue(14),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(3),
  },
  button:{
    marginTop: RFValue(20),
    backgroundColor: "#476BA5",
    width: "85%",
    alignSelf:'center',
    height: RFValue(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFValue(12),
  }
});
