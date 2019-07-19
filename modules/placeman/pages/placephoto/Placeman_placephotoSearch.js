import React, {Component} from 'react'
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Image,TouchableWithoutFeedback,Text,Picker,TextInput,ScrollView,FlatList } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import SweetPage from '../../../../sweet/components/SweetPage';


export default class Placeman_placephotoSearch extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' placephoto'} />
        };
    };
    state =
    {
        SearchFields:{
            
			name:'',
			SelectedphototypeValue:'-1',
        },
        
			phototypeOptions:null,
    };
    async componentDidMount() {
        
        this.loadPhototypes();
    }
    
    loadPhototypes = () => {
        new SweetFetcher().Fetch('/placeman/phototype',SweetFetcher.METHOD_GET, null, data => {
            this.setState({phototypeOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox title={'نام'} value={this.state.SearchFields.name} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,name: text}});}}/>
                            <PickerBox
                                name={'phototypes'}
                                title={'phototype_fid'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.SelectedphototypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,SelectedphototypeValue: value}});
                                }}
                                options={this.state.phototypeOptions}
                            />
                                <SweetButton title={'جستجو'} onPress={(OnEnd) => {
                                    if(this.props.dataLoader!=null)
                                    {
                                        this.props.dataLoader(this.state.SearchFields);
                                        OnEnd(true);
                                    }
                                    else
                                        OnEnd(false);
                            }}/>
                            </View>
                        </ScrollView>
                </View>
            );
    }
}
    