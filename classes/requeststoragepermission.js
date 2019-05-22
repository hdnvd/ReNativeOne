import { PermissionsAndroid } from 'react-native';

     async function requestStoragePermission(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'دسترسی به حافظه داخلی',
                    'message': 'لطفا اجازه دسترسی به حافظه داخلی گوشی خود را به نرم افزار بدهید.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the Storage")
            } else {
                console.log("Storage permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    export default requestStoragePermission;