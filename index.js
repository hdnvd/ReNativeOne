import { AppRegistry ,Dimensions  } from 'react-native';
import App from './App';
import { DrawerNavigator } from 'react-navigation';
import SideMenu from './components/sidemenu/SideMenu'
import stackNav from './components/sidemenu/stackNav';

import { strings } from './sweet/i18n';
import Localization from "./classes/Localization";
const drawernav = DrawerNavigator({
    Item1: {
        screen: stackNav,
    }
}, {
    drawerPosition: Localization.isPhoneRTL()?'left':'right',
    // drawerPosition: 'right',
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});
AppRegistry.registerComponent('babimeh', () => drawernav);
