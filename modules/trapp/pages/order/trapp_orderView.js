import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView, Dimensions,AsyncStorage,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import ComponentHelper from '../../../../classes/ComponentHelper';
import SimpleMap from '../../../../components/SimpleMap';

export default class  trapp_orderView extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                priceprc:'',
                    reservefinancetransactioninfo:{},
                    cancelfinancetransactioninfo:{},
                    villainfo:{},
                    orderstatusinfo:{},
                startdate:'',
                durationnum:'',
                    userinfo:{},
                },
                
            };
        
        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/order/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                    
                        <View style={generalStyles.container}>
                        
                            <TextRow title={'price_prc'} content={this.state.LoadedData.priceprc} />
                            <TextRow title={'reserve__finance_transaction_fid'} content={this.state.LoadedData.reservefinancetransactioninfo.name} />
                            <TextRow title={'cancel__finance_transaction_fid'} content={this.state.LoadedData.cancelfinancetransactioninfo.name} />
                            <TextRow title={'villa_fid'} content={this.state.LoadedData.villainfo.name} />
                            <TextRow title={'orderstatus_fid'} content={this.state.LoadedData.orderstatusinfo.name} />
                            <TextRow title={'start_date'} content={this.state.LoadedData.startdate} />
                            <TextRow title={'duration_num'} content={this.state.LoadedData.durationnum} />
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    