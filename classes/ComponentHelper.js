// @flow
class ComponentHelper{

    static appendImageSelectorToFormDataIfNotNull(FormData,FieldName,ImageSelectorValue)
    {
        if(ImageSelectorValue!='' && ImageSelectorValue!=null)
        {

            FormData.append(FieldName, {
                uri: 'file://' + ImageSelectorValue,
                type: 'image/jpeg',
                name: 'photo.jpg'
            });
        }
        return FormData;
    }
}

export default ComponentHelper;
