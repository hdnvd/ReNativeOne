import {
  createStackNavigator,
} from 'react-navigation';
import MapPage from './pages/MapPage'
import DisplayPlace from './pages/DisplayPlace'
import ManageBranch from './pages/ManageBranch'
import Login from './pages/Login'
import SelectLocation from './pages/SelectLocation'
import {AsyncStorage, YellowBox} from 'react-native';
import Splash from "./pages/Splash";
import PlaceVerification from "./pages/PlaceVerification";
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
YellowBox.ignoreWarnings(['Warning: ReactNative.IsMounted']);
console.disableYellowBox = true;
const App = createStackNavigator({
    Splash: { screen: Splash },
    Login: { screen: Login },
  MapPage: { screen: MapPage },
DisplayPlace: { screen: DisplayPlace },
ManageBranch: { screen: ManageBranch },
SelectLocation: { screen: SelectLocation },
    PlaceVerification: { screen: PlaceVerification },
});
  // global.ServerURL = 'http://192.168.43.36';
  // global.ServerURL = 'http://192.168.1.2';
  global.ServerURL = 'http://insurance-app.ir';
  // global.ServerURL = 'http://10.0.2.2';
  global.itemID=-1;
  global.AppVersion=3;
  global.token='';
  // global.isnewprofile=false;
  global.usertype=1;//Branch Admins
  // global.usertype=2;//ADMIN
  // global.usertype=3;//USER
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default App;
