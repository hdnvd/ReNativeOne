import React, {Component} from 'react'
import { CheckBox } from 'react-native-elements';
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
import SweetButton from '../../../../sweet/components/SweetButton';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import ComponentHelper from '../../../../classes/ComponentHelper';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';

export default class  trapp_optionManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات option'} />
        };
    };
    
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            
			name:'',
			free:0,
			countable:0,
            
        };
        
        this.loadData();
    }
    loadData=()=>{

        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/option/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({name:data.Data.name,free:data.Data.free,countable:data.Data.countable,});
            });
        }//IF
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                            <TextBox title={'نام'} value={this.state.name} onChangeText={(text) => {this.setState({name: text});}}/>
                            <CheckedRow title='is_free' checked={this.state.free}
                            onPress={() => this.setState({free: this.state.free==0?1:0})}
                            />
                            <CheckedRow title='is_countable' checked={this.state.countable}
                            onPress={() => this.setState({countable: this.state.countable==0?1:0})}
                            />
                            <View  style={{marginTop: '3%'}}>
                                <SweetButton title='ذخیره' onPress={(OnEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        let id = '';
                                        let method=SweetFetcher.METHOD_POST;
                                        let Separator='';
                                        let action=AccessManager.INSERT;
                                        if (global.itemID > 0)
                                            id = global.itemID;
                                            
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
        
									data.append('name', this.state.name);
									data.append('free', this.state.free);
									data.append('countable', this.state.countable);
                                        new SweetFetcher().Fetch('/trapp/option'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                                 OnEnd(true);
                                             }
                                        },(error)=>{OnEnd(false)},'trapp','option',this.props.history);
                                    }
                                    else
                                        OnEnd(false);
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    