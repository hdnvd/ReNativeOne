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
import TextRow from "../../../../sweet/components/TextRow";
import LogoTitle from "../../../../components/LogoTitle";

export default class  trapp_villaownerManage extends Component<{}> {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات صاحب ویلا'} />
        };
    };
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,

			name:'',
			nationalcodebnum:'',
			address:'',
			shabacodebnum:'',
			telbnum:'',
			backuptelbnum:'',
			email:'',
			backupmobilebnum:'',
			SelectedphotoiguLocation:'',
			SelectednationalcardiguLocation:'',selectedAreaValue: -1,

        };

        this.loadData();
    }
    loadData=()=>{

        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/villaowner/'+global.ownerId,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({name:data.Data.name,SelecteduserValue:data.Data.user,nationalcodebnum:data.Data.nationalcodebnum,address:data.Data.address,shabacodebnum:data.Data.shabacodebnum,telbnum:data.Data.telbnum,backuptelbnum:data.Data.backuptelbnum,email:data.Data.email,backupmobilebnum:data.Data.backupmobilebnum,photoigu:data.Data.photoigu,nationalcardigu:data.Data.nationalcardigu,placemanarea:data.Data.placemanarea,});
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
                            <TextBox keyboardType='numeric' title={'کد ملی'} value={this.state.nationalcodebnum} onChangeText={(text) => {this.setState({nationalcodebnum: text});}}/>
                            <TextBox title={'آدرس'} value={this.state.address} onChangeText={(text) => {this.setState({address: text});}}/>
                            <TextBox keyboardType='numeric' title={'کد شبا'} value={this.state.shabacodebnum} onChangeText={(text) => {this.setState({shabacodebnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن'} value={this.state.telbnum} onChangeText={(text) => {this.setState({telbnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن شماره ۲'} value={this.state.backuptelbnum} onChangeText={(text) => {this.setState({backuptelbnum: text});}}/>
                            <TextBox title={'ایمیل'} value={this.state.email} onChangeText={(text) => {this.setState({email: text});}}/>
                            <TextBox keyboardType='numeric' title={'تلفن همراه شماره ۲'} value={this.state.backupmobilebnum} onChangeText={(text) => {this.setState({backupmobilebnum: text});}}/>
                            <ImageSelector title='انتخاب تصویر' onConfirm={(path)=>this.setState({SelectedphotoiguLocation : path})} />
                            <ImageSelector title='انتخاب تصویر کارت ملی' onConfirm={(path)=>this.setState({SelectednationalcardiguLocation : path})} />
                            <CityAreaSelector
                                onAreaSelected={(AreaID)=>this.setState({selectedAreaValue: AreaID})}
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
                                        if (global.ownerId > 0)
                                            id = global.ownerId;

								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}

									data.append('name', this.state.name);
									data.append('nationalcodebnum', this.state.nationalcodebnum);
									data.append('address', this.state.address);
									data.append('shabacodebnum', this.state.shabacodebnum);
									data.append('telbnum', this.state.telbnum);
									data.append('backuptelbnum', this.state.backuptelbnum);
									data.append('email', this.state.email);
									data.append('backupmobilebnum', this.state.backupmobilebnum);
								ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'photoigu',this.state.SelectedphotoiguLocation);
								ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'nationalcardigu',this.state.SelectednationalcardiguLocation);
									data.append('placemanarea', this.state.selectedAreaValue);
                                        new SweetFetcher().Fetch('/trapp/villaowner'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 global.ownerId=data.Data.id;
                                                 this.props.navigation.navigate('placeman_placeManage', { name: 'placeman_placeManage' });
                                                 OnEnd(true);
                                             }
                                        },(error)=>{OnEnd(false)},'trapp','villaowner',this.props.history);
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
