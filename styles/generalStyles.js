import {Dimensions, StyleSheet} from "react-native";

let  Window= Dimensions.get('window');
export default StyleSheet.create(
    {
        input:
            {
                fontSize: 12,
                minHeight: 36,
                height:36,
                textAlign:'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '94%',
                marginHorizontal:'2%',
                backgroundColor: "#ffffff",
                borderRadius:5,
                marginTop: '2%',
                borderWidth: 1,
                borderColor:"#15be29"
            },
        inputLabel:
            {
                fontSize: 12,
                textAlign:'right',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '94%',
                marginHorizontal:'2%',
                marginTop: '2%',
            },
        container:
            {
                flex:1,
                flexGrow: 1,
                backgroundColor:"#fcfcfc",

            },
        mapContainer:
            {

                width: '100%',
                height: Window.height/3,
            },
        map:
            {
                width: '100%',
                height: '100%',
            },
        listcontainer:{

            flex:1,
            flexGrow: 1,
            backgroundColor:"#eeeeee",
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
                height: Window.height/5,
            },
        row:
            {
                paddingHorizontal: 10,
                paddingVertical:  10,
                flexDirection: 'row-reverse',
            },

        saveButton:
            {
                borderRadius:5,
                minHeight: 35,
                height: 35,
                width:'84%',
                marginHorizontal:'8%',
                backgroundColor:"#051841",
                alignSelf:'center',
            },
        saveButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical:'center',
                textAlign:'center',
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
                backgroundColor:"#2779ee",
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
                backgroundColor:"#ee5e50",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        messageBarSuccess:
            {
                width: '100%',
                height: '8%',
                backgroundColor:"#25ee7d",
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center'
            },
        message:
            {
                color:"#ffffff",
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 13,
            },
        ListItem: {
            justifyContent: 'center',
            paddingTop: 30,
            paddingHorizontal:10,
            borderRadius: 2,
            backgroundColor:"#ffffff",
            fontFamily: 'IRANSansMobile',
            fontSize: 13,
            direction: 'rtl',
            marginTop:1,
        },
        simplelabel:
            {
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                textAlign:'right',
            },
        listitemthumbnail:
            {
                width:'20%',
                aspectRatio: 1,
                position: 'absolute',
                borderRadius:5,
                left:'1%',

            },
        searchbar:
            {

            },
        searchbarinput:
            {
                fontSize: 12,
                minHeight: 36,
                height:36,
                textAlign:'right',
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
                width:'100%',
                height: 50,
                color: '#000000',
            },
        pickerItem:
            {
                color:"#ffffff",
                fontFamily: 'IRANSansMobile',
            },
        pickerText:
            {
                color:'#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 20,

            }
    }

);
