import { StyleSheet } from 'react-native';
import {
    PRIMARY_COLOR,
    COLOR_WHITE
} from '../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        color: PRIMARY_COLOR,
        fontFamily: 'Rubik-Regular',
        textAlign: 'center',
        margin: 10
    }
});
