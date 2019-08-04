import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Alert,
    ScrollView,
    Dimensions,
    AsyncStorage,
    Text,
    Image, Platform, Linking, Modal,
    TouchableWithoutFeedback, FlatList, ImageBackground
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
import IconItem from "../../../../sweet/components/IconItem";

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
            <View style={{...StyleSheet.flatten(generalStyles.topimagelistitem),position: 'relative',zIndex:2,}}>
                {/*<ImageZoom cropWidth={Dimensions.get('window').width}*/}
                           {/*cropHeight={Dimensions.get('window').width/2}*/}
                           {/*imageWidth={Dimensions.get('window').width}*/}
                           {/*imageHeight={Dimensions.get('window').width/2}>*/}
                <Image style={generalStyles.topimagelistitem} source={{uri: Constants.ServerURL+'/'+item.photoigu}}/>
                {/*</ImageZoom>*/}
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
        let IconStyle=StyleSheet.flatten(generalStyles.IconItemStyle);
        // console.log('images');
        // console.log(images);
        // console.log([{url:'http://10.0.2.2/img/placeman/placephoto/photoigu-13.jpg'},{url:'http://10.0.2.2/img/placeman/placephoto/photoigu-14.jpg'}]);
            return (
                <View style={{flex:1}}  >
                    <ImageBackground source={require('../../../../images/viewbg.png')}
                                     // style={{width: '100%', height: Window.height*0.8,position: 'relative',zIndex:2,}}
                                     style={{width: '100%', height: '100%',position: 'relative',zIndex:2,}}

                    >

                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>

                                <View style={generalStyles.containerWithNoBG}>

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

                            <View flexDirection={'row'}>
                                <IconItem logo={require('../../files/images/icon/room.png')} title={'تعداد اتاق'} content={this.state.LoadedData.roomcountnum} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.15)',}}/>
                                <IconItem logo={require('../../../../images/timeicon.png')} title={'ظرفیت'} content={this.state.LoadedData.capacitynum}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.2)',}}/>
                                <IconItem logo={require('../../../../images/timeicon.png')} title={'حداکثر تعداد مهمان'} content={this.state.LoadedData.maxguestsnum}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.25)',}}/>
                            </View>
                                    <View flexDirection={'row'}>
                                        <IconItem logo={require('../../files/images/icon/structurearea.png')} title={'متراژ بنا'} content={this.state.LoadedData.structureareanum} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.64)',}}/>
                                        <IconItem logo={require('../../files/images/icon/area.png')} title={'متراژ کل'} content={this.state.LoadedData.totalareanum}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.34)',}}/>
                                        <IconItem logo={require('../../files/images/icon/view.png')} title={'چشم انداز'} content={this.state.LoadedData.viewtypeinfo.name}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.25)',}}/>
                                    </View>
                                    <View flexDirection={'row'}>
                                        <IconItem logo={require('../../files/images/icon/structurearea.png')} title={'نوع ساختمان'} content={this.state.LoadedData.structuretypeinfo.name} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.50)',}}/>
                                        <IconItem logo={require('../../../../images/timeicon.png')} title={'تحویل ۲۴ ساعته'} content={this.state.LoadedData.fulltimeservice==1?'دارد':'ندارد'}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.48)',}}/>
                                        <IconItem logo={require('../../files/images/icon/view.png')} title={'ساعت تحویل'} content={this.state.LoadedData.timestartclk}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.75)',}}/>
                                    </View>
                                    <View flexDirection={'row'}>
                                        <IconItem logo={require('../../files/images/icon/structurearea.png')} title={'نوع اقامتگاه'} content={this.state.LoadedData.owningtypeinfo.name} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.88)',}}/>
                                        <IconItem logo={require('../../../../images/timeicon.png')} title={'بافت'} content={this.state.LoadedData.areatypeinfo.name} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.73)',}}/>
                                        <IconItem logo={require('../../files/images/icon/view.png')} title={'قیمت عادی'} content={this.state.LoadedData.normalpriceprc}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.50)',}}/>
                                    </View>
                                    <View flexDirection={'row'}>
                                        <IconItem logo={require('../../files/images/icon/structurearea.png')} title={'قیمت در تعطیلات'} content={this.state.LoadedData.holidaypriceprc} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.64)',}}/>
                                        <IconItem logo={require('../../../../images/timeicon.png')} title={'تخفیف رزرو هفتگی'} content={this.state.LoadedData.weeklyoffnum} style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.34)',}}/>
                                        <IconItem logo={require('../../files/images/icon/view.png')} title={'تخفیف رزرو ماهانه'} content={this.state.LoadedData.monthlyoffnum}  style={{...IconStyle,backgroundColor:'rgba(168,236,131,0.25)',}}/>
                                    </View>
                                <TextRow title={'کد ویلا'} content={this.state.LoadedData.id} />
                            {/*<TextRow title={'تعداد اتاق'} content={this.state.LoadedData.roomcountnum} />*/}
                            {/*<TextRow title={'ظرفیت به نفر'} content={this.state.LoadedData.capacitynum} />*/}
                            {/*<TextRow title={'حداکثر تعداد مهمان'} content={this.state.LoadedData.maxguestsnum} />*/}
                            {/*<TextRow title={'متراژ بنا'} content={this.state.LoadedData.structureareanum} />*/}
                            {/*<TextRow title={'متراژ کل'} content={this.state.LoadedData.totalareanum} />*/}
                            {/*{this.state.LoadedData.addedbyowner==1 && <TextRow title={''} content={'دارای سند مالکیت به نام کاربر'} />}*/}
                            {/*<TextRow title={'چشم انداز'} content={this.state.LoadedData.viewtypeinfo.name} />*/}
                            {/*<TextRow title={'نوع ساختمان'} content={this.state.LoadedData.structuretypeinfo.name} />*/}
                            {/*{this.state.LoadedData.fulltimeservice==1 && <TextRow title={''} content={'تحویل ۲۴ ساعته'} />}*/}
                            {/*<TextRow title={'زمان تحویل/تخلیه'} content={this.state.LoadedData.timestartclk} />*/}
                            {/*<TextRow title={'نوع اقامتگاه'} content={this.state.LoadedData.owningtypeinfo.name} />*/}
                            {/*<TextRow title={'بافت'} content={this.state.LoadedData.areatypeinfo.name} />*/}
                            {/*<TextRow title={'توضیحات'} content={this.state.LoadedData.descriptionte} />*/}
                            {this.state.villaOptions.map(dt=>{
                                return <TextRow title={'تعداد '+dt.name} content={dt.countnum+''}/>
                            })}
                            {/*<TextRow title={'قیمت در روزهای عادی'} content={this.state.LoadedData.normalpriceprc} />*/}
                            {/*<TextRow title={'قیمت در روزهای تعطیل'} content={this.state.LoadedData.holidaypriceprc} />*/}
                            {/*<TextRow title={'تخفیف رزرو بیش از یک هفته'} content={this.state.LoadedData.weeklyoffnum} />*/}
                            {/*<TextRow title={'تخفیف رزرو بیش از یک ماه'} content={this.state.LoadedData.monthlyoffnum} />*/}
                            <TextRow title={'آدرس'} content={this.state.LoadedData.placemanplaceinfo.address} />
                            <TextRow title={'محل'} content={this.state.LoadedData.placemanplaceinfo.provinceinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.cityinfo.title+' - '+this.state.LoadedData.placemanplaceinfo.areainfo.title} />
                                    <SweetButton style={Styles.Button1} title={'رزرو'} onPress={()=>{
                                global.villaId=global.villaID;
                                this.props.navigation.navigate('trapp_villaReserve', { name: 'trapp_villaReserve' });
                            }}/>
                            {this.state.LoadedData.reservedbyuser&&
                            <View>
                                <SweetButton style={Styles.Button2}  title={'مشاهده اطلاعات میزبان'} onPress={(onEnd)=>{
                                    global.villaOwnerUserId=this.state.LoadedData.placemanplaceinfo.user;
                                    this.props.navigation.navigate('trapp_villaownerView', { name: 'trapp_villaownerView' });
                                    onEnd(true);
                                }}/>
                                <SweetButton style={Styles.Button3}  title={'مسیریابی ویلا'} onPress={(onEnd)=>{
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
                    </ImageBackground>
                    {/*<View style={Styles.FooterBar} flexDirection={'row'}>*/}
                        {/*<IconItem displayLogo={false} title={'رزرو اتاق'} content={''} style={Styles.BottomIcon1}/>*/}
                        {/*<IconItem displayLogo={false} title={'مشاهده اطلاعات میزبان'} content={''} style={Styles.BottomIcon2}/>*/}
                        {/*<IconItem displayLogo={false} title={'مسیریابی ویلا'} content={''} style={Styles.BottomIcon3}/>*/}
                    {/*</View>*/}
                    {/*<View style={Styles.Footer} flexDirection={'row'}>*/}

                    {/*</View>*/}
                </View>
            )
    }
}
let Window = Dimensions.get('window');
const Styles=StyleSheet.create(
    {
        FooterBar:
            {
                width: Window.width,
                height:generalStyles.IconItemStyle.height,
                backgroundColor:'rgba(0,0,0,0)',
                marginTop: -1*generalStyles.IconItemStyle.height,
                position: 'relative',
                zIndex:3,
            },
        Footer:
            {
                height:generalStyles.IconItemStyle.height,
                width: Window.width,
                backgroundColor:'#b5ff90',
                borderTopWidth: 2,
                borderColor: '#003700',
                marginTop: -1*generalStyles.IconItemStyle.height,
                position: 'relative',
                zIndex:2,
            },
        BottomIcon1:
            {
                ...StyleSheet.flatten(generalStyles.IconItemStyle),
                marginVertical:0,
                backgroundColor:'rgba(0,55,0,1)',
            },
        BottomIcon2:
            {
                ...StyleSheet.flatten(generalStyles.IconItemStyle),
                backgroundColor:'rgba(106,190,63,1)',
                marginVertical:0,
            },
        BottomIcon3:
            {
                ...StyleSheet.flatten(generalStyles.IconItemStyle),
                backgroundColor:'rgba(42,136,0,1)',
                marginVertical:0,
            },
        Button1:
            {...StyleSheet.flatten(generalStyles.SweetButton),backgroundColor:'rgb(42,136,0)',
                borderWidth: 1,
                borderColor: '#000000',
            },
        Button2:
            {...StyleSheet.flatten(generalStyles.SweetButton),backgroundColor:'rgb(92,199,44)',
                borderWidth: 1,
                borderColor: '#000000',
            },
        Button3:
            {...StyleSheet.flatten(generalStyles.SweetButton),backgroundColor:'rgb(121,222,76)',
                borderWidth: 1,
                borderColor: '#000000',
            },
    }
);
