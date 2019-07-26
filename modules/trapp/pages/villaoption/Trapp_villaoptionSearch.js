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
import LogoTitle from '../../../../components/LogoTitle';


export default class Trapp_villaoptionSearch extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' villaoption'} />
        };
    };
    state =
    {
        SearchFields:{
            
			villa:'',
			option:'',
        },
        
			villaOptions:null,
			optionOptions:null,
    };
    async componentDidMount() {
        
        this.loadVillas();
        this.loadOptions();
    }
    
    loadVillas = () => {
        new SweetFetcher().Fetch('/trapp/villa',SweetFetcher.METHOD_GET, null, data => {
            this.setState({villaOptions:data.Data});
        });
    };
                
    loadOptions = () => {
        new SweetFetcher().Fetch('/trapp/option',SweetFetcher.METHOD_GET, null, data => {
            this.setState({optionOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <PickerBox
                                name={'villas'}
                                title={'ویلا'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.villa}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,villa: value}});
                                }}
                                options={this.state.villaOptions}
                            />
                            <PickerBox
                                name={'options'}
                                title={'option_fid'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.option}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,option: value}});
                                }}
                                options={this.state.optionOptions}
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
    