import { StyleSheet } from 'react-native';
import {
    COLOR_LIGHT_GREY,
    PRIMARY_COLOR,
    COLOR_WHITE
} from '../../../../../styles/colors';
import { SCREEN_WIDTH } from '../../../../../styles/base';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonWrapper: {
        width: SCREEN_WIDTH,
        padding: 16
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        padding: 20,
        borderRadius: 6,
        alignItems: 'center'
    },
    h1: {
        color: COLOR_WHITE,
        fontSize: 20
    }
});
