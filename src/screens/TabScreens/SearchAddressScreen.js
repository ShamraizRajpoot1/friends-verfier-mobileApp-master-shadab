
// import React, {useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Pressable,
//   Platform,
//   Modal,
//   Alert,
//   ActivityIndicator,
//   Button
// } from "react-native";
// import { Feather, Entypo } from "@expo/vector-icons";
// import MapView, { Marker } from 'react-native-maps';
// import { RFValue } from 'react-native-responsive-fontsize';
// import Device from "../../../src/constants/device";
// const HIEGHT = Dimensions.get("window").height;
// const WIDTH = Dimensions.get("window").width;

// export default function SearchAddressScreen({ navigation }) {
//     const [zipCode, setZipCode] = useState('');
//     const [userLocations, setUserLocations] = useState([
//       { name: 'User1', latitude: 37.78825, longitude: -122.4324, age: 25 },
//       { name: 'User2', latitude: 37.78925, longitude: -122.4244, age: 30 },
//       // Add more user locations as needed
//     ]);
  
//     const handleZipCodeSearch = async () => {
//       try {
//         // Use the Google Maps Geocoding API to convert zip code to coordinates
//         const response = await fetch(
//           `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyCj0Zzlc98ZvAVWi0MsErvoAXM39W6xz-A`
//         );
//         const data = await response.json();
//         console.log('Geocoding Response:', data);
//         if (data.results && data.results.length > 0) {
//           const { lat, lng } = data.results[0].geometry.location;
    
//           // Update the region of the map to the searched location
//           setMapRegion({
//             latitude: lat,
//             longitude: lng,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           });
    
//           setUserLocations([{ name: 'User', latitude: lat, longitude: lng }]);
//         } else {
//           console.error('Invalid zip code or location not found');
//         }
//       } catch (error) {
//         console.error('Error searching by zip code:', error);
//       }
//     };
    
  
//     const handleNearbySearch = () => {
//       // For simplicity, let's assume the current user's location is the center
//       const currentUserLocation = { latitude: 37.78825, longitude: -122.4324 };
  
//       // Calculate nearby locations (within a certain radius)
//       const radius = 0.1; // Adjust the radius as needed
//       const nearbyLocations = userLocations.filter((location) => {
//         const distance = calculateDistance(
//           currentUserLocation.latitude,
//           currentUserLocation.longitude,
//           location.latitude,
//           location.longitude
//         );
//         return distance <= radius;
//       });
  
//       console.log('Nearby locations:', nearbyLocations);
//       // You can update the state or perform any other action with the nearby locations
//     };
  
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//       const R = 6371; // Radius of the earth in km
//       const dLat = deg2rad(lat2 - lat1);
//       const dLon = deg2rad(lon2 - lon1);
//       const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//       const distance = R * c; // Distance in km
//       return distance;
//     };
  
//     const deg2rad = (deg) => {
//       return deg * (Math.PI / 180);
//     };
//     const [mapRegion, setMapRegion] = useState({
//       latitude: 37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//     const handleMarkerPress = (data) => {
//       // Navigate to the next screen with user details
//       navigation.navigate('SexOffenderdetail', { data });
//     };
//     return (
//       <View style={styles.container}>
//          <View style={styles.homeHeader}>
//         <Pressable
//           style={{}}
//           onPress={() => navigation.navigate("SideMenuScreen")}
//         >
//           <Feather name="menu" size={33} color="#fff" />
//         </Pressable>
//         <Text style={{ ...styles.headerTitle }}>
//           friend
//           <Text style={{ ...styles.headerTitle, fontFamily: "Heavy" }}>
//             verifier
//           </Text>
//         </Text>

//         <Pressable onPress={() => navigation.navigate("InviteEmptyScreen")}>
//           <Image source={require('../../assets/icons/inviteicon.png')} style={styles.icon} />
//         </Pressable>
//       </View>
//         <MapView
//   style={styles.map}
//   region={mapRegion}
//   onRegionChangeComplete={(region) => setMapRegion(region)} // Optionally, update the region as the map is moved
// >
//   {userLocations.map((userLocation, index) => (
//      <Marker
//      key={userLocation.id}
//      coordinate={{
//        latitude: userLocation.latitude,
//        longitude: userLocation.longitude,
//      }}
//      //title={userLocation.name}
//      //description={`Age: ${userLocation.age}`}
//      onPress={() => handleMarkerPress(userLocation)}
//    >
//      {/* Custom marker image */}
//      <Image
//        source={require('../../assets/icons/location2.png')}
//        style={{ width: 30, height: 30, borderRadius: 15 }} // Adjust size as needed
//      />
//    </Marker>
//   ))}
// </MapView>
// <View style={styles.btnContainer}>
//         <View style={styles.searchContainer}>
//           <Text style={{fontSize: RFValue(12),color:'#000000'}}>Search By:</Text>
//           <View style={styles.row}>
//             <View  style={styles.inputContainer}>
//           <TextInput
//            style={styles.input}
//             placeholder="Zip Code"
//             value={zipCode}
//             onChangeText={(text) => setZipCode(text)}
//             keyboardType='numeric'
//           />
//           <Image source={require('../../assets/icons/cross.png')} style={styles.icon1}/>
//           </View>
//           {/* <Button title="Search by Zip Code" onPress={handleZipCodeSearch} /> */}
//           <TouchableOpacity onPress={handleNearbySearch} style={styles.button}><Text style={{color:'#FFFFFF', fontSize:RFValue(12)}}>Nearby</Text>
//           <Image source={require('../../assets/icons/location.png')} style={styles.icon2}/>
//           </TouchableOpacity>
//         </View>
//         </View>
//         </View>
//       </View>

//     );
//   };
//   const styles = StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//       flex: 1,
//     },
//     homeHeader: {
//       width: WIDTH,
//       height: HIEGHT/8,
//       backgroundColor: "#305A9C",
//       paddingHorizontal: RFValue(20),
//       flexDirection: "row",
//       justifyContent: "space-between",
//       paddingTop:
//         Platform.OS === "android"
//           ? Device.STATUS_BAR_HEIGHT 
//           : Device.STATUS_BAR_HEIGHT + 20,
//       alignItems: "center",
//     },
//     headerTitle: {
//       fontSize: RFValue(22),
//       color: "#fff",
//       fontFamily: "RegularText",
//     },
//     map: {
//       flex: 0.75, 
//     },
//     searchContainer: {
//       paddingHorizontal:RFValue(15),
//       marginHorizontal:RFValue(10),
//       marginTop:RFValue(20), 
//      // backgroundColor:'#F9F9F9',
//       height:RFValue(70),
//       paddingTop:RFValue(10)
//     },
//     row:{
//       flexDirection:'row',
//       justifyContent:'space-between'
//     },
//     inputContainer: {
//       flexDirection:'row',
//       borderWidth: 1,
//       borderColor: '#ccc',
//       borderRadius: 4,
//       alignItems:'center',
//       justifyContent:'space-between',
//       paddingHorizontal:'5%',
//       width:'45%',
//       backgroundColor:"#FFFFFF",
//       paddingVertical:RFValue(5),
//       height:RFValue(38)

//     },
//     icon1:{
//       backgroundColor:'#DEDEDE',
//       width:RFValue(20),
//       height:RFValue(20),
//       borderRadius: RFValue(50),
//     },
//     input: {
//       width:'75%',
//       color:'#000000'
//     },
//     button:{
//       width:'45%',
//       flexDirection:'row',
//       alignContent:'center',
//       alignItems:'center',
//       justifyContent:'space-between',
//       backgroundColor:"#315A9C", 
//       paddingHorizontal:'5%'
//     }, 
//     btnContainer:{
//       flex:0.33,
//       backgroundColor:"#FFFFFF",
//       borderTopRightRadius:RFValue(20),
//       borderTopLeftRadius:RFValue(20),
//       zIndex:55
//     },
//     icon:{
//       height: RFValue(20),
//       width: RFValue(20),
//     },
//     icon2:{
//       height: RFValue(23),
//       width: RFValue(20),
//     },
//   });
  
  
/** @format */

import { View, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import React, { useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import simpleAlertCall from "../../utils/alerts";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Device from "../../../src/constants/device";
import { logOut } from "../../redux/action"; // Action function

const WIDTH = Dimensions.get("window").width;

export default function SearchAddressScreen({ navigation }) {
  const userData = useSelector((state) => state?.loginDetails);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const logoutFun = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
    dispatch(logOut({}));
  };
  useEffect(() => {
    if (isFocused) {
      if (userData?.hasOwnProperty("Authorization")) {
        Alert.alert("Alert", "Are you sure you wish to log out?", [
          {
            text: "No",
            onPress: () => navigation.navigate("HomeScreen"),
          },
          { text: "Yes", onPress: () => logoutFun() },
        ]);
      }
    }  
    
  }, [isFocused, userData]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});