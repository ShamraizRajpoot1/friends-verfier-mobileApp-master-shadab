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
      >
        <View style={{ marginHorizontal:RFValue(25),marginRight:RFValue(40) }}>
          <Text style={styles.topText}>Do's</Text>
          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
            <Text style={styles.title}>Look yourself up</Text>
            </View>
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              You may think looking yourself up is laughable, but it {"\n"}is
              not; it is crucial. You should know what information {"\n"}is in your public record.
            </Text>
            </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>
              Who did you just matched with?
            </Text>
            </View>
            
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Dating now starts nearly 90% of the time online. {"\n"}Looking up
              that new match before meeting them in {"\n"}person would be
              best. Your safety should always be {"\n"}your first priority; it's
              even more important than Taco {"\n"}Tuesday.
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find out who's calling you</Text>
            </View>
            
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Not sure who is behind that phone number that {"\n"}keeps calling
              you? Run a reverse phone search and find out.
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find old friends and family</Text>
            </View>
           
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Life takes us all in different directions;
              searching {"\n"}through our billions of public records is a great
              way {"\n"}to reconnect with people, whether it's friends from{"\n"}
              ages ago, distant relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find old friends and family</Text>
            </View>
           
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Life takes us all in different directions;
              searching {"\n"}through our billions of public records is a great
              way {"\n"}to reconnect with people, whether it's friends from{"\n"}
              ages ago, distant relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find old friends and family</Text>
            </View>
           
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Life takes us all in different directions;
              searching {"\n"}through our billions of public records is a great
              way {"\n"}to reconnect with people, whether it's friends from{"\n"}
              ages ago, distant relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find old friends and family</Text>
            </View>
           
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Life takes us all in different directions;
              searching {"\n"}through our billions of public records is a great
              way {"\n"}to reconnect with people, whether it's friends from{"\n"}
              ages ago, distant relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find old friends and family</Text>
            </View>
           
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Life takes us all in different directions;
              searching {"\n"}through our billions of public records is a great
              way {"\n"}to reconnect with people, whether it's friends from{"\n"}
              ages ago, distant relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>
          </View>
          <View style={{ marginTop: RFValue(20) }}>
          <View style={styles.heading}>
              <Image source={require('../assets/icons/Dos.png')} style={styles.do}/>
              <Text style={styles.title}>Find old friends and family</Text>
            </View>
           
            <View style={styles.paragraph}>
            <Text style={styles.subtitle}>
              Life takes us all in different directions;
              searching {"\n"}through our billions of public records is a great
              way {"\n"}to reconnect with people, whether it's friends from{"\n"}
              ages ago, distant relatives, or a long-lost significant{"\n"}
              other!
            </Text>
          </View>
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
heading:{
  backgroundColor:'#F5F5F5',
  width: WIDTH-RFValue(50),
  height: RFValue(28),
  flexDirection:'row',
  borderRadius: 10,
  alignItems:'center',
  paddingLeft:RFValue(12)
},
do:{
  width:RFValue(12),
  height:RFValue(12),
  marginRight:RFValue(5)
},
paragraph:{
  backgroundColor:"#FFFFFF",
  elevation:9,
  height: RFValue(90),
  paddingHorizontal:RFValue(12),
  marginTop: RFValue(10),
  borderRadius: 10,
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
