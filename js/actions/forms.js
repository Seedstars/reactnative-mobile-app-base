import { Alert } from 'react-native';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import Storage from 'react-native-simple-store';
import {
    SUBMIT_ORDER_DEVICE_FORM_REQUEST,
    SUBMIT_ORDER_DEVICE_FORM_SAVE,
    SUBMIT_ORDER_DEVICE_FORM_SUCCESS,
    SUBMIT_ORDER_DEVICE_FORM_FAILURE
} from '../constants';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus } from '../utils';
import { userLoginExpired } from './auth';
import { closeBuyDeviceModal } from './modals';


const { replaceAtIndex } = navigationActions;

export function orderDeviceSaveForms(data) {
    return {
        type: SUBMIT_ORDER_DEVICE_FORM_SAVE,
        payload: {
            data
        }
    };
}

export function orderDevicePostFormsRequest(data) {
    return {
        type: SUBMIT_ORDER_DEVICE_FORM_REQUEST,
        payload: {
            data
        }
    };
}


export function orderDevicePostFormsSuccess(data) {
    return {
        type: SUBMIT_ORDER_DEVICE_FORM_SUCCESS,
        payload: {
            data
        }
    };
}

export function orderDevicePostFormsFailure(errorCode, errorObject) {
    return {
        type: SUBMIT_ORDER_DEVICE_FORM_FAILURE,
        payload: {
            errorCode,
            errorObject
        }
    };
}

export function orderDevicePostForms(token, formData, navigatorIndex) {
    return (dispatch) => {
        dispatch(orderDevicePostFormsRequest(formData));
        return fetch(`${SERVER_URL}/api/v1/device/order_device/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(formData)
        })
        .then(checkHttpStatus)
            .then((response) => {
                dispatch(closeBuyDeviceModal());
                // dispatch natigator replace because if we got here action was successful and we can't go back
                dispatch(replaceAtIndex(navigatorIndex, {
                    key: 'deviceOrdered',
                    title: 'Done'
                }, 'global'));
                // dispatch success action
                dispatch(orderDevicePostFormsSuccess({}));
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    dispatch(closeBuyDeviceModal());
                    // token issues
                    Storage.delete('user');
                    dispatch(userLoginExpired(401, error));
                    dispatch(orderDevicePostFormsFailure(400, {}));
                    dispatch(replaceAtIndex(navigatorIndex, {
                        key: 'login',
                        title: 'login'
                    }, 'global'));
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    dispatch(closeBuyDeviceModal());
                    // form validation issues, so we should have a json with errors
                    error.response.json().then((data) => {
                        dispatch(orderDevicePostFormsFailure(400, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    dispatch(closeBuyDeviceModal());
                    // server crash
                    Alert.alert('Server Error', 'A server error occurred while sending your data!');
                    dispatch(orderDevicePostFormsFailure(500, null));
                } else {
                    dispatch(closeBuyDeviceModal());
                    // other error, probably network fail just pass null
                    Alert.alert('Connection Error', 'An error occurred while sending your data!');
                    dispatch(orderDevicePostFormsFailure(null, null));
                }
            })
            .done();
    };
}

export function orderDeviceValidatePostForms(token, formData, email, navigatorIndex) {
    return (dispatch) => {
        dispatch(orderDevicePostFormsRequest(formData));
        return fetch(`${SERVER_URL}/api/v1/device/validate_order_device_data/`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(formData)
        })
            .then(checkHttpStatus)
            .then((response) => {
                dispatch(closeBuyDeviceModal());
                dispatch(orderDevicePostForms(token, formData, navigatorIndex));

                // dispatch success action
                dispatch(orderDevicePostFormsSuccess({}));
            }).catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    dispatch(closeBuyDeviceModal());
                    // token issues
                    dispatch(userLoginExpired(401, error));
                    dispatch(orderDevicePostFormsFailure(400, {}));

                    Storage.delete('user');
                    dispatch(replaceAtIndex(navigatorIndex, {
                        key: 'login',
                        title: 'login'
                    }, 'global'));
                } else if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    dispatch(closeBuyDeviceModal());
                    // form validation issues, so we should have a json with errors
                    error.response.json().then((data) => {
                        dispatch(orderDevicePostFormsFailure(400, data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    dispatch(closeBuyDeviceModal());
                    // server crash
                    Alert.alert('Server Error', 'A server error occurred while sending your data!');
                    dispatch(orderDevicePostFormsFailure(500, null));
                } else {
                    dispatch(closeBuyDeviceModal());
                    // other error, probably network fail just pass null
                    Alert.alert('Connection Error', 'An error occurred while sending your data!');
                    dispatch(orderDevicePostFormsFailure(null, null));
                }
            })
            .done();
    };
}
