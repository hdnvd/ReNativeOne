import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    AsyncStorage,
    Image,
    TouchableWithoutFeedback,
    Text,
    Picker,
    TextInput,
    ScrollView,
    FlatList,
    TouchableHighlight
} from 'react-native';
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
import CheckedRow from '../../../../sweet/components/CheckedRow';
import Trapp_villaSearch from './Trapp_villaSearch';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import LogoTitle from "../../../../components/LogoTitle";


export default class trapp_villaList extends Component<{}> {
    SORTFIELD_NORMALPRICE='normalpriceprc';
    SORTFIELD_DISTANCE='distance';
    state =
    {
        villas:[],
        nextStartRow:0,
        SearchText:'',
        isLoading:false,
        isRefreshing:false,
        displaySearchPage:false,
        sortField:this.SORTFIELD_NORMALPRICE,
        // location:{
        //     "coords":{
        //         latitude:null,
        //         longitude:null,
        //     },
        // },
        location:{
            "coords":
                {
                    "longitude":51,
                    "latitude":35
                }
        }
    };

    constructor(props) {
        super(props);
        this._findCoordinates();
    }

    static onFindClick: trapp_villaList.onFindClick;
    async componentDidMount() {
        this._loadData('',null,true);
        this.props.navigation.setParams({
            onFindClick: () => {
                this.setState({displaySearchPage:true});
            },
            onReserveListClick:()=>{
                this.props.navigation.navigate('trapp_orderList', { name: 'trapp_orderList' });
            }
        });

    }
    // static navigationOptions =({navigation}) => {
    //     const {params = {}} = navigation.state;
    //     return {
    //         headerLeft: null,
    //         headerTitle: <LogoTitle isindex={'1'} onFindClick={params.onFindClick} onReserveListClick={params.onReserveListClick}/>
    //     };
    //
    // };
    _findCoordinates = () => {
        // alert("finding");
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log(location);
                this.setState({ location:position },()=>{
                    this._loadData(this.state.SearchText,null,true);
                });

            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: false, timeout: 20000 }
        );
    };
    _loadData=(SearchText,SearchFields,isRefreshing)=>{
        let {nextStartRow,villas}=this.state;
        if(isRefreshing)
        {
            villas=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true});
        let Request=new SweetHttpRequest();
        console.log(SearchFields);
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize',Constants.DEFAULT_PAGESIZE);
        if(this.state.sortField===this.SORTFIELD_NORMALPRICE)
            Request.appendVariable('normalpriceprc__sort','1');
        if(this.state.sortField===this.SORTFIELD_DISTANCE)
            Request.appendVariable('distance__sort','1');
        try {

            Request.appendVariable('userlatitude',this.state.location.coords.latitude);
            Request.appendVariable('userlongitude',this.state.location.coords.longitude);
        }
        catch (e) {

        }
        Request.appendVariable('__startrow',nextStartRow);
        Request.appendVariable('searchtext',SearchText);
        let filterString=Request.getParamsString();
        if(filterString!='') filterString='?'+filterString;
        let url='/trapp/villa'+filterString;
        new SweetFetcher().Fetch(url,SweetFetcher.METHOD_GET, null, data => {
            this.setState({villas:[...villas,...data.Data],nextStartRow:nextStartRow+Constants.DEFAULT_PAGESIZE,isLoading:false,isRefreshing:false,SearchText:SearchText,displaySearchPage:false});
        });
    };
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                    {this.state.displaySearchPage &&
                    <Trapp_villaSearch
                        dataLoader={SearchFields=>{this._loadData('',SearchFields,true)}}
                    />
                    }
                    {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>

                        <View style={generalStyles.listTopBar} flexDirection={'row'}>

                            <TouchableHighlight onPress={()=>{this.setState({sortField:this.state.sortField===this.SORTFIELD_NORMALPRICE?this.SORTFIELD_DISTANCE:this.SORTFIELD_NORMALPRICE},()=>{this._loadData(this.state.SearchText,null,true)})}}
                                                activeOpacity={0.3}
                                                underlayColor='#ffffff'>
                            <View style={generalStyles.listTopBarItem}  flexDirection={'row'}>
                                <View style={this.state.sortField===this.SORTFIELD_DISTANCE?generalStyles.listTopBarItemButtonIconContainerSelected:generalStyles.listTopBarItemButtonIconContainer} >
                                <Image source={require('../../../../images/distance.png')} style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                                </View>
                                <View style={this.state.sortField===this.SORTFIELD_NORMALPRICE?generalStyles.listTopBarItemButtonIconContainerSelected:generalStyles.listTopBarItemButtonIconContainer} >
                                    <Image source={require('../../../../images/dollar.png')} style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                                </View>
                                <Text style={generalStyles.listTopBarItemText} >مرتب سازی</Text>
                                <Image source={require('../../../../images/sort.png')} style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                            </View>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=>{this.setState({displaySearchPage:true})}}
                                                activeOpacity={0.3}
                                                underlayColor='#eee'>
                            <View style={generalStyles.listTopBarItem}  flexDirection={'row'}>

                                <Text style={generalStyles.listTopBarItemText} >جستجو</Text>
                                <Image source={require('../../../../images/filter.png')} style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                            </View>
                            </TouchableHighlight>
                        </View>
                {/*<View style={generalStyles.searchbar}>*/}
                    {/*<TextInput placeholder='' underlineColorAndroid={'transparent'} style={generalStyles.searchbarinput}*/}
                               {/*onChangeText={(text) => {*/}
                                   {/*this._loadData(text,null,true);*/}
                               {/*}}/>*/}
                {/*</View>*/}
                <View style={generalStyles.listcontainer}>
                    <FlatList
                        data={this.state.villas}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>this._loadData(this.state.SearchText,null,false)}
                        onRefresh={()=>this._loadData(this.state.SearchText,null,true)}
                        refreshing={this.state.isRefreshing}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.3}
                        renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={() => {
                                global.villaID=item.id;
                                this.props.navigation.navigate('trapp_villaView', { name: 'trapp_villaView' });
                            }}>
                            <View style={generalStyles.ListItem}>

                                {item.hasOwnProperty('distance') &&
                                <Text
                                    style={generalStyles.simplelabel}>فاصله:{Math.round(item.distance*100)/100} کیلومتر</Text>
                                }
                <Text style={generalStyles.simplelabel}>تعداد اتاق:{item.roomcountnum}</Text>
                <Text style={generalStyles.simplelabel}>ظرفیت:{item.capacitynum}</Text>
                {/*<Text style={generalStyles.simplelabel}>{item.maxguestsnum}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.structureareanum}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.totalareanum}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.placemanplacecontent}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.addedbyowner}</Text>*/}
                <Text style={generalStyles.simplelabel}>{item.viewtypecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.structuretypecontent}</Text>
                {/*<Text style={generalStyles.simplelabel}>{item.fulltimeservice}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.timestartclk}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.owningtypecontent}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.areatypecontent}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.descriptionte}</Text>*/}
                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.documentphotoigu}}/>

                <Text style={generalStyles.simplelabel}>قیمت روزهای عادی:{item.normalpriceprc}</Text>
                <Text style={generalStyles.simplelabel}>قیمت روزهای تعطیل:{item.holidaypriceprc}</Text>
                {/*<Text style={generalStyles.simplelabel}>{item.weeklyoffnum}</Text>*/}
                {/*<Text style={generalStyles.simplelabel}>{item.monthlyoffnum}</Text>*/}
                            </View>
                            </TouchableWithoutFeedback>
                        }
                    />
                </View>
                </View>
                }
                </View>
            );
    }
}
