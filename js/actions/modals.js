import {
    BUYDEVICE_MODAL_OPEN,
    BUYDEVICE_MODAL_CLOSE,
    LOADING_MODAL_OPEN,
    LOADING_MODAL_CLOSE,
    WARNING_MODAL_OPEN,
    WARNING_MODAL_CLOSE
} from '../constants';

export function openBuyDeviceModal() {
    return (dispatch) => {
        dispatch({
            type: BUYDEVICE_MODAL_OPEN,
            payload: {
                visible: true,
            }
        });
    };
}

export function closeBuyDeviceModal() {
    return (dispatch) => {
        dispatch({
            type: BUYDEVICE_MODAL_CLOSE
        });
    };
}

export function openLoadingModal(message) {
    return {
        type: LOADING_MODAL_OPEN,
        payload: {
            visible: true,
            message
        }
    };
}

export function closeLoadingModal() {
    return {
        type: LOADING_MODAL_CLOSE
    };
}

export function openWarningModal(title, message, buttons) {
    return (dispatch) => {
        dispatch({
            type: WARNING_MODAL_OPEN,
            payload: {
                visible: true,
                title,
                message,
                buttons
            }
        });
    };
}

export function closeWarningModal() {
    return (dispatch) => {
        dispatch({
            type: WARNING_MODAL_CLOSE
        });
    };
}
