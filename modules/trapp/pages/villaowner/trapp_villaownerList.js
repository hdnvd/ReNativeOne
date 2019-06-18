import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Image,TouchableWithoutFeedback,Text,TextInput,FlatList } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';


export default class trapp_villaownerList extends Component<{}> {
    state =
    {
        villaowners:[],
        nextStartRow:0,
        SearchText:'',
        isLoading:false,
        isRefreshing:false,
    };
    async componentDidMount() {
        this._loadData('',true);
    }
    _loadData=(SearchText,isRefreshing)=>{
        let {nextStartRow,villaowners}=this.state;
        if(isRefreshing)
        {
            villaowners=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true});
        new SweetFetcher().Fetch('/trapp/villaowner?searchtext='+SearchText+'&__startrow='+nextStartRow+'&__pagesize='+Constants.DEFAULT_PAGESIZE,SweetFetcher.METHOD_GET, null, data => {
            this.setState({villaowners:[...villaowners,...data.Data],nextStartRow:nextStartRow+Constants.DEFAULT_PAGESIZE,isLoading:false,isRefreshing:false,SearchText:SearchText});
            console.log("US")
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
                        data={this.state.villaowners}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>this._loadData(this.state.SearchText,false)}
                        onRefresh={()=>this._loadData(this.state.SearchText,true)}
                        refreshing={this.state.isRefreshing}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.3}
                        renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={() => {
                                global.itemID=item.id;
                                this.props.navigation.navigate('trapp_villaownerManage', { name: 'trapp_villaownerManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.name}</Text>
                <Text style={generalStyles.simplelabel}>{item.nationalcode}</Text>
                <Text style={generalStyles.simplelabel}>{item.address}</Text>
                <Text style={generalStyles.simplelabel}>{item.shabacode}</Text>
                <Text style={generalStyles.simplelabel}>{item.tel}</Text>
                <Text style={generalStyles.simplelabel}>{item.backuptel}</Text>
                <Text style={generalStyles.simplelabel}>{item.email}</Text>
                <Text style={generalStyles.simplelabel}>{item.backupmobile}</Text>
                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.photoigu}}/>

                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.nationalcardigu}}/>

                <Text style={generalStyles.simplelabel}>{item.placemanareacontent}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                    />
                </View>
                </View>
            );
    }
}
    