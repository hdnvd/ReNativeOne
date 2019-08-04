import React, {Component} from 'react'
import {Button} from 'react-native-elements';
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
import TextRow from "../../../../sweet/components/TextRow";
import Localization from "../../../../classes/Localization";


export default class trapp_villaList extends Component<{}> {
    SORTFIELD_NORMALPRICE = 'normalpriceprc';
    SORTFIELD_DISTANCE = 'distance';
    state =
        {
            villas: [],
            nextStartRow: 0,
            SearchText: '',
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
            sortField: this.SORTFIELD_NORMALPRICE,
            // location:{
            //     "coords":{
            //         latitude:null,
            //         longitude:null,
            //     },
            // },
            location: {
                "coords":
                    {
                        "longitude": 51,
                        "latitude": 35
                    }
            }
        };

    constructor(props) {
        super(props);
        this._findCoordinates();
    }

    static onFindClick: trapp_villaList.onFindClick;

    async componentDidMount() {
        this._loadData('', null, true);
        this.props.navigation.setParams({
            onFindClick: () => {
                this.setState({displaySearchPage: true});
            },
            onReserveListClick: () => {
                this.props.navigation.navigate('trapp_orderList', {name: 'trapp_orderList'});
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
                this.setState({location: position}, () => {
                    this._loadData(this.state.SearchText, null, true);
                });

            },
            error => Alert.alert(error.message),
            {enableHighAccuracy: false, timeout: 20000}
        );
    };
    _loadData = (SearchText, SearchFields, isRefreshing) => {
        let {nextStartRow, villas} = this.state;
        if (isRefreshing) {
            villas = [];
            nextStartRow = 0;
        }
        this.setState({isRefreshing: isRefreshing, isLoading: true});
        let Request = new SweetHttpRequest();
        console.log(SearchFields);
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize', Constants.DEFAULT_PAGESIZE);
        if (this.state.sortField === this.SORTFIELD_NORMALPRICE)
            Request.appendVariable('normalpriceprc__sort', '1');
        if (this.state.sortField === this.SORTFIELD_DISTANCE)
            Request.appendVariable('distance__sort', '1');
        try {

            Request.appendVariable('userlatitude', this.state.location.coords.latitude);
            Request.appendVariable('userlongitude', this.state.location.coords.longitude);
        }
        catch (e) {

        }
        Request.appendVariable('__startrow', nextStartRow);
        Request.appendVariable('searchtext', SearchText);
        let filterString = Request.getParamsString();
        if (filterString != '') filterString = '?' + filterString;
        let url = '/trapp/villa' + filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, data => {
            this.setState({
                villas: [...villas, ...data.Data],
                nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                isLoading: false,
                isRefreshing: false,
                SearchText: SearchText,
                displaySearchPage: false
            });
        });
    };

    render() {
        // alert(Localization.isPhoneRTL());
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        let Window=Dimensions.get('window');
        let captionStyle = {
            ...StyleSheet.flatten(generalStyles.caption),
            color: '#333333',
            fontSize: 10,
        };
        let contentStyle = {
            ...StyleSheet.flatten(generalStyles.content),
            color: '#333333',
            fontSize: 10,
        };
        let ItemStyle={width: '50%',marginTop: 10};
        return (<View style={{flex: 1}}>
                {this.state.displaySearchPage &&
                <Trapp_villaSearch
                    dataLoader={SearchFields => {
                        this._loadData('', SearchFields, true)
                    }}
                />
                }
                {!this.state.displaySearchPage &&
                <View style={generalStyles.listcontainer}>

                    <View style={generalStyles.listTopBar}>

                        <TouchableHighlight onPress={() => {
                            this.setState({sortField: this.state.sortField === this.SORTFIELD_NORMALPRICE ? this.SORTFIELD_DISTANCE : this.SORTFIELD_NORMALPRICE}, () => {
                                this._loadData(this.state.SearchText, null, true)
                            })
                        }}
                                            activeOpacity={0.3}
                                            underlayColor='#ffffff'>
                            <View style={generalStyles.listTopBarItem}>
                                <View
                                    style={this.state.sortField === this.SORTFIELD_DISTANCE ? generalStyles.listTopBarItemButtonIconContainerSelected : generalStyles.listTopBarItemButtonIconContainer}>
                                    <Image source={require('../../../../images/distance.png')}
                                           style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                                </View>
                                <View
                                    style={this.state.sortField === this.SORTFIELD_NORMALPRICE ? generalStyles.listTopBarItemButtonIconContainerSelected : generalStyles.listTopBarItemButtonIconContainer}>
                                    <Image source={require('../../../../images/dollar.png')}
                                           style={generalStyles.listTopBarItemButtonIcon} resizeMode={'stretch'}/>
                                </View>
                                <Text style={generalStyles.listTopBarItemText}>مرتب سازی</Text>
                                <Image source={require('../../../../images/sort.png')}
                                       style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                            this.setState({displaySearchPage: true})
                        }}
                                            activeOpacity={0.3}
                                            underlayColor='#eee'>
                            <View style={generalStyles.listTopBarItem} >

                                <Text style={generalStyles.listTopBarItemText}>جستجو</Text>
                                <Image source={require('../../../../images/filter.png')}
                                       style={generalStyles.listTopBarItemIcon} resizeMode={'stretch'}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={generalStyles.listcontainer}>
                        <FlatList
                            data={this.state.villas}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => this._loadData(this.state.SearchText, null, false)}
                            onRefresh={() => this._loadData(this.state.SearchText, null, true)}
                            refreshing={this.state.isRefreshing}
                            keyExtractor={item => item.id}
                            onEndReachedThreshold={0.3}
                            renderItem={({item}) =>
                                <TouchableWithoutFeedback onPress={() => {
                                    global.villaID = item.id;
                                    this.props.navigation.navigate('trapp_villaView', {name: 'trapp_villaView'});
                                }}>
                                    <View style={generalStyles.ListItem}>
                                        <View style={{justifyContent: Localization.getFlexStart(),
                                            flexDirection:Localization.getRowReverseDirection(),
                                            flexWrap:'wrap',width:Window.width*0.45,height: StyleSheet.flatten(generalStyles.listitemthumbnail).width+20}}>
                                        {item.hasOwnProperty('distance') &&
                                        <TextRow  style={{width: '100%',marginTop: 10}} logo={require('../../files/images/icon/colored/distance.png')}
                                                 captionStyle={captionStyle} contentStyle={contentStyle} title={''}
                                                 content={Math.round(item.distance * 100) / 100 + ' کیلومتر'}/>
                                        }
                                        <TextRow style={ItemStyle} captionStyle={captionStyle}
                                                 contentStyle={contentStyle} title={''} content={item.roomcountnum}
                                                 logo={require('../../files/images/icon/colored/roomcount.png')}/>
                                        <TextRow style={ItemStyle} captionStyle={captionStyle}
                                                 contentStyle={contentStyle} title={''} content={item.capacitynum}
                                                 logo={require('../../files/images/icon/colored/roomcount.png')}/>
                                        <TextRow  style={ItemStyle} captionStyle={captionStyle} contentStyle={contentStyle} title={''}
                                                 content={item.viewtypecontent}
                                                 logo={require('../../files/images/icon/colored/view.png')}/>
                                        <TextRow  style={ItemStyle} captionStyle={captionStyle} contentStyle={contentStyle} title={''}
                                                 content={item.structuretypecontent}
                                                 logo={require('../../files/images/icon/colored/structuretype.png')}/>
                                        <TextRow  style={ItemStyle} captionStyle={captionStyle} contentStyle={contentStyle} title={''}
                                                 content={item.normalpriceprc + ' ریال'}
                                                 logo={require('../../files/images/icon/colored/normalprice.png')}/>
                                        <TextRow  style={ItemStyle} captionStyle={captionStyle} contentStyle={contentStyle} title={''}
                                                 content={item.holidaypriceprc + ' ریال'}
                                                 logo={require('../../../../images/timeiconcolored.png')}/>
                                        </View>
                                        <Image style={generalStyles.listitemthumbnail}
                                               source={{uri: Constants.ServerURL + '/' + item.photo}}/>
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
let Window = Dimensions.get('window');
const Styles = StyleSheet.create(
    {
        ItemLogo:
            {
                height: Window.width * 0.05,
                width: Window.width * 0.05,
                marginHorizontal: Window.width * 0.01,
                position: 'relative',
                right: 0,
            },
    }
);
