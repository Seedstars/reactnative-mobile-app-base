import { StyleSheet } from 'react-native';
import {
    PRIMARY_COLOR,
    COLOR_WHITE
} from '../../../../styles/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        backgroundColor: PRIMARY_COLOR,
    },
    page: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#fff',
    },
    label: {
        color: '#fff',
        fontWeight: '400',
    },
    icon: {
        fontSize: 36,
        color: COLOR_WHITE
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
