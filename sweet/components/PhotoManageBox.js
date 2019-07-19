/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, Image,TouchableHighlight} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {CheckBox} from "react-native-elements";
import Constants from "../../classes/Constants";
import TextRow from "./TextRow";

export default class PhotoManageBox extends Component<{}> {
    render() {
        let PhotoList=this.props.photos.map(dt=>{
            console.log(Constants.ServerURL+'/'+dt.url);
            return (
                <View style={generalStyles.photomanagephotocontainer}>
                    <TouchableHighlight onPress={dt.onDelete} style={generalStyles.photomanagedeleteiconcontainer}>
                        <Image style={generalStyles.photomanagedeleteicon} source={require('../../images/delete.png')}/>
                    </TouchableHighlight>
                    <Image style={generalStyles.photomanagephoto} source={{uri: Constants.ServerURL+'/'+dt.url}}/>
                </View>
            )});
        return (
            <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap'}}>
                {PhotoList}
            </View>);
    }
}

