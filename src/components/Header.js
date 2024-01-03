import { StyleSheet, Text, View,Dimensions, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";
import Device from '../constants/device';
const WIDTH = Dimensions.get("window").width;

const Header = (props) => {
  return (
    <View style={styles.homeHeader}>
    <View style={{width: '10%'}}>
      {props.Image && (
        <TouchableOpacity 
          style={{marginLeft: 4, width:RFValue(20)}}
          onPress={props.onPress}>
          <Image style={styles.back} source={require('../assets/icons/back.png')} />
        </TouchableOpacity>
      )}
    </View>
    <View style={{width:'80%', alignItems:'center'}}>
    <Text style={styles.headerTitle}>
         {props.Text1}
          <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}>
          {props.Text2}
          </Text>
        </Text>
        </View>
        <View style={{width: '15%'}}>
        {props.options && (
          <TouchableOpacity
            style={{marginLeft: 5}}
            onPress={props.press}>
           
              <Image
                style={styles.icon}
                source={require('../assets/icons/inviteicon.png')}
              />
           
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  icon:{
    height: RFValue(25),
    width: RFValue(20),
  },
  back:{
    height: RFValue(20),
    width: RFValue(20),
  },
    homeHeader: {
        width: WIDTH,
        height: RFValue(90),
        backgroundColor: "#305A9C",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: RFValue(10),
        paddingTop:
          Platform.OS === "android"
            ? Device.STATUS_BAR_HEIGHT 
            : Device.STATUS_BAR_HEIGHT + 20,
    
        // paddingTop:Platform.OS==='android'?0:RFValue(12),
      },
      headerTitle: {
        fontSize: RFValue(18),
        color: "#fff",
        fontFamily: "RegularText",
        // textAlign:"center",
        // marginRight:RFValue(20),
      },
})