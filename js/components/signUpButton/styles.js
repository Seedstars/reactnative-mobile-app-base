import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_WHITE, PRIMARY_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    button: {
        height: 50,
        paddingTop: 15,
        backgroundColor: PRIMARY_COLOR,
        overflow: 'hidden',
        borderRadius: 4,
        width: Dimensions.get('window').width / 1.7,
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
        marginLeft: 10,
        marginRight: 10
    },
});

export { styles as default };
