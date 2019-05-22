
import React, { Component } from 'react';
import {Text,StyleSheet,View,Alert,Image,TouchableHighlight} from 'react-native';
import Navigation from "../classes/navigation";
class LogoTitle extends Component {
  render() {
  if(this.props.isindex==1) {

      if (global.usertype == 1)
      {
          return (
              <View style={styles.topBar}>
                  <TouchableHighlight onPress={this.props.Profile} style={styles.imgContainer} activeOpacity={0.3}
                                      underlayColor='#eee'>
                      <Image source={require('../images/profile.png')} style={styles.img} resizeMode={'stretch'}/>
                  </TouchableHighlight>
                  <Text style={styles.toptext}>بابیمه</Text>
                  <TouchableHighlight onPress={this.props.onRechargeClick} style={[styles.imgContainerRight]}
                                      activeOpacity={0.3} underlayColor='#eee'>
                      <Image source={require('../images/money.png')} style={styles.img} resizeMode={'stretch'}/>
                  </TouchableHighlight>
              </View>
          );
      }
      else
      {
          return(<View style={styles.topBar}>
              <Text style={styles.toptext}>بابیمه</Text>
          </View>);

      }

  }
    else
    {

        return (
<View style={styles.topBar}>
          <Text style={styles.toptext}>بابیمه</Text>
          </View>
        );
    }
  }
}
const styles=StyleSheet.create(
{
  imgContainer:{
    position: 'absolute',
      height: '50%',
      width: '7%',
    bottom:'5%',
    right: '5%',
    backfaceVisibility: 'hidden',
    left: 0,
    top: 0,
    aspectRatio: 1,
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    marginBottom:10,
  },
    imgContainerRight:{
        position: 'absolute',
        height: '50%',
        width: '7%',
        bottom:'5%',
        right: '1%',
        backfaceVisibility: 'hidden',

        top: 0,
        aspectRatio: 1,
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
    },
  topBar:
  {
    width:'100%',
    height:'100%',
    backgroundColor: "#16a091",
    alignItems: 'center',
    justifyContent: 'center'
  },
  toptext:
  {
    color: "#ffffff",
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'IRANSansMobile'
  },
  img:
  {
    width: '100%',
    height: '100%',


  }
}

);
export default LogoTitle;
