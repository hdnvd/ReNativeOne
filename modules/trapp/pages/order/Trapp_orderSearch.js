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


export default class Trapp_orderSearch extends Component<{}> {
    state =
    {
        SearchFields:{
            
			priceprc:'',
			SelectedreservefinancetransactionValue:'-1',
			SelectedcancelfinancetransactionValue:'-1',
			SelectedvillaValue:'-1',
			SelectedorderstatusValue:'-1',
			startdate:'',
			durationnum:'',
        },
        
			reservefinancetransactionOptions:null,
			cancelfinancetransactionOptions:null,
			villaOptions:null,
			orderstatusOptions:null,
    };
    async componentDidMount() {
        
        this.loadReservefinancetransactions();
        this.loadCancelfinancetransactions();
        this.loadVillas();
        this.loadOrderstatuss();
    }
    
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
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                            <View>
                                
                            <TextBox keyboardType='numeric' title={'price_prc'} value={this.state.SearchFields.priceprc} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,priceprc: text}});}}/>
                            <PickerBox
                                name={'reservefinancetransactions'}
                                title={'reserve__finance_transaction_fid'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.SelectedreservefinancetransactionValue}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,SelectedreservefinancetransactionValue: value}});
                                }}
                                options={this.state.reservefinancetransactionOptions}
                            />
                            <PickerBox
                                name={'cancelfinancetransactions'}
                                title={'cancel__finance_transaction_fid'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.SelectedcancelfinancetransactionValue}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,SelectedcancelfinancetransactionValue: value}});
                                }}
                                options={this.state.cancelfinancetransactionOptions}
                            />
                            <PickerBox
                                name={'villas'}
                                title={'villa_fid'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.SelectedvillaValue}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,SelectedvillaValue: value}});
                                }}
                                options={this.state.villaOptions}
                            />
                            <PickerBox
                                name={'orderstatuss'}
                                title={'orderstatus_fid'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.SelectedorderstatusValue}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,SelectedorderstatusValue: value}});
                                }}
                                options={this.state.orderstatusOptions}
                            />
                            <TextBox title={'start_date'} value={this.state.SearchFields.startdate} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,startdate: text}});}}/>
                            <TextBox keyboardType='numeric' title={'duration_num'} value={this.state.SearchFields.durationnum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,durationnum: text}});}}/>
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
    