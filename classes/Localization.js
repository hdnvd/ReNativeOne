import { NativeModules, Platform } from 'react-native'

export default class Localization{
    static isPhoneRTL()
    {
        const isIOS = Platform.OS === 'ios';
        let lang = isIOS ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier;
        lang=lang.toLowerCase();
        return (lang==='fa_ir');
    }
    static getRowDirection()
    {
        if(Localization.isPhoneRTL())
            return 'row-reverse';
        alert('ltr');
        return 'row';
    }
    static getRowReverseDirection()
    {
        if(Localization.isPhoneRTL())
            return 'row';
        alert('ltr');
        return 'row-reverse';
    }
    static getFlexStart()
    {
        if(Localization.isPhoneRTL())
            return 'flex-end';
        return 'flex-start';
    }
    static getFlexEnd()
    {
        if(Localization.isPhoneRTL())
            return 'flex-start';
        return 'flex-end';
    }

}
