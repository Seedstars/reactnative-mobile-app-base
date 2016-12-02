import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../styles/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_WHITE
    },
    innerContainer: {
        elevation: 5,
        alignSelf: 'stretch',
        backgroundColor: COLOR_WHITE,
        padding: 20,
        margin: 40
    },
    spinner: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerText: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

export { styles as default };
