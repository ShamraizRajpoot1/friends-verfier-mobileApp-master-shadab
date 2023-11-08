import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather, Entypo } from "@expo/vector-icons";
import { axiosGETCall } from "../../utils/axios.js";
import RecentSearches from "../../components/RecentSearches";
import { useIsFocused } from "@react-navigation/native";

import { useSelector } from "react-redux";
const WIDTH = Dimensions.get("window").width;
const GetRecentSearcheAPI = ({ navigation, data }) => {
  const userData = useSelector((state) => state?.loginDetails);
  const [totalSearchesState, setTotalSearches] = React.useState();
  const [Loading, setLoading] = React.useState(false);
  const [recentSearchesData, setRecentSearchesData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userData?.hasOwnProperty("Authorization") && isFocused) {
      getRecentSearches();
    }
    // }, [userData, recentSearchesData]);
  }, [userData, isFocused]);

  const getRecentSearches = () => {
    var Token = userData?.Authorization;
    var url = "/search/getHistory";
    axiosGETCall(url, Token, (callBack) => {
      if (callBack?.status == 200) {
        const slicedArray = callBack.data.slice(0, 10);
        setRecentSearchesData(slicedArray);
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.recentSearchUpperContainer}>
        <View style={styles.recentSearchesContainer}>
          <Feather name="filter" size={20} color="#fff" />
          <Text style={styles.recentSearchesText}>RECENT SEARCHES</Text>
          <View />
        </View>

        <View style={{ marginTop: RFValue(12) }}>
          {recentSearchesData?.map((item, index) => (
            <RecentSearches
              title={item?.search?.requestObj?.searchType}
              requestObj={item?.search?.requestObj}
              item={item?.search}
              navigation={navigation}
            />
          ))}
        </View>
        <View>
          <Text style={styles.norecentSearchesText}>
            {/* No Recent Searches */}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00ff00",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },

  headerTitle: {
    fontSize: RFValue(22),
    color: "#fff",
    fontFamily: "RegularText",
    // textAlign:"center",
    // marginRight:RFValue(20),
  },

  loginorcreateAccount: {
    fontSize: RFValue(12),
    color: "#fff",
    textDecorationLine: "underline",
    fontFamily: "BoldText",
  },

  inputContainer: {
    marginTop: RFValue(30),
  },
  input: {
    width: WIDTH - RFValue(80),
    height: RFValue(50),
    marginLeft: RFValue(5),
    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#000",
  },

  stateInput: {
    width: WIDTH - RFValue(80),

    fontSize: RFValue(14),
    fontFamily: "RegularText",
    color: "#000",
  },

  crossButton: {
    width: RFValue(28),
    height: RFValue(28),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DEDEDE",
  },
  HomeInputsContainer: {
    marginTop: RFValue(15),
  },

  searchButton: {
    width: WIDTH - RFValue(85),
    height: RFValue(50),
    backgroundColor: "#305A9C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontFamily: "RegularText",
  },
  filterIcon: {
    width: RFValue(20),
    height: RFValue(20),
  },
  filterButtonContainer: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#44CE91",
    marginLeft: RFValue(7),
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(15),
  },
  recentSearchesContainer: {
    width: WIDTH - RFValue(30),
    height: RFValue(40),
    backgroundColor: "#44CE91",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(12),
  },

  recentSearchesText: {
    fontSize: RFValue(20),
    color: "#fff",
    fontFamily: "Medium",
  },
  norecentSearchesText: {
    color: "#919191",
    fontFamily: "RegularText",
    fontSize: RFValue(12),
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 50,
  },
  recentSearchUpperContainer: {
    width: WIDTH - RFValue(30),
    backgroundColor: "#fff",

    marginTop: RFValue(30),
    alignSelf: "center",
    marginBottom: RFValue(100),
  },
});

export default GetRecentSearcheAPI;
