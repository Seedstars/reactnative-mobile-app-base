import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import OneSignal from 'react-native-onesignal';
import { Crashlytics } from 'react-native-fabric';
import Config from 'react-native-config';
import Storage from 'react-native-simple-store';
import { Alert } from 'react-native';
import branch from 'react-native-branch';
import { Buffer } from 'buffer';
import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_EXPIRED,
    AUTH_LOGOUT_USER,
    AUTH_SAVE_USERS_INFORMATION,
    AUTH_SIGNUP_REQUEST,
    AUTH_SIGNUP_SUCCESS,
    SUBMIT_SIGNUP_FORM_SAVE,
    SUBMIT_LOGIN_FORM_SAVE,
    AUTH_LOGIN_CLEAN_ERRORS
} from '../constants';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';

const { reset } = navigationActions;


export function userLoginRequest() {
    return {
        type: AUTH_LOGIN_USER_REQUEST
    };
}

export function userLogoutRequest() {
    return {
        type: AUTH_LOGOUT_USER
    };
}

export function userLoginSuccess(token, user, outdated) {
    return {
        type: AUTH_LOGIN_USER_SUCCESS,
        payload: {
            token,
            user,
            outdated
        }
    };
}
export function cleanErrors() {
    return {
        type: AUTH_LOGIN_CLEAN_ERRORS
    };
}

export function userLoginFailure(error, errorObject) {
    return {
        type: AUTH_LOGIN_USER_FAILURE,
        payload: {
            error,
            errorObject
        }
    };
}

export function userLoginExpired(error, errorObject) {
    return {
        type: AUTH_LOGIN_USER_EXPIRED,
        payload: {
            error,
            errorObject
        }
    };
}

export function saveUserInformation(user) {
    return {
        type: AUTH_SAVE_USERS_INFORMATION,
        payload: {
            user,
        }
    };
}

export function signUpSaveForms(data) {
    return {
        type: SUBMIT_SIGNUP_FORM_SAVE,
        payload: {
            data
        }
    };
}

export function loginSaveForms(data) {
    return {
        type: SUBMIT_LOGIN_FORM_SAVE,
        payload: {
            data
        }
    };
}

export function signUpRequest() {
    return {
        type: AUTH_SIGNUP_REQUEST
    };
}

export function signUpSuccess(token, user, outdated) {
    return {
        type: AUTH_SIGNUP_SUCCESS,
        payload: {
            token,
            user,
            outdated,
        }
    };
}

export function setOneSignalId(token, oneSignalId) {
    return (dispatch) => {
        return fetch(`${SERVER_URL}/api/v1/accounts/onesignal/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                one_signal_id: oneSignalId
            }
            )
        })
            .then(checkHttpStatus)
            .done();
    };
}

export function getOneSignal(token, oneSignalId) {
    return (dispatch) => {
        OneSignal.configure({
            onIdsAvailable: (device) => {
                if (typeof oneSignalId !== 'undefined' && device.userId !== oneSignalId) {
                    dispatch(setOneSignalId(token, device.userId));
                }
            }
        });
    };
}

export function loginFacebook(token) {
    return (dispatch) => {
        dispatch(userLoginRequest());

        return branch.getFirstReferringParams()
            .then((installParams) => {
                return fetch(`${SERVER_URL}/api/v1/accounts/login-facebook/`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        access_token: token,
                        app_version: Config.APP_VERSION_NAME,
                        branch_data: installParams,

                    })
                });
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                try {
                    Storage.save('user', {
                        token: response.token,
                        user: response.user,
                    });

                    Crashlytics.setUserName(`${response.user.first_name} ${response.user.last_name}`);
                    Crashlytics.setUserEmail(response.user.email);
                    Crashlytics.setUserIdentifier(response.user.facebook_uid);

                    dispatch(reset([{
                        key: 'dashboard',
                        index: 0
                    }], 'global'));

                    dispatch(userLoginSuccess(response.token, response.user, response.outdated));
                    dispatch(getOneSignal(response.token, response.user.one_signal_id));
                } catch (e) {
                    dispatch(userLoginFailure(403, e));
                }
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // token issues
                    Storage.delete('user');

                    dispatch(userLoginFailure(401, error));
                    dispatch(reset([{
                        key: 'dashboard',
                        index: 0
                    }], 'global'));
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    // form validation issues, so we should have a json with errors
                    error.response.json().then((data) => {
                        dispatch(userLoginFailure(400, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // server crash
                    Alert.alert('Server Error', 'A server error occurred while sending your data!');
                    dispatch(userLoginFailure(500, null));
                } else {
                    // other error, probably network fail just pass null
                    Alert.alert('Connection Error', 'An error occurred while sending your data!');
                    dispatch(userLoginFailure(null, null));
                }
            })
            .done();
    };
}

export function loginUser(formData) {
    return (dispatch) => {
        dispatch(userLoginRequest());
        const buffer = new Buffer(`${formData.email}:${formData.password}`);
        const auth = buffer.toString('base64');

        return branch.getFirstReferringParams()
            .then((installParams) => {
                return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`
                    },
                    body: JSON.stringify({
                        app_version: Config.APP_VERSION_NAME,
                        branch_data: installParams,

                    })
                });
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                try {
                    Storage.save('user', {
                        token: response.token,
                        user: response.user
                    });
                    Crashlytics.setUserName(`${response.user.first_name} ${response.user.last_name}`);
                    Crashlytics.setUserEmail(response.user.email);
                    Crashlytics.setUserIdentifier(response.user.facebook_uid);

                    dispatch(reset([{
                        key: 'dashboard',
                        index: 0
                    }], 'global'));

                    dispatch(userLoginSuccess(response.token, response.user, response.outdated));
                    dispatch(getOneSignal(response.token, response.user.one_signal_id));
                } catch (e) {
                    dispatch(userLoginFailure(403, e));
                }
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // token issues

                    error.response.json().then((data) => {
                        dispatch(userLoginFailure(401, data));
                    });
                    Storage.delete('user');
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    // form validation issues, so we should have a json with errors
                    error.response.json().then((data) => {
                        dispatch(userLoginFailure(400, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // server crash
                    Alert.alert('Server Error', 'A server error occurred while sending your data!');
                    dispatch(userLoginFailure(500, null));
                } else {
                    // other error, probably network fail just pass null
                    Alert.alert('Connection Error', 'An error occurred while sending your data!');
                    dispatch(userLoginFailure(null, null));
                }
            })
            .done();
    };
}


export function signUp(formData) {
    return (dispatch) => {
        dispatch(signUpRequest());
        return branch.getFirstReferringParams()
            .then((installParams) => {
                return fetch(`${SERVER_URL}/api/v1/accounts/register/`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        app_version: Config.APP_VERSION_NAME,
                        branch_data: installParams,
                        ...formData
                    })
                });
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                try {
                    Storage.save('user', {
                        token: response.token,
                        user: response.user
                    });
                    Crashlytics.setUserName(`${response.user.first_name} ${response.user.last_name}`);
                    Crashlytics.setUserEmail(response.user.email);
                    Crashlytics.setUserIdentifier(response.user.facebook_uid);

                    dispatch(reset([{
                        key: 'dashboard',
                        index: 0
                    }], 'global'));

                    dispatch(userLoginSuccess(response.token, response.user, response.outdated));
                    dispatch(getOneSignal(response.token, response.user.one_signal_id));
                } catch (e) {
                    dispatch(userLoginFailure(403, e));
                }
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // token issues
                    Storage.delete('user');
                    error.response.json().then((data) => {
                        dispatch(userLoginFailure(401, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    // form validation issues, so we should have a json with errors
                    error.response.json().then((data) => {
                        dispatch(userLoginFailure(400, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // server crash
                    Alert.alert('Server Error', 'A server error occurred while sending your data!');
                    dispatch(userLoginFailure(500, null));
                } else {
                    // other error, probably network fail just pass null
                    Alert.alert('Connection Error', 'An error occurred while sending your data!');
                    dispatch(userLoginFailure(null, null));
                }
            })
            .done();
    };
}
