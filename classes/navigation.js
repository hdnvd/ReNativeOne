import {AsyncStorage,Alert} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
export default class Navigation {
    static resetNavigationAndNavigate = (Destination) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: Destination })],
        });
        return resetAction;

    };
};