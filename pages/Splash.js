/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Alert, TextInput, AsyncStorage, Text, Image} from 'react-native';
import LogoTitle from "../components/LogoTitle";
import UserMan from "../classes/userman";
import Navigation from "../classes/navigation";
import { Button } from 'react-native-elements';
import {NavigationActions} from "react-navigation";

export default class Splash extends Component<{}> {

    static navigationOptions = {
        headerTitle: <LogoTitle />,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // Start counting when the page is loaded

        this.timeoutHandle = setTimeout(()=>{
            // if(global.usertype==1)
            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('Login'));
                // this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('Login'));
            // else if(global.usertype==3)
            //     this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));
        }, 3000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }
    state =
        {
            Password:'',
            email:'',
            token:'',
        };

    render() {

        if(global.usertype!=2)//Not Admin
        {
            return(
                <View style={styles.container}>
                    <Image source={require('../images/LogoWhite.png')} style={styles.img} resizeMode={'stretch'}/>
                    {/*<Text style={styles.centerText}>Travel App</Text>*/}
                </View>
            );
        }
        else
        {
            return(
                <View style={styles.container}>
                    <Image source={require('../images/LogoWhite.png')} style={styles.img} resizeMode={'stretch'}/>
                    {/*<View style={styles.row}>*/}
                    {/*<Button title="کاربر" underlineColorAndroid={'transparent'}  buttonStyle={styles.saveButton}  textStyle={styles.saveButtonText}  onPress={()=>{*/}
                        {/*global.usertype=3;*/}
                        {/*this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));}*/}
                    {/*}/>*/}
                    {/*</View>*/}
                    {/*<View style={styles.row}>*/}
                    {/*<Button title="نماینده" underlineColorAndroid={'transparent'}  buttonStyle={styles.saveButton}  textStyle={styles.saveButtonText} onPress={()=>{*/}
                        {/*global.usertype=1;*/}
                        {/*this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('Login'));*/}
                    {/*}}/>*/}
                    {/*</View><View style={styles.row}>*/}
                    {/*<Button title="مدیر" underlineColorAndroid={'transparent'}  buttonStyle={styles.saveButton}  textStyle={styles.saveButtonText} onPress={()=>{*/}
                        {/*global.usertype=2;*/}
                        {/*this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));}*/}
                    {/*}/>*/}
                {/*</View>*/}
                </View>
            );
        }
        // else
        // {
        //     global.isnewprofile=false;
        //     this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));
        //     // this.props.navigation.navigate('MapPage', {name: 'MapPage'});
        //     return(<View/>);
        // }


    }
}
const styles = StyleSheet.create(
    {
        input:
            {
                fontSize: 17,
                minHeight: 60,
                textAlign:'center',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '70%',

                backgroundColor: "#ffffff",
                borderRadius:30,
                marginTop: '3%',
            },
        container:
            {

                backgroundColor: "#ffffff",
                height:'100%',
                width:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
        img:
            {
                width: 200,
                height: 200,


            },
        centerText:
            {
                color:"#051841",
                fontFamily: 'IRANSansMobile',
                textAlign:'center',
                height:60,

            },
        saveButton:
            {
                borderRadius:30,
                minHeight: 60,
                width:'100%',
                backgroundColor:"#104a69",
                alignSelf:'center',
            },
        saveButtonText:
            {
                fontFamily: 'IRANSansMobile',
                textAlignVertical:'center',
                textAlign:'center',
                paddingVertical: 10,
            },
        row:
            {
                paddingHorizontal: 10,
                paddingVertical:  10,
                flexDirection: 'row-reverse',
            },
    }
);
