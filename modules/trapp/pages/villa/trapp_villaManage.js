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

export default class  trapp_villaManage extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            
			roomcountnum:'',
			capacitynum:'',
			maxguestsnum:'',
			structureareanum:'',
			totalareanum:'',
			SelectedplacemanplaceValue:'-1',
			addedbyowner:0,
			SelectedviewtypeValue:'-1',
			SelectedstructuretypeValue:'-1',
			fulltimeservice:0,
			SelectedowningtypeValue:'-1',
			SelectedareatypeValue:'-1',
			descriptionte:'',
			SelecteddocumentphotoiguLocation:'',
			normalpriceprc:'',
			holidaypriceprc:'',
			weeklyoffnum:'',
			monthlyoffnum:'',
            
			placemanplaceOptions:null,
			viewtypeOptions:null,
			structuretypeOptions:null,
			owningtypeOptions:null,
			areatypeOptions:null,
        };
        
        this.loadData();
    }
    loadData=()=>{

        this.loadPlacemanplaces();
        this.loadViewtypes();
        this.loadStructuretypes();
        this.loadOwningtypes();
        this.loadAreatypes();
        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/villa/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({roomcountnum:data.Data.roomcountnum,capacitynum:data.Data.capacitynum,maxguestsnum:data.Data.maxguestsnum,structureareanum:data.Data.structureareanum,totalareanum:data.Data.totalareanum,SelectedplacemanplaceValue:data.Data.placemanplace,addedbyowner:data.Data.addedbyowner,SelectedviewtypeValue:data.Data.viewtype,SelectedstructuretypeValue:data.Data.structuretype,fulltimeservice:data.Data.fulltimeservice,timestartclk:data.Data.timestartclk,SelectedowningtypeValue:data.Data.owningtype,SelectedareatypeValue:data.Data.areatype,descriptionte:data.Data.descriptionte,documentphotoigu:data.Data.documentphotoigu,normalpriceprc:data.Data.normalpriceprc,holidaypriceprc:data.Data.holidaypriceprc,weeklyoffnum:data.Data.weeklyoffnum,monthlyoffnum:data.Data.monthlyoffnum,});
            });
        }//IF
    };

    loadPlacemanplaces = () => {
        new SweetFetcher().Fetch('/placeman/place',SweetFetcher.METHOD_GET, null, data => {
            this.setState({placemanplaceOptions:data.Data});
        });
    };
                
    loadViewtypes = () => {
        new SweetFetcher().Fetch('/trapp/viewtype',SweetFetcher.METHOD_GET, null, data => {
            this.setState({viewtypeOptions:data.Data});
        });
    };
                
    loadStructuretypes = () => {
        new SweetFetcher().Fetch('/trapp/structuretype',SweetFetcher.METHOD_GET, null, data => {
            this.setState({structuretypeOptions:data.Data});
        });
    };
                
    loadOwningtypes = () => {
        new SweetFetcher().Fetch('/trapp/owningtype',SweetFetcher.METHOD_GET, null, data => {
            this.setState({owningtypeOptions:data.Data});
        });
    };
                
    loadAreatypes = () => {
        new SweetFetcher().Fetch('/trapp/areatype',SweetFetcher.METHOD_GET, null, data => {
            this.setState({areatypeOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                            <TextBox keyboardType='numeric' title={'تعداد اتاق'} value={this.state.roomcountnum} onChangeText={(text) => {this.setState({roomcountnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'ظرفیت به نفر'} value={this.state.capacitynum} onChangeText={(text) => {this.setState({capacitynum: text});}}/>
                            <TextBox keyboardType='numeric' title={'حداکثر تعداد مهمان'} value={this.state.maxguestsnum} onChangeText={(text) => {this.setState({maxguestsnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'متراژ بنا'} value={this.state.structureareanum} onChangeText={(text) => {this.setState({structureareanum: text});}}/>
                            <TextBox keyboardType='numeric' title={'متراژ کل'} value={this.state.totalareanum} onChangeText={(text) => {this.setState({totalareanum: text});}}/>
                            {/*<PickerBox*/}
                                {/*name={'placemanplaces'}*/}
                                {/*title={'محل'}*/}
                                {/*selectedValue ={this.state.SelectedplacemanplaceValue}*/}
                                {/*onValueChange={(value, index) => {*/}
                                    {/*this.setState({SelectedplacemanplaceValue: value});*/}
                                {/*}}*/}
                                {/*options={this.state.placemanplaceOptions}*/}
                            {/*/>*/}
                            <CheckedRow title='دارای سند مالکیت به نام کاربر' checked={this.state.addedbyowner}
                            onPress={() => this.setState({addedbyowner: this.state.addedbyowner==0?1:0})}
                            />
                            <PickerBox
                                name={'viewtypes'}
                                title={'چشم انداز'}
                                selectedValue ={this.state.SelectedviewtypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedviewtypeValue: value});
                                }}
                                options={this.state.viewtypeOptions}
                            />
                            <PickerBox
                                name={'structuretypes'}
                                title={'نوع ساختمان'}
                                selectedValue ={this.state.SelectedstructuretypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedstructuretypeValue: value});
                                }}
                                options={this.state.structuretypeOptions}
                            />
                            <CheckedRow title='تحویل ۲۴ ساعته' checked={this.state.fulltimeservice}
                            onPress={() => this.setState({fulltimeservice: this.state.fulltimeservice==0?1:0})}
                            />
                            <TimeSelector title={'زمان تحویل/تخلیه'} value={this.state.timestartclk} onConfirm={(date)=>this.setState({timestartclk: date})} />
                            <PickerBox
                                name={'owningtypes'}
                                title={'نوع اقامتگاه'}
                                selectedValue ={this.state.SelectedowningtypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedowningtypeValue: value});
                                }}
                                options={this.state.owningtypeOptions}
                            />
                            <PickerBox
                                name={'areatypes'}
                                title={'بافت'}
                                selectedValue ={this.state.SelectedareatypeValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedareatypeValue: value});
                                }}
                                options={this.state.areatypeOptions}
                            />
                            <TextBox title={'توضیحات'} value={this.state.descriptionte} onChangeText={(text) => {this.setState({descriptionte: text});}}/>
                            <ImageSelector title='انتخاب سند مالکیت' onConfirm={(path)=>this.setState({SelecteddocumentphotoiguLocation : path})} />
                            <TextBox keyboardType='numeric' title={'قیمت در روزهای عادی'} value={this.state.normalpriceprc} onChangeText={(text) => {this.setState({normalpriceprc: text});}}/>
                            <TextBox keyboardType='numeric' title={'قیمت در روزهای تعطیل'} value={this.state.holidaypriceprc} onChangeText={(text) => {this.setState({holidaypriceprc: text});}}/>
                            <TextBox keyboardType='numeric' title={'تخفیف رزرو بیش از یک هفته'} value={this.state.weeklyoffnum} onChangeText={(text) => {this.setState({weeklyoffnum: text});}}/>
                            <TextBox keyboardType='numeric' title={'تخفیف رزرو بیش از یک ماه'} value={this.state.monthlyoffnum} onChangeText={(text) => {this.setState({monthlyoffnum: text});}}/>
                            <View  style={{marginTop: '3%'}}>
                                <SweetButton title='ذخیره' onPress={(e) => {
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
        
									data.append('roomcountnum', this.state.roomcountnum);
									data.append('capacitynum', this.state.capacitynum);
									data.append('maxguestsnum', this.state.maxguestsnum);
									data.append('structureareanum', this.state.structureareanum);
									data.append('totalareanum', this.state.totalareanum);
									if(global.placeId>0)
									    data.append('placemanplace', global.placeId);
									data.append('addedbyowner', this.state.addedbyowner);
									data.append('viewtype', this.state.SelectedviewtypeValue);
									data.append('structuretype', this.state.SelectedstructuretypeValue);
									data.append('fulltimeservice', this.state.fulltimeservice);
									data.append('timestartclk', this.state.timestartclk);
									data.append('owningtype', this.state.SelectedowningtypeValue);
									data.append('areatype', this.state.SelectedareatypeValue);
									data.append('descriptionte', this.state.descriptionte);
								ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'documentphotoigu',this.state.SelecteddocumentphotoiguLocation);
									data.append('normalpriceprc', this.state.normalpriceprc);
									data.append('holidaypriceprc', this.state.holidaypriceprc);
									data.append('weeklyoffnum', this.state.weeklyoffnum);
									data.append('monthlyoffnum', this.state.monthlyoffnum);
                                        new SweetFetcher().Fetch('/trapp/villa'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                             }
                                        },null,'trapp','villa',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    