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


export default class Trapp_villaownerSearch extends Component<{}> {
    state =
    {
        SearchFields:{
            
			name:'',
			nationalcodebnum:'',
			address:'',
			shabacodebnum:'',
			telbnum:'',
			backuptelbnum:'',
			email:'',
			backupmobilebnum:'',selectedAreaValue: -1,
        },
        
    };
    async componentDidMount() {
        
    }
    
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox title={'نام'} value={this.state.SearchFields.name} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,name: text}});}}/>
                            <TextBox keyboardType='numeric' title={'کد ملی'} value={this.state.SearchFields.nationalcodebnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,nationalcodebnum: text}});}}/>
                            <TextBox title={'آدرس'} value={this.state.SearchFields.address} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,address: text}});}}/>
                            <TextBox keyboardType='numeric' title={'کد شبا'} value={this.state.SearchFields.shabacodebnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,shabacodebnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن'} value={this.state.SearchFields.telbnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,telbnum: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن شماره ۲'} value={this.state.SearchFields.backuptelbnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,backuptelbnum: text}});}}/>
                            <TextBox title={'ایمیل'} value={this.state.SearchFields.email} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,email: text}});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن همراه شماره ۲'} value={this.state.SearchFields.backupmobilebnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,backupmobilebnum: text}});}}/>
                            <CityAreaSelector
                                onAreaSelected={(AreaID)=>this.setState({selectedAreaValue: AreaID})}
                            />
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
    