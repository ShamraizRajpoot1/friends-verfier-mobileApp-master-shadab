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
  TouchableOpacity,
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
      lineHeight: "21px", 
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
    <u></u>
    <ul>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
        </li>
        <li>
            <p></p>
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
        <TouchableOpacity style={{width:RFValue(20)}} onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/back.png")}
            style={{ width: RFValue(10), height: RFValue(20) }}
          />
        </TouchableOpacity>

          <Text style={styles.headerTitle}>
            <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
              Do's & Don'ts
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
        style={{
          width:"103%"
        }}
      >
        <View
          style={{ marginHorizontal: RFValue(25), marginRight: RFValue(40) }}
        >
          <Text style={styles.topText}>Do's</Text>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Look yourself up!</Text>
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                You may think looking yourself up is laughable, but it  is
                not; it is crucial. You should know what information  is in
                your public record.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Who did you just matched with?</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Dating now starts nearly 90% of the time online.  Looking
                up that new match before meeting them in  person would be
                best. Your safety should always be  your first priority;
                it's even more important than Taco  Tuesday.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Find out who's calling you!</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Not sure who is behind that phone number that  keeps
                calling you? Run a reverse phone search and find out.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Find who's emailing you!</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Someone random keeps emailing you? Run a reverse email
                search and find out who they are.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Verify a potential roommate!</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Before you move in together and commit to a lease, find out
                who you'll be living with.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Check out your new neighbors!</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                About to move, or if you've just moved, or maybe someone
                new just moved next door, find out more information about
                your new neighborhood.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Verify Online Sellers!</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Before you make that purchase or place that bid, make sure
                that person on the online auction site is who they says
                they are.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dos.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Find old friends and family!</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Life takes us all in different directions; searching  
                through our billions of public records is a great way  to
                reconnect with people, whether it's friends from 
                ages ago, distant relatives, or a long-lost significant 
                other!
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ marginHorizontal: RFValue(25), marginRight: RFValue(40) }}
        >
          <Text style={styles.topText}>Don'ts</Text>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Warning</Text>
            </View>

            <View style={[styles.paragraph]}>
              <Text style={styles.subtitle}>
                The Fair Credit Reporting Act (FCRA) regulates how  public
                databases are used. Friend Verifier, the public  databases
                that power our platform, <Text style={{fontFamily:'BoldText'}}>can not be used</Text> in  business, and
                the following use cases.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Employment screening</Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Screening household workers </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Screening adoptive parents</Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Screen potential pet-owners</Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>
                Screening educational qualifications
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>
                Screening charities or non-profits
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Screening tenants</Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Screening customers</Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(15) }}>
            <View style={[styles.heading, { height: RFValue(45) }]}>
              <Image
                source={require("../assets/icons/Dont.png")}
                style={[
                  styles.do,
                  { alignSelf: "flex-start", marginTop: RFValue(8) },
                ]}
              />
              <Text style={styles.title}>
                Or anything to do with Credit,  Insurance, or Mortgages
              </Text>
            </View>
          </View>

          <View style={{ marginTop: RFValue(30) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/info.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Disclaimer</Text>
            </View>

            <View style={[styles.paragraph]}>
              <Text style={[styles.subtitle,{fontSize: RFValue(6.8),}]}>
                Friend Verifier provides affordale access to public record data,
                but it's crucial to respect legal regulations like the Fair
                Credit Reporting Act (FCRA).
                 Here are examples of acceptable and prohibited uses of
                data from Friend Verifier. Using it in ways marked as
                "Prohibited" not only violates our Terms &  Conditions but
                also breaks the law, potentially leading to legal consequences.
                 We take this seriously and may terminate account or report
                violators to law enforcement when necessary
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
    alignItems: "center",
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
    backgroundColor: "#FFFFFF",
    // elevation: 5,
    height: RFValue(90),
    paddingHorizontal: RFValue(12),
    marginTop: RFValue(10),
    borderRadius: 2,
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 0,
},
shadowOpacity: 0.1,
shadowRadius: 4.65,

elevation: 3,
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

  title: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
    // marginLeft: RFValue(40),
  },
  subtitle: {
    fontSize: RFValue(10),
    color: "#000",
    fontFamily: "RegularText",
    textAlign: "left",
    // marginLeft: RFValue(40),
    marginTop: RFValue(10),
  },
});
