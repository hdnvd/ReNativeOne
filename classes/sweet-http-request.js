
import Common from './Common';
class SweetHttpRequest {
    _Variables=[];
    constructor()
    {
        this._Variables=[];
    };
    appendVariable(Name, Value)
    {
        this._Variables.push({id:Name,value:Value});
    }
    appendVariables(Variables,NameField,ValueField)
    {
        this.appendVariablesWithPostFix(Variables,NameField,ValueField,'');
    }
    appendVariablesAsArray(Variables,ArrayName,ValueField)
    {
        for(let i=0;Variables!=null && i<Variables.length;i++)
        {
            console.log(Variables[i][ValueField]);
            this.appendVariable(ArrayName+"[]",Variables[i][ValueField]);
        }
    }
    appendVariablesWithPostFix(Variables,NameField,ValueField,PostFix)
    {
        for(let i=0;Variables!=null && i<Variables.length;i++)
        {
            console.log(Variables[i][NameField]+PostFix);
            this.appendVariable(Variables[i][NameField]+PostFix,Variables[i][ValueField]);
        }

    }
    appendVariablesFromObjectKeys(VariablesObject)
    {
        return this.appendVariablesWithPostFixFromObjectKeys(VariablesObject,"");
    }
    appendVariablesWithPostFixFromObjectKeys(VariablesObject,PostFix)
    {
        if(VariablesObject==null)
            return;
        let KeyValueArray=Common.ObjectToIdValueArray(VariablesObject);
        return this.appendVariablesWithPostFix(KeyValueArray,"id","value",PostFix);
    }
    getParamsString()
    {
        return SweetHttpRequest.getHttpGetParamsFromArray(this._Variables);
    }
    static getHttpGetParamsFromArray(filtered)
    {
        let CurrentString='';
        for(let i=0;filtered!=null && i<filtered.length;i++)
            CurrentString=this.appendHttpParamToString(CurrentString,filtered[i]['id'],Common.getStringValue(filtered[i]['value']));
        return CurrentString;
    }

    static appendHttpParamToString(CurrentString,VariableName,VariableValue)
    {
        if(CurrentString!=='')
            CurrentString=CurrentString+"&";
        CurrentString+=VariableName+'='+VariableValue;
        return CurrentString;
    }
}
export default SweetHttpRequest;