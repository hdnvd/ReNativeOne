import {Component} from "react";
import SweetFetcher from "../../../classes/sweet-fetcher";
import {Picker} from "react-native";
import generalStyles from "../../../styles/generalStyles";
import React from "react";

export default class  PlaceManager {
    set selectedProvinceValue(value) {
        this._selectedProvinceValue = value;
    }

    _selectedProvinceValue=-1;
    set onProvincesLoaded(value) {
        this._onProvincesLoaded = value;
    }

    set onCitiesLoaded(value) {
        this._onCitiesLoaded = value;
    }

    set onAreasLoaded(value) {
        this._onAreasLoaded = value;
    }
    _onProvincesLoaded=(a)=>{};
    _onCitiesLoaded=(a)=>{};
    _onAreasLoaded=(a)=>{};
    loadProvinceOptions = () => {
        new SweetFetcher().Fetch('/placeman/provinces',SweetFetcher.METHOD_GET, null, data => {
            let placemanareas=data.Data.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
            // console.log(placemanareas);
            this._onProvincesLoaded(placemanareas);
        });
    };
    loadCityOptions = (ProvinceID) => {
        new SweetFetcher().Fetch('/placeman/provinces/' + ProvinceID + '',SweetFetcher.METHOD_GET, null, data => {
            let placemanareas=data.Data.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
            this._onCitiesLoaded(placemanareas);
        });
    };
    loadAreaOptions = (ProvinceID,CityID) => {
        new SweetFetcher().Fetch('/placeman/provinces/' +ProvinceID + '/' + CityID + "",SweetFetcher.METHOD_GET, null, data => {
            let placemanareas=data.Data.map(dt=>{return <Picker.Item label={dt.title} value={dt.id} style={generalStyles.pickerItem} />});
            this._onAreasLoaded(placemanareas);
        });
    };
}
