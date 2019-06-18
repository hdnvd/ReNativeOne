/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput} from 'react-native';
import generalStyles from "../../styles/generalStyles";

export default class TextRow extends Component<{}> {
    render() {
        return (
            <View style={generalStyles.row}>
                <Text style={generalStyles.caption}>{this.props.title} </Text>
                <Text style={generalStyles.content}>{this.props.content}</Text>
            </View>);
    }
}

