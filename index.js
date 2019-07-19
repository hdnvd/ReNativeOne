import { AppRegistry ,Dimensions  } from 'react-native';
import App from './App';
import { DrawerNavigator } from 'react-navigation';
import SideMenu from './components/sidemenu/SideMenu'
import stackNav from './components/sidemenu/stackNav';

const drawernav = DrawerNavigator({
    Item1: {
        screen: stackNav,
    }
}, {
    drawerPosition: 'right',
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});
AppRegistry.registerComponent('babimeh', () => drawernav);
