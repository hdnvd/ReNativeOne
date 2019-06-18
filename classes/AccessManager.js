// @flow
import {AsyncStorage,Alert} from "react-native";
import Constants from "./Constants";

class AccessManager{
    static LIST='list';
    static VIEW='view';
    static EDIT='edit';
    static INSERT='insert';
    static DELETE='delete';
    static UserCan(ModuleName,TableName,Action)
    {
        if(Constants.ServerMode===Constants.SERVERMODE_LARAVEL) {
            
            ModuleName=ModuleName.toLowerCase();
            TableName=TableName.toLowerCase();
            Action=Action.toLowerCase();
            let ActionString=ModuleName+'.'+TableName + "."+Action;
            let access=AsyncStorage.getItem('access.'+ActionString);
            // let hasAccess=false;

            console.log('Checking Access List '+ActionString);
            // console.log(access.length);
            // console.log(Object.keys(access));
            return access!=null;
            // let keys=Object.keys(access);
            // for(let i=0; keys!==null && i<keys.length;i++)
            // {
            //     console.log(access[keys[i]].name.toLowerCase().trim());
            //     let Access=(access[keys[i]].name.toLowerCase().trim()===ActionString);
            //     if(Access)
            //     {
            //         hasAccess=true;
            //         break;
            //     }
            // }
            // return hasAccess;
        }
        else
        {
            if(Action===AccessManager.LIST)
                Action=AccessManager.VIEW;
            let access=AsyncStorage.getItem('access');
            console.log(access);
            let ActionString=TableName + "."+Action;
            let hasAccess=(access.hasOwnProperty(ActionString) && access[ActionString].toString()==="1");
            return hasAccess;
        }

    }
    static getUserRoles()
    {
        
        let roles= AsyncStorage.getItem('userroles');
        return roles==null?[]:roles;
    }
    static UserIsLoggedIn()
    {
        
        let sessionKey= AsyncStorage.getItem('sessionkey');
        if(sessionKey==null || sessionKey=="")
            return false;
        return true;
    }
    static getUserDisplayName()
    {
        
        let userdisplayname= AsyncStorage.getItem('userdisplayname');
        if(userdisplayname==null)
            userdisplayname="کاربر مهمان";
        return userdisplayname;
    }
    static getUserLoginTime()
    {
        
        let userlogintime= AsyncStorage.getItem('userlogintime');
        if(userlogintime==null)
            userlogintime="";
        return userlogintime;
    }
}

export default AccessManager;
