/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet,View,Alert,TextInput,AsyncStorage,Text,NativeModules} from 'react-native';
import LogoTitle from "../components/LogoTitle";
import UserMan from "../classes/userman";
import Navigation from "../classes/navigation";
import { Button } from 'react-native-elements';
import generalStyles from '../styles/generalStyles'
import SweetFetcher from "../classes/sweet-fetcher";
import Common from "../classes/Common";

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
            Password:'12345678',
            email:'h@w.com',
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
        // else
        {
            // if(!this.state.displayedMessage)
            // {
            //
            //     Alert.alert("پیام","نمایندگان محترم\n" +
            //         "با درود و آرزوی بهترینها\n" +
            //         "با استفاده از اپلیکیشن (با بیمه) و ثبت مشخصات دقیق بصورت 24 ساعته در دسترس بیمه گذاران خواهید بود\n" +
            //         "با تشکر از همراهی شما");
            //     this.setState({
            //         displayedMessage:true,
            //     });
            // }
            return (
                <View style={styles.container}>
                    <TextInput placeholder="ایمیل" value={"h@w.com"} style={styles.input} underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({email: text});
                    }}/><TextInput placeholder="کلمه عبور" value={"12345678"}  secureTextEntry={true} style={styles.input}  underlineColorAndroid={'transparent'} onChangeText={(text) => {
                    this.setState({Password: text});
                }}/>
                    <View >
                        <View style={{marginTop: '3%'}}>
                            <Button  title="ورود" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                // NativeModules.ActivityStarter.navigateToExample();
                                const data = new FormData();
                                data.append('name', this.state.email);
                                data.append('password', this.state.Password);
                                data.append('forceLogin', true);
                                data.append('appName', 'Panel');
                                new SweetFetcher().Fetch('/users/login', SweetFetcher.METHOD_POST, data, data => {
                                    console.log(data);

                                    let RolePart=['userroles',''];
                                    if(data.Data.roles.empty)
                                        RolePart=['userroles',data.Data.roles[0]];

                                    let AsyncStorageObject=[['sessionkey',data.Data.sessionkey],RolePart];

                                    let access=Common.convertObjectPropertiesToLowerCase(data.Data.access);
                                    let key, keys = Object.keys(access);
                                    let n = keys.length;
                                    while (n--) {
                                        key = keys[n];
                                        console.log('access.'+access[key].name);
                                        AsyncStorageObject.push(['access.'+access[key].name,true]);
                                    }
                                    AsyncStorage.multiSet(AsyncStorageObject).then(result=>{
                                        // alert("hi");
                                        console.log("HAAA");
                                        if (data.Data.sessionkey.length > 2)
                                        {
                                            UserMan.SaveToken(data.Data.sessionkey);
                                            this.setState({'token': data.Data.sessionkey});
                                            global.isnewprofile=false;
                                            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('sas_unitManage'));
                                        }
                                        else
                                            alert("اطلاعات کاربری صحیح نمی باشد.");
                                    }).catch(e=>{
                                        console.log(e);
                                    });

                                    // AsyncStorage.getItem('sessionkey').then((SessionKey)=> {
                                    //     console.log(SessionKey);
                                    // });

                                },null,'users','load',this.props.history);
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
            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('sas_unitList'));
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

                backgroundColor: "#15be29",
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
