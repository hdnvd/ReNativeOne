/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {Button} from "react-native-elements";
import ImagePicker from "react-native-image-picker";
import SweetButton from "./SweetButton";

export default class ImageSelector extends Component<{}> {
    render() {
        return (
            <View  style={{marginTop: '3%'}}>
                <SweetButton title={this.props.title} iconPlacement='right' underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(OnEnd) => {
                    let options = {
                        title: this.props.title,
                        storageOptions: {
                            skipBackup: true,
                            path: 'images'
                        },
                        chooseFromLibraryButtonTitle:'انتخاب از گالری',
                        takePhotoButtonTitle:'گرفتن عکس',
                        cancelButtonTitle:'لغو'
                    };
                    ImagePicker.showImagePicker(options, (response) => {
                        console.log('Response = ', response);

                        if (response.didCancel) {
                            OnEnd(true);
                            console.log('User cancelled image picker');
                        }
                        else if (response.error) {
                            OnEnd(false);
                            console.log('ImagePicker Error: ', response.error);
                        }
                        else {
                            OnEnd(true);
                            this.props.onConfirm(response.path);
                        }
                    });
                }}/>
            </View>);
    }
}

