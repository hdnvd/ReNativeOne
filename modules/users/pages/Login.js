/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    TextInput,
    AsyncStorage,
    Text,
    NativeModules,
    TouchableOpacity,
    Linking
} from 'react-native';
import LogoTitle from "../../../components/LogoTitle";
import UserMan from "../../../classes/userman";
import Navigation from "../../../classes/navigation";
import {Button, CheckBox} from 'react-native-elements';
import generalStyles from '../../../styles/generalStyles'
import SweetFetcher from "../../../classes/sweet-fetcher";
import Common from "../../../classes/Common";
import Constants from "../../../classes/Constants";
import TrappUser from "../../trapp/classes/TrappUser";
import SweetButton from "../../../sweet/components/SweetButton";
import SweetCheckBox from "../../../sweet/components/SweetCheckBox";

export default class Login extends Component<{}> {
    LOGINTYPE_NOTASKED=1;
    LOGINTYPE_LOGIN=2;
    LOGINTYPE_REGISTER=3;
    LOGINTYPE_CODESENT=4;
    static navigationOptions = {
        headerTitle: <LogoTitle hideMenu={true}/>,
    };
    constructor(props) {
        super(props);
    }
    openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                console.log("Don't know how to open URI: " + URL);
            }
        });
    };
    componentDidMount=()=>{

        // UserMan.SaveToken('');
        AsyncStorage.getItem('token').then((value)=>{if(value=='' || value==null) this.setState({'token':'-1'}); else this.setState({'token':value});});

    };
    state =
        {
            loginType:this.LOGINTYPE_NOTASKED,
            Password:'',
            phone:'',
            token:'',
            name:'',
            displayedMessage:false,
            checkedTerms:false,
        };

    render() {
        // UserMan.LoadToken();
        if(this.state.token=='')
        {
            return(
                <View style={styles.container}>
                    <Text style={{fontFamily:"IRANSansMobile"}}>در حال بررسی اطلاعات کاربری...</Text>
                </View>
            );
        }
        else if(this.state.token=='-1')
        {
            return (
                <View style={styles.container}>
                    {this.state.loginType === this.LOGINTYPE_NOTASKED &&
                    <View style={styles.container}>
                        <SweetButton title="ورود" onPress={(OnEnd) => {
                            OnEnd(true);
                            this.setState({loginType:this.LOGINTYPE_LOGIN});
                        }
                        }/>
                        <SweetButton title="ثبت نام" onPress={(OnEnd) => {
                            OnEnd(true);
                            this.setState({loginType:this.LOGINTYPE_REGISTER});
                        }
                        }/>
                    </View>
                    }
                    {(this.state.loginType === this.LOGINTYPE_REGISTER || this.state.loginType === this.LOGINTYPE_LOGIN) &&
                        <View style={styles.container}>
                    {this.state.loginType === this.LOGINTYPE_REGISTER &&
                    <TextInput placeholder="نام کامل" value={this.state.name} style={styles.input}
                               underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({name: text});
                    }}/>
                    }
                        <TextInput placeholder="شماره موبایل" value={this.state.phone} style={styles.input} underlineColorAndroid={'transparent'} onChangeText={(text) => {
                        this.setState({phone: text});
                    }}/>
                            {this.state.loginType === this.LOGINTYPE_REGISTER &&

                            <View flexDirection={'column'} >
                            <SweetCheckBox
                                title='قوانین و مقررات سامانه را خوانده و می پذیرم'
                                iconType='font-awesome'
                                checkedIcon='check-square'
                                uncheckedIcon='square'
                                uncheckedColor='#cccccc'
                                checkedColor='#ffffff'
                                style={{
                                    direction:'rtl',
                                    marginVertical: 15,
                                }}
                                textStyle={{
                                    color:'#ffffff',
                                    fontFamily: 'IRANSansMobile',
                                marginHorizontal: 10}}
                                checked={this.state.checkedTerms}
                                onPress={()=>{this.setState({checkedTerms:!this.state.checkedTerms})}}
                            />
                                <TouchableOpacity onPress={()=> {

                                    this.openURL(Constants.SiteURL+"/Terms");
                                }}>
                                    <Text style={{
                                        color:'#fcfcfc',
                                        fontFamily: 'IRANSansMobile',
                                        direction:'rtl',
                                        textAlign:'center',
                                        marginBottom: 15,
                                    }}>(قوانین و مقررات)</Text>
                                </TouchableOpacity>
                            </View>
                            }
                        <SweetButton title="ارسال کد تایید" onPress={(onEnd) => {
                            let FormIsValid = true;
                            let invalidFormMessage = "";
                            if (this.state.loginType === this.LOGINTYPE_REGISTER) {
                                if (!this.state.checkedTerms) {
                                    FormIsValid = false;
                                    invalidFormMessage = 'برای ثبت نام باید قوانین و مقررات سامانه را بپذیرید.';
                                }
                                if (this.state.name.length<3) {
                                    FormIsValid = false;
                                    invalidFormMessage = 'برای ثبت نام وارد کردن نام کامل اجباری می باشد';
                                }
                            }
                            if (this.state.phone.length!==11) {
                                FormIsValid = false;
                                invalidFormMessage = 'لطفا شماره تلفن همراه خود را به طور کامل وارد نمایید';
                            }
                            if (!FormIsValid) {
                                Alert.alert('خطا', invalidFormMessage);
                                onEnd(false);
                            }
                            else {
                                const data = new FormData();
                                data.append('phone', this.state.phone);
                                data.append('name', this.state.name);
                                data.append('appName', Constants.AppName);
                                data.append('role', Constants.DefaultRole);
                                new SweetFetcher().Fetch('/users/sendverificationcode', SweetFetcher.METHOD_POST, data, data => {
                                    Alert.alert('پیام', "کد تایید به شماره موبایل شما ارسال شد.");
                                    this.setState({loginType: this.LOGINTYPE_CODESENT});
                                    onEnd(true);
                                }, (error) => {
                                    Alert.alert('پیام', "خطایی در ارسال کد بوجود آمد");
                                    onEnd(false)
                                }, 'users', 'sendverificationcode', this.props.history);

                            }
                        }
                        }/>
                        </View>
                    }
                    {this.state.loginType === this.LOGINTYPE_CODESENT &&
                    <View style={styles.container}>
                        <TextInput placeholder="کد تایید" secureTextEntry={true} style={styles.input}
                                   underlineColorAndroid={'transparent'} onChangeText={(text) => {
                            this.setState({Password: text});
                        }}/>
                        <View>
                            <View>
                                <SweetButton title="ورود" onPress={(OnEnd) => {
                                    // NativeModules.ActivityStarter.navigateToExample();
                                    const data = new FormData();
                                    data.append('phone', this.state.phone);
                                    data.append('name', this.state.name);
                                    data.append('code', this.state.Password);
                                    data.append('forceLogin', true);
                                    data.append('appName', Constants.AppName);
                                    data.append('role', Constants.DefaultRole);
                                    new SweetFetcher().Fetch('/users/loginbyphone', SweetFetcher.METHOD_POST, data, data => {
                                        console.log(data);

                                        let RolePart = ['userroles', ''];
                                        if (!data.Data.roles.empty)
                                            RolePart = ['userroles', data.Data.roles[0]];

                                        let AsyncStorageObject = [['sessionkey', data.Data.sessionkey], RolePart];

                                        let access = Common.convertObjectPropertiesToLowerCase(data.Data.access);
                                        let key, keys = Object.keys(access);
                                        let n = keys.length;
                                        while (n--) {
                                            key = keys[n];
                                            console.log('access.' + access[key].name);
                                            AsyncStorageObject.push(['access.' + access[key].name, "1"]);
                                        }
                                        AsyncStorage.multiSet(AsyncStorageObject).then(result => {
                                            console.log("HAAA");
                                            if (data.Data.sessionkey.length > 2) {
                                                UserMan.SaveToken(data.Data.sessionkey);
                                                this.setState({'token': data.Data.sessionkey});
                                                global.isnewprofile = false;
                                                OnEnd(true);
                                                TrappUser.navigateToUserStartPage(this.props.navigation);
                                            }
                                            else
                                                Alert.alert('خطا', "اطلاعات کاربری صحیح نمی باشد.");
                                            OnEnd(false);
                                        }).catch(e => {
                                            console.log(e);
                                            OnEnd(false);
                                        });

                                    }, (error) => {

                                        OnEnd(false);
                                        console.log(error);
                                    }, 'users', 'load', this.props.history);

                                }}/>
                            </View>
                        </View>
                    </View>
                    }
                </View>
            )
        }
        else
        {
            global.isnewprofile=false;
            TrappUser.navigateToUserStartPage(this.props.navigation);
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
