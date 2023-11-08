import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../src/constants/device";
import RenderHtml from "react-native-render-html";

const WIDTH = Dimensions.get("window").width;
export default function DoandDOntsScreen({ navigation }) {
  const classesStyles = {
    ul: {
      lineHeight: "21px", // for me adjusting lineHeight did the job
    },
    li: {
      lineHeight: "21px",
      bottom: 15,
      left: 15,
    },
    ul: { paddingLeft: 20, paddingRight: 30 },
    ol: { paddingLeft: 0, paddingRight: 30 },
    u: {
      fontSize: RFValue(15),
      color: "#000",
      textDecorationLine: "underline",
      fontFamily: "RegularText",
      marginVertical: 30,
    },
    p: {
      fontSize: RFValue(15),
      color: "#000",
      fontFamily: "Medium",
      textAlign: "left",
      // marginLeft: RFValue(40),
      marginTop: RFValue(10),
    },
  };
  const renderersProps = {
    // Experimental RTL support is only available for list elements.
    ol: { enableExperimentalRtl: true },
    ul: { enableExperimentalRtl: true },
  };
  const source = {
    html: `
    <u>The Fair Credit Reporting Act (FCRA) regulates how public databases are used. Friend Verifier, the public databases that power our platform, can not be used in business, and the following use cases.</u>
    <ul>
        <li>
            <p>Employment screening</p>
        </li>
        <li>
            <p>Screening household workers</p>
        </li>
        <li>
            <p>Screening adoptive parent</p>
        </li>
        <li>
            <p>Screen potential pet-owners</p>
        </li>
        <li>
            <p>Screening educational qualifications</p>
        </li>
        <li>
            <p>Screening charities or non-profits</p>
        </li>
        <li>
            <p>Screening Tenants</p>
        </li>
        <li>
            <p>Screening Customers</p>
        </li>
        <li>
            <p>Or anything to do with Credit, Insurance, or Mortgages</p>
        </li>
    </ul>`,
  };

  const onElement = (el) => {
    const { children, name } = el;
    if (name === "ul" && children && children.length) {
      children.forEach((listItem) => (listItem.attribs = { class: "ul-li" }));
    }
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
            DO's & Don'ts
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RFValue(50),
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.topText}>Do's</Text>
          <View style={{ marginTop: RFValue(40) }}>
            <Text style={styles.title}>Look yourself up</Text>

            <Text style={styles.subtitle}>
              You may think looking yourself up is{"\n"}laughable, but it is
              not; it is crucial.{"\n"}You should know what information is in
              {"\n"}your public record.
            </Text>
          </View>
          <View style={{ marginTop: RFValue(40) }}>
            <Text style={styles.title}>
              Who is that person you just matched{"\n"}with?
            </Text>

            <Text style={styles.subtitle}>
              Dating now starts nearly 90% of the{"\n"}time online. Looking up
              that new{"\n"}match before meeting them in person{"\n"}would be
              best. Your safety should{"\n"}always be your first priority; it's
              even{"\n"}more important than Taco Tuesday.
            </Text>
          </View>

          <View style={{ marginTop: RFValue(40) }}>
            <Text style={styles.title}>Find old friends and family</Text>

            <Text style={styles.subtitle}>
              Life takes us all in different directions;{"\n"}
              searching through our billions of{"\n"}public records is a great
              way to{"\n"}reconnect with people, whether it's{"\n"}friends from
              ages ago, distant{"\n"}relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>

          <View style={{ marginTop: RFValue(40) }}>
            <Text style={styles.title}>Find out who's calling you</Text>

            <Text style={styles.subtitle}>
              Not sure who is behind that phone{"\n"}number that keeps calling
              you? Run a{"\n"}
              reverse phone search and find out.{"\n"}
              Find out who's emailing you
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
          <Text style={[styles.topText, { marginTop: 50 }]}>Don'ts</Text>
          <RenderHtml
            contentWidth={"100%"}
            source={source}
            tagsStyles={classesStyles}
            domVisitors={{ onElement }}
            renderersProps={renderersProps}
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
    alignItems: "center",
  },

  homeHeader: {
    width: WIDTH,
    height: RFValue(75),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15
        : Device.STATUS_BAR_HEIGHT + 20,

    // paddingTop:Platform.OS==='android'?0:RFValue(12)
  },

  headerTitle: {
    fontSize: RFValue(22),
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
    // marginLeft: RFValue(40),
  },
  subtitle: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "Medium",
    textAlign: "left",
    // marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },
});
