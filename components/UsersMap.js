import React from 'react';
import {
    Text,
    StyleSheet, View, Alert, Image, TouchableHighlight
} from 'react-native';
import MapView,{Marker} from 'react-native-maps';

const usersMap=props=>{
const { navigate } = props.navigation;
var userMarkers=<Text></Text>;
  var region={
    latitude: 35.71,
    longitude: 51.40,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  if(props.userLocation!=null)
  region=props.userLocation;

if(props.userPlaces!=null) userMarkers=props.userPlaces.map(userPlace=>{
        let color="#1a4e94";
        if(userPlace.isactive=="0")
            color="#ee5452";
        return <MapView.Marker coordinate={{
            latitude: userPlace.latitude,
            longitude: userPlace.longitude,
        }} key={userPlace.branch_id} title={userPlace.title} pinColor={color} description={userPlace.description} onCalloutPress={()=>{
            global.itemID=userPlace.branch_id;
            if(global.usertype==2)//Admin
                navigate('PlaceVerification',{ name: 'PlaceVerification'});
            else
                navigate('DisplayPlace', { name: 'DisplayPlace' });
        }}/>
}

);
  return (
  <View style={styles.mapContainer}>
  <MapView
   style={styles.map}
    initialRegion={{
      latitude: 35.71,
      longitude: 51.40,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }}
   showsUserLocation={true}
   loadingEnabled={true}
  region={region}

    style={StyleSheet.absoluteFillObject}>
{userMarkers}
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
export default usersMap;
