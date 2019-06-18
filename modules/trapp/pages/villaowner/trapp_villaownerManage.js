import React, {Component} from 'react'
import { CheckBox , Button } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,Picker,AsyncStorage,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';

import ImagePicker from 'react-native-image-picker';
import RNFileSelector from 'react-native-file-selector';
import PlaceManager from '../../../placeman/classes/PlaceManager';
export default class  trapp_villaownerManage extends Component<{}> {
    placemanager=new PlaceManager();
    constructor(props) {
        super(props);
        

        this.state =
            {
                infoLoaded:false,
                
			name:'هادی',
			nationalcode:'09367356253',
			address:'تهران - صادقیه',
			shabacode:'2232323232322',
			tel:'02166199180',
			backuptel:'02144090359',
			email:'hadi.nahavandi2010@gmail.com',
			backupmobile:'09127254987',
			SelectedphotoiguLocation:'',
			SelectednationalcardiguLocation:'',
			    provinceOptions:[<Picker.Item label='استان' value='-1' style={generalStyles.pickerItem} />],
			    cityOptions:[<Picker.Item label='شهر' value='-1' style={generalStyles.pickerItem} />],
			    areaOptions:[<Picker.Item label='منطقه' value='-1' style={generalStyles.pickerItem} />],
                selectedProvinceValue: -1,
                selectedCityValue: -1,
                selectedAreaValue: -1,
            };
        
        this.placemanager.onProvincesLoaded=(Provinces)=>{this.setState({provinceOptions:Provinces});};
        this.placemanager.onCitiesLoaded=(Cities)=>{this.setState({cityOptions:Cities});};
        this.placemanager.onAreasLoaded=(Areas)=>{this.setState({areaOptions:Areas});};
        this.loadData();
    }
    loadData=()=>{

        this.placemanager.loadProvinceOptions();
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                            <Text style={generalStyles.inputLabel}>نام</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({name: text});
                            }} value={this.state.name}/>
                            <Text style={generalStyles.inputLabel}>کد ملی</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({nationalcode: text});
                            }} value={this.state.nationalcode}/>
                            <Text style={generalStyles.inputLabel}>آدرس</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({address: text});
                            }} value={this.state.address}/>
                            <Text style={generalStyles.inputLabel}>کد شبا</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({shabacode: text});
                            }} value={this.state.shabacode}/>
                            <Text style={generalStyles.inputLabel}>تلفن</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({tel: text});
                            }} value={this.state.tel}/>
                            <Text style={generalStyles.inputLabel}>تلفن شماره ۲</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({backuptel: text});
                            }} value={this.state.backuptel}/>
                            <Text style={generalStyles.inputLabel}>ایمیل</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({email: text});
                            }} value={this.state.email}/>
                            <Text style={generalStyles.inputLabel}>تلفن همراه شماره ۲</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({backupmobile: text});
                            }} value={this.state.backupmobile}/>
                            <View  style={{marginTop: '3%'}}>
                                <Button title='انتخاب تصویر' iconPlacement='right' underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                    var options = {
                                        title: 'انتخاب تصویر',
                                        storageOptions: {
                                            skipBackup: true,
                                            path: 'images'
                                        },
                                        chooseFromLibraryButtonTitle:'انتخاب از گالری',
                                        takePhotoButtonTitle:'گرفتن عکس',
                                        cancelButtonTitle:'لغو'
                                    };
                                    ImagePicker.showImagePicker(options, (response) => {
                                        console.log('Response = ', response);

                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                        }
                                        else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                        }
                                        else {
                                            //let source = { uri: response.uri };
                                            //global.PictureLocation = response.path;
                                            // You can also display the image using data:
                                            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                            this.setState({
                                                SelectedphotoiguLocation : response.path
                                            });
                                        }
                                    });
                                }}/>
                            </View>
                            <View  style={{marginTop: '3%'}}>
                                <Button title='انتخاب تصویر کارت ملی' iconPlacement='right' underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                    var options = {
                                        title: 'انتخاب تصویر کارت ملی',
                                        storageOptions: {
                                            skipBackup: true,
                                            path: 'images'
                                        },
                                        chooseFromLibraryButtonTitle:'انتخاب از گالری',
                                        takePhotoButtonTitle:'گرفتن عکس',
                                        cancelButtonTitle:'لغو'
                                    };
                                    ImagePicker.showImagePicker(options, (response) => {
                                        console.log('Response = ', response);

                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                        }
                                        else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                        }
                                        else {
                                            //let source = { uri: response.uri };
                                            //global.PictureLocation = response.path;
                                            // You can also display the image using data:
                                            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                            this.setState({
                                                SelectednationalcardiguLocation : response.path
                                            });
                                        }
                                    });
                                }}/>
                            </View>
                            <View>
                                <Text style={generalStyles.inputLabel}>استان</Text>
                                <Picker style={generalStyles.select}
                                        name='placemanprovinces'
                                        selectedValue ={this.state.selectedProvinceValue}
                                        onValueChange={(ProvinceID,index)=>{
                                            this.setState({selectedProvinceValue:ProvinceID});
                                            this.placemanager.loadCityOptions(ProvinceID);}}
                                >
                                    {this.state.provinceOptions}
                                </Picker>
                            </View>
                            <View>
                                <Text style={generalStyles.inputLabel}>شهر</Text>
                                <Picker style={generalStyles.select}
                                        name='placemancities'
                                        selectedValue ={this.state.selectedCityValue}
                                        onValueChange={(CityID,index)=>{
                                            this.setState({selectedCityValue:CityID});
                                            this.placemanager.loadAreaOptions(this.state.selectedProvinceValue,CityID);}}
                                >
                                    {this.state.cityOptions}
                                </Picker>
                            </View>
                            <View>
                                <Text style={generalStyles.inputLabel}>منطقه</Text>
                                <Picker style={generalStyles.select}
                                        name='placemanareas'
                                        selectedValue ={this.state.selectedAreaValue}
                                        onValueChange={(AreaID, index) => {
                                            this.setState({selectedAreaValue: AreaID});
                                        }}
                                >
                                    {this.state.areaOptions}
                                </Picker>
                            </View>
                            <View  style={{marginTop: '3%'}}>
                                <Button title='بعدی' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        let id = '';
                                        let method=SweetFetcher.METHOD_POST;
                                        let Separator='';
                                        let action=AccessManager.INSERT;
//                                        if (this.props.match.params.id > 0)
//                                            id = this.props.match.params.id;
                                            
								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
        
									data.append('name', this.state.name);
									data.append('nationalcode', this.state.nationalcode);
									data.append('address', this.state.address);
									data.append('shabacode', this.state.shabacode);
									data.append('tel', this.state.tel);
									data.append('backuptel', this.state.backuptel);
									data.append('email', this.state.email);
									data.append('backupmobile', this.state.backupmobile);
									if(this.state.SelectedphotoiguLocation!='' && this.state.SelectedphotoiguLocation!=null)
                                        {

                                            data.append('photoigu', {
                                                uri: 'file://' + this.state.SelectedphotoiguLocation,
                                                type: 'image/jpeg',
                                                name: 'photo.jpg'
                                            });

//                                            console.log(global.PictureLocation);
                                        }
									if(this.state.SelectednationalcardiguLocation!='' && this.state.SelectednationalcardiguLocation!=null)
                                        {

                                            data.append('nationalcardigu', {
                                                uri: 'file://' + this.state.SelectednationalcardiguLocation,
                                                type: 'image/jpeg',
                                                name: 'photo.jpg'
                                            });

//                                            console.log(global.PictureLocation);
                                        }
									data.append('placemanarea', this.state.selectedAreaValue);
                                        new SweetFetcher().Fetch('/trapp/villaowner'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 this.props.navigation.navigate('placeman_placeManage', { name: 'placeman_placeManage' });
                                             }
                                        },null,'trapp','villaowner',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    