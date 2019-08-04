import {Dimensions, StyleSheet} from "react-native";
import { NativeModules, Platform } from 'react-native'
import Constants from "../classes/Constants";
import Localization from "../classes/Localization";
//OS
const isIOS = Platform.OS === 'ios';

// lang:
const lang = isIOS ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        listTopBar:
            {
                backgroundColor:'#ffffff',
                height:40,
                flexDirection:'row'
            },

        listTopBarItem:
            {
                width:Window.width/2,
                height:40,
                backgroundColor:'#ffffff',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.4,
                borderColor: '#afafaf',
                flexDirection:'row',
            },
        listTopBarItemIcon:
            {
                width:20,
                height:20,
            },
        listTopBarItemButtonIcon:
            {
                width:15,
                height:15,
            },

        listTopBarItemButtonIconContainerSelected:
            {
                width:27,
                height:27,
                // backgroundColor:"#15be29",
                borderRadius:3,
                paddingHorizontal:4,
                paddingVertical:4,
                borderWidth: 2,
                borderColor: '#15be29',
                marginHorizontal:3,
            },
        listTopBarItemButtonIconContainer:
            {
                width:25,
                height:25,
                // backgroundColor:"#15be29",
                borderRadius:3,
                paddingHorizontal:4,
                paddingVertical:4,
                marginHorizontal:3,
            },
        listTopBarItemText:
            {

                direction: 'rtl',
                marginHorizontal:3,
                fontFamily: 'IRANSansMobile',
            },
        profilePicture:
            {
                position:'relative',
                right:0,
                width: Window.width/4,
                height: Window.width/3,
            },
        topimagelistitem:
            {
              width:Window.width,
                height:Window.width/2,
            },
        marker:
            {
                width:10,
                height:10,
                marginVertical: 20,
            },
        drawerTopImage:
            {
                width:Window.width*0.4,
                height:Window.width*0.3,
            },
        photomanagephoto:
            {
                width: Window.width/2-Window.width/50,
                height: Window.width/2-Window.width/50,
                borderRadius: 10,
                zIndex:2,
            },
        photomanagedeleteicon:
            {
                width: Window.width/13,
                height:  Window.width/13,
            },
        photomanagedeleteiconcontainer:{
            width: Window.width/13,
            height:  Window.width/13,
            position: 'absolute',
            right:Window.width/35,
            top:Window.width/35,
            zIndex:3,
        },
        photomanagephotocontainer:
            {
                width: Window.width/2,
                height: Window.width/2,
                // backgroundColor:'#ee00ee',
                paddingVertical: Window.width/100,
                paddingHorizontal:Window.width/100,
            },
        input:
            {
                fontSize: 12,
                minHeight: 36,
                height: 36,
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '94%',
                marginHorizontal: '2%',
                backgroundColor: "#ffffff",
                borderRadius: 5,
                marginTop: '2%',
                borderWidth: 1,
                borderColor: "#15be29"
            },
        inputLabel:
            {
                fontSize: 12,
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '94%',
                marginHorizontal: '2%',
                marginTop: '2%',
            },
        container:
            {
                flex: 1,
                flexGrow: 1,
                backgroundColor: "#fcfcfc",

            },
        containerWithNoBG:
            {
                flex: 1,
                flexGrow: 1,

            },
        mapContainer:
            {

                width:Window.width,
                height: Window.height / 3,

            },
        map:
            {
                width: '100%',
                height: '100%',
            },
        listcontainer: {

            flex: 1,
            flexGrow: 1,
        },
        text:
            {

                textAlign: 'center',
                fontSize: 20,
                fontFamily: 'IRANSansMobile',
            },
        caption:
            {

                textAlign: 'right',
                fontSize: 18,
                fontWeight: '400',
                fontFamily: 'IRANSansMobile',
                color:'#ffffff',
            },
        content:
            {

                textAlign: 'right',
                fontSize: 18,
                fontFamily: 'IRANSansMobile',
                width: '85%',
                color:'#ffffff',
            },
        topimage:
            {

                width: '100%',
                height: Window.height / 5,
            },
        row:
            {
                paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: Localization.getRowReverseDirection(),
            },

        saveButton:
            {
                borderRadius: 5,
                minHeight: 35,
                height: 35,
                width: '84%',
                marginHorizontal: '8%',
                backgroundColor: "#051841",
                alignSelf: 'center',
            },
        SweetButton:
            {
                borderRadius: 8,
                minHeight: 45,
                height: 45,
                width: Window.width * 0.50,
                marginHorizontal: '8%',
                marginVertical: 5,
                backgroundColor: "#051841",
                alignSelf: 'center',
            },
        SweetButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical: 'center',
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 13,
                color: '#ffffff',
                height: '100%'
            },
        SweetButtonWaitDialogContainer:
            {
                height: '100%'
            },
        SweetButtonWaitDialog:
            {
                // height:'100%',
                paddingVertical: 10,
            },
        saveButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical: 'center',
                textAlign: 'center',
                paddingVertical: 10,
                fontSize: 13,
                color: '#ffffff',
            },
        cautionContainer:
            {

                fontFamily: 'IRANSansMobile',
                paddingVertical: 10,
                paddingHorizontal: 10,
            },

        messageBarInfo:
            {
                width: '100%',
                height: '8%',
                backgroundColor: "#2779ee",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        messageBarHidden:
            {
                width: 0,
                height: 0,
            },
        messageBarError:
            {
                width: '100%',
                height: '8%',
                backgroundColor: "#ee5e50",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        messageBarSuccess:
            {
                width: '100%',
                height: '8%',
                backgroundColor: "#15be29",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        message:
            {
                color: "#ffffff",
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 13,
            },
        ListItem: {
            justifyContent: Localization.getFlexStart(),
            paddingTop: 30,
            flexDirection:Localization.getRowReverseDirection(),
            flexWrap:'wrap',
            paddingHorizontal: 10,
            borderRadius: 5,
            backgroundColor: "#ffffff",
            marginHorizontal:3,
            marginBottom:10,
            shadowColor: "#565656",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
        },
        simplelabel:
            {
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                textAlign: 'right',
            },
        listitemthumbnail:
        Localization.isPhoneRTL()?{
            width: Window.width*0.40,
            aspectRatio: 1,
            position: 'absolute',
            borderRadius: 20,
            left:10,
            top:30,
            borderWidth: 5,
            borderColor: '#15be29',
        }:
            {
                width: Window.width*0.40,
                aspectRatio: 1,
                position: 'absolute',
                borderRadius: 20,
                right:10,
                top:30,
                borderWidth: 5,
                borderColor: '#15be29',
            },
        searchbar:
            {},
        searchbarinput:
            {
                fontSize: 12,
                minHeight: 36,
                height: 36,
                textAlign: 'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '100%',
                backgroundColor: "#ffffff",
            },
        select:
            {
                lineHeight: 40,
                fontSize: 17,
                minHeight: 40,
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                width: '100%',
                height: 50,
                color: '#000000',
            },
        pickerItem:
            {
                color: "#ffffff",
                fontFamily: 'IRANSansMobile',
            },
        pickerText:
            {
                color: '#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 20,

            },
        IconItemStyle:
            {
                width:Window.width/5,
                height:Window.width/5,
                backgroundColor:'rgba(167,236,131,0.8)',
                borderRadius:Window.width/10,
                marginVertical:Window.width*0.02,
                marginHorizontal:Window.width/17,
                paddingHorizontal:Window.width/25,
                paddingVertical:Window.width/25,
                shadowColor: "#232323",
                shadowOffset: {
                    width: -3,
                    height: 4,
                },
                shadowOpacity: 0.9,
                shadowRadius: 2.22,
            },
        IconItemLogo:
            {
                width:Window.width*0.09,
                height:Window.width*0.09,
                marginHorizontal:Window.width*0.015,

            },
        IconItemContent:
            {
                color: '#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 10,
            },
        IconItemTitle:
            {
                color: '#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 10,
            },
        datepickercontainer:
            {
                maxHeight: Window.height*0.4,
                height:Window.height*0.4,
                backgroundColor: '#b5b5b6',
                borderRadius:10,
                padding: 20,
                marginVertical: 7,
                marginHorizontal: 7,
            },fulldatecontainer:
            {
                backgroundColor:'#ee0'
            },
        datepickertext:
            {
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
            },
        ItemLogo:
            {
                height: Window.width*0.07,
                width: Window.width*0.07,
                marginHorizontal:Window.width*0.01,
                position: 'relative',
                right: 0,
            },
    }
);
