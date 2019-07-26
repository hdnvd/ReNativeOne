import React from 'react'

import { View, Alert, ScrollView, Dimensions } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import AccessManager from '../../../../classes/AccessManager';
import TextBox from '../../../../sweet/components/TextBox';
import SweetButton from '../../../../sweet/components/SweetButton';
import SweetPage from '../../../../sweet/components/SweetPage';
import LogoTitle from '../../../../components/LogoTitle';

export default class  trapp_villaoptionManage extends SweetPage {
    static navigationOptions =({navigation}) => {
        return {
            headerLeft: null,
            headerTitle: <LogoTitle title={'امکانات ویلا'} />
        };
    };

    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            // OptionItems:[],
            Options:{},
            data:[],
        };

        this.loadData();
    }
    getOption(id)
    {
      return this.state.Options[id];
    };
    loadData=()=>{
        if(global.villaID>0){
            this.setState({isLoading:true});
            new SweetFetcher().Fetch('/trapp/villaoption/byvilla/'+global.villaID,SweetFetcher.METHOD_GET, null, data => {
                data.Data.isLoading=false;
                let Options=this.state.Options;
                data.Data.forEach(dt=>{Options[dt.id]=dt.countnum+'';});
                this.setState({data:data.Data,Options:Options});

            });
        }//IF
    };
    render() {
        console.log(this.state.Options);
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>
                            {/*{this.state.OptionItems}*/}
                            {this.state.data.map(dt=>{
                                return <TextBox keyboardType='numeric' title={'تعداد '+dt.name} value={this.getOption(dt.id)} onChangeText={(text) => {
                                    let newOptions=this.state.Options;
                                    newOptions[dt.id]=text;
                                    this.setState({Options:newOptions});
                                }}
                                />
                            })}
                            <View  style={{marginTop: '3%'}}>
                                <SweetButton title='ذخیره' onPress={(OnEnd) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {

                                        console.log(this.state.Options);
                                        const data = new FormData();
                                        let id = global.villaID;
                                        let method=SweetFetcher.METHOD_PUT;
                                        let Separator='';
                                        let action=AccessManager.EDIT;
									Separator='/';
									data.append('villaid', id);
                                        Object.keys(this.state.Options).forEach(Item=>{
                                            data.append('option'+Item, this.state.Options[Item]);
                                        });
                                        new SweetFetcher().Fetch('/trapp/villaoption/byvilla/'+global.villaID, method, data, data => {
                                             if(data.hasOwnProperty('Data'))
                                             {
                                                 Alert.alert('پیام','اطلاعات با موفقیت ذخیره شد.');
                                                 OnEnd(true);
                                             }
                                        },(error)=>{OnEnd(false)},'trapp','villaoption',this.props.history);
                                    }
                                    else
                                        OnEnd(false);
                                }}/>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            )
    }
}
class MyOptionBox extends React.Component<{}>{
    render() {
       return(<TextBox keyboardType='numeric' title={this.props.name} value={this.props.value} onChangeText={(text) => {
            let newOptions = this.state.Options;
            newOptions[dt.id] = text + 'a';
            this.setState({Options: newOptions});
        }}
        />);
    }
}
