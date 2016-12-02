import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../styles/colors';
import { SCREEN_WIDTH } from '../../styles/base';

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    button: {
        height: 50,
        paddingTop: 15,
        backgroundColor: '#3b5998',
        paddingRight: 10,
        overflow: 'hidden',
        borderRadius: 4,
        width: SCREEN_WIDTH / 1.7,
    },
    buttonContent: {
        flexDirection: 'row',
    },
    buttonText: {
        flex: 1,
        fontSize: 16,
        color: COLOR_WHITE,
        textAlign: 'left',
        paddingLeft: 5
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 10,
        marginRight: 10
    },
});

export { styles as default };
