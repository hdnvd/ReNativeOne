import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';
import generalStyles from "../../styles/generalStyles";
import Constants from "../../classes/Constants";

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    };

    render () {
        return (
            <ImageBackground source={require('../../images/sidebar.png')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <Image style={generalStyles.drawerTopImage} source={require('../../images/Logo.png')}/>
                <ScrollView>
                        {Constants.DefaultRole=='trapp_villaowner' &&
                        <View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_villaownerManage')}>
                                    اطلاعات صاحب ویلا
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('placeman_placeManage')}>
                                    اطلاعات مکان ویلا
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_villaManage')}>
                                    اطلاعات ویلا
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('placeman_placePhotoManage')}>
                                   تصاویر ویلا
                                </Text>
                            </View>

                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_villaoptionManage')}>
                                    امکانات ویلا
                                </Text>
                            </View>
                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_villaReservationInfo')}>
                                    مدیریت ویلا
                                </Text>
                            </View>

                            <View style={styles.navSectionStyle}>
                                <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_villaView')}>
                                    مشاهده ویلای من
                                </Text>
                            </View>
                        </View>
                        }
                        {Constants.DefaultRole=='trapp_user' &&
                        <View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_villaList')}>
                                جستجوی ویلا
                            </Text>
                        </View>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('trapp_orderList')}>
                            رزروها
                            </Text>
                            </View>
                        </View>
                        }

                </ScrollView>
                {/*<View style={styles.footerContainer}>*/}
                    {/*<Text>This is my fixed footer</Text>*/}
                {/*</View>*/}
            </View>
            </ImageBackground>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};
export default SideMenu;
