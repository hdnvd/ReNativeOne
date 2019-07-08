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


export default class Placeman_placeSearch extends Component<{}> {
    state =
    {
        SearchFields:{
            
			title:'',selectedAreaValue: -1,
			address:'',
			description:'',
        },
        
    };
    async componentDidMount() {
        
    }
    
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox title={'عنوان'} value={this.state.SearchFields.title} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,title: text}});}}/>
                            <CityAreaSelector
                                onAreaSelected={(AreaID)=>this.setState({selectedAreaValue: AreaID})}
                            />
                            <TextBox title={'آدرس'} value={this.state.SearchFields.address} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,address: text}});}}/>
                            <TextBox title={'توضیحات'} value={this.state.SearchFields.description} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,description: text}});}}/>
                                <SweetButton title={'جستجو'} onPress={() => {
                                    if(this.props.dataLoader!=null)
                                    {
                                        this.props.dataLoader(this.state.SearchFields);
                                    }
                            }}/>
                            </View>
                        </ScrollView>
                </View>
            );
    }
}
    