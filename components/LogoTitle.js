
import React, { Component } from 'react';
import {Text,StyleSheet,View,Alert,Image,TouchableHighlight} from 'react-native';
import Navigation from "../classes/navigation";
class LogoTitle extends Component {
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };
  render() {

  if(this.props.isindex==1) {

      if (global.usertype == 1)
      {
          return (
              <View style={styles.topBar}>
                  <TouchableHighlight onPress={this.props.onReserveListClick} style={styles.imgContainer} activeOpacity={0.3}
                                      underlayColor='#eee'>
                      <Image source={require('../images/reserve.png')} style={styles.img} resizeMode={'stretch'}/>
                  </TouchableHighlight>
                  <Text style={styles.toptext}>Trapp</Text>
                  <TouchableHighlight onPress={this.props.onFindClick} style={[styles.imgContainerRight]}
                                      activeOpacity={0.3} underlayColor='#eee'>
                      <Image source={require('../images/find.png')} style={styles.img} resizeMode={'stretch'}/>
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
    backgroundColor: "#15be29",
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
