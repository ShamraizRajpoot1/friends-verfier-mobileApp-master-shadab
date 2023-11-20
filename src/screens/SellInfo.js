import {  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
  Image, } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;
import { Entypo, Feather } from "@expo/vector-icons";
import Device from "../../src/constants/device";
const SellInfo = ({navigation}) => {
  return (
    <View style={{backgroundColor:'#FFFFFF', flex:1}}>
      <View style={styles.homeHeader}>
          <Entypo
            onPress={() => navigation.goBack()}
            name="chevron-thin-left"
            size={24}
            color="#fff"
          />

          <Text style={styles.headerTitle}>
            <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
              Do Not Sell My Info
            </Text>
          </Text>
          <Pressable>
            <Feather name="menu" size={24} color="#305A9C" />
          </Pressable>
        </View>
      <View style={{ marginTop: RFValue(20), marginHorizontal:RFValue(20) }}>
        <View style={styles.heading}>
          <Image
            source={require("../assets/icons/supporticon1.png")}
            style={styles.do}
          />
          <Text style={styles.title}>How to Opt-Out</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.subtitle}>
          If you have a clean criminal record, you have {"\n"}
the option to request the removal of your{"\n"}
information from our platform. We highly value{"\n"}
your privacy, and upon your request, we can{"\n"}
prevent your records from appearing on our{"\n"}
platform, which are under our direct control.{"\n"}
However, please note that we cannot eliminate{"\n"}
any of your information from databases{"\n"}
managed by third-party entities.{"\n"}{"\n"}
Additionally, as mentioned earlier, there may{"\n"}
be instances when one of our data partners{"\n"}
provides us with a new database that may or{"\n"}
may not have data related to you that we are{"\n"}
unable to match with an existing one.{"\n"}{"\n"}
If you have previously opted out and noticed a{"\n"}
new record about you in our People Search{"\n"}
results, please feel free to get in touch with us{"\n"}
at support@friendverifer.com, and we'll gladly{"\n"}
assist you in removing that record as well.{"\n"}{"\n"}
To initiate the opt-out procedure, just{"\n"}
perform a search on our platform. If you find{"\n"}
that we indeed possess your information,{"\n"}
please create a support ticket to inform us,{"\n"}
and we will guide you through the necessary{"\n"}
steps.{"\n"}
          </Text>
        </View>
      </View>
    </View>
  );
};
//
export default SellInfo;

const styles = StyleSheet.create({
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

    // paddingTop:Platform.OS==='android'?0:RFValue(12)
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
    fontSize: RFValue(22),
    color: "#000",
    alignSelf: "center",
    marginTop: RFValue(22),
  },

  heading: {
    backgroundColor: "#F5F5F5",
    width: WIDTH - RFValue(50),
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
  paragraph: {
    width:'96%',
    backgroundColor: "#FFFFFF",
    elevation: 1,
    paddingBottom:RFValue(10),
    paddingHorizontal: RFValue(12),
    marginTop: RFValue(20),
    borderRadius: 2,
  },
  title: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
    // marginLeft: RFValue(40),
  },
  subtitle: {
    fontSize: RFValue(11),
    color: "#000",
    fontFamily: "RegularText",
    textAlign: "left",
    // marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },
});
