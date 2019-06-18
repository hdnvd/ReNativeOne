import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Image,TouchableWithoutFeedback,Text,TextInput,FlatList } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';


export default class placeman_placeList extends Component<{}> {
    state =
    {
        places:[],
        nextStartRow:0,
        SearchText:'',
        isLoading:false,
        isRefreshing:false,
    };
    async componentDidMount() {
        this._loadData('',true);
    }
    _loadData=(SearchText,isRefreshing)=>{
        let {nextStartRow,places}=this.state;
        if(isRefreshing)
        {
            places=[];
            nextStartRow=0;
        }
        this.setState({isRefreshing:isRefreshing,isLoading:true});
        new SweetFetcher().Fetch('/placeman/place?searchtext='+SearchText+'&__startrow='+nextStartRow+'&__pagesize='+Constants.DEFAULT_PAGESIZE,SweetFetcher.METHOD_GET, null, data => {
            this.setState({places:[...places,...data.Data],nextStartRow:nextStartRow+Constants.DEFAULT_PAGESIZE,isLoading:false,isRefreshing:false,SearchText:SearchText});
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
                        data={this.state.places}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>this._loadData(this.state.SearchText,false)}
                        onRefresh={()=>this._loadData(this.state.SearchText,true)}
                        refreshing={this.state.isRefreshing}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.3}
                        renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={() => {
                                global.itemID=item.id;
                                this.props.navigation.navigate('placeman_placeManage', { name: 'placeman_placeManage' });
                            }}>
                            <View style={generalStyles.ListItem}>
                            
                <Text style={generalStyles.simplelabel}>{item.title}</Text>
                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.logoigu}}/>

                <Text style={generalStyles.simplelabel}>{item.description}</Text>
                <Text style={generalStyles.simplelabel}>{item.active}</Text>
                <Text style={generalStyles.simplelabel}>{item.address}</Text>
                <Text style={generalStyles.simplelabel}>{item.areacontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.usercontent}</Text>
                <Text style={generalStyles.simplelabel}>{item.latitude}</Text>
                <Text style={generalStyles.simplelabel}>{item.longitude}</Text>
                <Text style={generalStyles.simplelabel}>{item.visits}</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        }
                    />
                </View>
                </View>
            );
    }
}
    