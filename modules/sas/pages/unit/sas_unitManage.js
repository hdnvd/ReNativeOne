import React, {Component} from 'react'
import RNFileSelector from 'react-native-file-selector';
import { CheckBox , Button } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,Picker,AsyncStorage,Text,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import ImagePicker from 'react-native-image-picker';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';

export default class  sas_unitManage extends Component<{}> {
    constructor(props) {
        super(props);
        this.state =
            {
                infoLoaded:false,
			name:'',
			logoigu:'',
			SelectedlogoiguLocation:'',
			unittype:'',
			unittypeOptions:[<Picker.Item label='نوع بخش' value='-1' style={generalStyles.pickerItem} />],
			SelectedunittypeValue:'-1',
			needsadminapproval:0,
			useruser:'',
			adminuser:'',
			securityuser:'',
            };
        this.loadData();
    }
    loadData=()=>{

        this.loadUnittypes();
    };

    loadUnittypes = () => {
        new SweetFetcher().Fetch('/sas/unittype',SweetFetcher.METHOD_GET, null, data => {
            let unittypes=data.Data.map(dt=>{return <Picker.Item label={dt.name} value={dt.id} style={generalStyles.pickerItem} />});
            this.setState({unittypeOptions:unittypes});
        });
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
                            <View  style={{marginTop: '3%'}}>
                                <Button title='انتخاب لوگو' iconPlacement='right' underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                    var options = {
                                        title: 'انتخاب لوگو',
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
                                                SelectedlogoiguLocation : response.path
                                            });
                                        }
                                    });
                                }}/>
                            </View>
                            <View>
                                <Text style={generalStyles.inputLabel}>نوع بخش</Text>
                                <Picker style={generalStyles.select}
                                        name='unittypes'
                                        selectedValue ={this.state.SelectedunittypeValue}
                                        onValueChange={(value, index) => {
                                            this.setState({SelectedunittypeValue: value});
                                        }}
                                >
                                    {this.state.unittypeOptions}
                                </Picker>
                            </View>
        <CheckBox
        title='نیاز به تایید مدیر'
        checked={this.state.needsadminapproval}
        onPress={() => this.setState({needsadminapproval: this.state.needsadminapproval==0?1:0})}
        />

                            <View  style={{marginTop: '3%'}}>
                                <Button title='ذخیره' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {
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
									if(this.state.SelectedlogoiguLocation!='' && this.state.SelectedlogoiguLocation!=null)
                                        {

                                            data.append('logoigu', {
                                                uri: 'file://' + this.state.SelectedlogoiguLocation,
                                                type: 'image/jpeg',
                                                name: 'photo.jpg'
                                            });

//                                            console.log(global.PictureLocation);
                                        }
									data.append('unittype', this.state.SelectedunittypeValue);
									data.append('needsadminapproval', this.state.needsadminapproval);
									data.append('useruser', this.state.SelecteduseruserValue);
									data.append('adminuser', this.state.SelectedadminuserValue);
									data.append('securityuser', this.state.SelectedsecurityuserValue);
                                        new SweetFetcher().Fetch('/sas/unit'+Separator+id, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                             }
                                        },null,'sas','unit',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    