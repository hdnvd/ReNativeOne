import {Dimensions, StyleSheet} from "react-native";

let Window = Dimensions.get('window');
export default StyleSheet.create(
    {
        listTopBar:
            {
                backgroundColor:'#ffffff',
                height:40,
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
        mapContainer:
            {

                width: '100%',
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
            backgroundColor: "#eeeeee",
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
            },
        content:
            {

                textAlign: 'right',
                fontSize: 18,
                fontFamily: 'IRANSansMobile',
                width: '85%',
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
                flexDirection: 'row-reverse',
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
            justifyContent: 'center',
            paddingTop: 30,
            paddingHorizontal: 10,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            fontFamily: 'IRANSansMobile',
            fontSize: 13,
            direction: 'rtl',
            marginTop: 1,
        },
        simplelabel:
            {
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                textAlign: 'right',
            },
        listitemthumbnail:
            {
                width: Window.width*0.3,
                aspectRatio: 1,
                position: 'absolute',
                borderRadius: 5,
                left: '1%',

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

            }
    }
);
