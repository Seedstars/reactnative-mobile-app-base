import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGIN_USER_EXPIRED,
    AUTH_LOGIN_CLEAN_ERRORS,
    AUTH_LOGOUT_USER,
    AUTH_SAVE_USERS_INFORMATION,
    AUTH_SIGNUP_REQUEST,
    AUTH_SIGNUP_SUCCESS,
    SUBMIT_SIGNUP_FORM_SAVE,
    SUBMIT_LOGIN_FORM_SAVE
} from '../constants';
import { createReducer } from '../utils';

const initialState = {
    token: null,
    firstName: null,
    lastName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    authenticationExpired: false,
    errorText: null,
    facebook_uid: null,
    outdated: false,
    isFetching: false,
    errorCode: null,
    errorObject: null,
    formData: {},
};

export default createReducer(initialState, {
    [AUTH_LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            authenticationExpired: false,
            isAuthenticating: true,
            errorCode: null,
            errorObject: null,
            isFetching: true
        });
    },
    [AUTH_LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            authenticationExpired: false,
            token: payload.token,
            outdated: payload.outdated,
            firstName: payload.user.first_name,
            lastName: payload.user.last_name,
            facebook_uid: payload.user.facebook_uid,
            email: payload.user.email,
            errorCode: null,
            errorObject: null,
            isFetching: false
        });
    },
    [AUTH_LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            authenticationExpired: false,
            token: null,
            firstName: null,
            lastName: null,
            facebook_uid: null,
            errorCode: payload.error,
            errorObject: payload.errorObject,
            isFetching: false

        });
    },
    [AUTH_LOGIN_USER_EXPIRED]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            authenticationExpired: true,
            token: null,
            firstName: null,
            lastName: null,
            facebook_uid: null,
            isFetching: false,
            errorCode: payload.error,
            errorObject: payload.errorObject
        });
    },
    [AUTH_LOGIN_CLEAN_ERRORS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            authenticationExpired: false,
            token: null,
            firstName: null,
            lastName: null,
            facebook_uid: null,
            errorCode: null,
            errorObject: null
        });
    },
    [AUTH_SIGNUP_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: true,
            error: null,
            authenticationExpired: false,
            isFetching: true
        });
    },
    [AUTH_SIGNUP_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            authenticationExpired: false,
            token: payload.token,
            outdated: payload.outdated,
            email: payload.user.email,
            error: null,
            signup: true,
            fillInformation: payload.fillInformation,
            isFetching: false
        });
    },
    [AUTH_LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticated: false,
            authenticationExpired: false,
            token: null,
            firstName: null,
            lastName: null,
            errorCode: null,
            errorObject: null
        });
    },
    [AUTH_SAVE_USERS_INFORMATION]: (state, payload) => {
        return Object.assign({}, state, {
            token: payload.user.token,
            firstName: payload.user.user.first_name,
            lastName: payload.user.user.last_name,
            phoneNumber: payload.user.user.phone_number,
            facebook_uid: payload.user.user.facebook_uid,
            email: payload.user.user.email,
            errorCode: null,
            errorObject: null
        });
    },
    [SUBMIT_SIGNUP_FORM_SAVE]: (state, payload) => {
        return Object.assign({}, state, {
            formData: payload.data
        });
    },
    [SUBMIT_LOGIN_FORM_SAVE]: (state, payload) => {
        return Object.assign({}, state, {
            formData: payload.data
        });
    },


});
