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
        return (
            <View>
                <CheckBox title={this.props.title} checked={this.props.checked}
                          onPress={this.props.onPress}
                />
            </View>);
    }
}

