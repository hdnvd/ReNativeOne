/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {Button} from "react-native-elements";

export default class SweetButton extends Component<{}> {
    render() {
        return (
            <Button iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} {...this.props}/>);
    }
}

