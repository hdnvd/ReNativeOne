import React, {Component} from 'react'
import { CheckBox , Button } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,AsyncStorage,Picker,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import ImageSelector from '../../../../sweet/components/ImageSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import ComponentHelper from '../../../../classes/ComponentHelper';

export default class  placeman_placeManage extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
            {
                infoLoaded:false,
                
			title:'',
			SelectedlogoiguLocation:'',
			description:'',
			active:0,
			address:'',selectedAreaValue: -1,
            };
        
        this.loadData();
    }
    loadData=()=>{

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                            <TextBox title={'عنوان'} value={this.state.title} onChangeText={(text) => {this.setState({title: text});}}/>
                            <ImageSelector title='انتخاب لوگو' onConfirm={(path)=>this.setState({SelectedlogoiguLocation : path})} />
                            <TextBox title={'توضیحات'} value={this.state.description} onChangeText={(text) => {this.setState({description: text});}}/>
                            <CheckedRow title='فعال/غیرفعال' checked={this.state.active}
                            onPress={() => this.setState({active: this.state.active==0?1:0})}
                            />
                            <TextBox title={'آدرس'} value={this.state.address} onChangeText={(text) => {this.setState({address: text});}}/>
                            <CityAreaSelector
                                onAreaSelected={(AreaID)=>this.setState({selectedAreaValue: AreaID})}
                            />
                            <LocationSelector title='محل' navigation={this.props.navigation}/>
                            <View  style={{marginTop: '3%'}}>
                                <Button title='ذخیره' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        let id = '';
                                        let method=SweetFetcher.METHOD_POST;
                                        let Separator='';
                                        let action=AccessManager.INSERT;
//                                        if (this.props.match.params.id > 0)
//                                            id = this.props.match.params.id;
                                            
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
        
									data.append('title', this.state.title);
								ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'logoigu',this.state.SelectedlogoiguLocation);
									data.append('description', this.state.description);
									data.append('active', this.state.active);
									data.append('address', this.state.address);
									data.append('area', this.state.selectedAreaValue);
                                    data.append('latitude', global.SelectedLocation.latitude);
                                    data.append('longitude', global.SelectedLocation.longitude);
                                        new SweetFetcher().Fetch('/placeman/place'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                             }
                                        },null,'placeman','place',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    