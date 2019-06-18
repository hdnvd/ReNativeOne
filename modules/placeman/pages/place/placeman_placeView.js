import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, ScrollView, Dimensions,AsyncStorage,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import ComponentHelper from '../../../../classes/ComponentHelper';
import SimpleMap from '../../../../components/SimpleMap';

export default class  placeman_placeView extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                    provinceinfo:{},
                    cityinfo:{},
                    areainfo:{},
                    userinfo:{},
                    latitude:0.0,
                    longitude:0.0,
                },
                
            };
        
        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/placeman/place/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                          <Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.logoigu}}/>

                            <TextRow title={'عنوان'} content={this.state.LoadedData.title} />
                            <TextRow title={'توضیحات'} content={this.state.LoadedData.description} />
                            {this.state.LoadedData.active==1 && <TextRow title={''} content={'فعال/غیرفعال'} />}
                            <TextRow title={'آدرس'} content={this.state.LoadedData.address} />
                            <TextRow title={'محل'} content={this.state.LoadedData.provinceinfo.title+' - '+this.state.LoadedData.cityinfo.title+' - '+this.state.LoadedData.areainfo.title} />
                            <View style={generalStyles.mapContainer}>
                                <SimpleMap style={generalStyles.map} latitude={parseFloat(this.state.LoadedData.latitude)+0} longitude={parseFloat(this.state.LoadedData.longitude)+0} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    