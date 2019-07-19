/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, TextInput, TouchableWithoutFeedback} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import DateTimePicker from "react-native-modal-datetime-picker";
import {Button} from "react-native-elements";
import SweetButton from "./SweetButton";

export default class LocationSelector extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = { isDateTimePickerVisible: false };
    }
    render() {
        return (
            <View  style={{marginTop: '3%'}}>
                <SweetButton  title={this.props.title} onPress={(OnEnd) => {
                    const {navigate} = this.props.navigation;
                    navigate('SelectLocation', {name: 'SelectLocation'});
                    OnEnd(true);
                }}/>
            </View>);
    }
}

