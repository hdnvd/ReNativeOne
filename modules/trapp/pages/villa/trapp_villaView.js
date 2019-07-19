import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Text,
    Image,Platform,Linking,
    TouchableWithoutFeedback, FlatList
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import SimpleMap from '../../../../components/SimpleMap';
import Carousel from 'react-native-snap-carousel';

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
                    reservedbyuser:false,
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
                    villaphotos:[],
                },

            };

        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/villa/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
            new SweetFetcher().Fetch('/placeman/placephoto?place='+data.Data.placemanplace,SweetFetcher.METHOD_GET, null, PhotoData => {
                this.setState({villaphotos:PhotoData.Data,isLoading:false});
            });
        });

    };
    _renderItem= ({item, index})=>{
        return (
            <View>
                <Image style={generalStyles.topimagelistitem} source={{uri: Constants.ServerURL+'/'+item.photoigu}}/>
            </View>
        );
    };
    _openGps = () => {
        let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
        let url = scheme + this.state.LoadedData.placemanplaceinfo.latitude+','+this.state.LoadedData.placemanplaceinfo.longitude;
        console.log(url);
        this._openURL(url);
    };

    _openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                console.log("Don't know how to open URI: " + URL);
            }
        });
    };
    render() {
        let Window = Dimensions.get('window');
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>

                        <View style={generalStyles.container}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.villaphotos}
                                renderItem={this._renderItem}
                                sliderWidth={Window.width}
                                itemWidth={Window.width}
                            />
                            {/*<FlatList*/}
                                {/*data={this.state.villaphotos}*/}
                                {/*showsVerticalScrollIndicator={false}*/}
                                {/*horizontal={true}*/}
                                {/*// onEndReached={()=>this._loadData(this.state.SearchText,null,false)}*/}
                                {/*// onRefresh={()=>this._loadData(this.state.SearchText,null,true)}*/}
                                {/*// refreshing={this.state.isRefreshing}*/}
                                {/*keyExtractor={item => item.id}*/}
                                {/*// onEndReachedThreshold={0.3}*/}
                                {/*renderItem={({item}) =>*/}
                                    {/*<TouchableWithoutFeedback onPress={() => {*/}
                                        {/*global.itemID=item.id;*/}
                                        {/*this.props.navigation.navigate('trapp_villaView', { name: 'trapp_villaView' });*/}
                                    {/*}}>*/}
                                        {/*<View style={generalStyles.ListItem}>*/}
                                            {/*<Image style={generalStyles.topimagelistitem} source={{uri: Constants.ServerURL+'/'+item.photoigu}}/>*/}
                                        {/*</View>*/}
                                    {/*</TouchableWithoutFeedback>*/}
                                {/*}*/}
                            {/*/>*/}

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
                            {this.state.LoadedData.reservedbyuser&&
                            <View>
                                <SweetButton title={'مشاهده اطلاعات میزبان'} onPress={(onEnd)=>{
                                    global.villaOwnerUserId=this.state.LoadedData.placemanplaceinfo.user;
                                    this.props.navigation.navigate('trapp_villaownerView', { name: 'trapp_villaownerView' });
                                    onEnd(true);
                                }}/>
                                <SweetButton title={'مسیریابی ویلا'} onPress={(onEnd)=>{
                                    this._openGps();
                                    onEnd(true);
                                }}/>
                            </View>
                            }
                            <View style={generalStyles.mapContainer}>
                                <SimpleMap blured={!this.state.LoadedData.reservedbyuser} style={generalStyles.map} latitude={parseFloat(this.state.LoadedData.placemanplaceinfo.latitude)+0} longitude={parseFloat(this.state.LoadedData.placemanplaceinfo.longitude)+0} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
