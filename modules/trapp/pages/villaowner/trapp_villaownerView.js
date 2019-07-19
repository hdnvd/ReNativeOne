import React, {Component} from 'react';
import {StyleSheet, View, Alert, ScrollView, Dimensions,AsyncStorage,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import TextRow from '../../../../sweet/components/TextRow';
import SweetButton from '../../../../sweet/components/SweetButton';
import ComponentHelper from '../../../../classes/ComponentHelper';
import SimpleMap from '../../../../components/SimpleMap';

export default class  trapp_villaownerView extends Component<{}> {

    constructor(props) {
        super(props);
        this.state =
            {
                isLoading:false,
                LoadedData:{
                name:'',
                    userinfo:{},
                nationalcodebnum:'',
                address:'',
                shabacodebnum:'',
                telbnum:'',
                backuptelbnum:'',
                email:'',
                backupmobilebnum:'',
                    provinceinfo:{},
                    cityinfo:{},
                    placemanareainfo:{},
                },

            };

        this.loadData();
    }
    loadData=()=>{
        this.setState({isLoading:true});
        new SweetFetcher().Fetch('/trapp/villaowner/byuser/'+global.villaOwnerUserId,SweetFetcher.METHOD_GET, null, data => {
            this.setState({LoadedData:data.Data,isLoading:false});
        });

    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>

                        <View style={generalStyles.container}>

                            <Image style={generalStyles.profilePicture} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.photoigu}}/>

                          {/*<Image style={generalStyles.topimage} source={{uri: Constants.ServerURL+'/'+this.state.LoadedData.photoigu}}/>*/}

                            <TextRow title={'نام'} content={this.state.LoadedData.name} />
                            {/*<TextRow title={'کد ملی'} content={this.state.LoadedData.nationalcodebnum} />*/}
                            {/*<TextRow title={'آدرس'} content={this.state.LoadedData.address} />*/}
                            {/*<TextRow title={'کد شبا'} content={this.state.LoadedData.shabacodebnum} />*/}
                            <TextRow title={'تلفن'} content={this.state.LoadedData.telbnum} />
                            {/*<TextRow title={'تلفن شماره ۲'} content={this.state.LoadedData.backuptelbnum} />*/}
                            {/*<TextRow title={'ایمیل'} content={this.state.LoadedData.email} />*/}
                            <TextRow title={'تلفن همراه شماره ۲'} content={this.state.LoadedData.backupmobilebnum} />
                            {/*<TextRow title={'محل'} content={this.state.LoadedData.provinceinfo.title+' - '+this.state.LoadedData.cityinfo.title+' - '+this.state.LoadedData.placemanareainfo.title} />*/}
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
