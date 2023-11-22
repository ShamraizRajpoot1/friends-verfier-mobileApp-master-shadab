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
          Lorem ipsum dolor sit amet, consectetur{"\n"}
          adipiscing elit. Vivamus nibh elit,{"\n"}
          malesuada non rutrum feugiat, feugiat et{"\n"}
          leo. Donec sodales maximus diam, ac{"\n"}
          egestas risus mollis nec. Etiam libero{"\n"}
          metus, semper non sodales et, sollicitudin{"\n"}
          id purus. Suspendisse tincidunt feugiat{"\n"}
          velit, eget tempus massa finibus quis. Cras{"\n"}
          id lectus odio. Nulla lacinia justo vel{"\n"}
          commodo efficitur. Pellentesque habitant{"\n"}
          morbi tristique senectus et netus et{"\n"}
          malesuada fames ac turpis egestas. In in{"\n"}
          facilisis nisl. Vestibulum pretium tincidunt{"\n"}
          lacus. Vivamus viverra augue vitae orci{"\n"}
          blandit condimentum.{"\n"}
          {"\n"}
          Curabitur non semper est, at suscipit est.{"\n"}
          Aenean sagittis pulvinar volutpat. Nunc{"\n"}
          cursus aliquam massa, ac tincidunt felis{"\n"}
          dictum id. Aenean vulputate congue nibh{"\n"}
          condimentum bibendum. Morbi tincidunt{"\n"}
          nulla eu nibh sodales vestibulum. Nullam{"\n"}
          fermentum enim ac malesuada tincidunt.{"\n"}
          Donec ac fringilla lorem, in pulvinar tellus.{"\n"}
          Cras hendrerit vehicula ex et consequat.{"\n"}
          Lorem ipsum dolor sit amet, consectetur{"\n"}
          adipiscing elit. Fusce pellentesque ex leo,{"\n"}
          et sollicitudin quam lobortis non. Orci
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
    marginTop: RFValue(35),
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
