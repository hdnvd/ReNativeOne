/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    TextInput,
    AsyncStorage,
    Text,
    NativeModules,
    TouchableOpacity,
    Linking
} from 'react-native';
class SweetAlert{

    static displayAccessDeniedAlert()
    {
        Alert.alert('توجه','شما دسترسی کافی برای انجام این کار ندارید');
    }
    static displaySimpleAlert(Title,Text)
    {
        console.log('displaying Alert:'+Title+":"+Text);
        Alert.alert(Title,Text);
    }
    static displayDeleteAlert(OnConfirmHandler)
    {

        Alert.alert('توجه','آیا مطمئن هستید که می خواهید این آیتم را حذف کنید؟',[
            {text:'بله',onPress:OnConfirmHandler},
            {text:'خیر'}
        ]);
    }
}

export default SweetAlert;
