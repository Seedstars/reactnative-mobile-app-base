import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export { styles as default };
