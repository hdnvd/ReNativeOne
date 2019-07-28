import React, {Component} from 'react'
import { CheckBox } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,AsyncStorage,Picker,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import ImageSelector from '../../../../sweet/components/ImageSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import ComponentHelper from '../../../../classes/ComponentHelper';
import LogoTitle from "../../../../components/LogoTitle";
export default class  placeman_placeManage extends Component<{}> {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'اطلاعات محل ویلا'} />
        };
    };
    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,

			title:'',selectedAreaValue: -1,
			address:'',
			SelectedlogoiguLocation:'',
			description:'',
			active:0,

        };

        this.loadData();
    }
    loadData=()=>{

        if(global.itemID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/placeman/place/'+global.itemID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                this.setState({title:data.Data.title,area:data.Data.area,address:data.Data.address,latitude:data.Data.latitude,logoigu:data.Data.logoigu,description:data.Data.description,active:data.Data.active,SelecteduserValue:data.Data.user,});
            });
        }//IF
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>

                            {/*<TextBox title={'عنوان'} value={this.state.title} onChangeText={(text) => {this.setState({title: text});}}/>*/}
                            <CityAreaSelector
                                onAreaSelected={(AreaID)=>this.setState({selectedAreaValue: AreaID})}
                            />
                            <TextBox title={'آدرس'} value={this.state.address} onChangeText={(text) => {this.setState({address: text});}}/>
                            <LocationSelector title='انتخاب از روی نقشه' navigation={this.props.navigation}/>
                            {/*<ImageSelector title='انتخاب لوگو' onConfirm={(path)=>this.setState({SelectedlogoiguLocation : path})} />*/}
                            {/*<TextBox title={'توضیحات'} value={this.state.description} onChangeText={(text) => {this.setState({description: text});}}/>*/}
                            {/*<CheckedRow title='فعال/غیرفعال' checked={this.state.active}*/}
                            {/*onPress={() => this.setState({active: this.state.active==0?1:0})}*/}
                            {/*/>*/}
                            <View  style={{marginTop: '3%'}}>
                                <SweetButton title='ذخیره' onPress={(OnEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        let id = '';
                                        let method=SweetFetcher.METHOD_POST;
                                        let Separator='';
                                        let action=AccessManager.INSERT;
                                        if (global.itemID > 0)
                                            id = global.itemID;

								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}

									data.append('title', this.state.title);
									data.append('area', this.state.selectedAreaValue);
									data.append('address', this.state.address);
                                    data.append('latitude', global.SelectedLocation.latitude);
                                    data.append('longitude', global.SelectedLocation.longitude);
								ComponentHelper.appendImageSelectorToFormDataIfNotNull(data,'logoigu',this.state.SelectedlogoiguLocation);
									data.append('description', this.state.description);
									data.append('active', this.state.active);
                                        new SweetFetcher().Fetch('/placeman/place'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 global.placeId=data.Data.id;
                                                 this.props.navigation.navigate('trapp_villaManage', { name: 'trapp_villaManage' });
                                                 OnEnd(true);
                                                 // Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                             }
                                        },(error)=>{OnEnd(false)},'placeman','place',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
