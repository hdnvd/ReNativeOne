import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import jMoment from "moment-jalaali";
import moment from "moment";
import {StyleSheet, View, ScrollView, Dimensions,Linking } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Constants from '../../../../classes/Constants';
import TextBox from '../../../../sweet/components/TextBox';
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import TextRow from "../../../../sweet/components/TextRow";
export default class  trapp_villaReserve extends Component<{}> {

    constructor(props) {
        super(props);
        this.state =
        {
            isLoading:false,
            roomcount:'',
            duration:'1',
            selectedStartDate: null,
            price:0,
            reservedDays:[],
        };

        this.onDateChange = this.onDateChange.bind(this);
        this._loadData();
    }
    onDateChange(date) {
        let DateString=jMoment.utc(date).format("jYYYY/jMM/jDD");
        console.log("Date",DateString);
        this.setState({ selectedStartDate: DateString });
        this.CalculatePrice(DateString,this.state.duration);

    }
    _loadData=()=>{
        // if(global.villaId>0){
        //     this.setState({isLoading:true});
        //     new SweetFetcher().Fetch('/trapp/villa/'+global.villaId,SweetFetcher.METHOD_GET, null, data => {
        //         data.Data.isLoading=false;
        //         this.setState({roomcount:data.Data.roomcount,capacity:data.Data.capacity,maxguests:data.Data.maxguests,structurearea:data.Data.structurearea,totalarea:data.Data.totalarea,SelectedplacemanplaceValue:data.Data.placemanplace,addedbyowner:data.Data.addedbyowner,SelectedviewtypeValue:data.Data.viewtype,SelectedstructuretypeValue:data.Data.structuretype,fulltimeservice:data.Data.fulltimeservice,timestartclk:data.Data.timestartclk,SelectedowningtypeValue:data.Data.owningtype,SelectedareatypeValue:data.Data.areatype,descriptionte:data.Data.descriptionte,documentphotoigu:data.Data.documentphotoigu,});
        //     });
        // }//IF
        let url1 = '/trapp/villa/'+global.villaID+'/reserveddays';
        new SweetFetcher().Fetch(url1, SweetFetcher.METHOD_GET, null, data => {
            let resD=data.Data.dates.map(dt=>moment.unix(dt));
            this.setState({
                reservedDays:resD
            });
        });
    };
    openURL = (URL) => {
        Linking.canOpenURL(URL).then(supported => {
            if (supported) {
                Linking.openURL(URL);
            } else {
                console.log("Don't know how to open URI: " + URL);
            }
        });
    };
    CalculatePrice=(selectedStartDate,Duration)=>
    {
        let formIsValid=true;
        if(formIsValid)
        {
            const data = new FormData();
            let id = '';
            if (global.villaID > 0)
                id = global.villaID;
            data.append('id', id);
            let method=SweetFetcher.METHOD_GET;
            new SweetFetcher().Fetch('/trapp/villa/price/'+id+"?datestart="+selectedStartDate+"&duration="+Duration, method, data, data => {
                if(data.hasOwnProperty('Data'))
                {
                    this.setState({price:data.Data.price});
                }
            },null,'trapp','villa',this.props.history);
        }
    };
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        // alert(jMoment.utc(1559566238895).format('jYYYY/jM/jD [is] YYYY/M/D'));
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={generalStyles.container}>

                            {/*<TextBox title={'تعداد مهمان'} value={this.state.roomcount} onChangeText={(text) => {this.setState({roomcount: text});}}/>*/}
                            <TextBox  keyboardType='numeric' title={'مدت اقامت به روز'} value={this.state.duration} onChangeText={(text) => {

                                this.CalculatePrice(this.state.selectedStartDate,text);
                                this.setState({duration: text});
                            }}/>
                            {/*<TextBox title={'ظرفیت به نفر'} value={this.state.capacity} onChangeText={(text) => {this.setState({capacity: text});}}/>*/}
                            {/*<TextBox title={'حداکثر تعداد مهمان'} value={this.state.maxguests} onChangeText={(text) => {this.setState({maxguests: text});}}/>*/}
                            {/*<TextBox title={'متراژ بنا'} value={this.state.structurearea} onChangeText={(text) => {this.setState({structurearea: text});}}/>*/}
                            {/*<TextBox title={'متراژ کل'} value={this.state.totalarea} onChangeText={(text) => {this.setState({totalarea: text});}}/>*/}
                            <View style={Styles.datepickercontainer}>
                                <PersianCalendarPicker
                                    isRTL={true}
                                    style={Styles.datepickercontainer}
                                    scaleFactor={500}
                                    onDateChange={this.onDateChange}
                                    disabledDates={this.state.reservedDays}
                                />
                            </View>
                            <TextRow title={'مبلغ کل:'} content={this.state.price}/>
                            {/*<View  style={{marginTop: '3%'}}>*/}
                                {/*<Button title='ذخیره' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {*/}

                                    {/*this.CalculatePrice(this.state.selectedStartDate,this.state.duration);*/}
                                {/*}}/>*/}
                            {/*</View>*/}
                            {this.state.price>0 && <View  style={{marginTop: '3%'}}>
                                <Button title='پرداخت وجه' iconPlacement='right' underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {
                                    let formIsValid=true;
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        let id = '';
                                        if (global.villaID > 0)
                                            id = global.villaID;
                                        data.append('id', id);
                                        let method=SweetFetcher.METHOD_GET;
                                        new SweetFetcher().Fetch('/trapp/villa/reservestart/'+id+"?datestart="+this.state.selectedStartDate+"&duration="+this.state.duration, method, data, data => {
                                            if(data.hasOwnProperty('Data'))
                                            {
                                                let transactionID=data.Data.transaction.transactionid;
                                                this.openURL(Constants.SiteURL+"/financial/recharge/"+transactionID);
                                                // console.log('/financial/recharge/'+transactionID);
                                            }
                                        },null,'trapp','villa',this.props.history);
                                    }
                                }}/>
                            </View>
                            }

                        </View>
                    </ScrollView>
                </View>
            )
    }
}

const Styles=StyleSheet.create(
    {
        datepickercontainer:
            {
                maxHeight:'50%',
                height:'50%',
            }
    }

);
