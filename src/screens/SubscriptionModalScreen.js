/** @format */

import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Feather, Entypo } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { axiosPOSTCall } from "../utils/axios.js";
import { useSelector } from "react-redux";
import CircularProgress, {
  ProgressRef,
} from "react-native-circular-progress-indicator";
import Svg, { G, Circle } from "react-native-svg";
import typescript from "react-native-svg";

import Device from "../../src/constants/device";

const HIEGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
export default function SubscriptionModalScreen({
  navigation,
  setShowModal,
  screen,
}) {
  const [progress, setProgress] = useState(0);
  // const progressRef = useRef(null);
  const progressRef = useRef(0);

  const [loadImgae, setLoadImgae] = useState(
    require("../assets/icons/searching.png")
  );
  const loadingimage = [
    require("../assets/icons/1.png"),
    require("../assets/icons/2.png"),
    require("../assets/icons/3.png"),
    require("../assets/icons/4.png"),
    require("../assets/icons/5.png"),
  ];
  const [counting, setCounting] = useState(0);
  const rendomImg = (val) => {
    // return loadingimage[Math.floor(Math.random()*loadingimage.length)];
    return loadingimage[val];
  };

  useEffect(() => {
    setTimeout(() => {
      let imgArraylen = loadingimage.length - 1;
      if (imgArraylen > counting) {
        setLoadImgae(rendomImg(counting));
        setCounting(counting + 1);
      } else {
        setLoadImgae(rendomImg(counting));
        setCounting(0);
      }
      // setLoadImgae(rendomImg());
    }, 2000);
  });

  useEffect(() => {
    progressRef.current.reAnimate();
  }, [progress]);

  // const userData = useSelector((state) => state?.loginDetails);
  // useEffect(() => {
  //   var token = userData?.Authorization;
  //   var url = "/search/openSearch?pageNo=1&pageSize=10";
  //   var data = {
  //     fields: [
  //       {
  //         firstName: "FRANK",
  //       },
  //       {
  //         lastName: "ANDERSON",
  //       },
  //     ],
  //   };
  //   axiosPOSTCall(url, data, token, (callback) => {
  //   });
  // }, []);

  //    Animated Progress Bar
  const Progress = ({ step, steps, height }) => {
    const [width, setWidth] = React.useState(0);
    const animatedValue = React.useRef(new Animated.Value(-1000)).current;
    const reactive = React.useRef(new Animated.Value(-1000)).current;

    React.useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: reactive,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, []);

    React.useEffect(() => {
      reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
      <View
        onLayout={(e) => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth);
        }}
        style={{
          height,
          backgroundColor: "#D2D3D5",
          borderRadius: height,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height,
            borderRadius: height,
            backgroundColor: "#2F599B",
            width: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        ></Animated.View>
      </View>
    );
  };

  //    Animated Progress Bar

  const [values, setValues] = useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setValues(values + 5);
    }, 1000);
  }, [values]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      {/* <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      > */}
      {/* <View style={styles.homeHeader}> */}
      {/* <Entypo
            onPress={() => setShowModal(false)}
            name="chevron-thin-left"
            size={24}
            color="#fff"
          /> */}
      {/* <></>

        <Text
          style={[
            styles.headerTitle,
            { marginTop: Platform.OS === "android" ? 10 : 25 },
          ]}
        >
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}> */}
      {/* Searching */}
      {/* {screen == 2 ? "Report Building" : "Searching"}
          </Text>
        </Text> */}

      {/* <Feather name="menu" size={24} color="#305A9C" /> */}
      {/* </View> */}

      {/* <View style={styles.homeHeader}>
        <Pressable
          style={{}}
          onPress={() => navigation.navigate("SideMenuScreen")}
        >
          <Feather
            // style={{position:"absolute"}}
            name="menu"
            size={33}
            color="#fff"
          />
        </Pressable>
        <Text style={{ ...styles.headerTitle }}>
          friend
          <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}>
            verifier
          </Text>
        </Text>

        <Pressable>
          <Feather name="menu" size={33} color="#305A9C" />
        </Pressable>
      </View> */}

      <View style={[styles.homeHeader]}>
        <Text
          style={{
            ...styles.headerTitle,
            fontFamily: "SemiBold",
            height: Platform.OS === "ios" ? 80 : null,
          }}
        >
          {/* {screen == 2 ? "Report Building" : "Searching"} */}
          {"Subscription"}
        </Text>
      </View>
      {/* 
      <View
        style={{
          width: WIDTH - RFValue(60),
          alignSelf: "center",
          marginTop: RFValue(45),
        }}
      >
        <Progress step={5.5} steps={10} height={RFValue(14)} />
      </View> */}

      {/* <View style={styles.dangerContainer}>
        <Image
          style={styles.dangerIcon}
          source={require("../assets/icons/danger.png")}
        />
        <Text style={styles.dangerLine}>
          Don't leave the app, your progress will be lost
        </Text>
      </View> */}

      {/* <View style={{position:'absolute',justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{height:50,width:50,position:'absolute',zIndex:1}}
          source={require('../assets/icons/searching.png')}
        />
        <CircularProgress value={values} fontSize={200}>
        </CircularProgress>    
        </View> */}

      <View>
        {/* <Progress step={5.5} steps={10} height={RFValue(14)} /> */}
        <View style={styles.ScreenHeaderContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../assets/icons/logo2.png")}
          />
        </View>

        <View>
          <Text style={styles.buildingReport_header}>{"Loading..."}</Text>
        </View>

        <View style={styles.Loading_img}>
          {/* {screen == 2 ? (
            <>
              <Image
                style={styles.lodingImage_style}
                source={require("../assets/icons/searching.png")}
              />
              <CircularProgress
                value={values}
                fontSize={20}
                ref={progressRef}
                radius={75}
                titleStyle={{ fontWeight: "bold", fontSize: 1 }}
                // titleColor={"#3F5A95"}
                titleColor={"red"}
                progressValueColor={"white"}
                // progressValueStyle={{ fontWeight: "100", color: "yellow" }}
                activeStrokeColor={"#43598F"}
                inActiveStrokeColor={"#E3EBF7"}
                clockwise={true}
              ></CircularProgress>
            </>
          ) : (
            <CircularProgress
              ref={progressRef}
              value={97}
              radius={50}
              inActiveStrokeOpacity={0.5}
              activeStrokeWidth={10}
              inActiveStrokeWidth={10}
              progressValueStyle={{ fontWeight: "100", color: "white" }}
              activeStrokeSecondaryColor="#305A9C"
              inActiveStrokeColor="black"
              duration={5000}
              dashedStrokeConfig={{
                count: 20,
                width: 4,
              }}
              onAnimationComplete={() => {
                progressRef.current.reAnimate();
              }}
            />
          )} */}
          <Image
            style={styles.lodingImage_style}
            source={require("../assets/icons/searching.png")}
          />
          <CircularProgress
            value={values}
            fontSize={20}
            ref={progressRef}
            radius={75}
            titleStyle={{ fontWeight: "bold", fontSize: 1 }}
            // titleColor={"#3F5A95"}
            titleColor={"red"}
            progressValueColor={"white"}
            // progressValueStyle={{ fontWeight: "100", color: "yellow" }}
            activeStrokeColor={"#43598F"}
            inActiveStrokeColor={"#E3EBF7"}
            clockwise={true}
          ></CircularProgress>
        </View>

        <View style={styles.loadImgae_belowText}>
          <Text style={styles.loadingImage_text}>
            {screen == 2
              ? "We are now building your report from databases containing information on criminal reports,sex offenders, bankruptcies and public record compiled from various sources, this may take up to 30 seconds"
              : "It may take up to 30 seconds for our report to load since they are compiled real time from billions of records from multiple data sources."}
          </Text>
        </View>

        {/* <Image
          style={styles.searchingicon}
          source={loadImgae}
        /> */}
        {/* <Text style={styles.searchingRecordsText}>
          Searching Billions of Records
        </Text> */}
      </View>

      <View style={styles.dangerContainer}>
        <Image
          style={styles.dangerIcon}
          source={require("../assets/icons/danger.png")}
        />
        <Text style={styles.dangerLine}>
          Don't leave the app, your progress will be lost
        </Text>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buildingReport_header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
    color: "#305A9C",
  },
  Loading_img: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 180,
  },
  loadImgae_belowText: {
    margin: 25,
    marginTop: 210,
  },
  lodingImage_style: {
    height: 80,
    width: 80,
    position: "absolute",
    zIndex: 1,
    top: 25,
  },
  loadingImage_text: {
    textAlign: "center",
    color: "#305A9C",
  },
  ScreenHeaderContainer: {
    width: WIDTH,
    height: 50,
    // backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: WIDTH - RFValue(40),
    height: RFValue(30),
    marginTop: RFValue(30),
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  homeHeader: {
    width: WIDTH,
    height: RFValue(45),
    backgroundColor: "#305A9C",
    // alignItems: "center",
    paddingHorizontal: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT - 40
        : Device.STATUS_BAR_HEIGHT + 65,
    alignItems: "center",
    justifyContent: "center",
    // width: WIDTH,
    // height: Platform.OS === "android" ? RFValue(80) : RFValue(80),
    // backgroundColor: "#305A9C",
    // justifyContent: "space-between",
    // alignItems: "center",
    // flexDirection: "row",
    // paddingTop: Platform.OS === "android" ? RFValue(20) : RFValue(20),
    // paddingHorizontal: RFValue(20),
    // // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    // paddingTop:
    //   Platform.OS === "android"
    //     ? Device.STATUS_BAR_HEIGHT - 15
    //     : Device.STATUS_BAR_HEIGHT + 20,
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  underHeaderContainer: {
    width: WIDTH,
    height: RFValue(22),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F6F6F",
    paddingBottom: 2,
  },

  dangerContainer: {
    width: WIDTH - RFValue(60),
    height: RFValue(35),
    padding: 2,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: RFValue(20),
    backgroundColor: "#F5DF00",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    justifyContent: "center",
  },
  dangerIcon: {
    width: RFValue(20),
    height: RFValue(20),
    tintColor: "#000",
    marginRight: RFValue(5),
  },
  dangerLine: {
    fontSize: RFValue(10),
    color: "#000",
    fontFamily: "SemiBold",
  },
  searchingicon: {
    width: "75%",
    height: RFValue(220),
    alignSelf: "center",
    marginTop: RFValue(50),
  },
  searchingRecordsText: {
    fontSize: RFValue(18),
    fontFamily: "SemiBold",
    color: "#000",
    marginTop: RFValue(330),
    textAlign: "center",
  },
});
