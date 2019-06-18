/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Picker, Text, View} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {Button} from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import PlaceManager from "../../modules/placeman/classes/PlaceManager";

export default class CityAreaSelector extends Component<{}> {
    placemanager=new PlaceManager();
    constructor(props) {
        super(props);
        this.state =
            {
                infoLoaded:false,
                provinceOptions:[<Picker.Item label='استان' value='-1' style={generalStyles.pickerItem} />],
                cityOptions:[<Picker.Item label='شهر' value='-1' style={generalStyles.pickerItem} />],
                areaOptions:[<Picker.Item label='منطقه' value='-1' style={generalStyles.pickerItem} />],
                selectedProvinceValue: -1,
                selectedCityValue: -1,
                selectedAreaValue: -1,
            };

        this.placemanager.onProvincesLoaded=(Provinces)=>{this.setState({provinceOptions:Provinces});};
        this.placemanager.onCitiesLoaded=(Cities)=>{this.setState({cityOptions:Cities});};
        this.placemanager.onAreasLoaded=(Areas)=>{this.setState({areaOptions:Areas});};
        this.loadData();
    }
    loadData=()=>{
        this.placemanager.loadProvinceOptions();
    };
    render() {
        return (<View>
            <View>
                <Text style={generalStyles.inputLabel}>استان</Text>
                <Picker style={generalStyles.select}
                        name='placemanprovinces'
                        selectedValue ={this.state.selectedProvinceValue}
                        onValueChange={(ProvinceID,index)=>{
                            this.setState({selectedProvinceValue:ProvinceID});
                            this.placemanager.loadCityOptions(ProvinceID);}}
                >
                    {this.state.provinceOptions}
                </Picker>
            </View>
            <View>
                <Text style={generalStyles.inputLabel}>شهر</Text>
                <Picker style={generalStyles.select}
                        name='placemancities'
                        selectedValue ={this.state.selectedCityValue}
                        onValueChange={(CityID,index)=>{
                            this.setState({selectedCityValue:CityID});
                            this.placemanager.loadAreaOptions(this.state.selectedProvinceValue,CityID);}}
                >
                    {this.state.cityOptions}
                </Picker>
            </View>
            <View>
                <Text style={generalStyles.inputLabel}>منطقه</Text>
                <Picker style={generalStyles.select}
                        name='placemanareas'
                        selectedValue ={this.state.selectedAreaValue}
                        onValueChange={(AreaID, index) => {
                            this.setState({selectedAreaValue: AreaID});
                            this.props.onAreaSelected(AreaID);
                        }}
                >
                    {this.state.areaOptions}
                </Picker>
            </View>
        </View>);
    }
}

