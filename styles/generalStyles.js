import {StyleSheet} from "react-native";

export default StyleSheet.create(
    {
        container:
            {
                flex:1,
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
                height: '20%',
            },
        row:
            {
                paddingHorizontal: 10,
                paddingVertical:  10,
                flexDirection: 'row-reverse',
            },

        saveButton:
            {
                borderRadius:30,
                minHeight: 60,
                width:'100%',
                backgroundColor:"rgba(92, 99,216, 1)",
                alignSelf:'center',
            },
        saveButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical:'center',
                textAlign:'center',
                paddingVertical: 10,
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
    }

);
