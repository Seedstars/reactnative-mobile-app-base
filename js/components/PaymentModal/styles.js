import { StyleSheet } from 'react-native';
import {
    SECONDARY_COLOR,
    PRIMARY_COLOR,
    COLOR_WHITE
} from '../../styles/colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../styles/base';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    button: {
        height: SCREEN_HEIGHT / 5.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
        padding: 10
    },
    buttonText: {
        color: COLOR_WHITE,
        fontSize: 22,
        fontFamily: 'Roboto',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 5,
        elevation: 5
    },
    title: {
        color: SECONDARY_COLOR,
        fontSize: 18,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 5
    },
    text: {
        fontSize: 15
    },
    buttonContainer: {
        alignSelf: 'stretch',
        padding: 10
    },

    modalContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: COLOR_WHITE,
        padding: 20,
        margin: 40,
    },
    closeButtonContainer: {
        position: 'absolute',
        marginTop: 27,
        left: SCREEN_WIDTH / 1.2,
        zIndex: 2000,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewTitle: {
        width: SCREEN_WIDTH,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 20
    },
    closeicon: {
        fontSize: 40,
        color: PRIMARY_COLOR
    },
    payIcon: {
        fontSize: 40,
        color: COLOR_WHITE
    }
});
