import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Switch,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
 
  const Report = props => {
    return (
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={props.onBackdropPress}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={props.onBackdropPress}>
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}> 
            <View
              style={[
                styles.row,
              ]}>
              <TouchableOpacity onPress={props.onPress} 
                style={[
                  styles.textContainer,
                
                ]}>
                    <Image style={styles.don} source={require('../assets/icons/Dont.png')} />
                <Text style={styles.text}>Cancel Ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.textContainer} onPress={props.onBackdropPress}>
              <Image style={[styles.don,{backgroundColor:'#FFFFFF',borderRadius: RFValue(50),}]} source={require('../assets/icons/cross.png')} />
                <Text style={[styles.text,{color:'#000000'}]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  export default Report;
  
  const styles = StyleSheet.create({
    modalContainer: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.7)',
    },
    don:{
        width:RFValue(20),
        height:RFValue(20),
    },
    modalContent: {
  backgroundColor: "#FFFFFF",
     width: '100%',
    borderTopLeftRadius:RFValue(12),
    borderTopRightRadius:RFValue(12),
   height:RFValue(180),
      alignItems: 'center',
      //justifyContent: 'space-between',
      paddingVertical:RFValue(35)
    },
    container:{
     //   width: responsiveWidth(78),
        alignItems: 'center',
    //    marginVertical: responsiveHeight(7),
        justifyContent: 'center',
      },
    privatetext: {
     //   color: Colors.text3,
    //    fontSize: fontSize.h1,
        textAlign: 'center',
      },
    row: {
      width: '100%',
     
    },
    textContainer: {
        flexDirection:'row',
        alignSelf: 'center',
      width: '90%',
      height:RFValue(50),
      //alignItems: 'center',
      alignItems: 'center',
      backgroundColor:'#EFEFEF',
      marginBottom: RFValue(10),
      borderRadius: RFValue(12),
      paddingLeft:RFValue(20)
     // height: responsiveScreenHeight(7),
    },
    text: {
        marginLeft:RFValue(20),
       fontSize: RFValue(14),

      fontFamily: 'SemiBold',
      color: '#FF0032',
    },
  });
  