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

export default class  trapp_villaView extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                roomcountnum:'',
                capacitynum:'',
                maxguestsnum:'',
                structureareanum:'',
                totalareanum:'',
                    placemanplaceinfo:{
                title:'',
                description:'',
                address:'',
                    provinceinfo:{},
                    cityinfo:{},
                    areainfo:{},
                    userinfo:{},
                    latitude:0.0,
                    longitude:0.0,},
                    viewtypeinfo:{},
                    structuretypeinfo:{},
                timestartclk:'',
                    owningtypeinfo:{},
                    areatypeinfo:{},
                descriptionte:'',
                normalpriceprc:'',
                holidaypriceprc:'',
                weeklyoffnum:'',
                monthlyoffnum:'',
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

                            <TextRow title={'تعداد اتاق'} content={this.state.LoadedData.roomcountnum} />
                            <TextRow title={'ظرفیت به نفر'} content={this.state.LoadedData.capacitynum} />
                            <TextRow title={'حداکثر تعداد مهمان'} content={this.state.LoadedData.maxguestsnum} />
                            <TextRow title={'متراژ بنا'} content={this.state.LoadedData.structureareanum} />
                            <TextRow title={'متراژ کل'} content={this.state.LoadedData.totalareanum} />
                            {this.state.LoadedData.addedbyowner==1 && <TextRow title={''} content={'دارای سند مالکیت به نام کاربر'} />}
                            <TextRow title={'چشم انداز'} content={this.state.LoadedData.viewtypeinfo.name} />
                            <TextRow title={'نوع ساختمان'} content={this.state.LoadedData.structuretypeinfo.name} />
                            {this.state.LoadedData.fulltimeservice==1 && <TextRow title={''} content={'تحویل ۲۴ ساعته'} />}
                            <TextRow title={'زمان تحویل/تخلیه'} content={this.state.LoadedData.timestartclk} />
                            <TextRow title={'نوع اقامتگاه'} content={this.state.LoadedData.owningtypeinfo.name} />
                            <TextRow title={'بافت'} content={this.state.LoadedData.areatypeinfo.name} />
                            <TextRow title={'توضیحات'} content={this.state.LoadedData.descriptionte} />
                            <TextRow title={'قیمت در روزهای عادی'} content={this.state.LoadedData.normalpriceprc} />
                            <TextRow title={'قیمت در روزهای تعطیل'} content={this.state.LoadedData.holidaypriceprc} />
                            <TextRow title={'تخفیف رزرو بیش از یک هفته'} content={this.state.LoadedData.weeklyoffnum} />
                            <TextRow title={'تخفیف رزرو بیش از یک ماه'} content={this.state.LoadedData.monthlyoffnum} />
                            <TextRow title={'آدرس'} content={this.state.LoadedData.placemanplaceinfo.address} />
                            <TextRow title={'محل'} content={this.state.LoadedData.placemanplaceinfo.provinceinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.cityinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.areainfo.title} />
                            <SweetButton title={'رزرو'} onPress={()=>{
                                global.villaId=global.itemID;
                                this.props.navigation.navigate('trapp_villaReserve', { name: 'trapp_villaReserve' });
                            }}/>
                            <View style={generalStyles.mapContainer}>
                                <SimpleMap style={generalStyles.map} latitude={parseFloat(this.state.LoadedData.placemanplaceinfo.latitude)+0} longitude={parseFloat(this.state.LoadedData.placemanplaceinfo.longitude)+0} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    