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

export default class  trapp_orderManage extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            
			priceprc:'',
			SelectedreservefinancetransactionValue:'-1',
			SelectedcancelfinancetransactionValue:'-1',
			SelectedvillaValue:'-1',
			SelectedorderstatusValue:'-1',
			startdate:'',
			durationnum:'',
            
			reservefinancetransactionOptions:null,
			cancelfinancetransactionOptions:null,
			villaOptions:null,
			orderstatusOptions:null,
        };
        
        this.loadData();
    }
    loadData=()=>{

        this.loadReservefinancetransactions();
        this.loadCancelfinancetransactions();
        this.loadVillas();
        this.loadOrderstatuss();
        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/order/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({priceprc:data.Data.priceprc,SelectedreservefinancetransactionValue:data.Data.reservefinancetransaction,SelectedcancelfinancetransactionValue:data.Data.cancelfinancetransaction,SelectedvillaValue:data.Data.villa,SelectedorderstatusValue:data.Data.orderstatus,startdate:data.Data.startdate,durationnum:data.Data.durationnum,SelecteduserValue:data.Data.user,});
            });
        }//IF
    };

    loadReservefinancetransactions = () => {
        new SweetFetcher().Fetch('/finance/transaction',SweetFetcher.METHOD_GET, null, data => {
            this.setState({reservefinancetransactionOptions:data.Data});
        });
    };
                
    loadCancelfinancetransactions = () => {
        new SweetFetcher().Fetch('/finance/transaction',SweetFetcher.METHOD_GET, null, data => {
            this.setState({cancelfinancetransactionOptions:data.Data});
        });
    };
                
    loadVillas = () => {
        new SweetFetcher().Fetch('/trapp/villa',SweetFetcher.METHOD_GET, null, data => {
            this.setState({villaOptions:data.Data});
        });
    };
                
    loadOrderstatuss = () => {
        new SweetFetcher().Fetch('/trapp/orderstatus',SweetFetcher.METHOD_GET, null, data => {
            this.setState({orderstatusOptions:data.Data});
        });
    };
                
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                            <TextBox keyboardType='numeric' title={'price_prc'} value={this.state.priceprc} onChangeText={(text) => {this.setState({priceprc: text});}}/>
                            <PickerBox
                                name={'reservefinancetransactions'}
                                title={'reserve__finance_transaction_fid'}
                                selectedValue ={this.state.SelectedreservefinancetransactionValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedreservefinancetransactionValue: value});
                                }}
                                options={this.state.reservefinancetransactionOptions}
                            />
                            <PickerBox
                                name={'cancelfinancetransactions'}
                                title={'cancel__finance_transaction_fid'}
                                selectedValue ={this.state.SelectedcancelfinancetransactionValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedcancelfinancetransactionValue: value});
                                }}
                                options={this.state.cancelfinancetransactionOptions}
                            />
                            <PickerBox
                                name={'villas'}
                                title={'villa_fid'}
                                selectedValue ={this.state.SelectedvillaValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedvillaValue: value});
                                }}
                                options={this.state.villaOptions}
                            />
                            <PickerBox
                                name={'orderstatuss'}
                                title={'orderstatus_fid'}
                                selectedValue ={this.state.SelectedorderstatusValue}
                                onValueChange={(value, index) => {
                                    this.setState({SelectedorderstatusValue: value});
                                }}
                                options={this.state.orderstatusOptions}
                            />
                            <TextBox title={'start_date'} value={this.state.startdate} onChangeText={(text) => {this.setState({startdate: text});}}/>
                            <TextBox keyboardType='numeric' title={'duration_num'} value={this.state.durationnum} onChangeText={(text) => {this.setState({durationnum: text});}}/>
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
        
									data.append('priceprc', this.state.priceprc);
									data.append('reservefinancetransaction', this.state.SelectedreservefinancetransactionValue);
									data.append('cancelfinancetransaction', this.state.SelectedcancelfinancetransactionValue);
									data.append('villa', this.state.SelectedvillaValue);
									data.append('orderstatus', this.state.SelectedorderstatusValue);
									data.append('startdate', this.state.startdate);
									data.append('durationnum', this.state.durationnum);
                                        new SweetFetcher().Fetch('/trapp/order'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                             }
                                        },null,'trapp','order',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    