import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Text,
    Image,Platform,Linking,Modal,
    TouchableWithoutFeedback, FlatList
} from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import SimpleMap from '../../../../components/SimpleMap';
import Carousel from 'react-native-snap-carousel';
import TextBox from "../../../../sweet/components/TextBox";

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
                villaOptions:[],
            };

        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/villa/'+global.villaID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:{...data.Data,villaphotos:[]},isLoading:false});
            new SweetFetcher().Fetch('/placeman/placephoto?place='+data.Data.placemanplace,SweetFetcher.METHOD_GET, null, PhotoData => {
                this.setState({LoadedData:{...this.state.LoadedData,villaphotos:PhotoData.Data},isLoading:false});
            });
        });
        new SweetFetcher().Fetch('/trapp/villaoption/byvilla/'+global.villaID,SweetFetcher.METHOD_GET, null, data => {
            this.setState({villaOptions:data.Data});
        });

    };
    _renderItem= ({item, index})=>{
        return (
            <View style={generalStyles.topimagelistitem}>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                           cropHeight={Dimensions.get('window').width/2}
                           imageWidth={Dimensions.get('window').width}
                           imageHeight={Dimensions.get('window').width/2}>
                <Image style={generalStyles.topimagelistitem} source={{uri: Constants.ServerURL+'/'+item.photoigu}}/>
                </ImageZoom>
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
        let images=this.state.LoadedData.villaphotos.map(
            item=>{return {url:Constants.ServerURL+'/'+item.photoigu}}
        );
        // console.log('images');
        // console.log(images);
        // console.log([{url:'http://10.0.2.2/img/placeman/placephoto/photoigu-13.jpg'},{url:'http://10.0.2.2/img/placeman/placephoto/photoigu-14.jpg'}]);
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>

                        <View style={generalStyles.container}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.LoadedData.villaphotos}
                                renderItem={this._renderItem}
                                sliderWidth={Window.width}
                                itemWidth={Window.width}
                            />
                            {/*<Modal visible={true} transparent={false}>*/}
                            {/*<ImageViewer imageUrls={[{url:'http://10.0.2.2/img/placeman/placephoto/photoigu-13.jpg'},{url:'http://10.0.2.2/img/placeman/placephoto/photoigu-14.jpg'}]}/>*/}
                            {/*</Modal>*/}
                            <TextRow title={'کد ویلا'} content={this.state.LoadedData.id} />
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
                            {this.state.villaOptions.map(dt=>{
                                return <TextRow title={'تعداد '+dt.name} content={dt.countnum+''}/>
                            })}
                            <TextRow title={'قیمت در روزهای عادی'} content={this.state.LoadedData.normalpriceprc} />
                            <TextRow title={'قیمت در روزهای تعطیل'} content={this.state.LoadedData.holidaypriceprc} />
                            <TextRow title={'تخفیف رزرو بیش از یک هفته'} content={this.state.LoadedData.weeklyoffnum} />
                            <TextRow title={'تخفیف رزرو بیش از یک ماه'} content={this.state.LoadedData.monthlyoffnum} />
                            <TextRow title={'آدرس'} content={this.state.LoadedData.placemanplaceinfo.address} />
                            <TextRow title={'محل'} content={this.state.LoadedData.placemanplaceinfo.provinceinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.cityinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.areainfo.title} />
                            <SweetButton title={'رزرو'} onPress={()=>{
                                global.villaId=global.villaID;
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
