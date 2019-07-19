import React, {Component} from 'react'
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
    FlatList
} from 'react-native';
const jMoment = require('moment-jalaali');
const moment = require('moment');
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import SweetHttpRequest from '../../../../classes/sweet-http-request';


export default class trapp_orderList extends Component<{}> {
    state =
        {
            orders: [],
            LastSearchFields: null,
            nextStartRow: 0,
            SearchText: '',
            isLoading: false,
            isRefreshing: false,
            displaySearchPage: false,
        };

    async componentDidMount() {
        this._loadData('', null, true);
    }

    _loadData = (SearchText, SearchFields, isRefreshing) => {
        let {nextStartRow, orders} = this.state;
        if (isRefreshing) {
            orders = [];
            nextStartRow = 0;
        }
        this.setState({isRefreshing: isRefreshing, isLoading: true, LastSearchFields: SearchFields});
        let Request = new SweetHttpRequest();
        Request.appendVariablesFromObjectKeys(SearchFields);
        Request.appendVariable('__pagesize', Constants.DEFAULT_PAGESIZE);
        Request.appendVariable('__startrow', nextStartRow);
        Request.appendVariable('searchtext', SearchText);
        let filterString = Request.getParamsString();
        if (filterString != '') filterString = '?' + filterString;
        let url = '/trapp/order/user' + filterString;
        new SweetFetcher().Fetch(url, SweetFetcher.METHOD_GET, null, data => {
            this.setState({
                orders: [...orders, ...data.Data],
                nextStartRow: nextStartRow + Constants.DEFAULT_PAGESIZE,
                isLoading: false,
                isRefreshing: false,
                SearchText: SearchText
            });
        });
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        return (<View style={{flex: 1}}>
                {!this.state.displaySearchPage &&

                <View style={generalStyles.listcontainer}>

                    <View style={generalStyles.listcontainer}>
                        <FlatList
                            data={this.state.orders}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => this._loadData(this.state.SearchText, this.state.LastSearchFields, false)}
                            onRefresh={() => this._loadData(this.state.SearchText, this.state.LastSearchFields, true)}
                            refreshing={this.state.isRefreshing}
                            keyExtractor={item => item.id}
                            onEndReachedThreshold={0.3}
                            renderItem={({item}) =>
                                <TouchableWithoutFeedback onPress={() => {
                                    global.itemID = item.villa;
                                    this.props.navigation.navigate('trapp_villaView', {name: 'trapp_villaView'});
                                }}>
                                    <View style={generalStyles.ListItem}>

                                        <Text style={generalStyles.simplelabel}>مبلغ پرداختی:{item.priceprc}</Text>
                                        <Text style={generalStyles.simplelabel}>شهر:{item.villacontent}</Text>
                                        <Text style={generalStyles.simplelabel}>وضعیت:{item.orderstatuscontent}</Text>
                                        {item.startdate > 0 &&
                                        <Text style={generalStyles.simplelabel}>شروع
                                            اقامت:{jMoment.utc(moment.unix(item.startdate)).format('jYYYY/jMM/jDD')} </Text>
                                        }
                                        <Text style={generalStyles.simplelabel}>مدت اقامت:{item.durationnum} روز</Text>

                                        <Text style={generalStyles.simplelabel}>تلفن تماس رزرو
                                            کننده:{item.usercontent}</Text>
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
