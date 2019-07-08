import {
    createStackNavigator,
} from 'react-navigation';
import MapPage from './pages/MapPage'
import DisplayPlace from './pages/DisplayPlace'
import ManageBranch from './pages/ManageBranch'
import Login from './modules/users/pages/Login'
import sas_unitManage from './modules/sas/pages/unit/sas_unitManage'
import trapp_villaownerManage from './modules/trapp/pages/villaowner/trapp_villaownerManage'
import trapp_villaReservationInfo from './modules/trapp/pages/villa/trapp_villaReservationInfo'
import trapp_villaManage from './modules/trapp/pages/villa/trapp_villaManage'
import trapp_orderList from './modules/trapp/pages/order/trapp_orderList'
import trapp_villaView from './modules/trapp/pages/villa/trapp_villaView'
import trapp_villaReserve from './modules/trapp/pages/villa/trapp_villaReserve'
import placeman_placeManage from './modules/placeman/pages/place/placeman_placeManage'
import placeman_placeView from './modules/placeman/pages/place/placeman_placeView'
import placeman_placeList from './modules/placeman/pages/place/placeman_placeList'
import trapp_villaList from './modules/trapp/pages/villa/trapp_villaList'
import trapp_villaownerList from './modules/trapp/pages/villaowner/trapp_villaownerList'
import sas_unitList from './modules/sas/pages/unit/sas_unitList'
import posts__posts_postManage from './modules/posts/pages/post/posts_postManage'
import SelectLocation from './pages/SelectLocation'
import {AsyncStorage, YellowBox} from 'react-native';
import Splash from "./pages/Splash";
import PlaceVerification from "./pages/PlaceVerification";
import Constants from "./classes/Constants";

YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
YellowBox.ignoreWarnings(['Warning: ReactNative.IsMounted']);
console.disableYellowBox = true;
const App = createStackNavigator({
    Splash: {screen: Splash},
    Login: {screen: Login},
    trapp_villaownerManage: {screen: trapp_villaownerManage},
    trapp_villaReservationInfo: {screen: trapp_villaReservationInfo},
    trapp_orderList: {screen: trapp_orderList},
    trapp_villaManage: {screen: trapp_villaManage},
    placeman_placeManage: {screen: placeman_placeManage},
    placeman_placeView: {screen: placeman_placeView},
    placeman_placeList: {screen: placeman_placeList},
    trapp_villaownerList: {screen: trapp_villaownerList},
    trapp_villaView: {screen: trapp_villaView},
    trapp_villaReserve: {screen: trapp_villaReserve},
    trapp_villaList: {screen: trapp_villaList},
    sas_unitList: {screen: sas_unitList},
    sas_unitManage: {screen: sas_unitManage},
    MapPage: {screen: MapPage},
    posts__posts_postManage: {screen: posts__posts_postManage},
    DisplayPlace: {screen: DisplayPlace},
    ManageBranch: {screen: ManageBranch},
    SelectLocation: {screen: SelectLocation},
    PlaceVerification: {screen: PlaceVerification},
});
// global.ServerURL = 'http://192.168.43.36';
// global.ServerURL = 'http://192.168.1.2';
global.ServerURL = Constants.ServerURL;
// global.ServerURL = 'http://insurance-app.ir';
// global.ServerURL = 'http://laraone.test';
// global.ServerURL = 'http://10.0.2.2';
global.itemID = -1;
global.AppVersion = 3;
global.token = '';
// global.isnewprofile=false;

global.usertype = 1;//Branch Admins
// global.usertype=2;//ADMIN
// global.usertype=3;//USER
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default App;
