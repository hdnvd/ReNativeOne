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
import Trapp_optionSearch from './Trapp_optionSearch';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';
import jMoment from 'moment-jalaali';
import moment from 'moment';


export default class trapp_optionList extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={' option'} />
        };
    };
    state =
    {
        options:[],
        LastSearchFields:null,
        nextStartRow:0,
        SearchText:'',
        isLoading:false,
        isRefreshing:false,
        displaySearchPage:false,
    };
    async componentDidMount() {
        this._loadData('',null,true);
    }
    _loadData=(SearchText,SearchFields,isRefreshing)=>{
        let {nextStartRow,options}=this.state;
        if(isRefreshing)
        {
            options=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true,LastSearchFields:SearchFields});
        let Request=new SweetHttpRequest();
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize',Constants.DEFAULT_PAGESIZE);
        Request.appendVariable('__startrow',nextStartRow);
        Request.appendVariable('searchtext',SearchText);
        let filterString=Request.getParamsString();
        if(filterString!='') filterString='?'+filterString;
        let url='/trapp/option'+filterString;
        new SweetFetcher().Fetch(url,SweetFetcher.METHOD_GET, null, data => {
            this.setState({options:[...options,...data.Data],nextStartRow:nextStartRow+Constants.DEFAULT_PAGESIZE,isLoading:false,isRefreshing:false,SearchText:SearchText});
        });
    };
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                    {this.state.displaySearchPage &&
                    <Trapp_optionSearch
                        dataLoader={SearchFields=>{this._loadData('',SearchFields,true)}}
                    />
                    }
                    {!this.state.displaySearchPage &&
                    <View style={generalStyles.listcontainer}>
                <View style={generalStyles.searchbar}>
                    <TextInput placeholder='' underlineColorAndroid={'transparent'} style={generalStyles.searchbarinput}
                               onChangeText={(text) => {
                                   this._loadData(text,this.state.LastSearchFields,true);
                               }}/>
                </View>
                <View style={generalStyles.listcontainer}>
                    <FlatList
                        data={this.state.options}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>this._loadData(this.state.SearchText,this.state.LastSearchFields,false)}
                        onRefresh={()=>this._loadData(this.state.SearchText,this.state.LastSearchFields,true)}
                        refreshing={this.state.isRefreshing}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.3}
                        renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={() => {
                                global.itemID=item.id;
                                this.props.navigation.navigate('trapp_optionManage', { name: 'trapp_optionManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.name}</Text>
                <Text style={generalStyles.simplelabel}>{item.free}</Text>
                <Text style={generalStyles.simplelabel}>{item.countable}</Text>
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
    