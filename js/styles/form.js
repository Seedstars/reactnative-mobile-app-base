import {
    COLOR_GRAY,
    COLOR_LIGHT_GRAY,
    COLOR_BLACK,
    PRIMARY_COLOR,
    COLOR_LIGHT_GREY,
    SECONDARY_COLOR,
    COLOR_ERROR
} from './colors';
import { SCREEN_WIDTH } from './base';

const FONT_SIZE = 15;
const FONT_WEIGHT = '500';

export default Object.freeze({
    fieldset: {},
    formGroup: {
        normal: {
            marginBottom: 10
        },
        error: {
            marginBottom: 10
        }
    },
    controlLabel: {
        normal: {
            color: SECONDARY_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: FONT_WEIGHT
        },
        error: {
            color: COLOR_ERROR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: FONT_WEIGHT
        }
    },
    helpBlock: {
        normal: {
            color: PRIMARY_COLOR,
            fontSize: 10,
            marginBottom: 2
        },
        error: {
            color: PRIMARY_COLOR,
            fontSize: 10,
            marginBottom: 2
        }
    },
    errorBlock: {
        fontSize: 14,
        marginBottom: 2,
        color: COLOR_ERROR
    },
    textbox: {
        normal: {
            color: COLOR_BLACK,
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: COLOR_LIGHT_GRAY,
            borderWidth: 0,
            marginBottom: 5
        },
        error: {
            color: COLOR_BLACK,
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: PRIMARY_COLOR,
            borderWidth: 0,
            marginBottom: 5
        },
        notEditable: {
            fontSize: FONT_SIZE,
            height: 36,
            padding: 7,
            borderRadius: 4,
            borderColor: COLOR_LIGHT_GRAY,
            borderWidth: 0,
            marginBottom: 5,
            color: COLOR_GRAY,
            backgroundColor: COLOR_LIGHT_GREY
        }
    },
    checkbox: {
        normal: {
            marginBottom: 4
        },
        error: {
            marginBottom: 4
        }
    },
    select: {
        normal: {
            width: SCREEN_WIDTH * 0.8,
            marginBottom: 4
        },
        error: {
            width: SCREEN_WIDTH * 0.8,
            marginBottom: 4
        }
    },
    datepicker: {
        normal: {
            marginBottom: 4
        },
        error: {
            marginBottom: 4
        }
    }
});
