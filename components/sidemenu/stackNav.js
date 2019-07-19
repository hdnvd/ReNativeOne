import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, TouchableOpacity
} from 'react-native';
import { DrawerActions } from 'react-navigation';

import {createStackNavigator, StackNavigator} from 'react-navigation';
import IOSIcon from "react-native-vector-icons/Ionicons";
import trapp_villaownerManage from '../../modules/trapp/pages/villaowner/trapp_villaownerManage'
import trapp_villaList from '../../modules/trapp/pages/villa/trapp_villaList'
import Splash from "../../pages/Splash";
import Login from "../../modules/users/pages/Login";
import trapp_villaReservationInfo from "../../modules/trapp/pages/villa/trapp_villaReservationInfo";
import trapp_orderList from "../../modules/trapp/pages/order/trapp_orderList";
import trapp_villaManage from "../../modules/trapp/pages/villa/trapp_villaManage";
import placeman_placeManage from "../../modules/placeman/pages/place/placeman_placeManage";
import placeman_placeView from "../../modules/placeman/pages/place/placeman_placeView";
import placeman_placeList from "../../modules/placeman/pages/place/placeman_placeList";
import placeman_placePhotoManage from "../../modules/placeman/pages/placephoto/placeman_placephotoManage";
import trapp_villaownerList from "../../modules/trapp/pages/villaowner/trapp_villaownerList";
import trapp_villaownerView from "../../modules/trapp/pages/villaowner/trapp_villaownerView";
import trapp_villaView from "../../modules/trapp/pages/villa/trapp_villaView";
import trapp_villaReserve from "../../modules/trapp/pages/villa/trapp_villaReserve";
import sas_unitList from "../../modules/sas/pages/unit/sas_unitList";
import sas_unitManage from "../../modules/sas/pages/unit/sas_unitManage";
import MapPage from "../../pages/MapPage";
import posts__posts_postManage from "../../modules/posts/pages/post/posts_postManage";
import DisplayPlace from "../../pages/DisplayPlace";
import ManageBranch from "../../pages/ManageBranch";
import SelectLocation from "../../pages/SelectLocation";
import PlaceVerification from "../../pages/PlaceVerification";
import LogoTitle from "../LogoTitle";
import Common from "../../classes/Common";
const navOptions =({navigation}) => {
    return {
        headerLeft: null,
        headerTitle: <LogoTitle onNavigationClick={() => {
            // alert("opening");
            navigation.dispatch(DrawerActions.openDrawer());
        }}/>
    };

};

const navOptionsWithNoMenu =({navigation}) => {
    return {
        headerTitle: <LogoTitle hideMenu={true}/>
    };

};
const PageToRoute=(InitialRoute,theObject)=>
{
    let key, keys = Object.keys(theObject);
    let n = 0;
    let resultArray=InitialRoute;
    while (n<keys.length) {
        key = keys[n];
        resultArray[key]={screen:theObject[key],navigationOptions:navOptions};
        n++;
    }
    return resultArray;
};
let initialRoute={
    Splash:{screen:Splash,navigationOptions:navOptionsWithNoMenu},
    Login:{screen:Login,navigationOptions:navOptionsWithNoMenu},
    trapp_villaownerManage: {screen:trapp_villaownerManage,navigationOptions:navOptionsWithNoMenu},
    trapp_villaManage: {screen:trapp_villaManage,navigationOptions:navOptionsWithNoMenu},
    placeman_placeManage: {screen:placeman_placeManage,navigationOptions:navOptionsWithNoMenu},
};
const Pages={
    trapp_villaReservationInfo: trapp_villaReservationInfo,
    trapp_orderList: trapp_orderList,
    placeman_placeView:  placeman_placeView,
    placeman_placeList:  placeman_placeList,
    placeman_placePhotoManage:  placeman_placePhotoManage,
    trapp_villaownerList:  trapp_villaownerList,
    trapp_villaownerView:  trapp_villaownerView,
    trapp_villaView: trapp_villaView,
    trapp_villaReserve:  trapp_villaReserve,
    trapp_villaList:  trapp_villaList,
    sas_unitList:  sas_unitList,
    sas_unitManage: sas_unitManage,
    MapPage:  MapPage,
    posts__posts_postManage: posts__posts_postManage,
    DisplayPlace:  DisplayPlace,
    ManageBranch:  ManageBranch,
    SelectLocation:  SelectLocation,
};
let Routes=PageToRoute(initialRoute,Pages);
// console.log(Routes);
const stackNav =StackNavigator(Routes);

export default stackNav;
