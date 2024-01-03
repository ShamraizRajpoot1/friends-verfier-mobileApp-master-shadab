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
      <TouchableOpacity style={{width:RFValue(20)}} onPress={() => navigation.goBack()}>
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
            }}
          >
            <Text
              style={isTab1Active ? styles.tabactiveText : styles.inActiveText}
            >
              Terms of Service
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={!isTab1Active ? styles.topTabbtn : styles.topTabbtn2}
            onPress={() => {
              setTab1Active(false);
              // Additional logic or navigation can be added here
            }}
          >
            <Text
              style={!isTab1Active ? styles.tabactiveText : styles.inActiveText}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
        {isTab1Active ? (
          <View style={{ marginTop: RFValue(-5), padding: RFValue(25) }}>
            <Text style={styles.faqsText}>
              Thank you for visiting our website located at
              www.friendverifier.com, for downloading the Friend Verifier App,
              or for visiting another Friend Verifier website or downloading
              another Friend Verifier or affiliated mobile application that
              links to and utilizes this Privacy Policy (all platforms
              collectively referred to as the "Site"). The Site is a web-based
              property of Friend Verifier, Inc. (“Friend Verifier," "we," "our,"
              or "us") that enables end-user visitors to the Site ("Visitors")
              to conduct searches of our databases of publicly available sources
              of information about individuals. This Privacy Policy describes
              the ways in which Friend Verifier collects, uses, and discloses
              information about you when you access the Site. By accessing,
              viewing, downloading, or otherwise using the Site, you consent to
              the collection, use, and disclosure of your information as set
              forth in this Privacy Policy, now and as amended or modified by
              us. Friend Verifier also provides a quick and easy process to
              allow individuals to remove their information from our People
              Search results, whether or not they are a user of the Site. If you
              would like to opt out of our People Search results, click here.
              For more information about our opt-out process, please see our
              Opt-Out FAQ{"\n"}
              {"\n"}
              Information Collected by Friend Verifier Friend Verifier is a
              database of publicly available sources of information aggregated
              for your convenience. Through Friend Verifier, Visitors can access
              certain materials posted to or made available through the Site as
              compiled, distributed, and displayed by Friend Verifier and other
              third-party content providers ("Third-Party Providers") including,
              but not limited to, third-party websites or services that provide
              information about individuals (each, a "Search Subject") that can
              be searched for and accessed through the Site ("Friend Verifier
              Checks"). Friend Verifier gathers three types of information:
              information that you submit to us, information that is collected
              automatically about your usage of the Site, and information about
              Search Subjects.{"\n"}
              {"\n"}
              Information You Submit to Friend Verifier We collect information
              that you provide when you use the Site, including, but not limited
              to, when you submit an online application to become a Friend
              Verifier member ("Member"), which enables you to utilize a host of
              services made available to Members by and through the Site
              ("Member Services"); when you submit a request to opt out of
              Friend Verifier’s People Search results; when you conduct a Friend
              Verifier Check; or when you contact us with a question, comment,
              or request. This can include, but is not limited to, your: (a)
              email address; (b) full name; (c) company name; (d) date of birth;
              (e) password; (f) mailing address; (g) credit card information;
              and (h) information associated with a Search Subject (such as a
              name, age, or address) that you use to conduct a Friend Verifier
              Check.{"\n"}
              {"\n"}
              Information Collected Automatically About Your Usage As is true of
              most web sites, we gather certain information automatically and
              store it in log files. This information may include internet
              protocol (IP) addresses, browser type, internet service provider
              (ISP), referring/exit pages, operating system, date/time stamp,
              and/or clickstream data. We may combine this automatically
              collected log information with other information we collect about
              you. We do this to improve services we offer you, to improve
              marketing, analytics, or site functionality.{"\n"}
              {"\n"}
              When you visit the Site, we or our third-party service providers
              may use a "Cookie" – a small, text-only file that we save to your
              hard drive – or similar technologies to automatically collect and
              store non-personally-identifiable information about your usage of
              the Site such as your IP address, your browser type, the links and
              items you click on, ad impressions on your web browser, and the
              web pages you visit. Cookies enhance your experience at the Site,
              and are in many instances necessary for the provision of Member
              Services. For example, we use Cookies to store your password so
              you don’t have to enter it more than once, and to recognize you if
              you return to the Site using the same web browser.{"\n"}
              {"\n"}
              If you do not want the Site to collect this information through
              Cookies, you may set your web browser to reject Cookies from the
              Site, or to inform you when a Cookie has been sent to your
              computer and provide you with the opportunity to refuse that
              Cookie. Each web browser is different, so please check your
              browser’s "Help" menu to learn how to change your Cookie
              preferences. Please be advised that where you disable or reject
              Cookies, you may not be able to use the Member Services or
              experience the full functionality of the Site. Technologies such
              as cookies, beacons, tags, and scripts are used by Friend Verifier
              and our partners (such as marketing partners, data partners,
              analytics, financial, testing, optimization, and others),
              affiliates, or analytics or service providers (such as data
              providers, customer support, marketing, analytics, business
              development, affiliate, and other). These technologies are used in
              analyzing trends, administering the site, tracking users’
              movements around the site, and to gather demographic information
              about our user base as a whole. We may receive reports based on
              the use of these technologies by these companies on an individual
              as well as aggregated basis.{"\n"}
              {"\n"}
              When you download and use the Friend Verifier App, we also may
              collect your mobile device’s unique identification number. We will
              not collect any precise geolocation information from you or your
              mobile device unless you expressly consent to such collection.
              Third parties with whom we partner to provide certain features on
              our site or to display advertising based upon your Web browsing
              activity use programs that incorporate local stored objects
              ("LSOs") such as HTML 5 or Flash to collect and store information
              on your computer. Various browsers may offer their own management
              tools for removing HTML5 LSOs. To manage Flash LSOs please click
              here.{"\n"}
              {"\n"}
              Behavioral Targeting / Re-Targeting We utilize third party ad
              networks, such as Google, to either display advertising on our Web
              site or to manage our advertising on other sites. Our ad network
              partners may use cookies and Web beacons to collect non-personal
              information about your activities on this and other Web sites to
              provide you targeted advertising based upon your interests. If you
              wish to not have this information used for the purpose of serving
              you targeted ads, you may opt-out by clicking here. You may also
              visit http://www.aboutads.info/choices/ to learn about interest
              based advertising and how to opt-out from online behavioral ads
              served by some or all participating companies. Please note this
              does not opt you out of being served advertising. You will
              continue to receive generic ads.{"\n"}
              {"\n"}
              Information About Search Subjects In connection with providing the
              Friend Verifier Checks, we collect information about Search
              Subjects from our third-party data providers.{"\n"}
              {"\n"}
              Use of Information Collected by Friend Verifier We use the
              information that we collect from you for a number of purposes,
              including: {"\n"}
              to provide you with products, services, or information you
              request, such as Friend Verifier Checks and other Member Services;
              to process, or in connection with, any payments or transactions
              that you authorize; to verify that any credit card you submit is
              valid and active by charging, and thereafter immediately
              crediting, a small sum to the card upon registration; to send you
              service-related communications to verify and manage your Member
              account, about the Site, about the services you request, or
              containing required notices (where you have indicated a
              preference, we will only communicate with you via the medium you
              select, such as by email or telephone); {"\n"}
              to process your requests to opt out of Friend Verifier’s People
              Search results and, if you choose to do so, to create and manage
              your Friend Verifier Opt-Out account; to respond to your
              inquiries; {"\n"}
              to deliver marketing communications or promotional materials that
              may be of interest to you, subject to other terms of this Privacy
              Policy; to generate and analyze statistics about your use of the
              Site (e.g., to determine the demographics of our Visitors); for
              internal business purposes (e.g., to analyze and manage our
              business, to allow us to better tailor the Site to our Visitors’
              needs); {"\n"}
              to customize your experience on the Site; and t to detect and
              protect against fraud, infringement, or other violations of our
              Terms of Service. {"\n"}
              We also may aggregate, anonymize, or merge any of the information
              we collect through the Site or elsewhere for these purposes,
              except as expressly stated otherwise in this Privacy Policy. This
              may include linking your Member account information with
              information collect through Cookies for purposes such as
              identifying what areas of the Site are most relevant to you and
              allowing us to better tailor the Site and our communications to
              your interests. {"\n"}
              When you submit a request to opt out of Friend Verifier’s People
              Search results, we require that you provide an email address.
              Friend Verifier only uses this email address to (i) send you an
              email to verify your request to opt out, (ii) communicate with you
              about questions you may ask concerning your opt-out status, and
              (iii) if you choose, to create a Friend Verifier Opt-Out account
              to review the record(s) you have opted out on an ongoing basis. We
              will not sell the email address that you provide as part of the
              opt-out process, or use it for any other purpose, without your
              prior consent.{"\n"}
              {"\n"}
              Friend Verifier uses data about Search Subjects to provide
              responses to Friend Verifier Checks performed through the Site.
              {"\n"}
              {"\n"}
              Sharing of Information Collected by the Site {"\n"}
              We may share the information we collect from you with third
              parties for the following purposes: with affiliates and service
              providers who work on our behalf including, but not limited to:
              credit card processing companies to process your payments for
              goods and services and to verify that your credit card account is
              valid and active; data partners to process data on our behalf
              (e.g., by removing duplicate information from user lists, by
              analyzing data); and marketing partners who may market our
              products to you on our behalf and provide analysis of such
              marketing efforts. These affiliates and service providers will
              have access to your information as needed to perform their
              functions on our behalf but we do not permit them to use your
              information for other purposes. In addition, apart from the
              circumstances described above, we will not share your credit card
              information with any third parties without your prior informed
              consent, although notwithstanding the foregoing, we reserve the
              right to share with third parties the fact that we have credit
              card information about you on file; {"\n"}
              in connection with providing the Friend Verifier Checks, with
              certain third-party companies (such as data partners) for the sole
              and exclusive purpose of verifying information applicable to the
              particular Search Subject. These third-party companies shall be
              subject to an obligation of confidentiality regarding such
              information, and shall not themselves store, save, or transfer
              such information other than as necessary to perform the applicable
              verification services. We will not share the information of the
              Search Subjects for any other purpose; to any acquiring entity in
              connection with any sale, merger, consolidation, change in
              control, transfer of substantial assets, reorganization, or
              liquidation of Friend Verifier; to respond to a subpoena, court
              order, or legal process served on us or otherwise to comply with
              the law; {"\n"}
              when we believe that disclosure is necessary to protect the rights
              of Friend Verifier, its parents, subsidiaries, affiliates, joint
              ventures, or third-party service providers, and each of their
              respective members, officers, directors, employees, agents,
              shareholders, co-branders, content licensors, suppliers,
              contractors, attorneys, and other partners, such as to enforce or
              apply this Privacy Policy, the Terms and Conditions, and other
              applicable Friend Verifier agreements and policies; and to protect
              the rights, property, or safety of you or others (e.g., by
              exchanging information with other companies and organizations for
              fraud protection purposes, by providing information to law
              enforcement where we believe the Site is being or has been used to
              commit unlawful acts). {"\n"}
              We do not share precise geolocation information (such as collected
              from your mobile device) with third parties unless you expressly
              consent to such sharing (except where in response to a valid
              subpoena or the like). In addition, we may share aggregate reports
              comprised of the demographic, usage, and/or other characteristics
              of our Visitors as a group, which will never identify you
              personally, with third parties. {"\n"}
              Correcting, Updating, or Removing Member Information If the
              information you submit to us changes, or if you no longer desire
              our services, you may correct, update, or request deletion of this
              information by making the change on your member information page
              or by contacting us at the contact information listed below.{" "}
              {"\n"}
              {"\n"}
              Data Retention {"\n"}
              We will retain the information that we have collected about you
              until you have requested deletion of the information. If you wish
              to cancel your Member account or Friend Verifier Opt-Out account
              or request that we no longer use your information to provide you
              with services, please contact us at privacy@Friend Verifier.com.
              However, we may retain some or all of your information after you
              request deletion or cancelation, as necessary, to comply with our
              legal obligations, resolve disputes, and enforce our agreements.{" "}
              {"\n"}
              {"\n"}
              Changes to Our Privacy Policy Friend Verifier may amend or modify
              this Privacy Policy,{"\n"} in whole or in part, from time to time
              in its sole discretion, effective immediately upon prominently
              posting a link to those changes on our Site's homepage or directly
              communicating them to you. If we make material changes to this
              Privacy Policy, we will notify you here, at the email address
              associated with your Member or Friend Verifier Opt-Out account, or
              by means of a notice on our home page prior to the change becoming
              effective. Your continued use of or access to the Site or any
              Member Services after any posted amendment or modification to this
              Privacy Policy or receipt of a Privacy Policy change notification
              email constitutes an affirmative acknowledgment and acceptance by
              you of the amended or modified Privacy Policy. {"\n"}
              {"\n"}
              Security {"\n"}
              We endeavor to keep all information that we collect from or about
              you protected both online and offline. Unfortunately, no data
              security system or transmission over the Internet is guaranteed to
              be 100% secure. As a result, while we strive to protect your
              personal information, we cannot ensure or warrant the security of
              any information that you transmit to us, and you do so at your own
              risk.{"\n"}
              {"\n"}
              Marketing Opt-out {"\n"}
              Where you receive marketing emails sent by us or one of our
              third-party advertisers, you may unsubscribe from receiving such
              marketing emails at any time by following the instructions
              contained at the end of the email. We may maintain separate email
              lists for different purposes, so you may need to unsubscribe from
              multiple lists. However, even where you unsubscribe from all of
              our and our third-party advertisers’ lists, you may receive
              marketing emails in the future if you opt in to a different email
              marketing program, although you can always unsubscribe from such
              programs as well by following the instructions contained at the
              end of any email you receive. {"\n"}
              You also may, at any time, notify Friend Verifier that you do not
              wish to have Friend Verifier disclose your information to third
              parties for the purposes of sending you marketing offers and
              promotions by visiting www.bv-email.com. {"\n"}
              Information sent on behalf of third-party advertisers is prepared
              several days in advance, so you may continue to receive email from
              us or our third-party advertisers for up to ten days after
              submitting an unsubscribe request as detailed above. {"\n"}
              Links {"\n"}
              The Site contains links to other websites on the Internet that are
              owned and operated by third parties. In some instances, these
              websites are co-branded and the third parties are entitled to use
              Friend Verifier’s name and logo on their websites. Please be aware
              that Friend Verifier is not responsible for the data practices of
              such websites, which shall be subject to those websites’ privacy
              policies. We encourage you to be aware when you leave the Site and
              to read the privacy policy of each and every website that you link
              to from the Site. This Privacy Policy applies solely to
              information collected by the Site. {"\n"}
              {"\n"}
              Blog {"\n"}
              Our Site offers publicly accessible blogs. You should be aware
              that any information you provide in these areas may be read,
              collected, and used by others who access them. In order to post
              comments within the blog area of our Site you must be a member of
              our service provider’s site. Our service provider will then allow
              us to view the comments before they are posted. To request removal
              of your personal information from our blog, contact us at
              privacy@Friend Verifier.com. In some cases, we may not be able to
              remove your personal information, in which case we will let you
              know if we are unable to do so and why. {"\n"}
              {"\n"}
              Social Media Widgets {"\n"}
              Our Web site includes Social Media Widgets, such as the Share this
              button or interactive mini-programs that run on our site. These
              Features may collect your IP address, which page you are visiting
              on our site, and may set a cookie to enable the Feature to
              function properly. Social Media Features and Widgets are either
              hosted by a third party or hosted directly on our Site. Your
              interactions with these Features are governed by the privacy
              policy of the company providing it.{"\n"}
              {"\n"}
              Children's Privacy {"\n"}
              Friend Verifier is very sensitive to the issue of children's
              privacy. The Site, as well as its products and services, are not
              developed for or directed at children. Visitors under eighteen
              years of age are not eligible to use the Site and we do not
              knowingly solicit or collect personal information from any Visitor
              that we actually know is under the age of eighteen. Friend
              Verifier encourages parents and guardians to spend time online
              with their children and to participate and monitor the interactive
              activities of their children. If you believe that your child has
              provided Friend Verifier with any personal information without
              your consent, please email us at privacy@FriendVerifier.com.{" "}
              {"\n"}
              {"\n"}
              Contacting the Site {"\n"}
              If you have any questions about this Privacy Policy, the data
              practices of the Site, or your dealings with the Site, please feel
              free to contact us at, at privacy@FriendVerifier.com, or at:{"\n"}
              {"\n"}
              Friend Verifier {"\n"}
              757 SE 17th Street {"\n"}
              Suite 127 {"\n"}
              Fort Lauderdale, FL 33316 {"\n"}
              {"\n"}
              All communications with us or our authorized agents may be
              monitored or recorded. {"\n"}
              Notice for California Residents {"\n"}
              In addition to the above, the following, intended solely for
              California residents, concerns our handling of certain personally
              identifiable and/or personal information as required by the
              California Online Privacy Protection Act and the California
              Consumer Privacy Act (collectively, "CCPA"). If you are a
              California resident, you may have additional rights where some of
              your "Public" and "Personal" information is concerned. If
              applicable, you may have the right to request that we disclose to
              you categories and specific pieces of Public information we may
              have obtained from public data sources and Personal information we
              may have collected directly from you, if any, and delete such,
              where required. Please note that we never sell Personal
              information obtained from you under any circumstances. {"\n"}
              {"\n"}
              Categories of personal information we obtain, collect and/or
              disclose for business purposes: {"\n"}
              Various methods for submitting requests are referenced above, as
              well as the specific types of Public information we obtain from
              publicly available data sources and/or Personal information we
              collect directly from our users. Per CCPA, in response to verified
              requests for disclosure, we will provide those "categories" of
              information we obtain or collect. The categories we have obtained
              or directly collected are: identifiers (such as name, address,
              email address); general geolocation information (e.g., your city
              and state); and/or other information that identifies or can be
              reasonably associated with you. We may disclose these categories
              of information about you or your use of the Site for business
              purposes (as defined by applicable law) or as required by
              applicable law {"\n"}
              {"\n"}
              How categories of Personal information could be used: We and our
              service providers may use the categories of Personal information
              we collect from and about you consistent with the various business
              purposes and/or as required by law. Please see the relevant
              sections above for more information. {"\n"}
              {"\n"}
              Sale of Public information: {"\n"}
              CCPA sets forth certain obligations for businesses that “sell”
              personal information. We do not sell Personal information obtained
              from our site's visitors or subscribers, such as a name or email
              address provided when subscribing to our Site (unless such
              information happens to also be publicly available "Public"
              information that was NOT obtained from such visitors or
              subscribers but was instead obtained from publicly available data
              sources independent of anything visitors or subscribers may have
              provided us). As permitted by law and CCPA regulatory guidance, we
              may need to share certain limited information about your activity,
              for example through cookies (see above), with third parties in
              certain instances--you can control these cookies through browser
              settings--but this limited sharing would not constitute a sale of
              Personal information. {"\n"}
              {"\n"}
              Non-discrimination for exercising your rights: {"\n"}
              In addition to including information as to how you can exercise
              your rights under CCPA, please note that we will never
              discriminate against you for exercising your CCPA or any other
              rights. We will not deny you any access or service, charge you a
              different price, whether via a discount or other benefit, or
              impose fees or penalties, provide a different level of service, or
              the like (though CCPA permits such practices in some scenarios).
              CCPA permits companies to offer certain incentives that might
              result in different prices, rates or quality levels, but any
              CCPA-permitted financial incentive should reasonably relate to
              your information’s value and contain written terms that describe
              the program’s material aspects and participation in any such
              financial incentive program requires your prior opt-in consent,
              which you may revoke at any time. We do not engage in any such
              practices.{"\n"}
              {"\n"}
              Authorized Agents: {"\n"}
              You may authorize another person to submit a request on your
              behalf. Please note that before completing any requests, and in
              addition to our identification verification process, we are
              required to verify that your agent has been properly authorized to
              request information on your behalf and this may take additional
              time to fulfill your request. {"\n"}
              {"\n"}
              To make a request on behalf of a Friend Verifier consumer, the
              authorized agent must first provide a copy of either (a) a letter
              signed by the consumer authorizing the agent to submit a CCPA
              request on his or her behalf, or (b) a valid power of attorney
              issued pursuant to California Probate Code §§ 4000 to 4465. An
              authorized agent must email one of these documents to
              ccpa@FriendVerifier.com. For the safety and security of the
              consumer’s information, “requests to delete” and “right to know”
              requests submitted by an authorized agent must include the
              following information regarding the consumer: {"\n"}
              First, Middle (if available), and Last Name {"\n"}
              Valid email address {"\n"}
              Age {"\n"}
              Address {"\n"}
              Upon receipt of a verifiable request, CCPA provides some
              California residents with such additional rights as follows:{" "}
              {"\n"}
              Right to Know. {"\n"}
              You may have the right to know and see the categories of data we
              have obtained, collected or shared about you over the past 12
              months (or if we have not done so), including: {"\n"}
              {"\n"}
              the categories of Personal information we collected about you, or
              disclosed about you for a business purpose; {"\n"}
              the categories of sources from which the personal information is
              collected; {"\n"}
              the business or commercial purpose for collecting, obtaining or
              selling your personal information;{"\n"}
              the categories of third parties with whom we have shared your
              personal information; and {"\n"}
              the specific items of Personal information we have collected or
              Public information we have obtained about you. {"\n"}
              To begin your Right-to-Know request, please email us at
              ccpa@Friend Verifier.com, fill out our online request form or
              contact us via the phone number or postal address listed above. We
              will respond within 10 days of receipt with instructions for
              continuing your Right-to-know request, including any additional
              information needed concerning yourself so that we may search for
              applicable Personal information collected or Public information
              obtained that pertains to You. The information you provide must
              sufficiently match the information in our database to permit us to
              verify your request. An authorized agent may also make a request
              on your behalf. {"\n"}
              We will endeavor to respond to a verifiable consumer request
              within forty-five days of receipt. If we require more time (up to
              90 days), we will inform you of the reason and extension period in
              writing. {"\n"}
              Right to Delete. {"\n"}
              You may have the right to request that we delete information we
              have obtained regarding, or collected directly from, you (and ask
              our service providers to do the same). However, we cannot delete
              Personal information that we are under a legal obligation to
              maintain and there are a number of other exceptions that include,
              but are not limited to, when the information is necessary for us
              or a third party to do any of the following: {"\n"}
              complete and process your transaction;{"\n"}
              provide you with a product or service;{"\n"}
              perform a contract between us and you;{"\n"}
              protect your security and prosecute those responsible for
              breaching it;{"\n"}
              fix our system in the case of a bug;{"\n"}
              protect your or other users’ free speech rights;{"\n"}
              comply with the California Electronic Communications Privacy Act
              (Cal. Penal Code § 1546 et seq.);{"\n"}
              engage in public/peer-reviewed research in the public interest,
              adhering to all applicable ethics and privacy laws;{"\n"}
              comply with a legal obligation; or{"\n"}
              make other internal and lawful uses of information compatible with
              the context in which you provided it.{"\n"}
              To begin your Right-to-Delete request, please email us at
              ccpa@FriendVerifier.com, fill out our online request form or
              contact us via the phone number or postal address listed above.
              Right to ask us not to sell (also known as the right to opt-out).
              {"\n"}
              {"\n"}
              As explained above, we do not sell Personal information obtained
              from our site's visitors or subscribers, such as a name or email
              address provided when subscribing to our Site (unless such
              information happens to also be publicly available "Public"
              information that was NOT obtained from such visitors or
              subscribers but was instead obtained from publicly available data
              sources independent of anything visitors or subscribers may have
              provided us). As for the Public information obtained from publicly
              available data sources, for many years now, we have accommodated
              requests to opt-out/not to sell/share such information, which can
              be done in various locations on the Site. For your convenience,
              you may also email us at ccpa@FriendVerifier.com, fill out our
              online request form or contact us via the phone number or postal
              address listed above to request that we not sell and opt-out your
              Public information. While we will not sell such Public information
              that has been opted-out, we reserve the right to disclose Public
              information to third parties, without notice to you, if required
              to do so by law, or if we have a good faith belief that disclosure
              is necessary to (i) act in an emergency to protect someone’s
              safety; (ii) comply with legal process served on us; or (iii)
              protect and defend our rights or property. We also reserve the
              right to transfer Public information to any successor-in-interest
              to our business.{"\n"}
              Cal. Code Regs. tit. 11, § 999.317(g)(1) Metrics {"\n"}
              {"\n"}
              In summary:{"\n"}
              At no cost, you may request information each year regarding any
              disclosure of your Public or Personal information to third parties
              for their own direct marketing purposes during the preceding
              calendar year. You have the right not to be discriminated against
              for exercising any of the rights listed above. To request access
              to or deletion of your information, or to exercise any other data
              rights under California law, please contact us using one of the
              methods set forth above.
            </Text>
          </View>
        ) : (
          <View style={{ marginTop: RFValue(-5), padding: RFValue(25) }}>
            <Text style={styles.faqsText}>
              Welcome to Friend Verifier ("Friend Verifier," "us," "our," or
              "we"), the owner and controller of the website
              www.friendverifier.com. To ensure transparency and protect your
              privacy, we have crafted this Privacy Policy, which outlines
              crucial information about how we collect and handle user data on
              www.friendverifier.com and any related websites (collectively, the
              "Site"), along with our mobile applications and mobile-focused
              websites (referred to as the "Friend Verifier Applications").
              {"\n"} {"\n"}
              This Privacy Policy also covers our offline data collection
              practices, including information gathered through phone
              interactions with our Customer Care team. We present this Privacy
              Policy to help you make an informed decision regarding your use of
              Friend Verifier's services ("Services").{"\n"} {"\n"}
              By accepting this Privacy Policy and our Terms of Use during the
              registration process on the Friend Verifier Applications, you
              enter into a legally binding agreement with Friend Verifier based
              on these policies. Each time you access the Friend Verifier
              Applications or utilize our Services, you signify your consent to
              be bound by the Terms and this Privacy Policy. Additionally, we
              want to highlight that Friend Verifier does not provide consumer
              reports, and you agree not to use any information obtained from us
              for purposes covered by the Fair Credit Reporting Act (15 U.S.C.
              §1681, et seq.).{"\n"} {"\n"}
              If you do not agree to the Terms of Use and this Privacy Policy,
              please refrain from using the Friend Verifier Applications or
              Services. Your privacy and satisfaction are of utmost importance
              to us, and we are committed to providing a secure and reliable
              experience at Friend Verifier.{"\n"} {"\n"}
              I. INFORMATION WE COLLECT{"\n"} {"\n"}
              A. Information Provided Directly by You{"\n"} {"\n"}
              At Friend Verifier, we collect certain information directly from
              you when you engage with our services. This includes:{"\n"} {"\n"}
              1. Identifiers: This category includes your name, postal address,
              email address, and account name if you decide to register with us
              or subscribe to our services.{"\n"} {"\n"}
              2. Personal Information Categories Listed in the California
              Customer Records statute (Cal. Civ. Code § 1798.80(e)): When you
              register with Friend Verifier or make purchases for specific
              products and services, we may collect additional details such as
              your name, address, email address, and credit card or debit card
              number. While many of our Friend Verifier Applications are free to
              use, certain products and services may require payment through
              credit/debit cards ("Billing Information"). Rest assured, we
              engage a trusted third-party payment processor to handle this
              Billing Information securely, ensuring verification and completion
              of purchase transactions. For recurring billing subscriptions, we
              store limited Billing Information (i.e., encrypted card
              information and expiration date) in a secure manner.{"\n"} {"\n"}
              3. Commercial Information: Information about the products or
              services you have purchased through our Services may be collected
              and retained for our records.{"\n"} {"\n"}
              4. Internet or Other Similar Network Activity: During people
              searches, you may provide third-party personal information, such
              as names, addresses, phone numbers, or email addresses. At Friend
              Verifier, we use this data solely to fulfill your search requests.
              While we retain the results of your search requests connected to
              your account for a limited time at our discretion, we do not use
              this information for any other purpose, and there is no obligation
              to maintain such search results.{"\n"} {"\n"}
              5. Geolocation Data: We collect information about the cities and
              states where you are located during your interactions with our
              Services.{"\n"} {"\n"}
              6. Professional or Employment-Related Information: If you apply
              for a job at Friend Verifier, we may collect your current and past
              job history and other relevant information. The personal
              information submitted through our Friend Verifier Applications
              during the job application process will be used solely for
              considering and processing your application. We may retain this
              information for a reasonable period exclusively for evaluating
              your qualifications for current or future available positions. In
              this regard, we may share this information with our partners,
              affiliates, and third-party service providers who assist us in
              collecting, maintaining, and analyzing candidate submissions for
              job postings.{"\n"} {"\n"}
              Additionally, while visiting our Friend Verifier Applications, you
              may have the opportunity to provide feedback, ideas, suggestions,
              and/or proposals ("Feedback") related to our products and
              services. The submission of Feedback is entirely voluntary and
              helps Friend Verifier better cater to our users' needs and
              continuously improve our Services. By submitting Feedback, you
              acknowledge and agree that (1) the Feedback does not contain
              confidential or proprietary information; (2) Friend Verifier has
              the right to use or disclose (or choose not to disclose) the
              Feedback for any purpose, in any manner, and across any media
              globally; (3) you irrevocably assign all rights to the Feedback to
              Friend Verifier; (4) Friend Verifier is not under any obligation
              of confidentiality, whether express or implied, regarding the
              Feedback; and (5) you are not entitled to any compensation or
              reimbursement from Friend Verifier under any circumstances for
              providing your Feedback. Should you inadvertently disclose
              personal information within your feedback, you may request its
              removal. Additionally, you have the option not to provide feedback
              containing any personal information.{"\n"} {"\n"}
              B. Information Collected Indirectly from You{"\n"} {"\n"}
              In addition to any personal information or other details you
              voluntarily submit, Friend Verifier and our third-party service
              providers may employ various technologies, such as cookies,
              beacons, tags, and scripts, to automatically gather specific
              information whenever you visit or interact with the Friend
              Verifier Applications. The following information is collected
              indirectly from you through these means:{"\n"} {"\n"}
              1. Identifiers: We collect information related to the device used
              to access Friend Verifier Applications ("Device"), as well as the
              IP address or other unique identifier associated with that Device
              ("Device Identifier"). Your Device Identifier may also reveal your
              regional location. This information serves various purposes,
              including but not limited to: (i) providing convenient features to
              enhance your experience when you return to Friend Verifier
              Applications, such as remembering previous searches; (ii)
              delivering relevant content based on your preferences, usage
              patterns, and location; (iii) monitoring and evaluating the use
              and performance of our Friend Verifier Applications; and (iv)
              analyzing traffic on our Friend Verifier Applications and
              third-party sites and applications.{"\n"} {"\n"}
              2. Internet or Other Similar Network Activity: Friend Verifier,
              together with our marketing and distribution partners, affiliates,
              analytics, or service providers, employs various technologies to
              gather information about your movements within the Friend Verifier
              Applications. This data is used to analyze trends and manage the
              Friend Verifier Applications effectively. Notably, our Friend
              Verifier Applications have enabled the Google Analytics Premium
              feature. Google Analytics collects data about traffic on our
              Friend Verifier Applications using Google advertising cookies and
              anonymous identifiers, in addition to data obtained through a
              standard Google Analytics implementation. To learn more about
              Google Analytics' privacy practices and opt-out mechanisms, please
              visit the Google Analytics Security and Privacy Principles page at
              https://support.google.com/analytics/answer/6004245?hl=en. For
              complete privacy policy and instructions on opting-out of Google
              Analytics, you can visit https://tools.google.com/dlpage/gaoptout.
              Additionally, we utilize cookies to remember users' settings
              (e.g., language preference) and for authentication purposes. Users
              can manage cookie usage at the individual browser level. If you
              reject cookies, you may still access and use our Friend Verifier
              Applications, although certain features or areas may be limited.
              {"\n"} {"\n"}
              3. Geolocation Information: We collect Device Identifier
              information for various purposes, including traffic analysis on
              our Friend Verifier Applications.{"\n"} {"\n"}
              Rest assured that Friend Verifier is committed to safeguarding
              your privacy and ensuring the secure and efficient functioning of
              our Applications.{"\n"} {"\n"}
              C. Information We Collect From Third Parties{"\n"} {"\n"}
              At Friend Verifier, we gather information from reputable sources,
              such as data licensors, to update or enhance the data you provided
              or that we collected automatically. This information serves
              several purposes, including maintaining the accuracy and currency
              of our collected data, customizing our communications to inform
              you about products, services, and offers that may interest you,
              and conducting internal business analyses and other relevant
              business activities. We collect the following types of information
              from third parties:{"\n"} {"\n"}
              1. Identifiers: Information such as names, email addresses, and
              postal addresses is collected from third parties.{"\n"} {"\n"}
              2. Personal Information Categories Listed in the California
              Customer Records statute (Cal. Civ. Code § 1798.80(e)): We obtain
              information like names and postal addresses from third parties.
              {"\n"} {"\n"}
              3. Protected Classification Characteristics Under California or
              Federal Law: Information like age and marital status is collected
              from third parties.{"\n"} {"\n"}
              4. Internet or Other Similar Network Activity: Our partnerships
              with third-party service providers enable them to gather data
              about your interactions with our Services, and they pass this
              information to us.{"\n"} {"\n"}
              5. Geolocation Information: We collect addresses, including city
              and state details, from third parties.{"\n"} {"\n"}
              6. Professional or Employment-Related Information: Current or past
              job history is collected from third parties.{"\n"} {"\n"}
              At Friend Verifier, we value your privacy and ensure that the
              information obtained from third parties is treated with the same
              level of care and confidentiality as the data you directly provide
              to us.{"\n"} {"\n"}
              II. HOW WE USE AND SHARE YOUR INFORMATION{"\n"} {"\n"}
              Use of Information by Us. At Friend Verifier, we may utilize the
              information we collect about you in the following ways: {
                "\n"
              }{" "}
              {"\n"}
              1. To provide you with information or process transactions that
              you have requested or agreed to receive.{"\n"}
              2. To inform you about new features, products, or services related
              to Friend Verifier.{"\n"}
              3. To enhance and customize your experience on the Friend Verifier
              Applications and improve our Services.{"\n"}
              4. To contact you regarding your use of Friend Verifier
              Applications and any changes to our policies, at our discretion.
              {"\n"}
              5. For internal business purposes to optimize our operations.
              {"\n"}
              6. For the specific purposes disclosed at the time you provided
              your information.{"\n"}
              7. As otherwise outlined in this Privacy Policy.{"\n"} {"\n"}
              Contacting You. When you provide information in connection with a
              particular activity or sign up for our Services, including contact
              information like email addresses or telephone numbers, you agree
              that this action establishes a business relationship with us. You
              explicitly consent to us communicating with you about Friend
              Verifier using the provided information. Moreover, you affirm that
              you have the legal authority over any telephone number you provide
              to us and grant us authorization to contact you. This means you
              may be contacted via various means, including in-person or through
              recorded messages, email, telephone and/or mobile telephone
              numbers (including automated dialing equipment), text (SMS)
              messages, or any other communication methods that your wireless or
              telecommunications device can receive.{"\n"} {"\n"}
              Transactional Communications. We may send you necessary notices
              related to your account or orders, such as order confirmations,
              invoices, or customer service notifications. Additionally, we may
              send you service-related announcements when required; for example,
              if our Service is temporarily suspended for maintenance or if
              there are delays or issues with products you ordered. These
              communications, which are not promotional in nature, cannot be
              opted out of.{"\n"} {"\n"}
              Service Providers. Friend Verifier may engage third-party service
              providers to support our business operations, administer
              activities on our behalf, or process payments. We may share your
              information with these third parties solely for these limited
              purposes.{"\n"} {"\n"}
              Electronic Promotional Offers. You may receive promotional emails
              about special offers related to our Services. If you wish to opt
              out of receiving promotional communications or sharing information
              with third parties for marketing purposes, you can access "My
              Account" and update your settings in “Email preferences.”
              Alternatively, you may contact us through our contact form at
              https://www.friendverifier.com. Unsubscribing through the
              unsubscribe link in the footer of promotional emails is also an
              option. Please note that even if you opt out of promotional
              emails, we may still send you electronic service or transactional
              notifications relevant to your account(s), orders, or other
              requested services, without providing the option to opt out.{
                "\n"
              }{" "}
              {"\n"}
              Co-branded Areas. Specific areas on our Friend Verifier
              Applications may be provided in association with third parties,
              such as sponsors or advertisers, offering products or services
              ("Co-Branded Areas"). Such Co-Branded Areas will identify the
              third party. If you choose to register for products and/or
              services at these Co-Branded Areas, you may be providing your
              personal information to both us and the third party. In some
              cases, we may provide your personal information directly to the
              third party to fulfill their products and services with you. Your
              personal information will be subject to this Privacy Policy as
              well as the privacy policy and practices of such third party. We
              are not responsible for the privacy practices of these third
              parties, and we recommend reviewing their individual privacy
              policies to understand their practices.{"\n"} {"\n"}
              Third Party Integrations. If you sign up for, or log into, our
              Friend Verifier Applications using a third-party service like
              Facebook or Google, or link your account with us to a third-party
              service, we may receive information about you from that
              third-party service, such as your name and email address.
              Additionally, if you post content to a third-party service through
              Friend Verifier Applications, that third-party service will
              receive the content, which will be visible to anyone with access
              through that service.{"\n"} {"\n"}
              Legal Matters; Safety. In certain legal situations or emergencies
              involving potential threats to physical safety or property, we may
              access and disclose your personal information, communications sent
              or received by you (including contents of any chat, messaging, or
              other communication posted in the Communication Services), and any
              other relevant information permitted or required by law (including
              court orders or subpoenas). This may also apply to prevent or
              investigate suspected fraud, violations of our Terms of Use, or
              activity that we perceive as illegal or may expose us to legal
              liability. Additionally, we may disclose your information and/or
              communications if we believe it relates to potential threats to
              physical safety or property, or if we deem your conduct on the
              Friend Verifier Applications or when using the Communication
              Services as inappropriate and inconsistent with generally accepted
              norms of behavior.{"\n"} {"\n"}
              Sale or Transfer of Business or Assets. In the event that Friend
              Verifier or any of our businesses undergo a sale or disposition as
              a going concern, whether through a merger, asset sale, or any
              other means, or in situations of insolvency, bankruptcy, or
              receivership, personal information of our customers and visitors
              to our Friend Verifier Applications may be one of the assets sold
              or merged as part of that transaction. Moreover, information about
              our customers and registered users may also be disclosed in
              connection with a commercial transaction wherein we or any of our
              businesses seek financing, investment, support, or funding. During
              such transactions, personal information will remain subject to the
              commitments made in any pre-existing Privacy Policy in effect when
              the information was collected. In the event of any change in
              ownership or use of your personal information, you will be
              notified via email and/or through a prominent notice on our Friend
              Verifier Applications. Additionally, you will be informed of any
              choices you may have regarding your personal information.{"\n"}
              Advertising and Analytics Data Collection. Friend Verifier, along
              with certain third-party vendors, employs first-party cookies
              (like the Google Analytics cookie) or other first-party
              identifiers, as well as third-party cookies (like Google
              advertising cookies) or other third-party identifiers, to identify
              and personalize your experience. These technologies are used to
              serve advertisements both on and off the Friend Verifier
              Applications.{"\n"} {"\n"}
              IV. USER GENERATED CONTENT{"\n"} {"\n"}
              The Services provided by Friend Verifier may include review or
              chat areas, as well as other messaging, communication, or
              interactive features designed to facilitate communication with
              others or to post content on the Friend Verifier Applications (the
              "Communication Services"). Please be aware that any information
              you disclose while engaging with the Communication Services
              becomes public information, becomes the property of Friend
              Verifier, and is subject to redistribution by us. Exercise caution
              and discretion when deciding to disclose personal information in a
              submission or posting. Participation in the Communication Services
              does not carry an expectation of privacy. If you post content
              containing personal information, please note that registered users
              or visitors to the Friend Verifier Application or Communication
              Service may access this information, and we cannot control how
              they may use it. You have the option to request the removal of
              your personal information from these areas by contacting us at
              https://www.friendverifier.com. In some instances, we may not be
              able to remove your personal information from these Communication
              Services. If that is the case, we will inform you and explain the
              reasons. We reserve the right, though not the obligation, to
              monitor any activity and content associated with the Communication
              Services. We also retain the right to take action regarding any
              content we consider inappropriate. For more information about your
              appropriate use of these Communication Services, please review our
              terms of use.{"\n"} {"\n"}
              V. YOUR RIGHTS{"\n"} {"\n"}
              Know / Access: Concerning the content on our Site, you have the
              right to request information about the categories and specific
              pieces of personal information we have collected about you. You
              may also inquire about the categories of sources from which we
              collect such information, the purposes for collecting it, and the
              categories of third parties with whom we share it. Additionally,
              you have the right to request information about the sale or
              disclosure of your personal information to third parties for
              business purposes. To exercise this right, click here. If you have
              concerns about the personal information in your account, you can
              contact Customer Care for assistance with updating it.{"\n"}{" "}
              {"\n"}
              Deletion / Removal: If you wish to delete your personal
              information in your account, you can do so online by logging into
              your account at
              https://www.friendverifier.com/dashboard/account/delete.
              Alternatively, you may email us about your personal information
              using our contact form located at
              https://www.friendverifier.com/contact. Please note that even if
              you delete information from your account, we may retain certain
              information associated with your account for recordkeeping
              integrity, fraud prevention, dispute resolution, enforcement of
              our Terms of Use, or other policies, as well as to comply with
              technical and legal requirements related to the security,
              integrity, and operation of our Friend Verifier Applications.
              {"\n"} {"\n"}
              Regarding content on our Friend Verifier Applications, we can
              block the records we control in our database from being displayed
              on Friend Verifier upon request. You may request to have your
              personal information blocked from being searched using the link
              provided below. We will only accept such requests directly from
              the individual whose information is being opted-out, or from a
              registered authorized agent, and we reserve the right to verify
              your identity and may reject opt-out requests as allowed by
              applicable law. Additional information may be requested to confirm
              that it matches the information we already have on file, and we
              will only use this information for handling your request. We do
              not accept content removal requests via fax or postal mail. To
              manage or remove your personal information from our database,
              please click here. Please be aware that changes requested may not
              take effect immediately. Additionally, despite any request for
              removal or change of personal information, certain information may
              need to be retained for recordkeeping purposes. There may also be
              residual information within our databases and other records that
              will not be removed or changed.{"\n"} {"\n"}
              Opt-Out: At Friend Verifier, you have the right to opt out of the
              sale of your personal information to third parties. As of January
              1, 2020, you can exercise this right by using the "Do Not Sell My
              Personal Information" link located in the footer of our Friend
              Verifier Applications. Rest assured that we do not sell the
              personal information of minors. Kindly note that opting out will
              result in the removal of your profile from the Services.{
                "\n"
              }{" "}
              {"\n"}
              Non-Discrimination: We respect your rights, and we assure you that
              exercising any of these rights will not lead to any form of
              discrimination against you.{"\n"} {"\n"}
              IMPORTANT DISCLOSURES, PRACTICES, AND CONTACT INFORMATION{
                "\n"
              }{" "}
              {"\n"}
              Links to other Sites and Communities: When accessing external or
              third-party sites and communities through hyperlinks, please be
              aware that these sites and communities are not under the control
              of Friend Verifier and are not subject to this Privacy Policy. We
              advise you to review the privacy policies of each such site and
              community to understand how your personal information will be used
              by their operators.{"\n"} {"\n"}
              Testimonials: At times, we may showcase personal testimonials from
              satisfied customers on our Friend Verifier Applications and
              include other endorsements. If you provide consent, we may display
              your testimonial along with your name. If you wish to update or
              delete your testimonial, please contact us at
              https://www.friendverifier.com/contact.{"\n"} {"\n"}
              Public Directory: Certain personal information may be listed in
              our publicly accessible member directory. If you desire to have
              your information removed from our directory, please click here.
              {"\n"} {"\n"}
              Social Media Features: Our Friend Verifier Applications
              incorporate Social Media Features, such as the Facebook Like
              button and Widgets (e.g., the Share this button), or interactive
              mini-programs that operate on our Friend Verifier Applications.
              These Features may collect your IP address and the page you are
              visiting on our Friend Verifier Applications, and may set a cookie
              to enable proper functioning. Social Media Features and Widgets
              may be hosted by a third party or directly on our Friend Verifier
              Applications, and their interactions are governed by the privacy
              policy of the providing company.{"\n"} {"\n"}
              Security: While we employ secure socket layer technology (SSL) to
              encrypt sensitive information like credit card numbers on our
              order forms, it's essential to understand that no data
              transmission over the Internet or electronic storage of
              information can be entirely secure. By using our Friend Verifier
              Applications, you acknowledge your willingness to assume any
              inherent risks associated with transmitting information to us.
              {"\n"} {"\n"}A Note to International Users: Our Friend Verifier
              Applications are operated in the United States. If you access our
              Applications from outside the United States, please note that any
              information we collect will be transferred to, processed, and
              stored in the United States. Data protection laws in the United
              States may differ from those in your country, and your personal
              information may be subject to access requests from government
              authorities, courts, or law enforcement according to U.S. laws. By
              using our Friend Verifier Applications or providing us with any
              information, you consent to the transfer, processing, and storage
              of your information in the United States. Additionally, you agree
              that United States federal and California state laws apply to all
              matters concerning our Friend Verifier Applications and this
              Privacy Policy.{"\n"} {"\n"}
              Your California Privacy Rights: Under California Civil Code
              Section 1798.83, California residents visiting our Friend Verifier
              Applications may request information about our disclosure of
              personal information to third parties for their direct marketing
              purposes. Rest assured, we do not share personal information with
              third parties for direct marketing purposes.{"\n"} {"\n"}
              Children's Privacy: The Friend Verifier Applications are designed
              for a general audience and are not directed or intended for
              children under the age of 18. We do not knowingly collect personal
              information from individuals under 18 years of age. If you are
              under 18, you are not allowed to register or provide personal
              information on the Friend Verifier Applications. If we become
              aware that a user is under 18 years of age, we will promptly
              remove their personal information from our systems.{"\n"} {"\n"}
              Changes to the Privacy Policy: We may update this Privacy Policy
              periodically. The most recent version will always be posted on our
              Site, with the "Last Updated" date at the top. If our practices
              change, or as we introduce new Friend Verifier Applications or
              Communication Services or modify existing ones, we may revise and
              update this Privacy Policy accordingly. In the event of a material
              change in how we use personal information collected previously, we
              will provide you with a reasonable opportunity to consent to the
              change. If you do not consent, your personal information will be
              used in accordance with the Privacy Policy in effect at the time
              of collection. By continuing to access the Friend Verifier
              Applications after the revised Privacy Policy has been posted, you
              are considered to consent to the then-current Privacy Policy.
              Information previously collected will be used according to the
              Privacy Policy in place when it was obtained.{"\n"} {"\n"}
              Disputes: When you visit the Friend Verifier Applications, any
              dispute over privacy is subject to this Privacy Policy and our
              Terms of Use, including provisions for damages, dispute
              resolution, and application of the laws of the United States and
              the State of Florida.{"\n"} {"\n"}
              No Rights of Third Parties: This Privacy Policy does not create
              rights that can be enforced by third parties or require the
              disclosure of any personal information relating to users of the
              Friend Verifier Applications.{"\n"} {"\n"}
              Contacting Us: If you have any inquiries regarding this Privacy
              Policy or the practices of the Friend Verifier Applications and
              Communication Services, please reach out to us by using our
              contact form located at https://www.friendverifier.com or write to
              us at:{"\n"} {"\n"}
              Friend Verifier Inc.{"\n"}
              757 SE 17th Street{"\n"}
              Suite 127{"\n"}
              Fort Lauderdale, FL 33316{"\n"}
            </Text>
          </View>
        )}
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
    flexDirection: "row",
    marginTop: RFValue(25),
    height: RFValue(40),
    width: WIDTH - RFValue(50),
    backgroundColor: "#ebebeb",
    alignSelf: "center",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderColor: "#cecbd5",
    borderWidth: 0.5,
    paddingHorizontal: RFValue(5),
  },
  topTabbtn: {
    width: "50%",
    height: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  topTabbtn2: {
    width: "50%",
    height: "100%",
    backgroundColor: "#ebebeb",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tabactiveText: {
    fontFamily: "Lato-Bold",
    fontWeight: "RegularText",
    color: "#325A9C",
    fontSize: RFValue(12),
  },
  inActiveText: {
    fontFamily: "Lato-Bold",
    fontWeight: "RegularText",
    color: "#000000",
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
