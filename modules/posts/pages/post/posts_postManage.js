import React, {Component} from 'react'
import RNFileSelector from 'react-native-file-selector';
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,Picker,AsyncStorage,Text } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import ImagePicker from 'react-native-image-picker';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from "../../../../classes/AccessManager";

export default class  posts_postManage extends Component<{}> {
    constructor(props) {
        super(props);
        this.state =
            {
                infoLoaded:false,
			title:'',
			summaryte:'',
			contentte:'',
			thumbnailflu:'',
			thumbnailfluPreview:'',
            };
        // this.loadData();
    }
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                        
                            <Text style={generalStyles.inputLabel}>عنوان</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({title: text});
                            }} value={this.state.title}/>
                            <Text style={generalStyles.inputLabel}>خلاصه</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({summaryte: text});
                            }} value={this.state.summaryte}/>
                            <Text style={generalStyles.inputLabel}>محتوا</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({contentte: text});
                            }} value={this.state.contentte}/>
                            <Text style={generalStyles.inputLabel}>تصویر شاخص</Text>
                            <TextInput placeholder=''  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({thumbnailflu: text});
                            }} value={this.state.thumbnailflu}/>
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

								if(id!==''){
									method=SweetFetcher.METHOD_PUT;
									Separator='/';
									action=AccessManager.EDIT;
										data.append('id', id);
								}
									data.append('title', this.state.title);
									data.append('summaryte', this.state.summaryte);
									data.append('contentte', this.state.contentte);
									data.append('thumbnailflu', this.state.thumbnailflu);
                                        new SweetFetcher().Fetch('/posts/post'+Separator+id, SweetFetcher.METHOD_GET, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                             }
                                        },null,'posts','post',this.props.history);
                                    }
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
    