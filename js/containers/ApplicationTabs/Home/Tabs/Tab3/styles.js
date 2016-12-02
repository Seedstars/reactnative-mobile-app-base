import { StyleSheet } from 'react-native';
import {
    COLOR_WHITE,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
} from '../../../../../styles/colors';
import { SCREEN_WIDTH } from '../../../../../styles/base';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        justifyContent: 'center',
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    icon: {
        width: SCREEN_WIDTH,
        height: 120,
        flex: 1,
        resizeMode: 'contain'
    },
    subTitle: {
        fontSize: 17,
        color: PRIMARY_COLOR,
        fontFamily: 'Roboto',
        fontWeight: '300',
        marginTop: 10
    },
    priceColor: {
        marginTop: 5,
        color: SECONDARY_COLOR,
        fontSize: 25,
        fontFamily: 'Roboto',
        fontWeight: '800'
    },
    scheduleButtonContainer: {
        alignItems: 'center',
    },
    scheduleButton: {
        backgroundColor: PRIMARY_COLOR,
        padding: 20,
        borderRadius: 6,
        marginBottom: 20,
        width: SCREEN_WIDTH - 40,
        alignItems: 'center'

    },
    scheduleButtonTitle: {
        fontSize: 18,
        color: COLOR_WHITE,
        fontFamily: 'Roboto',
        fontWeight: '500',
    },
    formContainer: {
        padding: 25,
    }
});
