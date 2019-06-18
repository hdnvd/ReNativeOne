/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker} from 'react-native';
import generalStyles from "../../styles/generalStyles";

export default class PickerBox extends Component<{}> {
    render() {
        return (
            <View>
                <Text style={generalStyles.inputLabel}>{this.props.title}</Text>
                <Picker style={generalStyles.select}
                        name={this.props.name}
                        selectedValue ={this.props.selectedValue}
                        onValueChange={this.props.onValueChange}
                >
                    {this.props.options}
                </Picker>
            </View>);
    }
}

