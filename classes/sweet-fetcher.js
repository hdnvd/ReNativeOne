// @flow
import Constants from "./Constants";
import {AsyncStorage,Alert,NetInfo} from "react-native";
import Common from "./Common";
import SweetAlert from "./SweetAlert";
import axios from 'axios';



class SweetFetcher {
    static METHOD_GET='get';
    static METHOD_POST='post';
    static METHOD_PUT='put';
    static METHOD_DELETE='delete';
    _Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history,SessionKey){
        // NetInfo.fetch().then(state => {
        //     console.log(state)
        // });
        NetInfo.isConnected.fetch().done((isConnected) => {
            if ( isConnected ) {
                // Run your API call

                Method = Method.toString().trim().toLowerCase();
                let theBaseURL = Constants.SiteURL + "/api";
                console.log("Loading URL:" + theBaseURL + URL);
                console.log("Session Key: " + SessionKey);
                let PostData = null;
                if (PostingData != null) {
                    if (Constants.ServerMode === Constants.SERVERMODE_LARAVEL) {
                        if (Method === "put") {
                            PostingData.append('_method', 'put');
                            Method = SweetFetcher.METHOD_POST;
                        }
                        PostData = PostingData;
                    }
                    else if (Constants.ServerMode === Constants.SERVERMODE_ASP) {
                        PostData = new URLSearchParams(PostingData);
                    }
                }
                let Fetched = null;
                let Prefix = '';
                if (Constants.ServerMode === Constants.SERVERMODE_LARAVEL)
                    Prefix = 'Bearer ';
                let ax = axios.create({
                    baseURL: theBaseURL,
                    headers: {
                        Accept: 'application/json',
                        Authorization: Prefix + SessionKey,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode: 'cors',
                    crossDomain: true,
                });
                if (Method === SweetFetcher.METHOD_GET) {
                    Fetched = ax.get(URL);
                }
                else if (Method === SweetFetcher.METHOD_POST) {
                    Fetched = ax.post(URL, PostData);
                }
                else if (Method === SweetFetcher.METHOD_PUT) {
                    Fetched = ax.put(URL, PostData);
                }
                else if (Method === SweetFetcher.METHOD_DELETE) {
                    Fetched = ax.delete(URL);
                }
                Fetched.then(response => {
                    try {
                        console.log(response);
                    } catch (e) {

                    }

                    let data = response.data;
                    if (data != null) {
                        console.log(data);
                        if (Array.isArray(data.Data)) {
                            for (let i = 0; i < data.Data.length; i++) {
                                data.Data[i] = Common.convertObjectPropertiesToLowerCase(data.Data[i]);
                            }
                        }
                        else if (data.Data != null) {
                            data.Data = Common.convertObjectPropertiesToLowerCase(data.Data);
                        }
                        AfterFetchFunction(data);
                    }

                }).catch(function (error) {
                    if (OnErrorFunction != null)
                        OnErrorFunction(error);
                    if (error.response != null) {
                        if (error.response.status !== 200 && error.response.status !== 201 && error.response.status !== 202 && error.response.status !== 203) {

                            let status = error.response.status;
                            console.log(status.toString().trim());
                            if (status.toString().trim() === "403")
                                SweetAlert.displaySimpleAlert("خطای عدم دسترسی", 'شما دسترسی کافی برای انجام این درخواست را ندارید');
                            if (status.toString().trim() === "401")
                                SweetAlert.displaySimpleAlert("خطای اطلاعات کاربری", 'اطلاعات کاربری صحیح نمی باشد');
                            if (status.toString().trim() === "422")
                                SweetAlert.displaySimpleAlert("خطای اطلاعات ورودی", 'لطفا اطلاعات را به صورت صحیح وارد کنید');
                            if (status.toString().trim() === "500")
                                SweetAlert.displaySimpleAlert("خطای سرور", 'خطایی در سمت سرور رخ داد، لطفا این مشکل را به پشتیبانی اطلاع دهید.');


                            if (status.toString().trim() === "405")
                                SweetAlert.displayAccessDeniedAlert();
                            if (status.toString().trim() === "429")
                                SweetAlert.displaySimpleAlert("خطای محافظت امنیتی", 'تعداد درخواست های شما بیش از حد مجاز است و به دلایل امنیتی دسترسی شما تا چند دقیقه بعد مسدود شد. لطفا چند دقیقه دیگر مراجعه نمایید');
                        }
                    }
                    else {
                        SweetAlert.displaySimpleAlert("خطا", 'خطایی پیش بینی نشده ای به وجود آمد، لطفا چند دقیقه دیگر مراجعه نمایید ');
                    }

                    console.log(error.response);
                    console.log(error);
                });
            }
            else
            {
                SweetAlert.displaySimpleAlert("خطا", 'اتصال به اینترنت برقرار نیست.');

            }
        });
    }
    Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history){

        AsyncStorage.getItem('sessionkey').then((SessionKey)=> {
            this._Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history,SessionKey)
        }).catch(E=>{
            this._Fetch(URL,Method,PostingData,AfterFetchFunction,OnErrorFunction,ServiceName,ActionName,history,'')

        });
    }
}
export default SweetFetcher;
