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

const WIDTH = Dimensions.get("window").width;
export default function NotificationScreen({ navigation }) {
  const [pasuseall, setPauseAll] = React.useState(false);
  const [product, setProduct] = React.useState(false);
  const [credits, setCredits] = React.useState(true);
  const [reminders, setreminder] = React.useState(true);
  const [feedback, setFeedback] = React.useState(false);
  const [subscription, setSubscription] = React.useState(true);
  const [conatacts, setConatacts] = React.useState(true);

  const [pasuseallEmail, setPauseAllEMail] = React.useState(false);
  const [pasuseallSms, setPauseAllSms] = React.useState(false);

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
            Notifications
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
        <View style={styles.pushNotificationsontainer}>
          <Text style={styles.pushNotificationText}>Push Notifications</Text>

          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Pause All</Text>
              <Switch
                value={pasuseall}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setPauseAll(value)}
              />
            </View>
            <View style={styles.seprator} />
          </View>

          <View style={{ marginTop: RFValue(20) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Product</Text>
              <Switch
                useNativeDriver={true}
                value={product}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setProduct(value)}
              />
            </View>

            <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          </View>

          <View style={{ marginTop: RFValue(10) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Credits</Text>
              <Switch
                useNativeDriver={true}
                value={credits}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setCredits(value)}
              />
            </View>

            <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          </View>

          <View style={{ marginTop: RFValue(10) }}>
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

          <View style={{ marginTop: RFValue(10) }}>
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
          </View>

          <View style={{ marginTop: RFValue(10) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Subscriptions</Text>
              <Switch
                useNativeDriver={true}
                value={subscription}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setSubscription(value)}
              />
            </View>
            <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          </View>

          <View style={{ marginTop: RFValue(10) }}>
            <View style={styles.individualListIte}>
              <Text style={styles.listText}>Contacts</Text>
              <Switch
                useNativeDriver={true}
                value={conatacts}
                //   style={{width:RFValue(60),height:RFValue(30)}}
                onValueChange={(value) => setConatacts(value)}
              />
            </View>
            <View style={{ ...styles.seprator, marginTop: RFValue(10) }} />
          </View>

          <View>
            <Text style={styles.pushNotificationText}>Email Notifications</Text>

            <View style={{ marginTop: RFValue(20) }}>
              <View style={styles.individualListIte}>
                <Text style={styles.listText}>Pause All</Text>
                <Switch
                  useNativeDriver={true}
                  value={pasuseallEmail}
                  //   style={{width:RFValue(60),height:RFValue(30)}}
                  onValueChange={(value) => setPauseAllEMail(value)}
                />
              </View>
              <View style={styles.seprator} />
            </View>
          </View>

          <View>
            <Text style={styles.pushNotificationText}>SMS Notifications</Text>

            <View style={{ marginTop: RFValue(20) }}>
              <View style={styles.individualListIte}>
                <Text style={styles.listText}>Pause All</Text>
                <Switch
                  useNativeDriver={true}
                  value={pasuseallSms}
                  //   style={{width:RFValue(60),height:RFValue(30)}}
                  onValueChange={(value) => setPauseAllSms(value)}
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
    height: RFValue(75),
    backgroundColor: "#305A9C",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: RFValue(20),
    // paddingTop:Platform.OS==='android'?0:RFValue(12),
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
    // textAlign:"center",
    // marginRight:RFValue(20),
  },
  pushNotificationText: {
    fontSize: RFValue(15),
    color: "#000",
    fontFamily: "SemiBold",
    marginLeft: RFValue(20),
    marginTop: RFValue(30),
  },
  individualListIte: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(30),
  },
  listText: {
    fontSize: RFValue(14),
    color: "#000",
    fontFamily: "Medium",
  },
  seprator: {
    height: 1,
    backgroundColor: "#D7D8DD",
    width: WIDTH - RFValue(50),
    alignSelf: "center",
    marginTop: RFValue(24),
  },
});
