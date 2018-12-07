import { SAVE_PROFILE } from './actiontype';
import {
    loginApi, getUserByTokenApi, getUserByIdApi
} from '../../AppApi';
var md5 = require('md5');

export const login = (username, password) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var md5Password = md5(password);
            loginApi(username, md5Password)
                .then((responseJson) => {
                    console.log('login api response: ', responseJson);
                    if (responseJson.returnCode === 1) {
                        var access_token = responseJson.user.access_token;
                        var refresh_token = responseJson.user.refresh_token;
                        localStorage.setItem('access_token', access_token);
                        localStorage.setItem('refresh_token', refresh_token);
                        var user = responseJson.user;
                        dispatch(saveProfile(user));
                    }
                    dispatch(saveProfile(null));
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getUserByToken = () => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = localStorage.getItem('access_token');
            var refresh_token = localStorage.getItem('refresh_token');
            getUserByTokenApi(access_token, refresh_token)
                .then((responseJson) => {
                    console.log('getUserByToken api response: ', responseJson);
                    if (responseJson.returnCode === 1) {
                        var user = responseJson.user;
                        dispatch(saveProfile(user));
                    }
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const getUserInfo = (id) => {
    return (dispatch) => {
        var access_token = localStorage.getItem('access_token');
        var refresh_token = localStorage.getItem('refresh_token');
        getUserByIdApi(access_token, refresh_token, id)
            .then((responseJson) => {
                console.log('getUserInfo api response: ', responseJson);
                if (responseJson.returnCode === 1) {
                    var user = responseJson.user;
                    dispatch(saveProfile(user));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile
    };
}