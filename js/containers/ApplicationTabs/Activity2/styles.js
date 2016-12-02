import { StyleSheet } from 'react-native';
import {
    COLOR_LIGHT_GREY,
    PRIMARY_COLOR
} from '../../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1: {
        color: PRIMARY_COLOR,
        fontSize: 20
    }
});
