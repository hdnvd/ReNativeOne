import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Image,TouchableWithoutFeedback,Text,Picker,TextInput,ScrollView,FlatList } from 'react-native';
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
    state =
    {
        villas:[],
        nextStartRow:0,
        SearchText:'',
        isLoading:false,
        isRefreshing:false,
        displaySearchPage:false,
    };
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
    static navigationOptions =({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerLeft: null,
            headerTitle: <LogoTitle isindex={'1'} onFindClick={params.onFindClick} onReserveListClick={params.onReserveListClick}/>
        };

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
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize',Constants.DEFAULT_PAGESIZE);
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
                <View style={generalStyles.searchbar}>
                    <TextInput placeholder='' underlineColorAndroid={'transparent'} style={generalStyles.searchbarinput}
                               onChangeText={(text) => {
                                   this._loadData(text,null,true);
                               }}/>
                </View>
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
                                global.itemID=item.id;
                                this.props.navigation.navigate('trapp_villaView', { name: 'trapp_villaView' });
                            }}>
                            <View style={generalStyles.ListItem}>

                <Text style={generalStyles.simplelabel}>{item.roomcountnum}</Text>
                <Text style={generalStyles.simplelabel}>{item.capacitynum}</Text>
                <Text style={generalStyles.simplelabel}>{item.maxguestsnum}</Text>
                <Text style={generalStyles.simplelabel}>{item.structureareanum}</Text>
                <Text style={generalStyles.simplelabel}>{item.totalareanum}</Text>
                <Text style={generalStyles.simplelabel}>{item.placemanplacecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.addedbyowner}</Text>
                <Text style={generalStyles.simplelabel}>{item.viewtypecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.structuretypecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.fulltimeservice}</Text>
                <Text style={generalStyles.simplelabel}>{item.timestartclk}</Text>
                <Text style={generalStyles.simplelabel}>{item.owningtypecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.areatypecontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.descriptionte}</Text>
                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.documentphotoigu}}/>

                <Text style={generalStyles.simplelabel}>{item.normalpriceprc}</Text>
                <Text style={generalStyles.simplelabel}>{item.holidaypriceprc}</Text>
                <Text style={generalStyles.simplelabel}>{item.weeklyoffnum}</Text>
                <Text style={generalStyles.simplelabel}>{item.monthlyoffnum}</Text>
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
    