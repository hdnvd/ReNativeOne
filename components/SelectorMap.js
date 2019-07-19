import React from 'react';
import {
    Text,
    StyleSheet, View, Alert
} from 'react-native';
import MapView, {Marker, LatLng} from 'react-native-maps';

const SelectorMap = props => {
    // const onSelect=(position)=>{
    //   Alert.alert(""+typeof(position));
    //   //props.onSelect();
    // };
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: global.SelectedLocation != null ? global.SelectedLocation.latitude : 35.6892,
                    longitude: global.SelectedLocation != null ? global.SelectedLocation.longitude : 51.3890,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={true}
                loadingEnabled={true}
                region={props.selectedLocation}
                onRegionChangeComplete={props.onRegionChange}

                style={StyleSheet.absoluteFillObject}>
                <Marker
                    coordinate={props.selectedLocation}
                    title="انتخاب این مکان"
                    onPress={(e) => {
                        // Alert.alert(global.SampleVar);
                        global.SelectedLocation = {
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        };
                        props.onSelect();
                        // Alert.alert(e.nativeEvent.coordinate.latitude+"")
                    }
                    }
                />
            </MapView>
        </View>
    );
};
const styles = StyleSheet.create(
    {
        mapContainer:
            {
                width: '100%',
                height: '100%'
            },
        map:
            {
                width: '100%',
                height: '100%'
            }
    }
);
export default SelectorMap;
