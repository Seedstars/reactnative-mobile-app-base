import { StyleSheet } from 'react-native';

import { COLOR_WHITE, PRIMARY_COLOR } from '../../styles/colors';
import { SCREEN_WIDTH } from '../../styles/base';

const styles = StyleSheet.create({
    BackgroundImage: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        paddingTop: 50
    },
    iconContainer: {
        alignItems: 'center'
    },
    icon: {
        width: SCREEN_WIDTH / 4,
        height: SCREEN_WIDTH / 4
    },
    title: {
        color: PRIMARY_COLOR,
        fontSize: 25,
        textAlign: 'center',
        margin: 15
    },
    buttonContainer: {
        flex: 1,
    },
    loginButton: {
        color: '#666666',
        fontSize: 15
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
    },
    activityIndicatorContainer: {
        alignItems: 'center'
    },
    h1: {
        marginTop: 10,
        color: COLOR_WHITE
    }
});

export { styles as default };
