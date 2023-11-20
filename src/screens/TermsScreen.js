import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
  TouchableOpacity,
  BackHandler,
  NativeModules,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../src/constants/device";
import RNExitApp from "react-native-exit-app";
import { axiosPUTCall } from "../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/action"; // Action function

const WIDTH = Dimensions.get("window").width;
export default function TermsScreen({ navigation, route }) {
  const [isTab1Active, setTab1Active] = useState(false);
  const userData = useSelector((state) => state?.loginDetails);
  const dispatch = useDispatch();

  const agreeFun = () => {
    const url = "/user/" + userData?.data?._id;
    var Token = userData?.Authorization;
    var obj = {
      toc: true,
    };
    axiosPUTCall(url, obj, Token, (callBack) => {
      if (callBack?.status == 200) {
        navigation.replace("tabs");
        // navigation.replace("SubscribeScreen", {
        //   welcome: 1,
        // });
      }
    });
  };

  const disagreeFun = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    dispatch(logOut({}));
  };

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
            Terms & Privacy
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
        <View style={styles.topTab}>
        <TouchableOpacity
          style={isTab1Active ? styles.topTabbtn : styles.topTabbtn2}
          onPress={() => {
            setTab1Active(true);
            // Additional logic or navigation can be added here
          }}>
          <Text style={isTab1Active ? styles.tabactiveText : styles.inActiveText}>
            Terms of Service
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={!isTab1Active ? styles.topTabbtn : styles.topTabbtn2}
          onPress={() => {
            setTab1Active(false);
            // Additional logic or navigation can be added here
          }}>
          <Text style={!isTab1Active ? styles.tabactiveText : styles.inActiveText}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      {isTab1Active ? (
        <View style={{ marginTop: RFValue(-5), padding: RFValue(25) }}>
          <Text style={styles.faqsText}>
            Welcome to FriendVerifier.com (aka "Friend Verifier").
            FriendVerifier.com is a website (“Site”) provided by Friend Verifier
            Inc. The following is the terms that all user of this site are
            subject to. These terms are what governs the users us of this site
            and can be updated without giving notice to you the user. By using
            or visiting the site you accept the terms. Please go over them.
            carefully.{"\n"}
            {"\n"}1. Registering with the Friend Verifier In order to take
            advantage of the features on this site, you will be required to
            register with Friend Verifier.com. For example, you may be required
            to register if you want to set up a Site account, where you can save
            your preferences, receive email alerts, discount offerings, utilize
            free and paid searches, or other information from the Site. You may
            also be required to register to receive email updates with updated
            information from Friend Verifier.com. The use of any personal
            information that you provide to Friend Verifier during any
            registration process is governed by our privacy policy. Users may
            receive email confirming their registration Friend Verifier.com, as
            well as promotional marketing of commercial products and services.
            By having an account with Friend Verifier, you agree to take full
            responsibility for maintaining the confidentiality of your account
            user name, password, and all related activity that occurs under your
            account user name.{"\n"}
            {"\n"}2. Your Registration Obligations In consideration of your use
            of the Site's services, you represent that you are of legal age to
            form a binding contract and are not a person barred from receiving
            our services under the laws of the United States or other applicable
            jurisdiction. You also agree to: (i) provide true, accurate, current
            and complete information about yourself as prompted by our Site, and
            (ii) maintain and promptly update your Site information to keep it
            true, accurate, current and complete. If you provide any information
            that is untrue, inaccurate, not current or incomplete, or we have
            reasonable grounds to suspect that such information is untrue,
            inaccurate, not current or incomplete, we have the right to suspend
            or terminate your account and refuse any and all current or future
            use of the Site.{"\n"}
            {"\n"}3. Site Results Most of the products on the Site come with a
            limited guarantee. We provide free searches which are clearly
            labeled as free, as well as paid searches. Certain searches are “no
            hit no fee searches” and those searches will be clearly labeled as
            well. Searches like background searches, criminal searches, liens
            and judgments and bankruptcies searches all have a fee regardless if
            there is a result or not. You acknowledge that the service is
            provided "as is." You are paying for us to conduct a search on your
            behalf, not to return any particular result. Information is often
            obtained by third parties and the accuracy of the information cannot
            be guaranteed. In the event of using this service for criminal or
            civil background checks, you should not assume that this data
            provides a complete or accurate history of any person's criminal or
            civil history. Our data is subject to the many thousands of sources
            that we compile every day. You should consult state and federal laws
            before using this information in making decisions on hiring or
            firing of employees. Friend Verifier cannot offer legal advice on
            how to use the information contained in criminal or civil background
            reports. Friend Verifier is not responsible for any action taken by
            the customer based on this information. Customers should use extreme
            caution when interpreting the results of a criminal or civil
            background search for any type of personal verification. Positive or
            false matches in criminal or civil searches may not provide
            confirmation of an individual's criminal or civil background. Proper
            use of these reports is the responsibility of you, the customer.
            {"\n"}
            {"\n"}4. Fees, Refunds & Fraud Fees for our services are listed on
            the site and by using this site you agree to pay those fees for said
            services. Unless we indicate otherwise, all fees and charges are
            final, with no refunds. There are no refunds for the purchase of
            credits nor are there refunds for the purchasing of services on this
            site. By purchasing our services, you agree to pay with a valid
            credit card or other means via PayPal and certify that you are an
            authorized user of the credit card/PayPal account. To protect our
            customers from credit card fraud, we may work with law enforcement
            agencies to address issues by sharing information such as credit
            card numbers, email addresses, IP addresses, etc. We reserve the
            right to suspend services for individuals suspected of fraudulent
            credit card activity. You are responsible, and must pay for, all
            purchases of the services made by individuals using your account. If
            you suspect that unauthorized use of your account is occurring, you
            must notify us immediately. You agree to pay all amounts due upon
            our demand. In the event we have to collect unpaid amounts you owe
            us, you will be liable for all collection costs, including
            attorneys' and collection agency fees.{"\n"}
            {"\n"}5. Unauthorized Use of the Site You agree that you are only
            authorized to visit, view, and retain a copy of pages of this Site
            for your own personal use; except with the Friend Verifier's written
            permission, you shall not duplicate, download, publish, modify, or
            otherwise distribute the material on this Site for any commercial
            use, or for any purpose other than as described in these Terms. You
            cannot automate, script, scrape, or otherwise take data from the
            Site in an automated fashion to re-use or display in any way. You
            acknowledge that we are not providing you with a consumer report,
            and you are certifying that you will not use information obtained
            from us for any purpose covered under the Fair Credit Reporting Act
            (15 U.S.C. §1681, et seq.). You acknowledge that the Friend Verifier
            owns and retains all proprietary materials contained on the Site,
            including trademarks, content, and other proprietary content.
            Illegal and/or unauthorized uses of the Site, including, but not
            limited to, unauthorized framing of or linking to the Site,
            unauthorized use of any robot, spider, or other automated device on
            the Site, automating, scripting, scraping or otherwise taking data
            from the Site in an automated fashion to re-use or display in any
            way using information obtained from the Site, including an email
            search results, to transmit any commercial, advertising or
            promotional materials, including without limitation, "spam", using
            information obtained from the Site to harass, offend, threaten,
            embarrass, or invade the privacy of any individual or entity,
            violating any applicable law, regulation or rule, providing false
            information on your registration form or impersonating another
            person at any point (i.e., unauthorized/fraudulent credit card
            information, false names, etc.), or using information obtained from
            the Site for any purpose covered under the Fair Credit Reporting Act
            (15 U.S.C. §1681, et seq.), will be investigated and subject to
            appropriate action, including, without limitation, termination of
            your account and formal civil, criminal, and injunctive redress.
            {"\n"}
            {"\n"}6. Violation of the Terms You agree that monetary damages may
            not provide a sufficient remedy to the Friend Verifier for
            violations of these terms of use and you consent to injunctive or
            other equitable relief for such violations.
            {"\n"}
            {"\n"}7. Proprietary Rights You acknowledge and agree that the
            Friend Verifier owns all legal right, title, and interest in and to
            the Site, including any intellectual property rights which subsist
            in the Site (whether those rights happen to be registered or not,
            and wherever in the world those rights may exist). Unless you have
            agreed otherwise in writing with the Friend Verifier, nothing in the
            Terms gives you a right to use any of the Friend Verifier trade
            names, trademarks, service marks, logos, domain names, and other
            distinctive brand features.{"\n"}
            {"\n"}8. Disclaimers The information accessed on the Friend Verifier
            website are in-house databases which have been compiled from public
            records and other proprietary sources for the specific purposes of
            locating individuals, property and businesses, and/or providing
            general background information about individuals and businesses for
            verification purposes. Neither Friend Verifier nor any of our data
            suppliers represents or warrants that the Information is current,
            complete or accurate. Verius LLC on the behalf of Friend Verifier
            HEREBY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES REGARDING THE
            PERFORMANCE OF THE SERVICE AND THE ACCURACY, CURRENCY, OR
            COMPLETENESS OF THE INFORMATION, INCLUDING (WITHOUT LIMITATION) ALL
            WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
            ADDITIONALLY, UNDER NO CIRCUMSTANCES SHALL WE BE LIABLE TO YOU FOR
            ANY DAMAGES WHATSOEVER, INCLUDING (WITHOUT LIMITATION) ANY DIRECT,
            SPECIAL, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, LOST
            PROFITS, OR ANY OTHER CLAIMS OF YOURS OR THIRD PARTIES, EVEN IF WE
            HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. You assume all
            risks associated with the use of our databases and information.
            {"\n"}
            {"\n"}9. Communications When you visit the Site or send an emails to
            us, you are communicating with us electronically. You consent to
            receive communications from us electronically. We will communicate
            with you by an email or by posting notices on the Site. You agree
            that all agreements, notices, disclosures and other communications
            that we provide to you electronically satisfy any legal requirement
            that such communications be in writing.{"\n"}
            {"\n"}10. LIMITATION ON LIABILITY EXCEPT IN JURISDICTIONS WHERE SUCH
            PROVISIONS ARE RESTRICTED, IN NO EVENT WILL WE BE LIABLE TO YOU FOR
            ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
            PUNITIVE DAMAGES, INCLUDING LOST PROFITS, EVEN IF WE HAVE BEEN
            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.{"\n"}
            {"\n"}11. Disputes If there is any dispute about or involving the
            Site, you, by using the Site, agree that the dispute will be
            governed by the laws of the State of California without regard to
            its conflict-of-law provisions. You agree to personal jurisdiction
            by, and venue in the state and federal courts of the State of
            Florida, City of Fort Lauderdale.{"\n"}
            {"\n"}12. Indemnity You agree to indemnify and hold the Friend
            Verifier, its subsidiaries, affiliates, officers, agents, and other
            partners and employees harmless from any loss, liability, claim, or
            demand, including reasonable attorneys' fees, arising out of the use
            of the Site by user or user's account.
          </Text>
        </View>) : <View style={{ marginTop: RFValue(-5), padding: RFValue(25) }}>
          <Text style={styles.faqsText}>
          Thank you for visiting our website located at
            www.friendverifier.com, for downloading the Friend Verifier App, or
            for visiting another Friend Verifier website or downloading another
            Friend Verifier or affiliated mobile application that links to and
            utilizes this Privacy Policy (all platforms collectively referred to
            as the "Site"). The Site is a web-based property of Friend Verifier,
            LLC. (“Friend Verifier," "we," "our," or "us") that enables end-user
            visitors to the Site ("Visitors") to conduct searches of our
            databases of publicly available sources of information about
            individuals. This Privacy Policy describes the ways in which Friend
            Verifier collects, uses, and discloses information about you when
            you access the Site. By accessing, viewing, downloading, or
            otherwise using the Site, you consent to the collection, use, and
            disclosure of your information as set forth in this Privacy Policy,
            now and as amended or modified by us. Friend Verifier also provides
            a quick and easy process to allow individuals to remove their
            information from our People Search results, whether or not they are
            a user of the Site. If you would like to opt out of our People
            Search results, click here. For more information about our opt-out
            process, please see our Opt-Out FAQ{"\n"}
            {"\n"}Information Collected by Friend Verifier Friend Verifier is a
            database of publicly available sources of information aggregated for
            your convenience. Through Friend Verifier, Visitors can access
            certain materials posted to or made available through the Site as
            compiled, distributed, and displayed by Friend Verifier and other
            third-party content providers ("Third-Party Providers") including,
            but not limited to, third-party websites or services that provide
            information about individuals (each, a "Search Subject") that can be
            searched for and accessed through the Site ("Friend Verifier
            Checks"). Friend Verifier gathers three types of information:
            information that you submit to us, information that is collected
            automatically about your usage of the Site, and information about
            Search Subjects. Information You Submit to Friend Verifier We
            collect information that you provide when you use the Site,
            including, but not limited to, when you submit an online application
            to become a Friend Verifier member ("Member"), which enables you to
            utilize a host of services made available to Members by and through
            the Site ("Member Services");when you submit a request to opt out of
            Friend Verifier’s People Search results; when you conduct a Friend
            Verifier Check; or when you contact us with a question, comment, or
            request. This can include, but is not limited to, your: (a) email
            address; (b) full name; (c) company name; (d) date of birth; (e)
            password; (f) mailing address; (g) credit card information; and (h)
            information associated with a Search Subject (such as a name, age,
            or address) that you use to conduct a Friend Verifier Check.
            Information Collected Automatically About Your Usage As is true of
            most web sites, we gather certain information automatically and
            store it in log files. This information may include internet
            protocol (IP) addresses, browser type, internet service provider
            (ISP), referring/exit pages, operating system, date/time stamp,
            and/or clickstream data. We may combine this automatically collected
            log information with other information we collect about you. We do
            this to improve services we offer you, to improve marketing,
            analytics, or site functionality.
            {"\n"}
            {"\n"}2. Your Registration Obligations In consideration of your use
            of the Site's services, you represent that you are of legal age to
            form a binding contract and are not a person barred from receiving
            our services under the laws of the United States or other applicable
            jurisdiction. You also agree to: (i) provide true, accurate, current
            and complete information about yourself as prompted by our Site, and
            (ii) maintain and promptly update your Site information to keep it
            true, accurate, current and complete. If you provide any information
            that is untrue, inaccurate, not current or incomplete, or we have
            reasonable grounds to suspect that such information is untrue,
            inaccurate, not current or incomplete, we have the right to suspend
            or terminate your account and refuse any and all current or future
            use of the Site.{"\n"}
            {"\n"}3. Site Results Most of the products on the Site come with a
            limited guarantee. We provide free searches which are clearly
            labeled as free, as well as paid searches. Certain searches are “no
            hit no fee searches” and those searches will be clearly labeled as
            well.Searches like background searches, criminal searches, liens and
            judgments and bankruptcies searches all have a fee regardless if
            there is a result or not. You acknowledge that the service is
            provided "as is." You are paying for us to conduct a search on your
            behalf, not to return any particular result. Information is often
            obtained by third parties and the accuracy of the information cannot
            be guaranteed. In the event of using this service for criminal or
            civil background checks, you should not assume that this data
            provides a complete or accurate history of any person's criminal or
            civil history. Our data is subject to the many thousands of sources
            that we compile every day. You should consult state and federal laws
            before using this information in making decisions on hiring or
            firing of employees. Friend Verifier cannot offer legal advice on
            how to use the information contained in criminal or civil background
            reports. Friend Verifier is not responsible for any action taken by
            the customer based on this information. Customers should use extreme
            caution when interpreting the results of a criminal or civil
            background search for any type of personal verification. Positive or
            false matches in criminal or civil searches may not provide
            confirmation of an individual's criminal or civil background. Proper
            use of these reports is the responsibility of you, the customer.
            {"\n"}
            {"\n"}4. Fees, Refunds & Fraud Fees for our services are listed on
            the site and by using this site you agree to pay those fees for said
            services. Unless we indicate otherwise, all fees and charges are
            final, with no refunds. There are no refunds for the purchase of
            credits nor are there refunds for the purchasing of services on this
            site. By purchasing our services, you agree to pay with a valid
            credit card or other means via PayPal and certify that you are an
            authorized user of the credit card/PayPal account. To protect our
            customers from credit card fraud, we may work with law enforcement
            agencies to address issues by sharing information such as credit
            card numbers, email addresses, IP addresses, etc. We reserve the
            right to suspend services for individuals suspected of fraudulent
            credit card activity. You are responsible, and must pay for, all
            purchases of the services made by individuals using your account. If
            you suspect that unauthorized use of your account is occurring, you
            must notify us immediately. You agree to pay all amounts due upon
            our demand. In the event we have to collect unpaid amounts you owe
            us, you will be liable for all collection costs, including
            attorneys' and collection agency fees.
            {"\n"}
            {"\n"}5. Unauthorized Use of the Site You agree that you are only
            authorized to visit, view, and retain a copy of pages of this Site
            for your own personal use; except with the Friend Verifier's written
            permission, you shall not duplicate, download, publish, modify, or
            otherwise distribute the material on this Site for any commercial
            use, or for any purpose other than as described in these Terms. You
            cannot automate, script, scrape, or otherwise take data from the
            Site in an automated fashion to re-use or display in any way. You
            acknowledge that we are not providing you with a consumer report,
            and you are certifying that you will not use information obtained
            from us for any purpose covered under the Fair Credit Reporting Act
            (15 U.S.C. §1681, et seq.). You acknowledge that the Friend Verifier
            owns and retains all proprietary materials contained on the Site,
            including trademarks, content, and other proprietary content.
            Illegal and/or unauthorized uses of the Site, including, but not
            limited to, unauthorized framing of or linking to the Site,
            unauthorized use of any robot, spider, or other automated device on
            the Site, automating, scripting, scraping or otherwise taking data
            from the Site in an automated fashion to re-use or display in any
            way using information obtained from the Site, including an email
            search results, to transmit any commercial, advertising or
            promotional materials, including without limitation, "spam", using
            information obtained from the Site to harass, offend, threaten,
            embarrass, or invade the privacy of any individual or entity,
            violating any applicable law, regulation or rule, providing false
            information on your registration form or impersonating another
            person at any point (i.e., unauthorized/fraudulent credit card
            information, false names, etc.), or using information obtained from
            the Site for any purpose covered under the Fair Credit Reporting Act
            (15 U.S.C. §1681, et seq.), will be investigated and subject to
            appropriate action, including, without limitation, termination of
            your account and formal civil, criminal, and injunctive redress.
            {"\n"}
            {"\n"}6. Violation of the Terms You agree that monetary damages may
            not provide a sufficient remedy to the Friend Verifier for
            violations of these terms of use and you consent to injunctive or
            other equitable relief for such violations.{"\n"}
            {"\n"}7. Proprietary Rights You acknowledge and agree that the
            Friend Verifier owns all legal right, title, and interest in and to
            the Site, including any intellectual property rights which subsist
            in the Site (whether those rights happen to be registered or not,
            and wherever in the world those rights may exist). Unless you have
            agreed otherwise in writing with the Friend Verifier, nothing in the
            Terms gives you a right to use any of the Friend Verifier trade
            names, trademarks, service marks, logos, domain names, and other
            distinctive brand features.{"\n"}
            {"\n"}8. Disclaimers The information accessed on the Friend Verifier
            website are in-house databases which have been compiled from public
            records and other proprietary sources for the specific purposes of
            locating individuals, property and businesses, and/or providing
            general background information about individuals and businesses for
            verification purposes. Neither Friend Verifier nor any of our data
            suppliers represents or warrants that the Information is current,
            complete or accurate. Verius LLC on the behalf of Friend Verifier
            HEREBY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES REGARDING THE
            PERFORMANCE OF THE SERVICE AND THE ACCURACY, CURRENCY, OR
            COMPLETENESS OF THE INFORMATION, INCLUDING (WITHOUT LIMITATION) ALL
            WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
            ADDITIONALLY, UNDER NO CIRCUMSTANCES SHALL WE BE LIABLE TO YOU FOR
            ANY DAMAGES WHATSOEVER, INCLUDING (WITHOUT LIMITATION) ANY DIRECT,
            SPECIAL, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, LOST
            PROFITS, OR ANY OTHER CLAIMS OF YOURS OR THIRD PARTIES, EVEN IF WE
            HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. You assume all
            risks associated with the use of our databases and information.
            {"\n"}
            {"\n"}9. Communications When you visit the Site or send an emails to
            us, you are communicating with us electronically. You consent to
            receive communications from us electronically. We will communicate
            with you by an email or by posting notices on the Site. You agree
            that all agreements, notices, disclosures and other communications
            that we provide to you electronically satisfy any legal requirement
            that such communications be in writing.{"\n"}
            {"\n"}10. LIMITATION ON LIABILITY EXCEPT IN JURISDICTIONS WHERE SUCH
            PROVISIONS ARE RESTRICTED, IN NO EVENT WILL WE BE LIABLE TO YOU FOR
            ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
            PUNITIVE DAMAGES, INCLUDING LOST PROFITS, EVEN IF WE HAVE BEEN
            ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.{"\n"}
            {"\n"}11. Disputes If there is any dispute about or involving the
            Site, you, by using the Site, agree that the dispute will be
            governed by the laws of the State of California without regard to
            its conflict-of-law provisions. You agree to personal jurisdiction
            by, and venue in the state and federal courts of the State of
            Florida, City of Fort Lauderdale.{"\n"}
            {"\n"}12. Indemnity You agree to indemnify and hold the Friend
            Verifier, its subsidiaries, affiliates, officers, agents, and other
            partners and employees harmless from any loss, liability, claim, or
            demand, including reasonable attorneys' fees, arising out of the use
            of the Site by user or user's account.
            </Text></View>
        }
      </ScrollView>
      {route?.params?.notBTN == 1 && (
        <View
          style={{
            height: 50,
            width: WIDTH,
            backgroundColor: "transparent",
            // shadowColor: "#000",
            // shadowOffset: {
            //   width: 0,
            //   height: 1,
            // },
            // shadowOpacity: 0.18,
            // shadowRadius: 1.0,

            // elevation: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 30,
            zIndex: 1,
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={() => disagreeFun()}>
            <View>
              <Text
                style={{
                  color: "#4281F7",
                  fontWeight: "bold",
                  fontSize: RFValue(14),
                }}
              >
                Disagree
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              agreeFun();
            }}
          >
            <View>
              <Text
                style={{
                  color: "#4281F7",
                  fontWeight: "bold",
                  fontSize: RFValue(14),
                }}
              >
                Agree
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topTab: {
    flexDirection: 'row',
    marginTop: RFValue(25),
    height:RFValue(35),
    width: WIDTH-RFValue(50),
    backgroundColor: '#ebebeb',
    alignSelf: 'center',
    borderRadius: 5,
    alignItems:'center',
    justifyContent: 'space-evenly',
    borderColor: '#cecbd5',
    borderWidth: 0.5,
    paddingHorizontal:RFValue(5)
  },
  topTabbtn: {
    width: '50%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabbtn2: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ebebeb',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabactiveText: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'RegularText',
    color: '#325A9C',
    fontSize: RFValue(12),
  },
  inActiveText: {
    fontFamily: 'Lato-Bold',
    fontWeight: 'RegularText',
    color: '#000000',
    fontSize: RFValue(12),
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

  headerTitle: {
    fontSize: RFValue(18),
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
    // fontSize: RFValue(16),
    color: "#000",
    // fontFamily: "Medium",
    textAlign: "justify",
  },
  TNCHeading: {
    alignItems: "center",
    marginTop: 20,
  },
  TNCHeadingText: {
    fontSize: RFValue(15),
    fontWeight: "bold",
  },
});
