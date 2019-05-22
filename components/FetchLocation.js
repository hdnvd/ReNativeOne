import React from 'react';
import {Image,StyleSheet,TouchableHighlight} from 'react-native';

const fetchLocation=props=>{

  return (
    <TouchableHighlight onPress={props.onFetchLocation} style={styles.imgContainer} activeOpacity={0.3} underlayColor='#eee'>
    <Image source={require('../images/locate.png')} style={styles.img} resizeMode={'stretch'}/>
</TouchableHighlight>

  );
};

const styles=StyleSheet.create(
{
  imgContainer:{
    position: 'absolute',
    width: 50,
    height: 50,
    bottom:'10%',
    right: '5%',
    backfaceVisibility: 'hidden',
  },
    img:{
      width: '100%',
      height: '100%',
    }
});
export default fetchLocation;
