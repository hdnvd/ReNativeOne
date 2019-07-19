/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Text, View, Picker, TextInput, TouchableHighlight, Image} from 'react-native';
import generalStyles from "../../styles/generalStyles";

export default class ListTopBar extends Component<{}> {
    render() {
        return (
            <View style={generalStyles.listTopBar} flexDirection={'row'}>

                <TouchableHighlight onPress={()=>{this.setState({displaySearchPage:true})}}
                                    activeOpacity={0.3}
                                    underlayColor='#eee'>
                    <View style={generalStyles.listTopBarItem}  flexDirection={'row'}>
                        <View style={generalStyles.listTopBarItemButtonIconContainer} >
                            <Image source={require('../../../../images/distance.png')} style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                        </View>
                        <View style={generalStyles.listTopBarItemButtonIconContainerSelected} >
                            <Image source={require('../../../../images/dollar.png')} style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                        </View>
                        <Text style={generalStyles.listTopBarItemText} >مرتب سازی</Text>
                        <Image source={require('../../../../images/sort.png')} style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                    </View>

                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onSearchClick}
                                    activeOpacity={0.3}
                                    underlayColor='#eee'>
                    <View style={generalStyles.listTopBarItem}  flexDirection={'row'}>

                        <Text style={generalStyles.listTopBarItemText} >جستجو</Text>
                        <Image source={require('../../../../images/filter.png')} style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                    </View>
                </TouchableHighlight>
            </View>);
    }
}

