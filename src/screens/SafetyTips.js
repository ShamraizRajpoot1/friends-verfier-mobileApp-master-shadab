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
const WIDTH = Dimensions.get("window").width;
const SafetyTips = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RFValue(50),
        }}
      >
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
              Safety Tips
            </Text>
          </Text>
          <Pressable>
            <Feather name="menu" size={24} color="#305A9C" />
          </Pressable>
        </View>
        <View
          style={{ marginHorizontal: RFValue(25), marginRight: RFValue(40) }}
        >
          <Text style={styles.topText}>
            Meeting someone online can be a great way to{"\n"}
            connect with new people, but it's important to{"\n"}
            exercise caution and follow safety guidelines to{"\n"}
            protect yourself. Here are some safety tips when{"\n"}
            meeting someone online:
          </Text>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>
                Protect Your Personal Information
              </Text>
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Avoid sharing sensitive personal information such as{"\n"}
                your home address, phone number, or financial{"\n"}
                details.{"\n"}
                Be cautious about revealing too much about your{"\n"}
                daily routine or specific whereabouts.{"\n"}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Use Reputable Platforms</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Choose well-established and reputable online{"\n"}
                platforms for meeting people, whether for dating,{"\n"}
                social networking, or professional purposes.{"\n"}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Verify Thier Identity</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Befere meeting in person, try to verify the person's{"\n"}
                identity through video chats, phone calls, or other{"\n"}
                means.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Take Your Time</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Get to know the person gradually. Be wary of{"\n"}
                individuals who want to meet in person immediately{"\n"}
                or rush the relationship.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Meet In Public Places</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                When meeting someone for the first time, choose a{"\n"}
                public and well-populated location.{"\n"}
                {"\n"}
                inform a trusted friend or family member about your{"\n"}
                plans and whereabouts.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Travel Separately</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Arrive at the meeting place in your own vehicle or{"\n"}
                use public transportation. Avoid having the person{"\n"}
                pick you up or drop you off at your home.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Trust Your Instincts</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                If something doesn't feel right or if you feel{"\n"}
                uncomfertable during the meeting, it's okay to leave{"\n"}
                and prioritize your safety.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Stay Sober</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Avoid excessive alcohol or substance consumption{"\n"}
                during the first meeting, as it can impair your{"\n"}
                judgment and decision-making.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Take Care of Personal Belongings</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Keep your belongings, such as your purse, phone,{"\n"}
                and wallet, within reach and under your control.{"\n"}{"\n"}
                Also keep an eye on your drink.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Online Privacy Settings</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                Adjust your privacy settings on social media and{"\n"}
                online dating profiles to limit the amount of personal{"\n"}
                information visible to others.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Use a Reverse Image Search</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                To verify a person's identity, consider using a reverse{"\n"}
                image search tool to check if their profile picture{"\n"}
                appears elsewhere on the internet.
              </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image
                source={require("../assets/icons/warning.png")}
                style={styles.do}
              />
              <Text style={styles.title}>Report Suspicious Behavior</Text>
            </View>

            <View style={styles.paragraph}>
              <Text style={styles.subtitle}>
                If you encounter any suspicious behavior or suspect{"\n"}
                someone is not who they claim to be, report it to the{"\n"}
                platform administrators.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
    width: RFValue(14),
    height: RFValue(14),
    marginRight: RFValue(5),
  },
  paragraph: {
    backgroundColor: "#FFFFFF",
    elevation: 1,
    height: RFValue(90),
    paddingHorizontal: RFValue(12),
    marginTop: RFValue(10),
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
    fontFamily: "RegularText",
    fontSize: RFValue(12),
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

export default SafetyTips;
