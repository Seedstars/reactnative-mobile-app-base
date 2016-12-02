import {
    SUBMIT_ORDER_DEVICE_FORM_REQUEST,
    SUBMIT_ORDER_DEVICE_FORM_SAVE,
    SUBMIT_ORDER_DEVICE_FORM_SUCCESS,
    SUBMIT_ORDER_DEVICE_FORM_FAILURE
} from '../constants';
import { createReducer } from '../utils';

const initialState = {
    isFetching: false,
    errorCode: null,
    errorObject: null,
    formData: {},
    isChargingCard: false,
    errorText: null,
    tab: 0,
};

export default createReducer(initialState, {
    [SUBMIT_ORDER_DEVICE_FORM_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            formData: payload.data
        });
    },
    [SUBMIT_ORDER_DEVICE_FORM_SAVE]: (state, payload) => {
        return Object.assign({}, state, {
            formData: payload.data
        });
    },
    [SUBMIT_ORDER_DEVICE_FORM_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            formData: {},
            errorCode: null,
            errorObject: null
        });
    },
    [SUBMIT_ORDER_DEVICE_FORM_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            errorCode: payload.errorCode,
            errorObject: payload.errorObject
        });
    }
});
