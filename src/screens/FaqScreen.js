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
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RFValue(50),
        }}
      >
        <View style={{ paddingHorizontal: RFValue(25) }}>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={[styles.paragraph]}>
              <View style={styles.heading}>
                <Image
                  source={require("../assets/icons/faq1.png")}
                  style={styles.do}
                />
                <Text style={styles.title}>
                  Didn't Friend Verifier Exist a 
                  While Ago?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Yep! The initial iteration of Friend Verifier, introduced 
                in 2012, enabled Facebook users to scan their 
                friends and friend requests for registered sex 
                offenders. It went viral, and journalists around the 
                country reported that they had found sex offenders 
                on Facebook using Friend Verifier. 
                 {"\n"}{"\n"}
                However, these journalists repeatedly questioned 
                Facebook about the presence of registered sex 
                offenders on their platform, which was a clear 
                breach of their terms of service. Subsequently, in the 
                summer of 2015, Facebook terminated our access. 
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
                  Why Did Friend Verifier Come 
                  Back?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                During and following the pandemic, we witnessed an 
                upsurge in criminal activities, particularly targeting 
                individuals through dating apps. Upon examining the 
                existing Data-Centric Personal Safety platforms, we 
                identified shortcomings in both innovation and 
                affordability. 
                {"\n"}{"\n"}
                Our commitment is to provide you with cutting-edge 
                solutions to enhance your safety and that of your 
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
                  How Much Does Friend Verifier 
                  Cost?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                We give our users two options: Pay-As-You-Go or 
                obtaining a subscription. If you choose to 
                Pay-As-You-Go, each report will cost $4.99, that's 
                less than a frappuccino. 
                {"\n"}{"\n"}
                If you opt for a subscription, we offer three tiers: 
                Basic, Goid, and Platinum. If you were to select the 
                Platinum subscription, billed annually, it includes 
                1,200 background checks for the year, at a cost of 
                just 15 cents per background check. For further 
                details on our subscription options and associated 
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
                  What can I access on Friend 
                  Verifier?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                Our reports include names and aliases, relatives and 
                associates, address histories, phone numbers, email 
                addresses, criminal records and convictions, and 
                more. 
                {"\n"}{"\n"}
                Unlike our competitors, there are no upcharges or 
                additional fees; we provide all the information we 
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
                  Will I Still be Charged if There is 
                  No Match?
                </Text>
              </View>

              <Text style={styles.subtitle}>
                No, If you perform a search and there is no match, 
                you are not charged. You are only charged when you 
                choose to view a report. If you have a subscription, 
                one credit is deducted from your tally when you 
                choose to view a report. 
                {"\n"}{"\n"}
                You are paying for the report whether there is a 
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
    marginTop: RFValue(12),
    width: RFValue(15),
    height: RFValue(15),
    marginRight: RFValue(5),
    marginLeft:-5
  },
  paragraph: {
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
    backgroundColor: "#FFFFFF",
    // elevation: 4,
    borderWidth: 0,
    height: RFValue(210),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: RFValue(10),
    borderRadius: 2,
  },
  title: {
    fontSize: RFValue(12),
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
