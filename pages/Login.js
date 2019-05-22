/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet,View,Alert,TextInput,AsyncStorage,Text} from 'react-native';
import LogoTitle from "../components/LogoTitle";
import UserMan from "../classes/userman";
import Navigation from "../classes/navigation";
import { Button } from 'react-native-elements';
import {NavigationActions} from "react-navigation";
import generalStyles from '../styles/generalStyles'

export default class Login extends Component<{}> {

    static navigationOptions = {
        headerTitle: <LogoTitle />,
    };
    constructor(props) {
        super(props);
    }
    componentDidMount=()=>{

        // UserMan.SaveToken('');
        AsyncStorage.getItem('token').then((value)=>{if(value=='' || value==null) this.setState({'token':'-1'}); else this.setState({'token':value});});

    };
    state =
        {
            Password:'',
            email:'',
            token:'',
            displayedMessage:false,
        };

    render() {
        // UserMan.LoadToken();
        if(this.state.token=='')
        {
            return(
                <View style={styles.container}>
                    <Text>در حال بررسی اطلاعات کاربری...</Text>
                </View>
            );
        }
        else if(this.state.token=='-1')
        {
            if(!this.state.displayedMessage)
            {

                Alert.alert("پیام","نمایندگان محترم\n" +
                    "با درود و آرزوی بهترینها\n" +
                    "با استفاده از اپلیکیشن (با بیمه) و ثبت مشخصات دقیق بصورت 24 ساعته در دسترس بیمه گذاران خواهید بود\n" +
                    "با تشکر از همراهی شما");
                this.setState({
                    displayedMessage:true,
                });
            }
            return (
                <View style={styles.container}>
                    <TextInput placeholder="ایمیل" style={styles.input} underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({email: text});
                    }}/><TextInput placeholder="کلمه عبور" secureTextEntry={true} style={styles.input}  underlineColorAndroid={'transparent'} onChangeText={(text) => {
                    this.setState({Password: text});
                }}/>
                    <View >
                        <View style={{marginTop: '3%'}}>
                            <Button  title="ورود" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                const data = new FormData();
                                data.append('password', this.state.Password);
                                data.append('name', this.state.email);
                                fetch(global.ServerURL + "/api/users/login", {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                    },
                                    body: data
                                })
                                    .then(res=>res.json())
                                    .then(res => {
                                        console.log(res);
                                        if (res.hasOwnProperty('success')) {
                                            UserMan.SaveToken(res.success.token);
                                            this.setState({'token': res.success.token});
                                            global.isnewprofile=false;
                                            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));
                                        }
                                        else
                                        {
                                            UserMan.SaveToken('-1');
                                            Alert.alert("ایمیل و رمز عبور صحیح نمی باشد.");
                                        }
                                    }).catch(function (error) {
                                    Alert.alert(error.message);
                                    throw error;
                                });
                            }}/>
                        </View>
                        <View  style={{marginTop: '3%'}}>
                            <Button  title="ثبت نام نمایندگی" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                global.isnewprofile=true;
                                this.props.navigation.navigate('ManageBranch', { name: 'ManageBranch' });
                            }}/>
                        </View>
                    </View>


                </View>

            )
        }
        else
        {
            global.isnewprofile=false;
            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));
            // this.props.navigation.navigate('MapPage', {name: 'MapPage'});
            return(<View/>);
        }


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

                backgroundColor: "#16a091",
                height:'100%',
                width:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
        inputLabel:
            {
                lineHeight: 40,
                fontSize: 17,
                minHeight: 40,
                direction: 'rtl',
                textAlign: 'right',
                fontFamily: 'IRANSansMobile',
            },


    }
);
