import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Image,TouchableWithoutFeedback,Text,TextInput,FlatList } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';


export default class trapp_villaList extends Component<{}> {
    state =
    {
        villas:[],
        nextStartRow:0,
        SearchText:'',
        isLoading:false,
        isRefreshing:false,
    };
    async componentDidMount() {
        this._loadData('',true);
    }
    _loadData=(SearchText,isRefreshing)=>{
        let {nextStartRow,villas}=this.state;
        if(isRefreshing)
        {
            villas=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true});
        new SweetFetcher().Fetch('/trapp/villa?searchtext='+SearchText+'&__startrow='+nextStartRow+'&__pagesize='+Constants.DEFAULT_PAGESIZE,SweetFetcher.METHOD_GET, null, data => {
            this.setState({villas:[...villas,...data.Data],nextStartRow:nextStartRow+Constants.DEFAULT_PAGESIZE,isLoading:false,isRefreshing:false,SearchText:SearchText});
        });
    };
    render() {
        const {height: heightOfDeviceScreen} =  Dimensions.get('window');
            return (<View style={{flex: 1}}>
                <View style={generalStyles.searchbar}>
                    <TextInput placeholder='' underlineColorAndroid={'transparent'} style={generalStyles.searchbarinput}
                               onChangeText={(text) => {
                                   this._loadData(text,true);
                               }}/>
                </View>
                <View style={generalStyles.listcontainer}>
                    <FlatList
                        data={this.state.villas}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>this._loadData(this.state.SearchText,false)}
                        onRefresh={()=>this._loadData(this.state.SearchText,true)}
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
            );
    }
}
    