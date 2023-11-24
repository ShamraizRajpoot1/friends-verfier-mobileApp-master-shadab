import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Device from "../../src/constants/device";
import Header from '../components/Header'
import CustomSwitch from "../components/CustomSwitch";
const WIDTH = Dimensions.get("window").width;
export default function NotificationScreen({ navigation }) {
  const [emailAccount, setEmailAccount] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [credits, setCredits] = React.useState(true);
  const [emailCredits, setEmailCredits] = React.useState(true);
  const [emailSubscription, setEmailSubscription] = React.useState(false);
  const [subscription, setSubscription] = React.useState(true);
  const [conatacts, setConatacts] = React.useState(true);

  const [emailNews, setEmailNews] = React.useState(false);
  const [pasuseallSms, setPauseAllSms] = React.useState(false);

  const back = ()=>{
    navigation.goBack();
  }
const toggle = () => {
  setProduct(prev => !prev);
}
const toggle2 = () => {
  setCredits(prev => !prev);
}
const toggle3 = () => {
  setSubscription(prev => !prev);
}
const toggle4 = () => {
  setConatacts(prev => !prev);
}
const toggle5 = () => {
  setEmailAccount(prev => !prev);
}
const toggle6 = () => {
  setEmailCredits(prev => !prev);
}
const toggle7 = () => {
  setEmailSubscription(prev => !prev);
}
const toggle8 = () => {
  setEmailNews(prev => !prev);
}
const toggle9 = () => {
  setPauseAllSms(prev => !prev);
}
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#305A9C"
      />
      <Header  Image={true} onPress={back} Text1={"friend"} Text2={"verifier"} />
      {/* <View style={styles.homeHeader}>
        <Entypo
          onPress={() => navigation.goBack()}
          name="chevron-thin-left"
          size={24}
          color="#fff"
        />

        <Text style={styles.headerTitle}>
          <Text style={{ ...styles.headerTitle, fontFamily: "SemiBold" }}>
            Notifications
          </Text>
        </Text>
        <Pressable>
          <Feather name="menu" size={24} color="#305A9C" />
        </Pressable>
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(50) }}
      >
        <View style={[styles.pushNotificationsontainer,{marginTop: RFValue(10),}]}>
          <Text style={styles.pushNotificationText}>Push Notifications</Text>

          {/* <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Pause All</Text>
              <Switch
                value={pasuseall}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setPauseAll(value)}
              />
            </View>
            <View style={styles.seprator} />
          </View> */}

          <View style={{ marginTop: RFValue(10) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Account Notifications</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={product}
            toggleSwitch={toggle}
          />
             
            </View>

            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>

          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Credits</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={credits}
            toggleSwitch={toggle2}
          />
            </View>

            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>

          {/* <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Reminders</Text>
              <Switch
                useNativeDriver={true}
                value={reminders}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setreminder(value)}
              />
            </View>

            <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          </View>

          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Feedback</Text>
              <Switch
                useNativeDriver={true}
                value={feedback}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setFeedback(value)}
              />
            </View>
            <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          </View> */}

          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Subscriptions</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={subscription}
            toggleSwitch={toggle3}
          />
            </View>
            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>

          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Friend Verifier News</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={conatacts}
            toggleSwitch={toggle4}
          />
            </View>
            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>

          <View>
            <Text style={styles.pushNotificationText}>Email Notifications</Text>

            <View style={{ marginTop: RFValue(10) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Account Notifications</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={emailAccount}
            toggleSwitch={toggle5}
          />
            </View>

            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>

          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Credits</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={emailCredits}
            toggleSwitch={toggle6}
          />
            </View>

            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>
          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Subscriptions</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={emailSubscription}
            toggleSwitch={toggle7}
          />
            </View>
            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>

          <View style={{ marginTop: RFValue(0) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Friend Verifier News</Text>
              <CustomSwitch
            onColor={'#4BD964'}
            value={emailNews}
            toggleSwitch={toggle8}
          />
            </View>
            {/* <View style={{ ...styles.seprator, marginTop: RFValue(10) }} /> */}
          </View>
          </View>
           <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          <View>

            <View style={{ marginTop: RFValue(20) }}>
              <View style={styles.individualListIte}>
                <Text style={styles.listText}>Pause All</Text>
                <CustomSwitch
            onColor={'#4BD964'}
            value={pasuseallSms}
            toggleSwitch={toggle9}
          />
              </View>
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
    // paddingTop:Platform.OS==='android'?0:RFValue(12),
    // paddingTop: Device.STATUS_BAR_HEIGHT + 20,
    paddingTop:
      Platform.OS === "android"
        ? Device.STATUS_BAR_HEIGHT 
        : Device.STATUS_BAR_HEIGHT + 20,
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  pushNotificationText: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "SemiBold",
    marginLeft: RFValue(20),
    marginTop: RFValue(20),
  },
  individualListIte: {
    paddingHorizontal:RFValue(15),
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH - RFValue(20),
    height:RFValue(40),
    justifyContent: 'space-between',
    marginBottom: RFValue(10),
    alignSelf: 'flex-start',
    backgroundColor:'#F7F9FB',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  listText: {
    marginLeft: RFValue(13),
    fontSize: RFValue(12), 
    color: "#373737",
    fontFamily: "Medium",
  },
  seprator: {
    height: 1,
    backgroundColor: "#85B8FF",
    width: WIDTH - RFValue(20),
    alignSelf: "center",
    marginTop: RFValue(24),
  },
});
