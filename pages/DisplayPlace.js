/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, StyleSheet, View, Alert, Image, ScrollView, Dimensions, TouchableHighlight} from 'react-native';
import SimpleMap from '../components/SimpleMap'
import LogoTitle from '..//components/LogoTitle'
import generalStyles from '../styles/generalStyles'
import RNFileSelector from "react-native-file-selector";
import {Button} from "react-native-elements";
export default class DisplayPlace extends Component<{}> {
  static navigationOptions = {
      headerTitle: <LogoTitle />,
    };
    state=
        {
            branchInfo:{
                id: -1,
                title: "",
                tel: "",
                email: "",
                address: "",
                isactive: -1,
                fundationyear: 0,
                code: 0,
                photourl: "",
                company_id: -1,
                area_id: -1,
                place_id:-1,
                branchadmin_id: -1,
                latitude:-1,
                longitude: -1,
            },
        };
    constructor(props) {
        super(props);
        this.loadBranchInfo();
    }
    Window= Dimensions.get('window');
  loadBranchInfo=()=>
  {
      fetch(global.ServerURL+"/api/placeman/branches/"+global.itemID)
          .then(res=>res.json())
          .then(parsedRes=>
          {
              this.setState({
                  branchInfo:{
                      id: parsedRes['branch'].id,
                      title: parsedRes['company'].title + " " +parsedRes['branch'].title,
                      tel: parsedRes['branch'].tel,
                      email: parsedRes['branch'].email,
                      address: parsedRes['branch'].address,
                      isactive: parsedRes['branch'].isactive,
                      fundationyear: parsedRes['branch'].fundationyear,
                      code: parsedRes['branch'].code,
                      photourl: parsedRes['branch'].photourl,
                      company_id: parsedRes['branch'].company_id,
                      area_id: parsedRes['branch'].area_id,
                      place_id: parsedRes['branch'].place_id,
                      branchadmin_id: parsedRes['branch'].branchadmin_id,
                      latitude:parseFloat(parsedRes['place'].latitude),
                      longitude:parseFloat(parsedRes['place'].longitude),
                  },
              });
          })
          .catch(err=>Alert.alert("Error"+err.message));
  };

  render() {
let activationButtons=<View/>;
if(global.usertype==2)
    activationButtons=<View style={styles.row}>
        <Button title="فعال سازی" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
            let url=global.ServerURL+"/api/placeman/placeactivation/"+this.state.branchInfo.id+"/1";
            fetch(url)
                .then(res=>res.json())
                .then(parsedRes=>
                {
                    Alert.alert("پیام",parsedRes.message);
                })
                .catch(err=>console.log("Error"+err.message+" "+url));
        }}/>
    </View>;
    return (
      <View style={{flexGrow : 1}}  >
      <ScrollView contentContainerStyle={{minHeight: this.Window.height}} >
        <View>
      <Image style={styles.topimage} source={{uri: global.ServerURL+"/"+this.state.branchInfo.photourl}}/>
      <Text style={styles.text}>{this.state.branchInfo.title}</Text>
      <Text style={styles.text}>شعبه {this.state.branchInfo.code}</Text>
      <View style={styles.row}>
      <Text style={styles.caption}>تلفن: </Text>
      <Text style={styles.content}>{this.state.branchInfo.tel}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.caption}>آدرس: </Text>
      <Text style={styles.content}>{this.state.branchInfo.address}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.caption}>ایمیل: </Text>
      <Text style={styles.content}>{this.state.branchInfo.email}</Text>
      </View>
            {activationButtons}


            <View style={styles.cautionContainer}>
                <Image source={require('..//images/police.png')} style={styles.cautionImage} resizeMode={'stretch'}/>
                <Text style={styles.cautionTitle}>هشدار مهم برای امنیت معامله</Text>
                <Text style={styles.cautionText}>لطفا سفارش را فقط به صورت حضوری انجام دهید و پیش از آن هیچ مبلغی را واریز نکنید.</Text>
            </View>
            <View style={styles.mapContainer}>
              <SimpleMap style={styles.map} latitude={this.state.branchInfo.latitude} longitude={this.state.branchInfo.longitude} />
            </View>

          </View>
        </ScrollView>
        </View>
    );
  }
}

let  Window= Dimensions.get('window');
const styles=StyleSheet.create(
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
      height: Window.height/5,
    },
    row:
    {
paddingHorizontal: 10,
paddingVertical:  10,
    flexDirection: 'row-reverse',
    },
    map:
    {
      width: '100%',
      height: '100%',
    },
    mapContainer:
    {

        width: '100%',
        height: Window.height/3,
    },
    ScrollView:
    {
                  backgroundColor: 'gray',
    },
    cautionContainer:
        {
            alignItems:'center',
            width:'100%',
            backgroundColor:"#eee88f",
            paddingVertical: 10,
            paddingHorizontal: 10,
        },
    cautionTitle:
        {

            fontFamily: 'IRANSansMobile',
            textAlign:'center',
        },
    cautionText:
        {

            fontFamily: 'IRANSansMobile',
            textAlign:'center',
        },
    cautionImage:
        {
            width:80,
            height:100,
        }
}

);
