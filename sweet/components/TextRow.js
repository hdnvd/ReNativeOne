/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, Image} from 'react-native';
import generalStyles from "../../styles/generalStyles";

export default class TextRow extends Component<{}> {
    render() {
        return (
            <View style={this.props.style!=null?this.props.style:generalStyles.row} flexDirection={'row-reverse'}>
                {this.props.logo != null &&
                    <Image style={this.props.itemLogoStyle!=null?this.props.itemLogoStyle:generalStyles.ItemLogo} source={this.props.logo}/>
                }
                <Text style={this.props.captionStyle!=null?this.props.captionStyle:generalStyles.caption}>{this.props.title} </Text>
                <Text style={this.props.contentStyle!=null?this.props.contentStyle:generalStyles.content}>{this.props.content}</Text>
            </View>);
    }
}

