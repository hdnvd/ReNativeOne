// @flow
class Common{

    static convertObjectPropertiesToLowerCase(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={}
        while (n--) {
            key = keys[n];
            newobj[key.toLowerCase()] = obj[key];
        }
        return newobj;
    }
    static ObjectToIdValueArray(theObject)
    {
        let key, keys = Object.keys(theObject);
        let n = keys.length;
        let resultArray=[];
        while (n--) {
            key = keys[n];
            resultArray[n]={id:key.toLowerCase(),value:theObject[key]};
        }
        return resultArray;
    }
    static convertNullKeysToEmpty(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={};
        while (n--) {
            key = keys[n];
            let content=obj[key];
            if(content==null || content=="null" || (content.length>0 && content.trim()=='null'))
                newobj[key] = '';
            else
                newobj[key] = content;
        }
        return newobj;
    }
    static getObjectCopy(obj)
    {
        let key, keys = Object.keys(obj);
        let n = keys.length;
        let newobj={};
        while (n--) {
            key = keys[n];
            newobj[key]=obj[key];
        }
        return newobj;
    }
    static clearAllCookies()
    {
        let cookies=new Cookies();
        let AllCookies=cookies.getAll();
        let keys = Object.keys(AllCookies);
        for(let key of keys)
            cookies.remove(key);
    }


    static getIdValueArrayFromSortArray(Sorted)
    {
        let IdValueArray=[];
        for(let i=0;Sorted!=null && i<Sorted.length;i++)
            IdValueArray.push({id:Sorted[i].id+'__sort',value:Sorted[i].desc?'1':'0'});
        return IdValueArray;
    }
    static getStringValue(Variable)
    {
        if(Variable===false)
            return "0";
        else if(Variable===true)
            return "1";
        else
            return Variable;
    }
}

export default Common;
