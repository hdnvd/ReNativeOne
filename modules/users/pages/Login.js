/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet,View,Alert,TextInput,AsyncStorage,Text,NativeModules} from 'react-native';
import LogoTitle from "../../../components/LogoTitle";
import UserMan from "../../../classes/userman";
import Navigation from "../../../classes/navigation";
import { Button } from 'react-native-elements';
import generalStyles from '../../../styles/generalStyles'
import SweetFetcher from "../../../classes/sweet-fetcher";
import Common from "../../../classes/Common";

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
            phone:'',
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
            return (
                <View style={styles.container}>
                    <TextInput placeholder="شماره موبایل" value={this.state.phone} style={styles.input} underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({phone: text});
                    }}/>
                    <Button  title="ارسال کد تایید" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                        const data = new FormData();
                        data.append('phone', this.state.phone);
                        data.append('appName', 'Panel');
                        new SweetFetcher().Fetch('/users/sendverificationcode', SweetFetcher.METHOD_POST, data, data => {
                            alert("کد تایید به شماره موبایل شما ارسال شد.");
                        }, null, 'users', 'sendverificationcode', this.props.history);
                    }}/>

                    <TextInput placeholder="کد تایید" secureTextEntry={true} style={styles.input}  underlineColorAndroid={'transparent'} onChangeText={(text) => {
                    this.setState({Password: text});
                }}/>
                    <View >
                        <View style={{marginTop: '3%'}}>
                            <Button  title="ورود" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                // NativeModules.ActivityStarter.navigateToExample();
                                const data = new FormData();
                                data.append('phone', this.state.phone);
                                data.append('code', this.state.Password);
                                data.append('forceLogin', true);
                                data.append('appName', 'Panel');
                                new SweetFetcher().Fetch('/users/loginbyphone', SweetFetcher.METHOD_POST, data, data => {
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
                                        AsyncStorageObject.push(['access.'+access[key].name,"1"]);
                                    }
                                    AsyncStorage.multiSet(AsyncStorageObject).then(result=>{
                                        console.log("HAAA");
                                        if (data.Data.sessionkey.length > 2)
                                        {
                                            UserMan.SaveToken(data.Data.sessionkey);
                                            this.setState({'token': data.Data.sessionkey});
                                            global.isnewprofile=false;
                                            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('trapp_villaManage'));
                                        }
                                        else
                                            alert("اطلاعات کاربری صحیح نمی باشد.");
                                    }).catch(e=>{
                                        console.log(e);
                                    });

                                },null,'users','load',this.props.history);
                            }}/>
                        </View>
                    </View>
                </View>
            )
        }
        else
        {
            global.isnewprofile=false;
            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('trapp_villaList'));
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
