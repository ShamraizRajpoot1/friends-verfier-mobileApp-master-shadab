import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const Terms = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ height: "90%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <View>
            <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
          <Image
            source={require("../assets/icons/back.png")}
            style={styles.back}
          />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>
          Terms and{"\n"}
          Conditions
        </Text>
        <Text style={styles.termText}>
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
      </ScrollView>
      <View style={styles.accept}>
      <TouchableOpacity onPress={()=> navigation.navigate('LoginScreen')}>
          <Text style={styles.acceptText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('CreateAccountScreen')}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  back: {
    marginTop: RFValue(50),
    tintColor: "#000000",
    marginLeft: RFValue(12),
    height: RFValue(25),
    width: RFValue(25),
  },
  heading: {
    alignSelf: "center",
    fontSize: RFValue(40),
    marginTop: RFValue(20),
    fontFamily: "Heavy",
  },
  accept: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: RFValue(20),
    height: RFValue(50),
    elevation: 5,
    alignItems: "center",
  },
  acceptText: {
    fontSize: RFValue(18),
    color: "#00A2FF",
    fontFamily: "BoldText",
  },
  termText: {
    marginTop: RFValue(40),
    marginLeft: RFValue(18),
    fontSize: RFValue(13),
    fontFamily: "BoldText",
    color: "rgba(0,0,0,0.5)",
  },
});
