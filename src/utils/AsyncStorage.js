import AsyncStorage from "@react-native-async-storage/async-storage";

export async function SaveStorageItems(key, data, needCallBack, callBack) {
  AsyncStorage.setItem(key, data);
  if (needCallBack == 1) {
    var homeData = await AsyncStorage.getItem(key);
    homeData = JSON.parse(homeData);
    callBack(homeData);
  } else {
    callBack("Data Save successfully.");
  }
}

export async function GetStorageItems(key, callBack) {
  var homeData = await AsyncStorage.getItem(key);
  homeData = JSON.parse(homeData);
  callBack(homeData);
}

export async function EmptyStorage() {
  await AsyncStorage.clear();
}
