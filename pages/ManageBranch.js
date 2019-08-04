/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text,StyleSheet,View,Alert,Image,TextInput} from 'react-native';
import LogoTitle from '../components/LogoTitle'
import FormView from './Form'
import requestStoragePermission from "../classes/requeststoragepermission";

export default class ManageBranch extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
    global.SampleVar = 'This is Global Variable.';
    global.SelectedLocation = {
        // latitude: 35.71,
        latitude: -1,
        // longitude: 51.40,
        longitude: -1,
      };
      // global.PictureLocation ="/storage/emulated/0/Android/data/com.babimeh/cache/cache_bd.m";
      global.PictureLocation ="";
      global.LicencePictureLocation ="";
requestStoragePermission();
  }
  static navigationOptions = {
      headerTitle: <LogoTitle />,
    };

  render() {
    return (<FormView  navigation={this.props.navigation}/>);
  }
}

const styles=StyleSheet.create(
{
  text:
  {

    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'IRANSansMobile'
  }
}

);
