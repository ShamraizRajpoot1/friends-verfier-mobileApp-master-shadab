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
export default function FaqScreen({ navigation }) {
  const classesStyles = {};

  const source = {
    html: `
    <p><strong>What is Friend Verifier?</strong></p>
<p><br></p>
<p>With crime rates escalating and numerous reports of convicted criminals exploiting dating apps and social media to target victims, we are thrilled to reintroduce Friend Verifier. This new version equips you with the essential tool to conduct searches, enabling you to assess the background of individuals you are about to meet. Friend or Foe, You Need to Know!</p>
<p><br></p>
<p><br></p>
<p><strong>How do you handle user data?</strong></p>
<p><br></p>
<p>At Friend Verifier, empowering you with information while safeguarding your privacy is our utmost priority. Rest assured, your user data remains strictly confidential and is never shared with any third party. The data you provide during the account creation process is solely used for that purpose and is not cross-referenced with any other data sources, nor is it accessible to anyone else.</p>
<p><br></p>
<p>In the event that an account is not fully completed during signup or if you choose to delete your account, rest assured that all data, including your search history, is routinely purged from our system. Our commitment to data protection ensures that your information is handled responsibly and securely, providing you with peace of mind while using our services.</p>
<p><br></p>
<p><br></p>
<p><strong>Are people alerted if I run a search on them?</strong></p>
<p><br></p>
<p>Your privacy and safety are of the utmost importance to us. Our unwavering mission is to ensure that we take every possible measure to keep you secure.&nbsp;</p>
<p><br></p>
<p>Whether you&apos;re using our services to keep track of important dates like your aunt&apos;s birthday or to assess the safety of someone you&apos;re meeting for a date, rest assured that your search history is entirely private, inaccessible even to us. Your personal information remains in your control, and our commitment to protecting it is steadfast.</p>
<p><br></p>
<p><br></p>
<p><strong>Am I required to give Friend Verifier access to my phone&apos;s contact list?</strong></p>
<p><br></p>
<p>Certainly not. Friend Verifier utilizes two features that access your phone&apos;s contact list. The first feature allows you to invite friends who could benefit from using our app; it&apos;s a simple and convenient way to bring them on board. The second feature enables you to conduct a reverse search on a saved contact.&nbsp;</p>
<p><br></p>
<p>This involves reading the selected contact&apos;s phone number to perform the search. It&apos;s important to note that this access is granted on a per-transaction basis, and at any point, you can easily revoke our access to your contacts within your phone&apos;s settings app. Rest assured, even if you choose not to grant access, the app will work flawlessly without any hiccups. Your control over your data and privacy is paramount to us.</p>
<p><br></p>
<p><br></p>
<p><strong>Can I opt-out of your database?</strong></p>
<p><br></p>
<p>Absolutely! You have the right to remove your information from our database. While this requirement is mandated by law in only three states (California, Colorado, and Virginia), we go beyond and offer this option to every United States citizen, regardless of their state of residence. Your privacy and control over your information are of utmost importance to us.</p>
<p><br></p>
<p><br></p>
<p><strong>What is the history of Friend Verifier?</strong></p>
<p><br></p>
<p>In 2012, Friend Verifier revolutionized the landscape by becoming the pioneering app that empowered Facebook users to scan their friends and friend requests for registered sex offenders. Despite initial skepticism, the app swiftly garnered attention from journalists across the United States, who subjected Friend Verifier to rigorous testing. The results were eye-opening, revealing that registered sex offenders were indeed present on Facebook, posing a significant threat to women and children.</p>
<p><br></p>
<p>The investigative journalists made startling discoveries, revealing how sex offenders managed to befriend unsuspecting teenagers and young adults, putting them in perilous situations. This had severe consequences, as convicted rapists and child molesters gained access to sensitive information such as school details and hangout locations, posing a direct threat to innocent lives. The rapid surge in our app&apos;s popularity, reaching over 14 million users, triggered a wave of questions, questioning why these dangerous individuals were allowed on the platform.</p>
<p><br></p>
<p>In response to the growing concern, Facebook took decisive action and altered developer access, removing APIs needed for Friend Verifier to work.&nbsp;</p>
<p><br></p>
<p><br></p>
<p><strong>Can I pay for one search or must I get a subscription?</strong></p>
<p><br></p>
<p>Unlike many of our competitors, we offer a more flexible and customer-friendly approach. With us, you have the freedom to conduct a single search without being forced into a monthly subscription. Additionally, we don&apos;t surprise you with additional fees for accessing more information. Our goal is to provide a transparent and straightforward experience, ensuring that you only pay for what you need and use. Your satisfaction is our priority.</p>
<p><br></p>
<p><br></p>
<p><strong>How do I cancel my subscription?</strong></p>
<p><br></p>
<p>Opting for one of our convenient paid monthly or yearly subscriptions is a breeze, and canceling is just as simple! To cancel, open your phone&apos;s settings, navigate to subscriptions, and choose to cancel your subscription hassle-free. We believe in providing you with an effortless experience, even when it comes to managing your subscription.</p>
<p><br></p>
   `,
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
            FAQs
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
        <View style={{ marginTop: RFValue(25), padding: RFValue(25) }}>
          {/* <Text style={styles.faqsText}>
            prem ipsum dolor sit amet, Onsectetur adipiscing elit, sed do usmod
            tempor incididunt ut labore dolore magna aliqua. Ut enim ad inim
            veniam, quis nostrud xercitation ullamco laboris nisi ut liquip ex
            ea commodo consequat. Duis aute irure dolor in eprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.{"\n"}
            {"\n"}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text> */}
           <RenderHtml
            contentWidth={"100%"}
            source={source}
            tagsStyles={classesStyles}
            // domVisitors={{ onElement }}
            // renderersProps={renderersProps}
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
    marginLeft: RFValue(40),
  },
  subtitle: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "Medium",
    textAlign: "left",
    marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },

  faqsText: {
    fontSize: RFValue(16),
    color: "#000",
    fontFamily: "BoldText",
  },
});
