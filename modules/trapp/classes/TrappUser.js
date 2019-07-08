// @flow


import SweetFetcher from "../../../classes/sweet-fetcher";
import {AsyncStorage} from "react-native";
import Navigation from "../../../classes/navigation";

export default class TrappUser {

    static navigateToUserStartPage(navigation) {
        AsyncStorage.getItem('userroles').then((roles) => {
            console.log("Role:" + roles);
            if (roles == 'trapp_user')
            {
                console.log("trapp_user:" + roles);
                navigation.dispatch(Navigation.resetNavigationAndNavigate('trapp_villaList'));
            }

            else if (roles == 'trapp_villaowner') {
                console.log("trapp_villaowner:" + roles);
                TrappUser.getUserFullInfo((data => {
                    let {places, villas} = data;
                    if (places == null || places.length == 0)
                        navigation.dispatch(Navigation.resetNavigationAndNavigate('placeman_placeManage'));
                    else if (villas == null || villas.length == 0)
                        navigation.dispatch(Navigation.resetNavigationAndNavigate('trapp_villaManage'));
                    else
                    {
                        global.itemID=villas[0].id;
                        navigation.dispatch(Navigation.resetNavigationAndNavigate('trapp_villaReservationInfo'));
                    }
                }));
            }
        });

    }

    static getUserFullInfo(onInfoLoaded) {
        new SweetFetcher().Fetch('/trapp/userfullinfo', SweetFetcher.METHOD_GET, null, data => {
            onInfoLoaded(data.Data);
        });
    }
}

