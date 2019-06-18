/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text,StyleSheet,View,Alert,Image} from 'react-native';
import image from '../images/1.jpg';
import FetchLocation from '../components/FetchLocation'
import SelectorMap from '../components/SelectorMap'
import LogoTitle from '../components/LogoTitle'

export default class SelectLocation extends Component<{}> {
  
  state=
  {
      selectedLocation:{
          latitude: parseFloat(global.SelectedLocation!=null?global.SelectedLocation.latitude:35.6892),
          longitude: parseFloat(global.SelectedLocation!=null?global.SelectedLocation.longitude:51.3890),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
  };

onSelect= () =>
{
    const {goBack} = this.props.navigation;
      goBack();
};
  OnRelocate= () =>
  {
      navigator.geolocation.getCurrentPosition(pos=>{
        this.setState(
          {
            selectedLocation:{
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
          }

        );
      },err=>{
          Alert.alert('error:'+err.message)
      },
    {
      timeout:10000
    });
  };
  onRegionChange= (region) =>
  {
      this.setState(
      {
        selectedLocation:region
      });
  }
  static navigationOptions = {
      headerTitle: null,
    };
  render() {
    return (
      <View>
<SelectorMap selectedLocation={this.state.selectedLocation} navigation={this.props.navigation} onRegionChange={this.onRegionChange} onSelect={this.onSelect}/>
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
    bottom:'5%',
    right: '5%'
  }
}

);
