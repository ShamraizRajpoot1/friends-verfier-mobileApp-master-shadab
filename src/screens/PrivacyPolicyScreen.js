import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../src/constants/device";
const WIDTH = Dimensions.get("window").width;
import RenderHtml from "react-native-render-html";
import { Image } from "react-native";

export default function PrivacyPolicyScreen({ navigation }) {
  const classesStyles = {};
  const source = {
    html: `
    <p>July 26th, 2023</p>
<p><br></p>
<p>Welcome to Friend Verifier (&quot;Friend Verifier,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;we&quot;), the owner and controller of the website www.friendverifier.com. To ensure transparency and protect your privacy, we have crafted this Privacy Policy, which outlines crucial information about how we collect and handle user data on www.friendverifier.com and any related websites (collectively, the &quot;Site&quot;), along with our mobile applications and mobile-focused websites (referred to as the &quot;Friend Verifier Applications&quot;).</p>
<p><br></p>
<p>This Privacy Policy also covers our offline data collection practices, including information gathered through phone interactions with our Customer Care team. We present this Privacy Policy to help you make an informed decision regarding your use of Friend Verifier&apos;s services (&quot;Services&quot;).</p>
<p><br></p>
<p>By accepting this Privacy Policy and our Terms of Use during the registration process on the Friend Verifier Applications, you enter into a legally binding agreement with Friend Verifier based on these policies. Each time you access the Friend Verifier Applications or utilize our Services, you signify your consent to be bound by the Terms and this Privacy Policy. Additionally, we want to highlight that Friend Verifier does not provide consumer reports, and you agree not to use any information obtained from us for purposes covered by the Fair Credit Reporting Act (15 U.S.C. &sect;1681, et seq.).</p>
<p><br></p>
<p>If you do not agree to the Terms of Use and this Privacy Policy, please refrain from using the Friend Verifier Applications or Services. Your privacy and satisfaction are of utmost importance to us, and we are committed to providing a secure and reliable experience at Friend Verifier.</p>
<p><br></p>
<p><br></p>
<p><strong>I. INFORMATION WE COLLECT</strong></p>
<p><br></p>
<p>A. Information Provided Directly by You</p>
<p><br></p>
<p>At Friend Verifier, we collect certain information directly from you when you engage with our services. This includes:</p>
<p><br></p>
<p>1. Identifiers: This category includes your name, postal address, email address, and account name if you decide to register with us or subscribe to our services.</p>
<p><br></p>
<p>2. Personal Information Categories Listed in the California Customer Records statute (Cal. Civ. Code &sect; 1798.80(e)): When you register with Friend Verifier or make purchases for specific products and services, we may collect additional details such as your name, address, email address, and credit card or debit card number. While many of our Friend Verifier Applications are free to use, certain products and services may require payment through credit/debit cards (&quot;Billing Information&quot;). Rest assured, we engage a trusted third-party payment processor to handle this Billing Information securely, ensuring verification and completion of purchase transactions. For recurring billing subscriptions, we store limited Billing Information (i.e., encrypted card information and expiration date) in a secure manner.</p>
<p><br></p>
<p>3. Commercial Information: Information about the products or services you have purchased through our Services may be collected and retained for our records.</p>
<p><br></p>
<p>4. Internet or Other Similar Network Activity: During people searches, you may provide third-party personal information, such as names, addresses, phone numbers, or email addresses. At Friend Verifier, we use this data solely to fulfill your search requests. While we retain the results of your search requests connected to your account for a limited time at our discretion, we do not use this information for any other purpose, and there is no obligation to maintain such search results.</p>
<p><br></p>
<p>5. Geolocation Data: We collect information about the cities and states where you are located during your interactions with our Services.</p>
<p><br></p>
<p>6. Professional or Employment-Related Information: If you apply for a job at Friend Verifier, we may collect your current and past job history and other relevant information. The personal information submitted through our Friend Verifier Applications during the job application process will be used solely for considering and processing your application. We may retain this information for a reasonable period exclusively for evaluating your qualifications for current or future available positions. In this regard, we may share this information with our partners, affiliates, and third-party service providers who assist us in collecting, maintaining, and analyzing candidate submissions for job postings.</p>
<p><br></p>
<p>Additionally, while visiting our Friend Verifier Applications, you may have the opportunity to provide feedback, ideas, suggestions, and/or proposals (&quot;Feedback&quot;) related to our products and services. The submission of Feedback is entirely voluntary and helps Friend Verifier better cater to our users&apos; needs and continuously improve our Services. By submitting Feedback, you acknowledge and agree that (1) the Feedback does not contain confidential or proprietary information; (2) Friend Verifier has the right to use or disclose (or choose not to disclose) the Feedback for any purpose, in any manner, and across any media globally; (3) you irrevocably assign all rights to the Feedback to Friend Verifier; (4) Friend Verifier is not under any obligation of confidentiality, whether express or implied, regarding the Feedback; and (5) you are not entitled to any compensation or reimbursement from Friend Verifier under any circumstances for providing your Feedback. Should you inadvertently disclose personal information within your feedback, you may request its removal. Additionally, you have the option not to provide feedback containing any personal information.</p>
<p><br></p>
<p>B. Information Collected Indirectly from You</p>
<p><br></p>
<p>In addition to any personal information or other details you voluntarily submit, Friend Verifier and our third-party service providers may employ various technologies, such as cookies, beacons, tags, and scripts, to automatically gather specific information whenever you visit or interact with the Friend Verifier Applications. The following information is collected indirectly from you through these means:</p>
<p><br></p>
<p>1. Identifiers: We collect information related to the device used to access Friend Verifier Applications (&quot;Device&quot;), as well as the IP address or other unique identifier associated with that Device (&quot;Device Identifier&quot;). Your Device Identifier may also reveal your regional location. This information serves various purposes, including but not limited to: (i) providing convenient features to enhance your experience when you return to Friend Verifier Applications, such as remembering previous searches; (ii) delivering relevant content based on your preferences, usage patterns, and location; (iii) monitoring and evaluating the use and performance of our Friend Verifier Applications; and (iv) analyzing traffic on our Friend Verifier Applications and third-party sites and applications.</p>
<p><br></p>
<p>2. Internet or Other Similar Network Activity: Friend Verifier, together with our marketing and distribution partners, affiliates, analytics, or service providers, employs various technologies to gather information about your movements within the Friend Verifier Applications. This data is used to analyze trends and manage the Friend Verifier Applications effectively. Notably, our Friend Verifier Applications have enabled the Google Analytics Premium feature. Google Analytics collects data about traffic on our Friend Verifier Applications using Google advertising cookies and anonymous identifiers, in addition to data obtained through a standard Google Analytics implementation. To learn more about Google Analytics&apos; privacy practices and opt-out mechanisms, please visit the Google Analytics Security and Privacy Principles page at https://support.google.com/analytics/answer/6004245?hl=en. For complete privacy policy and instructions on opting-out of Google Analytics, you can visit https://tools.google.com/dlpage/gaoptout. Additionally, we utilize cookies to remember users&apos; settings (e.g., language preference) and for authentication purposes. Users can manage cookie usage at the individual browser level. If you reject cookies, you may still access and use our Friend Verifier Applications, although certain features or areas may be limited.</p>
<p><br></p>
<p>3. Geolocation Information: We collect Device Identifier information for various purposes, including traffic analysis on our Friend Verifier Applications.</p>
<p><br></p>
<p>Rest assured that Friend Verifier is committed to safeguarding your privacy and ensuring the secure and efficient functioning of our Applications.</p>
<p><br></p>
<p><br></p>
<p>C. Information We Collect From Third Parties</p>
<p><br></p>
<p>At Friend Verifier, we gather information from reputable sources, such as data licensors, to update or enhance the data you provided or that we collected automatically. This information serves several purposes, including maintaining the accuracy and currency of our collected data, customizing our communications to inform you about products, services, and offers that may interest you, and conducting internal business analyses and other relevant business activities. We collect the following types of information from third parties:</p>
<p><br></p>
<p>1. Identifiers: Information such as names, email addresses, and postal addresses is collected from third parties.</p>
<p><br></p>
<p>2. Personal Information Categories Listed in the California Customer Records statute (Cal. Civ. Code &sect; 1798.80(e)): We obtain information like names and postal addresses from third parties.</p>
<p><br></p>
<p>3. Protected Classification Characteristics Under California or Federal Law: Information like age and marital status is collected from third parties.</p>
<p><br></p>
<p>4. Internet or Other Similar Network Activity: Our partnerships with third-party service providers enable them to gather data about your interactions with our Services, and they pass this information to us.</p>
<p><br></p>
<p>5. Geolocation Information: We collect addresses, including city and state details, from third parties.</p>
<p><br></p>
<p>6. Professional or Employment-Related Information: Current or past job history is collected from third parties.</p>
<p><br></p>
<p>At Friend Verifier, we value your privacy and ensure that the information obtained from third parties is treated with the same level of care and confidentiality as the data you directly provide to us.</p>
<p><br></p>
<p>II. HOW WE USE AND SHARE YOUR INFORMATION</p>
<p><br></p>
<p>Use of Information by Us. At Friend Verifier, we may utilize the information we collect about you in the following ways:&nbsp;</p>
<p><br></p>
<p>1. To provide you with information or process transactions that you have requested or agreed to receive.</p>
<p>2. To inform you about new features, products, or services related to Friend Verifier.</p>
<p>3. To enhance and customize your experience on the Friend Verifier Applications and improve our Services.</p>
<p>4. To contact you regarding your use of Friend Verifier Applications and any changes to our policies, at our discretion.</p>
<p>5. For internal business purposes to optimize our operations.</p>
<p>6. For the specific purposes disclosed at the time you provided your information.</p>
<p>7. As otherwise outlined in this Privacy Policy.</p>
<p><br></p>
<p>Contacting You. When you provide information in connection with a particular activity or sign up for our Services, including contact information like email addresses or telephone numbers, you agree that this action establishes a business relationship with us. You explicitly consent to us communicating with you about Friend Verifier using the provided information. Moreover, you affirm that you have the legal authority over any telephone number you provide to us and grant us authorization to contact you. This means you may be contacted via various means, including in-person or through recorded messages, email, telephone and/or mobile telephone numbers (including automated dialing equipment), text (SMS) messages, or any other communication methods that your wireless or telecommunications device can receive.</p>
<p><br></p>
<p>Transactional Communications. We may send you necessary notices related to your account or orders, such as order confirmations, invoices, or customer service notifications. Additionally, we may send you service-related announcements when required; for example, if our Service is temporarily suspended for maintenance or if there are delays or issues with products you ordered. These communications, which are not promotional in nature, cannot be opted out of.</p>
<p><br></p>
<p>Service Providers. Friend Verifier may engage third-party service providers to support our business operations, administer activities on our behalf, or process payments. We may share your information with these third parties solely for these limited purposes.</p>
<p><br></p>
<p>Electronic Promotional Offers. You may receive promotional emails about special offers related to our Services. If you wish to opt out of receiving promotional communications or sharing information with third parties for marketing purposes, you can access &quot;My Account&quot; and update your settings in &ldquo;Email preferences.&rdquo; Alternatively, you may contact us through our contact form at https://www.friendverifier.com. Unsubscribing through the unsubscribe link in the footer of promotional emails is also an option. Please note that even if you opt out of promotional emails, we may still send you electronic service or transactional notifications relevant to your account(s), orders, or other requested services, without providing the option to opt out.</p>
<p><br></p>
<p>Co-branded Areas. Specific areas on our Friend Verifier Applications may be provided in association with third parties, such as sponsors or advertisers, offering products or services (&quot;Co-Branded Areas&quot;). Such Co-Branded Areas will identify the third party. If you choose to register for products and/or services at these Co-Branded Areas, you may be providing your personal information to both us and the third party. In some cases, we may provide your personal information directly to the third party to fulfill their products and services with you. Your personal information will be subject to this Privacy Policy as well as the privacy policy and practices of such third party. We are not responsible for the privacy practices of these third parties, and we recommend reviewing their individual privacy policies to understand their practices.</p>
<p><br></p>
<p>Third Party Integrations. If you sign up for, or log into, our Friend Verifier Applications using a third-party service like Facebook or Google, or link your account with us to a third-party service, we may receive information about you from that third-party service, such as your name and email address. Additionally, if you post content to a third-party service through Friend Verifier Applications, that third-party service will receive the content, which will be visible to anyone with access through that service.</p>
<p><br></p>
<p>Legal Matters; Safety. In certain legal situations or emergencies involving potential threats to physical safety or property, we may access and disclose your personal information, communications sent or received by you (including contents of any chat, messaging, or other communication posted in the Communication Services), and any other relevant information permitted or required by law (including court orders or subpoenas). This may also apply to prevent or investigate suspected fraud, violations of our Terms of Use, or activity that we perceive as illegal or may expose us to legal liability. Additionally, we may disclose your information and/or communications if we believe it relates to potential threats to physical safety or property, or if we deem your conduct on the Friend Verifier Applications or when using the Communication Services as inappropriate and inconsistent with generally accepted norms of behavior.</p>
<p><br></p>
<p>Sale or Transfer of Business or Assets. In the event that Friend Verifier or any of our businesses undergo a sale or disposition as a going concern, whether through a merger, asset sale, or any other means, or in situations of insolvency, bankruptcy, or receivership, personal information of our customers and visitors to our Friend Verifier Applications may be one of the assets sold or merged as part of that transaction. Moreover, information about our customers and registered users may also be disclosed in connection with a commercial transaction wherein we or any of our businesses seek financing, investment, support, or funding. During such transactions, personal information will remain subject to the commitments made in any pre-existing Privacy Policy in effect when the information was collected. In the event of any change in ownership or use of your personal information, you will be notified via email and/or through a prominent notice on our Friend Verifier Applications. Additionally, you will be informed of any choices you may have regarding your personal information.</p>
<p>Advertising and Analytics Data Collection. Friend Verifier, along with certain third-party vendors, employs first-party cookies (like the Google Analytics cookie) or other first-party identifiers, as well as third-party cookies (like Google advertising cookies) or other third-party identifiers, to identify and personalize your experience. These technologies are used to serve advertisements both on and off the Friend Verifier Applications.</p>
<p><br></p>
<p>IV. USER GENERATED CONTENT</p>
<p><br></p>
<p>The Services provided by Friend Verifier may include review or chat areas, as well as other messaging, communication, or interactive features designed to facilitate communication with others or to post content on the Friend Verifier Applications (the &quot;Communication Services&quot;). Please be aware that any information you disclose while engaging with the Communication Services becomes public information, becomes the property of Friend Verifier, and is subject to redistribution by us. Exercise caution and discretion when deciding to disclose personal information in a submission or posting. Participation in the Communication Services does not carry an expectation of privacy. If you post content containing personal information, please note that registered users or visitors to the Friend Verifier Application or Communication Service may access this information, and we cannot control how they may use it. You have the option to request the removal of your personal information from these areas by contacting us at https://www.friendverifier.com. In some instances, we may not be able to remove your personal information from these Communication Services. If that is the case, we will inform you and explain the reasons. We reserve the right, though not the obligation, to monitor any activity and content associated with the Communication Services. We also retain the right to take action regarding any content we consider inappropriate. For more information about your appropriate use of these Communication Services, please review our terms of use.</p>
<p><br></p>
<p>V. YOUR RIGHTS</p>
<p><br></p>
<p>Know / Access: Concerning the content on our Site, you have the right to request information about the categories and specific pieces of personal information we have collected about you. You may also inquire about the categories of sources from which we collect such information, the purposes for collecting it, and the categories of third parties with whom we share it. Additionally, you have the right to request information about the sale or disclosure of your personal information to third parties for business purposes. To exercise this right, click here. If you have concerns about the personal information in your account, you can contact Customer Care for assistance with updating it.</p>
<p><br></p>
<p>Deletion / Removal: If you wish to delete your personal information in your account, you can do so online by logging into your account at https://www.friendverifier.com/dashboard/account/delete. Alternatively, you may email us about your personal information using our contact form located at https://www.friendverifier.com/contact. Please note that even if you delete information from your account, we may retain certain information associated with your account for recordkeeping integrity, fraud prevention, dispute resolution, enforcement of our Terms of Use, or other policies, as well as to comply with technical and legal requirements related to the security, integrity, and operation of our Friend Verifier Applications.</p>
<p><br></p>
<p>Regarding content on our Friend Verifier Applications, we can block the records we control in our database from being displayed on Friend Verifier upon request. You may request to have your personal information blocked from being searched using the link provided below. We will only accept such requests directly from the individual whose information is being opted-out, or from a registered authorized agent, and we reserve the right to verify your identity and may reject opt-out requests as allowed by applicable law. Additional information may be requested to confirm that it matches the information we already have on file, and we will only use this information for handling your request. We do not accept content removal requests via fax or postal mail. To manage or remove your personal information from our database, please click here. Please be aware that changes requested may not take effect immediately. Additionally, despite any request for removal or change of personal information, certain information may need to be retained for recordkeeping purposes. There may also be residual information within our databases and other records that will not be removed or changed.</p>
<p><br></p>
<p>Opt-Out: At Friend Verifier, you have the right to opt out of the sale of your personal information to third parties. As of January 1, 2020, you can exercise this right by using the &quot;Do Not Sell My Personal Information&quot; link located in the footer of our Friend Verifier Applications. Rest assured that we do not sell the personal information of minors. Kindly note that opting out will result in the removal of your profile from the Services.</p>
<p><br></p>
<p>Non-Discrimination: We respect your rights, and we assure you that exercising any of these rights will not lead to any form of discrimination against you.</p>
<p><br></p>
<p>IMPORTANT DISCLOSURES, PRACTICES, AND CONTACT INFORMATION</p>
<p><br></p>
<p>Links to other Sites and Communities: When accessing external or third-party sites and communities through hyperlinks, please be aware that these sites and communities are not under the control of Friend Verifier and are not subject to this Privacy Policy. We advise you to review the privacy policies of each such site and community to understand how your personal information will be used by their operators.</p>
<p><br></p>
<p>Testimonials: At times, we may showcase personal testimonials from satisfied customers on our Friend Verifier Applications and include other endorsements. If you provide consent, we may display your testimonial along with your name. If you wish to update or delete your testimonial, please contact us at https://www.friendverifier.com/contact.</p>
<p><br></p>
<p>Public Directory: Certain personal information may be listed in our publicly accessible member directory. If you desire to have your information removed from our directory, please click here.</p>
<p><br></p>
<p>Social Media Features: Our Friend Verifier Applications incorporate Social Media Features, such as the Facebook Like button and Widgets (e.g., the Share this button), or interactive mini-programs that operate on our Friend Verifier Applications. These Features may collect your IP address and the page you are visiting on our Friend Verifier Applications, and may set a cookie to enable proper functioning. Social Media Features and Widgets may be hosted by a third party or directly on our Friend Verifier Applications, and their interactions are governed by the privacy policy of the providing company.</p>
<p><br></p>
<p>Security: While we employ secure socket layer technology (SSL) to encrypt sensitive information like credit card numbers on our order forms, it&apos;s essential to understand that no data transmission over the Internet or electronic storage of information can be entirely secure. By using our Friend Verifier Applications, you acknowledge your willingness to assume any inherent risks associated with transmitting information to us.</p>
<p><br></p>
<p>A Note to International Users: Our Friend Verifier Applications are operated in the United States. If you access our Applications from outside the United States, please note that any information we collect will be transferred to, processed, and stored in the United States. Data protection laws in the United States may differ from those in your country, and your personal information may be subject to access requests from government authorities, courts, or law enforcement according to U.S. laws. By using our Friend Verifier Applications or providing us with any information, you consent to the transfer, processing, and storage of your information in the United States. Additionally, you agree that United States federal and California state laws apply to all matters concerning our Friend Verifier Applications and this Privacy Policy.</p>
<p><br></p>
<p>Your California Privacy Rights: Under California Civil Code Section 1798.83, California residents visiting our Friend Verifier Applications may request information about our disclosure of personal information to third parties for their direct marketing purposes. Rest assured, we do not share personal information with third parties for direct marketing purposes.</p>
<p><br></p>
<p>Children&apos;s Privacy: The Friend Verifier Applications are designed for a general audience and are not directed or intended for children under the age of 18. We do not knowingly collect personal information from individuals under 18 years of age. If you are under 18, you are not allowed to register or provide personal information on the Friend Verifier Applications. If we become aware that a user is under 18 years of age, we will promptly remove their personal information from our systems.</p>
<p><br></p>
<p>Changes to the Privacy Policy: We may update this Privacy Policy periodically. The most recent version will always be posted on our Site, with the &quot;Last Updated&quot; date at the top. If our practices change, or as we introduce new Friend Verifier Applications or Communication Services or modify existing ones, we may revise and update this Privacy Policy accordingly. In the event of a material change in how we use personal information collected previously, we will provide you with a reasonable opportunity to consent to the change. If you do not consent, your personal information will be used in accordance with the Privacy Policy in effect at the time of collection. By continuing to access the Friend Verifier Applications after the revised Privacy Policy has been posted, you are considered to consent to the then-current Privacy Policy. Information previously collected will be used according to the Privacy Policy in place when it was obtained.</p>
<p><br></p>
<p>Disputes: When you visit the Friend Verifier Applications, any dispute over privacy is subject to this Privacy Policy and our Terms of Use, including provisions for damages, dispute resolution, and application of the laws of the United States and the State of Florida.</p>
<p><br></p>
<p>No Rights of Third Parties: This Privacy Policy does not create rights that can be enforced by third parties or require the disclosure of any personal information relating to users of the Friend Verifier Applications.</p>
<p><br></p>
<p>Contacting Us: If you have any inquiries regarding this Privacy Policy or the practices of the Friend Verifier Applications and Communication Services, please reach out to us by using our contact form located at https://www.friendverifier.com or write to us at:</p>
<p><br></p>
<p>Friend Verifier Inc.</p>
<p>757 SE 17th Street</p>
<p>Suite 127</p>
<p>Fort Lauderdale, FL 33316</p>
<p><br></p>
<p>Copyright &copy;2023 Friend Verifier. All rights reserved.</p>
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            Privacy Policy
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
        <View style={{ marginTop: RFValue(25), padding: RFValue(20) }}>
          <RenderHtml
            contentWidth={"100%"}
            source={source}
            tagsStyles={classesStyles}
            // domVisitors={{ onElement }}
            // renderersProps={renderersProps}
          />
        </View>
        {/* <View style={{ marginTop: RFValue(25), padding: RFValue(20) }}>
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
          </Text>
        </View> */}
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
    paddingTop: Platform.OS === "android" ? 0 : RFValue(12),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 15
        : Device.STATUS_BAR_HEIGHT + 20,
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    textAlign: "center",
    marginRight: RFValue(20),
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
    fontFamily: "Medium",
    textAlign: "center",
  },
});
