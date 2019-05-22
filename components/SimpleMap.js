import React from 'react';
import {
  Text,
  StyleSheet,View,Alert
} from 'react-native';
import MapView,{Marker} from 'react-native-maps';

const SimpleMap=props=>{
    // Alert.alert(props.latitude+"");
    const region={
        latitude: props.latitude,
            longitude: props.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
    };
  return (
  <View style={styles.mapContainer}>
  <MapView
   style={styles.map}
    initialRegion={region}
   region={region}


   style={StyleSheet.absoluteFillObject}>
        <Marker
          coordinate={region}
        />
  </MapView>
  </View>
  );
};
const styles=StyleSheet.create(
{
  mapContainer:
  {
    width:'100%',
    height:'100%'
  },
  map:
    {
      width:'100%',
        height:'100%'
    }
}

);
export default SimpleMap;
