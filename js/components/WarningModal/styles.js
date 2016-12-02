import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR, COLOR_WHITE, COLOR_BACKDROP, COLOR_LIGHT_GRAY } from '../../styles/colors';

const ModalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_BACKDROP
    },
    scrollView: {
        alignSelf: 'stretch'
    },
    scrollViewContainer: {
    },
    innerContainer: {
        elevation: 5,
        alignSelf: 'stretch',
        backgroundColor: COLOR_WHITE,
        padding: 20,
        margin: 40
    },
    title: {
        color: SECONDARY_COLOR,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text: {
        fontSize: 15
    },
    buttonWrapper: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    button: {
        fontSize: 15,
        color: PRIMARY_COLOR,
        padding: 10,
        fontWeight: '300'
    },
    buttonDisabled: {
        fontSize: 12,
        color: COLOR_LIGHT_GRAY
    },
    buttonContainer: {
        overflow: 'hidden',
    },
    secondaryButton: {
        marginRight: 10
    },
});

export { ModalStyles as default };
