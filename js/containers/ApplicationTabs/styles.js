import { StyleSheet } from 'react-native';
import {
    COLOR_WHITE,
    COLOR_SILVER_LIGHT,
    COLOR_SILVER_DARK,
    PRIMARY_COLOR,
    COLOR_LIGHT_GREY,
} from '../../styles/colors';
import { SCREEN_WIDTH } from '../../styles/base';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_LIGHT_GREY,
    },
    drawer: {
        flex: 1,
        backgroundColor: COLOR_LIGHT_GREY
    },
    drawerHeader: {
        backgroundColor: PRIMARY_COLOR,
        height: 200,
        paddingBottom: 20,
        paddingLeft: 16,
        alignItems: 'center',
        marginBottom: 10
    },
    userFullName: {
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontSize: 22,
        color: COLOR_WHITE,
        marginTop: 10
    },
    userEmail: {
        fontFamily: 'Roboto',
        fontWeight: '100',
        fontSize: 16,
        color: COLOR_WHITE,
        marginTop: 3
    },
    toolbar: {
        height: 56,
        backgroundColor: PRIMARY_COLOR
    },
    facebookPhoto: {
        marginTop: 20,
        width: SCREEN_WIDTH / 5,
        height: SCREEN_WIDTH / 5,
        borderRadius: 200,
        borderWidth: 2,
        borderColor: COLOR_WHITE
    },
});

export const menuItemStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: COLOR_SILVER_LIGHT
    },
    icon: {
        marginLeft: 16,
        fontSize: 25,
        color: COLOR_SILVER_DARK
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontSize: 18,
        marginLeft: 10,
        color: COLOR_SILVER_DARK
    },
    selected: {
        color: PRIMARY_COLOR
    },
    itemIcon: {
        fontSize: 24,
        marginRight: 10,
        marginLeft: 16,
        color: PRIMARY_COLOR
    }
});
