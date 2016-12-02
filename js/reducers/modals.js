import {
    LOADING_MODAL_OPEN,
    LOADING_MODAL_CLOSE,
    WARNING_MODAL_OPEN,
    WARNING_MODAL_CLOSE,
    BUYDEVICE_MODAL_OPEN,
    BUYDEVICE_MODAL_CLOSE
} from '../constants';
import { createReducer } from '../utils';

const initialState = {
    BuyDevicevisible: false,
    LoadingVisible: false,
    LoadingMessage: null,
    WarningVisible: false,
    WarningTitle: null,
    WarningMessage: null,
    WarningButtons: []

};

export default createReducer(initialState, {
    [BUYDEVICE_MODAL_OPEN]: (state, payload) => {
        return Object.assign({}, state, {
            BuyDevicevisible: true
        });
    },
    [BUYDEVICE_MODAL_CLOSE]: (state, payload) => {
        return Object.assign({}, state, initialState);
    },
    [LOADING_MODAL_OPEN]: (state, payload) => {
        return Object.assign({}, state, {
            LoadingVisible: true,
            LoadingMessage: payload.message
        });
    },
    [LOADING_MODAL_CLOSE]: (state, payload) => {
        return Object.assign({}, state, initialState);
    },
    [WARNING_MODAL_OPEN]: (state, payload) => {
        return Object.assign({}, state, {
            WarningVisible: true,
            WarningTitle: payload.title,
            WarningMessage: payload.message,
            WarningButtons: payload.buttons || []
        });
    },
    [WARNING_MODAL_CLOSE]: (state, payload) => {
        return Object.assign({}, state, initialState);
    }
});
