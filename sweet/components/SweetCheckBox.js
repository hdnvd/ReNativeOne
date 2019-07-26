/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, TouchableOpacity} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {Icon} from "react-native-elements";

export default class SweetCheckBox extends Component<{}> {
    render() {
        return (
            <TouchableOpacity onPress={()=> {
                    this.props.onPress();
            }}>
            <View style={this.props.style} flexDirection={'row'}>

                <Text style={this.props.textStyle}>{this.props.title}</Text>
                {this.props.checked &&
                <Icon
                    name={this.props.checkedIcon}
                    type={this.props.iconType}
                    color={this.props.checkedColor} />
                }
                {!this.props.checked &&
                <Icon
                    name={this.props.uncheckedIcon}
                    type={this.props.iconType}
                    color={this.props.uncheckedColor} />
                }
            </View>
            </TouchableOpacity>);
    }
}

