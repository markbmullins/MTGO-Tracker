import {AsyncStorage} from 'react-native';

export default _storeData = async (key, value) => {
    try {
      console.log("Saving ", key, value);
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
      console.log("Error saving ", key);
      console.log(error);
    }
  };