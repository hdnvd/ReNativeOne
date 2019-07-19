import React from 'react';
import {
    Text,
    StyleSheet, View, Alert, Image
} from 'react-native';
import MapView,{Marker,Circle} from 'react-native-maps';
import generalStyles from "../styles/generalStyles";

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
      {props.blured &&
        <Circle
            center={region}
            radius={150}
            strokeWidth={3}
            strokeColor={"#128421"}
            fillColor={'rgba(21, 190, 41, 0.5)'}

        />
      }
      {!props.blured &&
      <Marker
          coordinate={region}
      />
      }
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
