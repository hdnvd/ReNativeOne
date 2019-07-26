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
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';

export default class  trapp_villaoptionView extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات villaoption'} />
        };
    };
    
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                    villainfo:{},
                    optioninfo:{},
                },
                
            };
        
        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/villaoption/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                    
                        <View style={generalStyles.container}>
                        
                            <TextRow title={'ویلا'} content={this.state.LoadedData.villainfo.name} />
                            <TextRow title={'option_fid'} content={this.state.LoadedData.optioninfo.name} />
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    