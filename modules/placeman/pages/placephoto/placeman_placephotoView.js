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

export default class  placeman_placephotoView extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات placephoto'} />
        };
    };
    
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                name:'',
                    phototypeinfo:{},
                    placeinfo:{
                title:'',
                    provinceinfo:{},
                    cityinfo:{},
                    areainfo:{},
                address:'',
                    latitude:0.0,
                    longitude:0.0,
                description:'',
                    userinfo:{},},
                },
                
            };
        
        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/placeman/placephoto/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                    
                        <View style={generalStyles.container}>
                        
                          <Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.photoigu}}/>

                            <TextRow title={'نام'} content={this.state.LoadedData.name} />
                            <TextRow title={'phototype_fid'} content={this.state.LoadedData.phototypeinfo.name} />
                          <Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.placeinfo.logoigu}}/>

                            <TextRow title={'عنوان'} content={this.state.LoadedData.placeinfo.title} />
                            <TextRow title={'محل'} content={this.state.LoadedData.placeinfo.provinceinfo.title+' - '+this.state.LoadedData.placeinfo.cityinfo.title+' - '+this.state.LoadedData.placeinfo.areainfo.title} />
                            <TextRow title={'آدرس'} content={this.state.LoadedData.placeinfo.address} />
                            <TextRow title={'توضیحات'} content={this.state.LoadedData.placeinfo.description} />
                            {this.state.LoadedData.placeinfo.active==1 && <TextRow title={''} content={'فعال/غیرفعال'} />}
                            <View style={generalStyles.mapContainer}>
                                <SimpleMap style={generalStyles.map} latitude={parseFloat(this.state.LoadedData.placeinfo.latitude)+0} longitude={parseFloat(this.state.LoadedData.placeinfo.longitude)+0} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    