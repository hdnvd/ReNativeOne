import React, {Component} from 'react'
import { Button } from 'react-native-elements';
import {StyleSheet, View, Alert, Dimensions,AsyncStorage,Text,FlatList,Image } from 'react-native';
import generalStyles from '../../../../styles/generalStyles';
import SweetFetcher from '../../../../classes/sweet-fetcher';
import Common from '../../../../classes/Common';
import AccessManager from '../../../../classes/AccessManager';
import Constants from "../../../../classes/Constants";
import PersianCalendarPicker  from "react-native-persian-calendar-picker";

export default class sas_unitList extends Component<{}> {
    state =
        {
            units:[],
            selectedStartDate: null,
        };
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
    }
    onDateChange(date) {
        this.setState({ selectedStartDate: date });
    }
    async componentDidMount() {
        this._loadData();
    }
    _loadData=()=>{
        new SweetFetcher().Fetch('/sas/unit',SweetFetcher.METHOD_GET, null, data => {
            this.setState({units:data.Data});
        });
    };
    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        return (<View style={{flex:1}}  >
                <View style={generalStyles.listcontainer}>
                    <View style={Styles.datepickercontainer}>
                        <PersianCalendarPicker
                            isRTL={true}
                            style={Styles.datepickercontainer}
                            scaleFactor={500}
                            onDateChange={this.onDateChange}
                        />
                    </View>
                    <FlatList
                        data={this.state.units}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <View style={generalStyles.ListItem}>

                                <Text style={generalStyles.simplelabel}>{item.name}</Text>
                                <Image style={generalStyles.listitemthumbnail} source={{uri: Constants.ServerURL+'/'+item.logoigu}}/>

                                <Text style={generalStyles.simplelabel}>{item.unittypecontent}</Text>
                                <Text style={generalStyles.simplelabel}>{item.needsadminapproval}</Text>
                                <Text style={generalStyles.simplelabel}>{item.userusercontent}</Text>
                                <Text style={generalStyles.simplelabel}>{item.adminusercontent}</Text>
                                <Text style={generalStyles.simplelabel}>{item.securityusercontent}</Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        );
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