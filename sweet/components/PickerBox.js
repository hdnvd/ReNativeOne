/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import SFMan from "../../classes/SFMan";

export default class PickerBox extends Component<{}> {
    render() {
        // console.log("DATA__+_(_()())_+");
        let Options=this.props.options;
        let titleFieldName=this.props.titleFieldName;
        let valueFieldName=this.props.valueFieldName;
        if(valueFieldName==null)
            valueFieldName='id';
        if(Options!=null && Options.length>0) {
            if (titleFieldName == null)
                titleFieldName = SFMan.getTitleFieldFromObject(Options[0]);
            Options = Options.map(data => {
                return <Picker.Item label={data[titleFieldName]} value={data[valueFieldName]}/>
            });
        }
        let EmptyItemTitle=this.props.emptyItemTitle;
        if(EmptyItemTitle==null)
            EmptyItemTitle='انتخاب کنید';
        if(this.props.isOptional && Options!=null)
        {
            Options=[<Picker.Item label={EmptyItemTitle} value='-1'/>,...Options];
        }
        else if(Options==null)
            Options=[<Picker.Item label={this.props.title} value='-1'/>];

        return (
            <View>
                <Text style={generalStyles.inputLabel}>{this.props.title}</Text>
                <Picker
                        name={this.props.name}
                        selectedValue ={this.props.selectedValue}
                        onValueChange={this.props.onValueChange}
                >
                    {Options}
                </Picker>
            </View>);
    }
}

