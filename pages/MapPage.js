/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, StyleSheet, View, Alert, Image, TouchableHighlight, AsyncStorage,Linking } from 'react-native';
import FetchLocation from '../components/FetchLocation'
import UsersMap from '../components/UsersMap'
import LogoTitle from '../components/LogoTitle'
import generalStyles from '../styles/generalStyles'
import tenaciousFetch from 'tenacious-fetch'
export default class MapPage extends Component<{}> {
    normalFetchConfig = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json charset=UTF-8"
        },
    };
    additionalTenaciousFetchConfig = {
        fetcher: window.fetch,  // Fetch implementation to use, default is window.fetch
        retries: 5,             // Number of retries, default is 1
        retryDelay: 1000 * 3,   // Delay in ms before retrying, default is 1000ms
        factor: .5              // If factor is given, exponential backoff will be performed for retries, otherwise
                                // linear backoff is used
    };
    config = Object.assign({}, this.normalFetchConfig, this.additionalTenaciousFetchConfig);
  state=
  {
      userLocation:{
          latitude: 35.71,
          longitude: 51.40,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        userPlaces:[],
      message:"",
      messageStyle: generalStyles.messageBarHidden,
      messageLink: '',
      token:'',
      isLoadedMessages:false,
  };

  loadPlaces=()=>
  {
      let url="/api/placeman/places";
      if(global.usertype == 2)//Admin
          url="/api/placeman/allplaces";
      // fetch(global.ServerURL+url)
     tenaciousFetch(global.ServerURL+url, this.config)
    .then(res=>res.json())
    .then(parsedRes=>
    {
        const placesArray=[];
        for(const key in parsedRes)
        {
          placesArray.push({
            latitude:parseFloat(parsedRes[key].latitude),
            longitude:parseFloat(parsedRes[key].longitude),
            title:parsedRes[key].title,
              logo:parsedRes[key].logo,
            description:parsedRes[key].description,
              branch_id:parsedRes[key].branch_id,
              isactive:parsedRes[key].isactive,
            id:key
          });
        }
        this.setState({
          userPlaces:placesArray
        });
    })
    .catch(err=>
        console.log(err.message));
  };
  OnRelocate= () =>{
      navigator.geolocation.getCurrentPosition(pos=>{
        this.setState(
          {
            userLocation:{
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },

          }

        );
        this.loadPlaces();
      },err=>{
          Alert.alert("خطا","لطفا مکانیاب گوشی خود را روشن کنید و به اینترنت متصل شوید.");
          console.log(err.message);
      },
    {
      timeout:10000
    });
  };
    OnMessageTouch= () =>{
        if(this.state.messageLink!='')
            Linking.openURL(this.state.messageLink);

        this.setState({messageStyle:generalStyles.messageBarHidden});

    };
    fetchMessage=()=>
    {
        console.log("Token:"+this.state.token);
        const TokenFetchConfig = {
            headers: {
                "Content-Type": "application/json charset=UTF-8",
                'Authorization': 'Bearer '+this.state.token,
            },
        };
        const  configWithToken = Object.assign({}, TokenFetchConfig, this.additionalTenaciousFetchConfig);
        let url="/api/common/messages"+"/"+global.AppVersion;
        tenaciousFetch(global.ServerURL+url, configWithToken)
            .then(res=>res.json())
            .then(parsedRes=> {
                    let messageBarStyle = generalStyles.messageBarHidden;
                    if (parsedRes[0].messagetype == 1)
                        messageBarStyle = generalStyles.messageBarInfo;
                    else if (parsedRes[0].messagetype == 2)
                        messageBarStyle = generalStyles.messageBarSuccess;
                    else if (parsedRes[0].messagetype == 3)
                        messageBarStyle = generalStyles.messageBarError;
                    // alert(parsedRes[0].message+"Message");
                    if (parsedRes[0].displaytype == 1) {
                        this.setState({
                            message: parsedRes[0].message,
                            messageStyle: messageBarStyle,
                            messageLink: parsedRes[0].link,
                            isLoadedMessages: true,
                        });
                    }
                    else {
                        if(parsedRes[0].messagetype>0)
                        Alert.alert("پیام", parsedRes[0].message);
                    }
                }
            )
            .catch(err=>
            {
                console.log("Message Error: \r\nToken:"+this.state.token+" \r\nMessage: "+err.message);
                this.setState({
                    isLoadedMessages:true,
                });
            }
            );
    };
  static navigationOptions =({navigation}) => {
        const {params = {}} = navigation.state;

        return {

            headerLeft: null,
             headerTitle: <LogoTitle isindex={'1'} Profile={params.handleThis} onRechargeClick={params.onRechargeClick} />
        };

    };
    componentDidMount() {
            this.props.navigation.setParams({
                handleThis: ()=>{
                    const { navigate } = this.props.navigation;
                navigate('ManageBranch', { name: 'ManageBranch' });
                },
                onRechargeClick: ()=>{
                    let TransactionID='-1';
                    fetch(global.ServerURL+"/api/financial/recharge/new",
                        {
                            headers: {
                                'Authorization': 'Bearer '+this.state.token,
                            }
                        })
                        .then(res=>res.json())
                        .then(parsedRes=>
                        {
                            // console.log("Get"+parsedRes.transactionid);
                            TransactionID=parsedRes.transactionid;
                            if(TransactionID!='' && TransactionID!='-1' && TransactionID!=null && TransactionID!='-2')
                                Linking.openURL(global.ServerURL+'/financial/recharge/'+TransactionID);
                            else if(TransactionID=='-2')
                                alert("لطفا پس از اتمام اعتبار، از طریق این بخش اعتبار خود را تمدید کنید");
                            else
                                alert("لطفا اتصال اینترنت خود را بررسی کنید");
                        })
                        .catch(err=>
                            {
                                console.log(err.message);
                            }
                        );
                    // console.log("Get"+TransactionID);

                }

            });
            this.loadPlaces();
        AsyncStorage.getItem('token').then((value)=>{if(value=='' || value==null) this.setState({'token':'-1'}); else this.setState({'token':value});});

    }


  render() {
        if(this.state.token!=null && this.state.token!='' && this.state.token!='-1' && !this.state.isLoadedMessages)
            this.fetchMessage();
    return (

      <View>
          <TouchableHighlight style={this.state.messageStyle} onPress = { this.OnMessageTouch }>
          <View>
              <Text style={generalStyles.message}>{this.state.message}</Text>
          </View>
          </TouchableHighlight>
<UsersMap userLocation={this.state.userLocation} userPlaces={this.state.userPlaces} navigation={this.props.navigation}/>
<FetchLocation onFetchLocation={this.OnRelocate} style={styles.locate} />

</View>
    );
  }
}

const styles=StyleSheet.create(
{
  locate:{
    position: 'absolute',
    width: '10%',
    height: '10%',
    top:'5%',
    left: '5%'
  },
}

);
