import React, {Component} from 'react'
import RNFileSelector from 'react-native-file-selector';
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,Picker,AsyncStorage,Text } from 'react-native';
import generalStyles from "../../../styles/generalStyles";
import ImagePicker from 'react-native-image-picker';
import SweetFetcher from "../../../classes/sweet-fetcher";
import Common from "../../../classes/Common";

export default class posts_postManageOLD extends Component<{}> {
    constructor(props) {
        super(props);
        this.state =
            {
                name:'',
                family:'',
                infoLoaded:false,
            };
        // this.loadData();
    }
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                            <Text style={generalStyles.inputLabel}>نام</Text>
                            <TextInput placeholder="نام"  underlineColorAndroid={'transparent'} style={generalStyles.input} onChangeText={(text) => {
                                this.setState({name: text});
                            }} value={this.state.name}/>
                            <Text style={generalStyles.inputLabel}>نام خانوادگی</Text>
                            <TextInput placeholder="نام خانوادگی"  underlineColorAndroid={'transparent'} style={generalStyles.input}  onChangeText={(text) => {
                                this.setState({family: text});
                            }} value={this.state.family}/>
                            <View  style={{marginTop: '3%'}}>
                                <Button title="ذخیره" iconPlacement="right" underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        data.append('title', this.state.name);
                                        data.append('summaryte', this.state.family);
                                        data.append('contentte', this.state.family);
                                        data.append('thumbnailflu', '');
                                        new SweetFetcher().Fetch('/posts/post', SweetFetcher.METHOD_POST, data, data => {
                                             if(data.hasOwnProperty("Data"))
                                             {
                                                 Alert.alert("پیام","اطلاعات با موفقیت ذخیره شد.");
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
