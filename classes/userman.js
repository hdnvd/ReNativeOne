import {AsyncStorage,Alert} from "react-native";
export default class UserMan {
    static SaveToken = (token) => {
        try {
            // Alert.alert("AAA");
            AsyncStorage.setItem('token', token);
            // Alert.alert(token);
        } catch (error) {
            console.log(error);
        }
    };
};