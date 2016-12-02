import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, COLOR_WHITE } from '../../styles/colors';

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    toolbar: {
        height: 56,
        backgroundColor: PRIMARY_COLOR
    },
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    contentContaier: {
        padding: 30,
    },
    registerButton: {
        backgroundColor: COLOR_WHITE,
        padding: 20,
        borderRadius: 6,
        marginBottom: 20,
        alignItems: 'center'
    },
    registerButtonTitle: {
        fontSize: 18,
        color: PRIMARY_COLOR,
    }
});

export { styles as default };
