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

export default class  trapp_villaView extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                    placemanplaceinfo:{
                    provinceinfo:{},
                    cityinfo:{},
                    areainfo:{},
                    userinfo:{},
                    latitude:0.0,
                    longitude:0.0,},
                    viewtypeinfo:{},
                    structuretypeinfo:{},
                    owningtypeinfo:{},
                    areatypeinfo:{},
                },
                
            };
        
        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/villa/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                          <Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.documentphotoigu}}/>

                            <TextRow title={'roomcount_num'} content={this.state.LoadedData.roomcountnum} />
                            <TextRow title={'capacity_num'} content={this.state.LoadedData.capacitynum} />
                            <TextRow title={'maxguests_num'} content={this.state.LoadedData.maxguestsnum} />
                            <TextRow title={'structurearea_num'} content={this.state.LoadedData.structureareanum} />
                            <TextRow title={'totalarea_num'} content={this.state.LoadedData.totalareanum} />
                            {this.state.LoadedData.addedbyowner==1 && <TextRow title={''} content={'دارای سند مالکیت به نام کاربر'} />}
                            <TextRow title={'چشم انداز'} content={this.state.LoadedData.viewtypeinfo.name} />
                            <TextRow title={'نوع ساختمان'} content={this.state.LoadedData.structuretypeinfo.name} />
                            {this.state.LoadedData.fulltimeservice==1 && <TextRow title={''} content={'تحویل ۲۴ ساعته'} />}
                            <TextRow title={'زمان تحویل/تخلیه'} content={this.state.LoadedData.timestartclk} />
                            <TextRow title={'نوع اقامتگاه'} content={this.state.LoadedData.owningtypeinfo.name} />
                            <TextRow title={'بافت'} content={this.state.LoadedData.areatypeinfo.name} />
                            <TextRow title={'توضیحات'} content={this.state.LoadedData.descriptionte} />
                            <TextRow title={'normalprice_prc'} content={this.state.LoadedData.normalpriceprc} />
                            <TextRow title={'holidayprice_prc'} content={this.state.LoadedData.holidaypriceprc} />
                            <TextRow title={'weeklyoff_num'} content={this.state.LoadedData.weeklyoffnum} />
                            <TextRow title={'monthlyoff_num'} content={this.state.LoadedData.monthlyoffnum} />
                          <Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.placemanplaceinfo.logoigu}}/>

                            <TextRow title={'عنوان'} content={this.state.LoadedData.placemanplaceinfo.title} />
                            <TextRow title={'توضیحات'} content={this.state.LoadedData.placemanplaceinfo.description} />
                            {this.state.LoadedData.placemanplaceinfo.active==1 && <TextRow title={''} content={'فعال/غیرفعال'} />}
                            <TextRow title={'آدرس'} content={this.state.LoadedData.placemanplaceinfo.address} />
                            <TextRow title={'محل'} content={this.state.LoadedData.placemanplaceinfo.provinceinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.cityinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.areainfo.title} />
                            <View style={generalStyles.mapContainer}>
                                <SimpleMap style={generalStyles.map} latitude={parseFloat(this.state.LoadedData.placemanplaceinfo.latitude)+0} longitude={parseFloat(this.state.LoadedData.placemanplaceinfo.longitude)+0} />
                            </View>
                            <View  style={{marginTop: '3%'}}>
                                <Button title='رزرو' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {
                                    // global.itemID=item.id;
                                    this.props.navigation.navigate('trapp_villaReserve', { name: 'trapp_villaReserve' });
                                    }
                                }/>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    