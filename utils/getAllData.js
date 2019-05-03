import { AsyncStorage } from 'react-native';


export default _getAllData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiGet(keys);
};
