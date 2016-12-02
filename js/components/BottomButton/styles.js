import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '100'
    },
    loginButton: {
        alignItems: 'center',
        height: 50,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255, 0.8)',
        opacity: 0.8,
        paddingRight: 1,
        overflow: 'hidden',
        width: Dimensions.get('window').width,
    },
    textContainer: {
        flexDirection: 'row'
    },
    textBold: {
        fontWeight: '900'
    }
});

export { styles as default };
