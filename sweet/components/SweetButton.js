/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TouchableOpacity,ActivityIndicator} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import {Button} from "react-native-elements";

export default class SweetButton extends Component<{}> {
    state={
        waiting:false,
    };
    // constructor(props) {
    //     super(props);
    // }
    onProcessStarting=()=>
    {
      this.setState({
          waiting:true
      });
    };
    onProcessCompleted=(isSuccessful)=>
    {
        this.setState({
            waiting:false
        });
    };
    render() {
        return (
            <View style={generalStyles.SweetButton}>
                <TouchableOpacity onPress={()=> {
                    if (!this.state.waiting)
                    {
                        this.onProcessStarting();
                        this.props.onPress(this.onProcessCompleted);
                    }
                }}>
                    {this.state.waiting &&
                    <View  style={generalStyles.SweetButtonWaitDialogContainer}>
                        <ActivityIndicator style={generalStyles.SweetButtonWaitDialog} animating={this.state.waiting} size="small"
                                           color="#ffffff"/>
                    </View>
                    }
                <Text style={generalStyles.SweetButtonText}>
                    {this.props.title}
                </Text>
                </TouchableOpacity>
                {/*<Button iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} {...this.props}/>*/}
            </View>
        );
    }
}

