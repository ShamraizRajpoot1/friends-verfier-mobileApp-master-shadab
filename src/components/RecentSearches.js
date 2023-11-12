import {
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
export default function RecentSearches(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ResultDeatilScreen", {
          data: props.item,
          newData: props.item,
        });
      }}
      style={styles.recentSearchContainer}
    >
      <View>
        <Text style={styles.title}>{props.title}</Text>
        {(props?.requestObj?.search?.firstName ||
          props?.requestObj?.search?.lastName) && (
          <Text style={styles.subtitle}>
            {props?.requestObj?.search?.firstName}{" "}
            {props?.requestObj?.search?.middleName}{" "}
            {props?.requestObj?.search?.lastName}
          </Text>
        )}
        {props?.requestObj?.search?.age && (
          <Text style={styles.subtitle}>
            Age {props?.requestObj?.search?.age}
          </Text>
        )}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.subtitle}>
            {props?.requestObj?.search?.city && props?.requestObj?.search?.city}
          </Text>
          <Text style={styles.subtitle}>
            {props?.requestObj?.search?.state && props?.requestObj?.search?.city
              ? ", "
              : props?.requestObj?.search?.state}
          </Text>
        </View>
        {/* {(props?.requestObj?.search?.city ||
          props?.requestObj?.search?.state) && (
          <Text style={styles.subtitle}>
            {props?.requestObj?.search?.city
              ? props?.requestObj?.search?.city +
                ", " +
                props?.requestObj?.search?.state
              : props?.requestObj?.search?.state}
          </Text>
        )} */}
        {props?.requestObj?.search?.phone && (
          <Text style={styles.subtitle}>
            {formatPhoneNumber(props?.requestObj?.search?.phone)}
          </Text>
        )}
        {props?.requestObj?.search?.email && (
          <Text style={styles.subtitle}>
            {props?.requestObj?.search?.email}
          </Text>
        )}
      </View>
        <View  style={styles.searchBigIcons}>
      <Image
        style={styles.searchBigIcon}
        source={require("../assets/icons/eye2.png")}
      />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  recentSearchContainer: {
    width: WIDTH - RFValue(45),
    alignSelf: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(8),
    justifyContent: "space-between",
    paddingTop: RFValue(12),
    paddingBottom: RFValue(12),
  },

  title: {
    fontSize: RFValue(10),
    color: "rgba(0, 0, 0, 0.8)",
    fontFamily: "SemiBold",
    marginBottom: RFValue(5),
  },

  subtitle: {
    color: "#8C929B",
    fontSize: RFValue(10),
    fontFamily: "RegularText",
  },
  searchBigIcons: {
    backgroundColor:'#DEDEDE',
    alignItems:'center',
    justifyContent:'center',
    width: RFValue(35),
    height: RFValue(35),
    borderRadius: 12,
  },
  searchBigIcon: {
    width: RFValue(23),
    height: RFValue(20),
  },
});

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumberString;
};
