/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, Image} from 'react-native';
import generalStyles from "../../styles/generalStyles";
import Constants from "../../classes/Constants";

export default class IconItem extends Component<{}> {

    constructor(props)
    {
        super(props);
        this.state={
            isLogoVisible:props.displayLogo!=null?props.displayLogo:false,
        };
    };
    render() {
        return (
            <View style={this.props.style!=null?this.props.style:generalStyles.IconItemStyle}>
                {!this.state.isLogoVisible &&
                    <Text style={generalStyles.IconItemTitle}>{this.props.title} </Text>
                }
                {this.state.isLogoVisible &&
                    <Image style={generalStyles.IconItemLogo} source={this.props.logo}/>
                }
                <Text style={generalStyles.IconItemContent}>{this.props.content}</Text>
            </View>);
    }
}

