import React, {Component} from 'react'
import RNFileSelector from 'react-native-file-selector';
import { Button } from 'react-native-elements';
import UserMan from "../classes/userman";
import {StyleSheet, View, Alert, TextInput, ScrollView, Dimensions,Picker,AsyncStorage,Text } from 'react-native';
import Navigation from "../classes/navigation";
import generalStyles from "../styles/generalStyles";
import tenaciousFetch from 'tenacious-fetch';
import ImagePicker from 'react-native-image-picker';

export default class FormView extends Component<{}> {
    constructor(props) {
        super(props);
        this.loadData();
    }
    normalFetchConfig = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json charset=UTF-8"
        },
    };
    additionalTenaciousFetchConfig = {
        fetcher: window.fetch,  // Fetch implementation to use, default is window.fetch
        retries: 5,             // Number of retries, default is 1
        retryDelay: 1000 * 3,   // Delay in ms before retrying, default is 1000ms
        factor: .5              // If factor is given, exponential backoff will be performed for retries, otherwise
                                // linear backoff is used
    };
    config = Object.assign({}, this.normalFetchConfig, this.additionalTenaciousFetchConfig);
    componentDidMount=()=>{

        // UserMan.SaveToken('');
        AsyncStorage.getItem('token').then((value)=>{if(value=='' || value==null) this.setState({'token':'-1'}); else this.setState({'token':value});});

    };
    state =
        {
            provinceOptions: [
                <Picker.Item label="استان" value="-1" style={styles.pickerItem} />
            ],

            cityOptions: [
                <Picker.Item label="شهر" value="-1" style={styles.pickerItem} />
            ],
            companyOptions: [
                <Picker.Item label="شرکت بیمه" value="-1" style={styles.pickerItem} />
            ],
            areaOptions: [
                <Picker.Item label="منطقه" value="-1"  style={styles.pickerItem}/>
            ],

            selectedProvinceValue: -1,
            selectedCityValue: -1,
            selectedAreaValue: -1,
            selectedCompanyValue: -1,
            title:'نمایندگی موسوی',
            tel: '02177889963',
            email: 'hadi_musavy@yahoo.com',
            address: 'فلکه دوم تهرانپارس - اتوبان رسالت - تقاطع اتوبان باقری - پلاک 21',
            fundYear: '1371',
            code: '006565556',
            name:'میرهادی',
            family:'موسوی',
            melliCode:'5513688556',
            mobile:'09015423081',
            password:'11472010',
            password2:'11472010',
            // token:'',
            infoLoaded:false,

            // title:'',
            // tel: '',
            // email: '',
            // address: '',
            // fundYear: '',
            // code: '',
            // name:'',
            // family:'',
            // melliCode:'',
            // mobile:'',
            // password:'',
            // password2:'',
            token:'',
            // infoLoaded:false,
        };

    loadProvinces = () => {
        let url=global.ServerURL + "/api/placeman/provinces";
        // fetch(url)
        tenaciousFetch(url, this.config)
            .then(res => res.json())
            .then(parsedRes => {
                const placesArray = [{label: 'استان', value: '-1'}];
                for (const key in parsedRes) {
                    placesArray.push({
                        label: parsedRes[key].title,
                        value: parsedRes[key].id,
                    });
                }
                this.setState({
                    provinceOptions: placesArray.map(place=><Picker.Item label={place.label} value={place.value}   style={styles.pickerItem}/>)
                });
            })
            .catch(err => Alert.alert("لطفا اتصال اینترنت خود را بررسی کنید"));
    };
    loadCompanies = () => {

        // fetch(global.ServerURL + "/api/placeman/companies")
        tenaciousFetch(global.ServerURL + "/api/placeman/companies", this.config)
            .then(res => res.json())
            .then(parsedRes => {
                const companyArray = [{label: 'شرکت بیمه', value: '-1'}];
                for (const key in parsedRes) {
                    if(parsedRes.hasOwnProperty(key))
                    {
                        companyArray.push({
                            label: parsedRes[key].title,
                            value: parsedRes[key].id,
                        });
                    }
                }
                this.setState({
                    companyOptions: companyArray.map(company=><Picker.Item label={company.label} value={company.value}  />)
                });
            })
            .catch(err => {
                // Alert.alert(err.message)}
                }

            );


    };
    loadData = () => {
        this.loadProvinces();
        this.loadCompanies();
    };
    loadCities = (value, index) => {
        if (value > 0) {

            let url=global.ServerURL + "/api/placeman/provinces/" + value + "";
            // fetch(url)
            tenaciousFetch(url, this.config)
            // fetch(global.ServerURL + "/api/placeman/provinces/" + value + "")
                .then(res => res.json())
                .then(parsedRes => {
                    const placesArray2 =[{label: 'شهر', value: '-1'}];
                    for (const key in parsedRes) {
                        placesArray2.push({
                            label: parsedRes[key].title,
                            value: parsedRes[key].id,
                        });
                    }
                    this.setState((prevState, props) => ({
                        cityOptions: placesArray2.map(place=><Picker.Item label={place.label} value={place.value}  />),
                        selectedProvinceValue: value,
                    }));
                })

                .catch(err => {
                        Alert.alert("لطفا اتصال اینترنت خود را بررسی کنید");
                    }

                );
        }

    };
    loadAreas = (value, index) => {
        if (value > 0) {
            let url=global.ServerURL + "/api/placeman/provinces/" + this.state.selectedProvinceValue + "/" + value + "";
            // fetch(url)
            tenaciousFetch(url, this.config)
                .then(res => res.json())
                .then(parsedRes => {
                    const placesArray2 = [{label: 'منطقه', value: '-1'}];
                    for (const key in parsedRes) {
                        placesArray2.push({
                            label: parsedRes[key].title,
                            value: parsedRes[key].id,
                        });
                    }
                    this.setState((prevState, props) => ({
                        areaOptions: placesArray2.map(place=><Picker.Item label={place.label} value={place.value}  />),
                        selectedCityValue: value,
                    }));
                })
                .catch(err => {
                    Alert.alert("لطفا اتصال اینترنت خود را بررسی کنید");
                    }

                );
        }

    };
    validateEmail = (text) => {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(text);
    };
    loadBranchData=()=>
    {

        // alert(this.state.token);
        const TokenFetchConfig = {
            headers: {
                "Content-Type": "application/json charset=UTF-8",
                'Authorization': 'Bearer '+this.state.token,
            },
        };
        const  configWithToken = Object.assign({}, TokenFetchConfig, this.additionalTenaciousFetchConfig);
        let url=global.ServerURL+"/api/placeman/branches/userinfo";
// console.log(this.state.token);
        // fetch(url,
        //     {
        //         headers: {
        //             'Authorization': 'Bearer '+this.state.token,
        //         }
        //     })
        tenaciousFetch(url, configWithToken)
            .then(res => res.json())
            .then(parsedRes => {
                this.setState(
                    {
                        infoLoaded:true,
                        email:parsedRes.branch.email,
                        title:parsedRes.branch.title,
                        tel:parsedRes.branch.tel,
                        address:parsedRes.branch.address,
                        fundYear:parsedRes.branch.fundationyear,
                        code:parsedRes.branch.code,
                        name:parsedRes.branchadmin.name,
                        family:parsedRes.branchadmin.family,
                        melliCode:parsedRes.branchadmin.mellicode,
                        mobile:parsedRes.branchadmin.mob,
                        selectedProvinceValue:parsedRes.province.id,
                        selectedCompanyValue:parsedRes.company.id,
                    }

                    );
                global.SelectedLocation.latitude=parseFloat(parsedRes.place.latitude);
                global.SelectedLocation.longitude=parseFloat(parsedRes.place.longitude);
                this.loadCities(parsedRes.province.id);
                this.setState(
                    {
                        selectedCityValue:parsedRes.city.id,
                    }
                );
                this.loadAreas(parsedRes.city.id,parsedRes.city.id);
                this.setState(
                    {
                        selectedAreaValue:parsedRes.area.id,
                    }
                );
                // this.setState({infoLoaded:true});
                // alert(parsedRes.branch.title);
                // const placesArray2 =[{label: 'شهر', value: '-1'}];
                // for (const key in parsedRes) {
                //     placesArray2.push({
                //         label: parsedRes[key].title,
                //         value: parsedRes[key].id,
                //     });
                // }
                // this.setState((prevState, props) => ({
                //     cityOptions: placesArray2.map(place=><Picker.Item label={place.label} value={place.value}  />),
                //     selectedProvinceValue: value,
                // }));
            })
            .catch(err =>{
                Alert.alert("لطفا اتصال اینترنت خود را بررسی کنید");
            });
    };
    render() {
        const {height: heightOfDeviceScreen} = Dimensions.get('window');
        if(this.state.token!="" && this.state.token!=null)
        {
            if(!this.state.infoLoaded && !global.isnewprofile)
                this.loadBranchData();
            return (
                <View style={{flex:1}}  >
                    <ScrollView contentContainerStyle={{minHeight: this.height || heightOfDeviceScreen}}>
                        <View style={styles.container}>
                            {/*<Text>{this.state.token}</Text>*/}
                            <TextInput placeholder="نام"  underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({name: text});
                            }} value={this.state.name}/>
                            <TextInput placeholder="نام خانوادگی"  underlineColorAndroid={'transparent'} style={styles.input}  onChangeText={(text) => {
                                this.setState({family: text});
                            }} value={this.state.family}/>
                            <TextInput placeholder="کد ملی" keyboardType='numeric'  underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({melliCode: text});
                            }} value={this.state.melliCode}/>
                            <TextInput placeholder="تلفن همراه" keyboardType='numeric'  underlineColorAndroid={'transparent'} style={styles.input}  onChangeText={(text) => {
                                this.setState({mobile: text});
                            }} value={this.state.mobile} />
                            <TextInput placeholder="ایمیل"  underlineColorAndroid={'transparent'} style={styles.input}  onChangeText={(text) => {
                                this.setState({email: text});
                            }} value={this.state.email}/>

                            <View style={{alignItems: 'center',width:'100%',alignment: 'center'}}>
                                <Picker style={styles.select}
                                        name="province"
                                        selectedValue ={this.state.selectedProvinceValue}
                                        onValueChange={this.loadCities}
                                >
                                    {this.state.provinceOptions}
                                </Picker>
                            </View>
                            <View style={{alignItems: 'center',width:'100%',alignment: 'center'}}>
                                <Picker style={styles.select}
                                        name="city"
                                        selectedValue ={this.state.selectedCityValue}
                                        onValueChange={this.loadAreas}
                                >
                                    {this.state.cityOptions}
                                </Picker>
                            </View>
                            <View style={{alignItems: 'center',width:'100%',alignment: 'center'}}>
                                <Picker style={styles.select} itemTextStyle={styles.pickerText}
                                        name="area"
                                        selectedValue ={this.state.selectedAreaValue}
                                        onValueChange={(value, index) => {
                                            this.setState({selectedAreaValue: value});
                                        }}
                                >
                                    {this.state.areaOptions}
                                </Picker>
                            </View>
                            <View style={{alignItems: 'center',width:'100%',alignment: 'center'}}>
                                <Picker style={styles.select}
                                        name="company"
                                        selectedValue ={this.state.selectedCompanyValue}
                                        onValueChange={(value, index) => {
                                            this.setState({selectedCompanyValue: value});
                                        }}
                                        itemTextStyle={styles.pickerText}
                                >
                                    {this.state.companyOptions}
                                </Picker>
                            </View>
                            <TextInput placeholder="نام نمایندگی"  underlineColorAndroid={'transparent'} style={styles.input}  onChangeText={(text) => {
                                this.setState({title: text});
                            }} value={this.state.title}/>
                            <TextInput placeholder="کد نمایندگی" keyboardType='numeric'  underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({code: text});

                                // Alert.alert(text);
                            }} value={this.state.code}/>
                            <TextInput placeholder="سال تاسیس" keyboardType='numeric'  underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({fundYear: text});
                            }} value={this.state.fundYear}/>

                            <TextInput placeholder="آدرس"  underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({address: text});
                            }} value={this.state.address}/>
                            <TextInput placeholder="تلفن"  keyboardType='numeric' underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({tel: text});
                            }} value={this.state.tel} />
                            {global.isnewprofile ?
                            <TextInput placeholder="کلمه عبور" secureTextEntry={true} underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                this.setState({password: text});
                            }}/>
                                : <View/>}
                            {global.isnewprofile ?
                                <TextInput placeholder="تکرار کلمه عبور" secureTextEntry={true} underlineColorAndroid={'transparent'} style={styles.input} onChangeText={(text) => {
                                    this.setState({password2: text});
                                }}/>
                                : <View/>}

                            <View  style={{marginTop: '3%'}}>
                                <Button title="تصویر" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                    var options = {
                                        title: 'انتخاب تصویر نمایندگی',
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
                                            let source = { uri: response.uri };
                                            global.PictureLocation = response.path;
                                            // You can also display the image using data:
                                            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                            this.setState({
                                                avatarSource: source
                                            });
                                        }
                                    });
                                    // RNFileSelector.Show(
                                    //     {
                                    //         title: 'انتخاب تصویر شعبه',
                                    //         onDone: (path) => {
                                    //             global.PictureLocation = path;
                                    //             console.log('file selected: ' + path)
                                    //         },
                                    //         onCancel: () => {
                                    //             console.log('cancelled')
                                    //         }
                                    //     }
                                    // )
                                }}/>
                            </View>

                            <View  style={{marginTop: '3%'}}>
                                <Button title="تصویر مجوز نمایندگی" iconPlacement="right" underlineColorAndroid={'transparent'}  buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                    // RNFileSelector.Show(
                                    //     {
                                    //         title: 'انتخاب مجوز نمایندگی',
                                    //         onDone: (path) => {
                                    //             global.LicencePictureLocation = path;
                                    //             console.log('file selected: ' + path)
                                    //         },
                                    //         onCancel: () => {
                                    //             console.log('cancelled')
                                    //         }
                                    //     }
                                    // )
                                    var options = {
                                        title: 'انتخاب مجوز نمایندگی',
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
                                            let source = { uri: response.uri };
                                            global.LicencePictureLocation = response.path;
                                            // You can also display the image using data:
                                            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                                            this.setState({
                                                avatarSource: source
                                            });
                                        }
                                    });
                                }}/>
                            </View>
                            <View  style={{marginTop: '3%'}}>
                                <Button  title="محل" iconPlacement="right" underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText} onPress={(e) => {
                                    const {navigate} = this.props.navigation;
                                    navigate('SelectLocation', {name: 'SelectLocation'});
                                }}/>
                            </View>
                            <View  style={{marginTop: '3%'}}>
                                <Button title="ذخیره" iconPlacement="right" underlineColorAndroid={'transparent'} buttonStyle={generalStyles.saveButton}  textStyle={generalStyles.saveButtonText}  onPress={(e) => {

                                    let formIsValid=true;
                                    if(global.isnewprofile)
                                    {
                                        if(this.state.password!==this.state.password2)
                                        {
                                            formIsValid=false;
                                            Alert.alert("خطا","کلمه عبور و تکرار آن یکسان نیستند.");

                                        }
                                        else if(this.state.password.length<8)
                                        {
                                            formIsValid=false;
                                            Alert.alert("خطا","طول کلمه عبور باید حداقل ۸ حرف باشد.");
                                        }
                                        else if(global.LicencePictureLocation.length<3)
                                        {
                                            formIsValid=false;
                                            Alert.alert("خطا","لطفا فایل تصویر مجوز معتبر را انتخاب نمایید.");

                                        }
                                        else if(global.PictureLocation.length<3)
                                        {
                                            formIsValid=false;
                                            Alert.alert("خطا","لطفا فایل تصویر نمایندگی را انتخاب نمایید.");

                                        }
                                        else if(this.state.melliCode.length<10)
                                        {
                                            formIsValid=false;
                                            Alert.alert("خطا","کد ملی باید ۱۰ رقمی باشد.");
                                        }
                                        else if(global.SelectedLocation.latitude<=0 || global.SelectedLocation.latitude=="-1")
                                        {
                                            formIsValid=false;
                                            Alert.alert("خطا","لطفا محل نمایندگی را از روی نقشه انتخاب نمایید.");
                                        }
                                    }
                                    if(!this.validateEmail(this.state.email))
                                    {
                                        formIsValid=false;
                                        Alert.alert("خطا","لطفا آدرس ایمیل را به صورت کامل وارد کنید.");
                                    }
                                    if(formIsValid)
                                    {
                                        const data = new FormData();
                                        data.append('latitude', global.SelectedLocation.latitude);
                                        data.append('longitude', global.SelectedLocation.longitude);
                                        data.append('title', this.state.title);
                                        data.append('tel', this.state.tel);
                                        // Alert.alert(this.state.title);
                                        data.append('description', this.state.address);
                                        data.append('email', this.state.email);
                                        data.append('address', this.state.address);
                                        data.append('fundationyear', this.state.fundYear);
                                        data.append('code', this.state.code);
                                        data.append('name', this.state.name);
                                        data.append('family', this.state.family);
                                        data.append('mellicode', this.state.melliCode);
                                        if(global.isnewprofile)
                                            data.append('password', this.state.password);
                                        data.append('mobile', this.state.mobile);
                                        data.append('area_id', this.state.selectedAreaValue);
                                        data.append('company_id', this.state.selectedCompanyValue);
                                        data.append('logo', "NoLogo");
                                        if(global.PictureLocation!="" && global.PictureLocation!=null)
                                        {

                                            data.append('photo', {
                                                uri: "file://" + global.PictureLocation,
                                                type: 'image/jpeg',
                                                name: 'photo.jpg'
                                            });

                                            console.log(global.PictureLocation);
                                        }
                                        if(global.LicencePictureLocation!="" && global.LicencePictureLocation!=null)
                                        {

                                            console.log(global.LicencePictureLocation);
                                            data.append('licence', {
                                                uri: "file://" + global.LicencePictureLocation,
                                                type: 'image/jpeg',
                                                name: 'licence.jpg'
                                            });
                                        }
                                        if(global.isnewprofile)
                                        {
                                            fetch(global.ServerURL + "/api/placeman/places/add", {
                                                method: 'post',
                                                headers: {
                                                    Accept: 'application/json',
                                                },
                                                body: data
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    console.log(res);
                                                    if(res.hasOwnProperty("token"))
                                                    {
                                                        Alert.alert("پیام",res.message);
                                                        if(res.token!='-1')
                                                        {

                                                            global.token=res.token;
                                                            UserMan.SaveToken(res.token);
                                                            global.isnewprofile=false;
                                                            this.props.navigation.dispatch(Navigation.resetNavigationAndNavigate('MapPage'));
                                                        }
                                                    }
                                                    else if(res.hasOwnProperty("errors"))
                                                    {
                                                        let message="";
                                                        Object.keys(res.errors).map(function(key) {
                                                            message=message+"\r\n"+res.errors[key]
                                                        });
                                                        Alert.alert("خطا",message);
                                                    }
                                                    else
                                                    {
                                                        Alert.alert("پیام","ثبت اطلاعات با خطا مواجه شد. "+res.message);
                                                    }
                                                }).catch(function (error) {
                                                    console.log(error.message);
                                                // Alert.alert(error.message);
                                                Alert.alert("خطا","خطایی در ثبت اطلاعات بوجود آمد");
                                                throw error;
                                            });
                                        }
                                        else
                                        {
                                            fetch(global.ServerURL + "/api/placeman/places/edit", {
                                                method: 'post',
                                                headers: {
                                                    Accept: 'application/json',
                                                    'Authorization': 'Bearer '+this.state.token,
                                                },
                                                body: data
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    if(res.hasOwnProperty("errors"))
                                                    {
                                                        let message="";
                                                        Object.keys(res.errors).map(function(key) {
                                                            message=message+"\r\n"+res.errors[key]
                                                        });
                                                        Alert.alert("خطا",message);
                                                    }
                                                    else {
                                                        Alert.alert("پیام",res.message);
                                                    }
                                                    console.log(res);
                                                }).catch(function (error) {
                                                console.log(error.message);
                                                Alert.alert("خطا","خطایی در ثبت اطلاعات بوجود آمد");
                                                throw error;
                                            });
                                        }

                                    }

                                }}/>
                            </View>



                        </View>
                    </ScrollView>
                </View>
            )
        }
        return(<View><Text>در حال بارگذاری...</Text></View>);

    }
}
const styles = StyleSheet.create(
    {

        input:
            {
                fontSize: 17,
                minHeight: 60,
                textAlign:'center',
                direction: 'rtl',
                fontFamily: 'IRANSansMobile',
                width: '90%',

                backgroundColor: "#ffffff",
                borderRadius:30,
                marginTop: '3%',
            },
        container:
            {

                backgroundColor: "#16a091",
                height:'100%',
                width:'100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
        inputLabel:
            {
                lineHeight: 40,
                fontSize: 17,
                minHeight: 40,
                direction: 'rtl',
                textAlign: 'right',
                fontFamily: 'IRANSansMobile',
            },

        select:
            {
                lineHeight: 40,
                fontSize: 17,
                minHeight: 40,
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                width:'50%',
                height: 50,
                color: '#ffffff',
            },
        ScrollView:
            {
                backgroundColor: 'gray',
            },
        pickerItem:
            {
                color:"#ffffff"
            },
        pickerText:
            {
                color:'#ffffff',
                direction: 'rtl',
                textAlign: 'center',
                fontFamily: 'IRANSansMobile',
                fontSize: 20,

            }

    }
);
