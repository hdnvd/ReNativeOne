import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    AsyncStorage,
    Image,
    TouchableWithoutFeedback,
    Text,
    Picker,
    TextInput,
    ScrollView,
    FlatList, TouchableHighlight
} from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from '../../../../classes/Constants';
import PickerBox from '../../../../sweet/components/PickerBox';
import TextBox from '../../../../sweet/components/TextBox';
import TimeSelector from '../../../../sweet/components/TimeSelector';
import LocationSelector from '../../../../sweet/components/LocationSelector';
import CityAreaSelector from '../../../../sweet/components/CityAreaSelector';
import SweetButton from '../../../../sweet/components/SweetButton';
import CheckedRow from '../../../../sweet/components/CheckedRow';
import SweetHttpRequest from '../../../../classes/sweet-http-request';
import PersianCalendarPicker from "react-native-persian-calendar-picker";
import jMoment from "moment-jalaali";
import TextRow from "../../../../sweet/components/TextRow";


export default class Trapp_villaSearch extends Component<{}> {
    state =
        {
            SearchFields: {

                roomcountnum:'',
                capacitynum:'',
                maxguestsnum:'',
                structureareanum:'',
                totalareanum:'',
                viewtype:'',
                structuretype:'',
                owningtype:'',
                descriptionte:'',
                normalpriceprc:'',
                holidaypriceprc:'',
                weeklyoffnum:'',
                monthlyoffnum:'',
                selectedCityValue: '-1',
                selectedStartDate: null,
                days: '',
            },

            showMoreOptions: false,
            viewtypeOptions: null,
            structuretypeOptions: null,
            owningtypeOptions: null,
            areatypeOptions: null,
        };

    onDateChange(date) {
        let DateString = jMoment.utc(date).format("jYYYY/jMM/jDD");
        console.log("Date", DateString);
        this.setState({SearchFields: {...this.state.SearchFields, selectedStartDate: DateString}});

    }

    async componentDidMount() {

        this.loadViewtypes();
        this.loadStructuretypes();
        this.loadOwningtypes();
        this.loadAreatypes();
        this.onDateChange = this.onDateChange.bind(this);
    }

    loadViewtypes = () => {
        new SweetFetcher().Fetch('/trapp/viewtype', SweetFetcher.METHOD_GET, null, data => {
            this.setState({viewtypeOptions: data.Data});
        });
    };

    loadStructuretypes = () => {
        new SweetFetcher().Fetch('/trapp/structuretype', SweetFetcher.METHOD_GET, null, data => {
            this.setState({structuretypeOptions: data.Data});
        });
    };

    loadOwningtypes = () => {
        new SweetFetcher().Fetch('/trapp/owningtype', SweetFetcher.METHOD_GET, null, data => {
            this.setState({owningtypeOptions: data.Data});
        });
    };

    loadAreatypes = () => {
        new SweetFetcher().Fetch('/trapp/areatype', SweetFetcher.METHOD_GET, null, data => {
            this.setState({areatypeOptions: data.Data});
        });
    };

    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        return (<View style={{flex: 1}}>
                <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                    <View style={generalStyles.container}>
                        <Text style={generalStyles.inputLabel}>تاریخ شروع اقامت</Text>

                        <View style={Styles.datepickercontainer}>
                            <PersianCalendarPicker
                                isRTL={true}
                                style={Styles.datepickercontainer}
                                scaleFactor={500}
                                onDateChange={this.onDateChange}
                            />
                        </View>
                        <TextBox keyboardType='numeric' title={'مدت اقامت'} value={this.state.SearchFields.days}
                                 onChangeText={(text) => {
                                     this.setState({SearchFields: {...this.state.SearchFields, days: text}});
                                 }}/>

                        <CityAreaSelector
                            onCitySelected={(CityID) => this.setState({
                                SearchFields: {
                                    ...this.state.SearchFields,
                                    selectedCityValue: CityID
                                }
                            })}
                            displayAreaSelect={false}
                        />
                        {!this.state.showMoreOptions &&
                        <TouchableHighlight onPress={()=>{this.setState({showMoreOptions: true});}}
                            activeOpacity={0.3}
                            underlayColor='#ffffff'>
                            <Text style={Styles.text} >موارد بیشتر...</Text>
                            </TouchableHighlight>
                        }
                        {this.state.showMoreOptions &&
                        <View>
                            <TextBox keyboardType='numeric' title={'تعداد اتاق'}
                                     value={this.state.SearchFields.roomcountnum} onChangeText={(text) => {
                                this.setState({SearchFields: {...this.state.SearchFields, roomcountnum: text}});
                            }}/>
                            <TextBox keyboardType='numeric' title={'ظرفیت به نفر'}
                                     value={this.state.SearchFields.capacitynum} onChangeText={(text) => {
                                this.setState({SearchFields: {...this.state.SearchFields, capacitynum: text}});
                            }}/>
                            {/*<TextBox keyboardType='numeric' title={'حداکثر تعداد مهمان'}*/}
                                     {/*value={this.state.SearchFields.maxguestsnum} onChangeText={(text) => {*/}
                                {/*this.setState({SearchFields: {...this.state.SearchFields, maxguestsnum: text}});*/}
                            {/*}}/>*/}
                            {/*<TextBox keyboardType='numeric' title={'متراژ بنا'} value={this.state.SearchFields.structureareanum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,structureareanum: text}});}}/>*/}
                            {/*<TextBox keyboardType='numeric' title={'متراژ کل'} value={this.state.SearchFields.totalareanum} onChangeText={(text) => {this.setState({SearchFields:{...this.state.SearchFields,totalareanum: text}});}}/>*/}

                            <PickerBox
                                name={'viewtypes'}
                                title={'چشم انداز'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.viewtype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,viewtype: value}});
                                }}
                                options={this.state.viewtypeOptions}
                            />
                            <PickerBox
                                name={'structuretypes'}
                                title={'نوع ساختمان'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.structuretype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,structuretype: value}});
                                }}
                                options={this.state.structuretypeOptions}
                            />
                            {/*<TimeSelector title={'زمان تحویل/تخلیه'} value={this.state.timestartclk} onConfirm={(date)=>this.setState({timestartclk: date})} />*/}
                            <PickerBox
                                name={'owningtypes'}
                                title={'نوع اقامتگاه'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.owningtype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,owningtype: value}});
                                }}
                                options={this.state.owningtypeOptions}
                            />
                            <PickerBox
                                name={'areatypes'}
                                title={'بافت'}
                                isOptional={true}
                                selectedValue ={this.state.SearchFields.areatype}
                                onValueChange={(value, index) => {
                                    this.setState({SearchFields:{...this.state.SearchFields,areatype: value}});
                                }}
                                options={this.state.areatypeOptions}
                            />
                            {/*<TextBox title={'توضیحات'} value={this.state.SearchFields.descriptionte}*/}
                                     {/*onChangeText={(text) => {*/}
                                         {/*this.setState({*/}
                                             {/*SearchFields: {*/}
                                                 {/*...this.state.SearchFields,*/}
                                                 {/*descriptionte: text*/}
                                             {/*}*/}
                                         {/*});*/}
                                     {/*}}/>*/}
                            {/*<TextBox keyboardType='numeric' title={'قیمت در روزهای عادی'}*/}
                                     {/*value={this.state.SearchFields.normalpriceprc} onChangeText={(text) => {*/}
                                {/*this.setState({SearchFields: {...this.state.SearchFields, normalpriceprc: text}});*/}
                            {/*}}/>*/}
                            {/*<TextBox keyboardType='numeric' title={'قیمت در روزهای تعطیل'}*/}
                                     {/*value={this.state.SearchFields.holidaypriceprc} onChangeText={(text) => {*/}
                                {/*this.setState({SearchFields: {...this.state.SearchFields, holidaypriceprc: text}});*/}
                            {/*}}/>*/}
                            {/*<TextBox keyboardType='numeric' title={'تخفیف رزرو بیش از یک هفته'}*/}
                                     {/*value={this.state.SearchFields.weeklyoffnum} onChangeText={(text) => {*/}
                                {/*this.setState({SearchFields: {...this.state.SearchFields, weeklyoffnum: text}});*/}
                            {/*}}/>*/}
                            {/*<TextBox keyboardType='numeric' title={'تخفیف رزرو بیش از یک ماه'}*/}
                                     {/*value={this.state.SearchFields.monthlyoffnum} onChangeText={(text) => {*/}
                                {/*this.setState({SearchFields: {...this.state.SearchFields, monthlyoffnum: text}});*/}
                            {/*}}/>*/}

                        </View>
                        }
                        <SweetButton title={'جستجو'} onPress={() => {
                            if (this.props.dataLoader != null) {
                                this.props.dataLoader(this.state.SearchFields);
                            }
                        }}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

let Window = Dimensions.get('window');
const Styles = StyleSheet.create(
    {
        datepickercontainer:
            {
                height:Window.height*0.35,
            },

        text:
            {

                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'IRANSansMobile',
            },
    }
);
