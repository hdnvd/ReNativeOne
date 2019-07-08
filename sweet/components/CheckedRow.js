/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {CheckBox} from "react-native-elements";

export default class CheckedRow extends Component<{}> {
    render() {
        let checked=false;
        if(this.props.checked===true || this.props.checked==="true" || this.props.checked==="1" || this.props.checked===1)
            checked=true;
        return (
            <View>
                <CheckBox title={this.props.title} checked={checked}
                          onPress={this.props.onPress}
                />
            </View>);
    }
}

