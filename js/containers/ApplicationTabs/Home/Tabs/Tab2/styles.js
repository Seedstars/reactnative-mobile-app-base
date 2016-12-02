import { StyleSheet } from 'react-native';
import {
    COLOR_LIGHT_GRAY,
    PRIMARY_COLOR
} from '../../../../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_LIGHT_GRAY,
        justifyContent: 'center',
        borderRadius: 6,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    h1: {
        color: PRIMARY_COLOR,
        fontSize: 20
    }
});
