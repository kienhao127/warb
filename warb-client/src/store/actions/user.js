import { SAVE_PROFILE } from './actiontype';
import {
    loginApi, getUserByTokenApi, getUserByIdApi, getUserForTypeApi, getStatusDriverByReTokenApi, getTripByIdApi
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
                        sessionStorage.setItem('access_token', access_token);
                        sessionStorage.setItem('refresh_token', refresh_token);
                        var user = responseJson.user;
                        if (user.userType === 4){
                            getStatusDriverByReTokenApi(access_token, refresh_token)
                            .then(resJson => {
                                user['status'] = resJson.object.status;
                                dispatch(saveProfile(user));
                            })
                        } else {
                            dispatch(saveProfile(user));
                        }
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
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            getUserByTokenApi(access_token, refresh_token)
                .then((responseJson) => {
                    console.log('getUserByToken api response: ', responseJson);
                    if (responseJson.returnCode === 1) {
                        var user = responseJson.user;
                        if (user.userType === 4){
                            getStatusDriverByReTokenApi(access_token, refresh_token)
                            .then(resJson => {
                                console.log(resJson);
                                user['status'] = resJson.object.status;
                                user['lastTripId'] = resJson.object.lastTripId;
                                getTripByIdApi(access_token, refresh_token, resJson.object.lastTripId)
                                .then(responseJson => {
                                    console.log(responseJson);
                                    user['lastTripStatus'] = responseJson.object.status; 
                                    user['lastTripLocation'] = {lat: responseJson.object.tripLatitude, lng: responseJson.object.tripLongitude};
                                    user['lastTrip'] = responseJson.object;
                                    dispatch(saveProfile(user));
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            })
                        } else {
                            dispatch(saveProfile(user));
                        }
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
        var access_token = sessionStorage.getItem('access_token');
        var refresh_token = sessionStorage.getItem('refresh_token');
        getUserByIdApi(access_token, refresh_token, id)
            .then((responseJson) => {
                console.log('getUserInfo api response: ', responseJson);
                if (responseJson.returnCode === 1) {
                    var user = responseJson.user;
                    if (user.userType === 4){
                        getStatusDriverByReTokenApi(access_token, refresh_token)
                        .then(resJson => {
                            user['status'] = resJson.object.status;
                            dispatch(saveProfile(user));
                        })
                    } else {
                        dispatch(saveProfile(user));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const getUserForType = (dif) => {
    return (dispatch) => {
        const promise = new Promise((resolve, reject) => {
            var access_token = sessionStorage.getItem('access_token');
            var refresh_token = sessionStorage.getItem('refresh_token');
            getUserForTypeApi(access_token, refresh_token, dif)
                .then((responseJson) => {
                    console.log('getUserForType api response: ', responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        return promise;
    }
}

export const saveProfile = (profile) => {
    return {
        type: SAVE_PROFILE,
        profile: profile
    };
}

