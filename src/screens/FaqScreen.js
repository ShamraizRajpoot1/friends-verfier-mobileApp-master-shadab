import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../src/constants/device";
import { TouchableOpacity } from "react-native";

const WIDTH = Dimensions.get("window").width;
export default function FaqScreen({ navigation }) {
  const classesStyles = {};

  
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RFValue(50),
        }}
      >
        <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>

          <Text style={styles.headerTitle}>
            <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
              FAQs
            </Text>
          </Text>
          <Pressable>
            <Feather name="menu" size={24} color="#305A9C" />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: RFValue(25) }}>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={[styles.paragraph]}>
              <View style={styles.heading}>
                <Image
                  source={require("../assets/icons/faq1.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>
                  Didn't Friend Verifier Exist a{"\n"}
                  While Ago?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Yep! The initial iteration of Friend Verifier, introduced{"\n"}
                in 2012, enabled Facebook users to scan their{"\n"}
                friends and friend requests for registered sex{"\n"}
                offenders. It went viral, and journalists around the{"\n"}
                country reported that they had found sex offenders{"\n"}
                on Facebook using Friend Verifier.{"\n"}
                {"\n"}
                However, these journalists repeatedly questioned{"\n"}
                Facebook about the presence of registered sex{"\n"}
                offenders on their platform, which was a clear{"\n"}
                breach of their terms of service. Subsequently, in the{"\n"}
                summer of 2015, Facebook terminated our access.{"\n"}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: RFValue(20) }}>
            <View style={[styles.paragraph]}>
              <View style={styles.heading}>
                <Image
                  source={require("../assets/icons/faq1.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>
                  Why Did Friend Verifier Come{"\n"}
                  Back?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                During and following the pandemic, we witnessed an{"\n"}
                upsurge in criminal activities, particularly targeting{"\n"}
                individuals through dating apps. Upon examining the{"\n"}
                existing Data-Centric Personal Safety platforms, we{"\n"}
                identified shortcomings in both innovation and{"\n"}
                affordability.{"\n"}
                {"\n"}
                Our commitment is to provide you with cutting-edge{"\n"}
                solutions to enhance your safety and that of your{"\n"}
                loved ones, all without straining your budget.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={[styles.paragraph]}>
              <View style={styles.heading}>
                <Image
                  source={require("../assets/icons/faq1.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>
                  How Much Does Friend Verifier{"\n"}
                  Cost?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                We give our users two options: Pay-As-You-Go or{"\n"}
                obtaining a subscription. If you choose to{"\n"}
                Pay-As-You-Go, each report will cost $4.99, that's{"\n"}
                less than a frappuccino.{"\n"}
                {"\n"}
                If you opt for a subscription, we offer three tiers:{"\n"}
                Basic, Goid, and Platinum. If you were to select the{"\n"}
                Platinum subscription, billed annually, it includes{"\n"}
                1,200 background checks for the year, at a cost of{"\n"}
                just 15 cents per background check. For further{"\n"}
                details on our subscription options and associated{"\n"}
                costs, please visit our subscriptions page.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={[styles.paragraph]}>
              <View style={styles.heading}>
                <Image
                  source={require("../assets/icons/faq1.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>
                  What can I access on Friend{"\n"}
                  Verifier?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Our reports include names and aliases, relatives and{"\n"}
                associates, address histories, phone numbers, email{"\n"}
                addresses, criminal records and convictions, and{"\n"}
                more.{"\n"}
                {"\n"}
                Unlike our competitors, there are no upcharges or{"\n"}
                additional fees; we provide all the information we{"\n"}
                have in each report.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={[styles.paragraph]}>
              <View style={styles.heading}>
                <Image
                  source={require("../assets/icons/faq1.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>
                  Will I Still be Charged if There is{"\n"}
                  No Match?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                No, If you perform a search and there is no match,{"\n"}
                you are not charged. You are only charged when you{"\n"}
                choose to view a report. If you have a subscription,{"\n"}
                one credit is deducted from your tally when you{"\n"}
                choose to view a report.{"\n"}
                {"\n"}
                You are paying for the report whether there is a{"\n"}
                criminal record or not.
              </Text>
            </View>
          </View>
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
    fontSize: RFValue(17),
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
  heading: {
    backgroundColor: "#F5F5F5",
    width: WIDTH - RFValue(50),
    height: RFValue(40),
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: RFValue(12),
  },
  do: {
    alignSelf: "flex-start",
    marginTop: RFValue(5),
    width: RFValue(12),
    height: RFValue(12),
    marginRight: RFValue(5),
  },
  paragraph: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderWidth: 0,
    height: RFValue(210),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: RFValue(10),
    borderRadius: 2,
  },
  title: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
  },
  subtitle: {
    marginHorizontal: RFValue(10),
    fontSize: RFValue(10),
    color: "#000",
    fontFamily: "RegularText",
    textAlign: "left",
    // marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },

  faqsText: {
    fontSize: RFValue(16),
    color: "#000",
    fontFamily: "BoldText",
  },
});
