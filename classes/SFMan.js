// @flow
export default class SFMan{
    static getTitleFieldFromObject(obj)
    {

        let titleFieldName='name';
        if(!obj.hasOwnProperty(titleFieldName))
        {
            titleFieldName='title';
            if(!obj.hasOwnProperty(titleFieldName))
            {
                titleFieldName='phone';
                if(!obj.hasOwnProperty(titleFieldName))
                    titleFieldName='id';
            }
        }
        return titleFieldName;
    }
}
