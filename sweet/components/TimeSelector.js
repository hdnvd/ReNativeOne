/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, TextInput, TouchableWithoutFeedback} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class TimeSelector extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = { isDateTimePickerVisible: false };
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.setState({isDateTimePickerVisible: true})}>
                <View>
                    <Text style={generalStyles.inputLabel}>{this.props.title}</Text>
                    <TextInput placeholder='' editable={false} underlineColorAndroid={'transparent'}
                               style={generalStyles.input} value={this.props.value}/>
                    <DateTimePicker
                        mode={"time"}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={(date) => {
                            this.props.onConfirm(date.getHours() + ":" + date.getMinutes());
                            this.setState({isDateTimePickerVisible: false});
                        }
                        }
                        onCancel={()=>this.setState({isDateTimePickerVisible: false})}
                    />
                </View>
            </TouchableWithoutFeedback>);
    }
}

