import {
    View,
    Text,
    TouchableHighlight,
    DrawerLayoutAndroid,
    Image
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Storage from 'react-native-simple-store';
import { styles, menuItemStyles } from './styles';
import Home from './Home';
import Activity2 from './Activity2';
import {
    COLOR_LIGHT_GREY,
    COLOR_DARK_GREY,
    COLOR_WHITE
} from '../../styles/colors';
import noAvatar from '../../images/no_avatar.png';

const { jumpTo, reset } = navigationActions;

class ApplicationTabs extends Component {

    static propTypes = {
        authFirstName: React.PropTypes.string,
        authLastName: React.PropTypes.string,
        authEmail: React.PropTypes.string,
        authFacebookUID: React.PropTypes.string,
        navigationTabsIndex: React.PropTypes.number,
        navigationTabsRoutes: React.PropTypes.arrayOf(React.PropTypes.object),
        navigationTabsText: React.PropTypes.arrayOf(React.PropTypes.object),
        navigationTabskey: React.PropTypes.string,
        dispatch: React.PropTypes.func,
    };

    sendFeedbackEmail = () => {
        Communications.email(['feedback@example.com'], null, null, 'AutoService - Feedback', null);
    }
    logout = () => {
        Storage.delete('user');
        this.props.dispatch(reset([{
            key: 'login',
            index: 0
        }], 'global'));
    }

    calcDrawerImage() {
        let image;
        if (!isNaN(this.props.authFacebookUID)) {
            image = (
                <Image style={styles.facebookPhoto}
                       source={{ uri: `http://graph.facebook.com/${this.props.authFacebookUID}/picture?type=large` }}
                />
            );
        } else {
            image = (
                <Image style={styles.facebookPhoto}
                       source={noAvatar}
                />
            );
        }
        return (
            image
        );
    }
    renderTabContent = (tab) => {
        let activeTab;

        switch (tab.key) {
            case 'activity2':
                activeTab = <Activity2/>;
                break;
            case 'home':
            default:
                activeTab = <Home/>;
        }

        return activeTab;
    }
    renderApp() {
        const selectedTab = this.props.navigationTabsRoutes[this.props.navigationTabsIndex];

        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid style={styles.toolbar}
                                     titleColor={COLOR_WHITE}
                                     navIconName="menu"
                                     onIconClicked={() => { this.drawer.openDrawer(); }}
                                     title={selectedTab.title}
                />
                {this.renderTabContent(selectedTab)}
            </View>
        );
    }

    render() {
        const onNavigate = (action) => {
            this.drawer.closeDrawer();
            this.props.dispatch(action);
        };

        const navigationView = () => {
            return (
                <View style={styles.drawer}>
                    <View style={styles.drawerHeader}>
                        { this.calcDrawerImage() }
                        <Text style={styles.userFullName}>
                            {this.props.authFirstName} {this.props.authLastName}
                        </Text>
                        <Text style={styles.userEmail}>
                            {this.props.authEmail}
                        </Text>
                    </View>
                    {this.props.navigationTabsRoutes.map((t, i) => {
                        return (
                            <TouchableHighlight onPress={() => { onNavigate(jumpTo(i, this.props.navigationTabskey)); }}
                                                key={t.key}
                                                underlayColor={COLOR_DARK_GREY}
                            >
                                <View style={[menuItemStyles.container]}>
                                    <Icon style={menuItemStyles.itemIcon} name={t.icon}/>
                                    <Text style={[menuItemStyles.title]}>
                                        {t.title}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                    {this.props.navigationTabsText.map((t, i) => {
                        return (
                            <View style={[menuItemStyles.container]}
                                  key={t.key}
                            >
                                <Text style={[menuItemStyles.title]}>
                                    {t.title}
                                </Text>
                            </View>
                        );
                    })}
                    <TouchableHighlight onPress={() => { this.sendFeedbackEmail(); }}
                                        underlayColor={COLOR_DARK_GREY}
                    >
                        <View style={[menuItemStyles.container]}>
                            <Icon style={menuItemStyles.itemIcon} name={'forum'}/>
                            <Text style={[menuItemStyles.title]}>
                                Feedback
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => { this.logout(); }}
                                        underlayColor={COLOR_DARK_GREY}
                    >
                        <View style={[menuItemStyles.container]}>
                            <Icon style={menuItemStyles.itemIcon} name={'power-settings-new'}/>
                            <Text style={[menuItemStyles.title]}>
                                Logout
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        };

        return (
            <DrawerLayoutAndroid ref={(c) => { this.drawer = c; }}
                drawerWidth={this.width - 56 <= 320 ? this.width - 56 : 320}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={navigationView}
                drawerBackgroundColor={COLOR_LIGHT_GREY}
            >
                {this.renderApp()}
            </DrawerLayoutAndroid>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return {
        navigationTabsIndex: state.tabs.index,
        navigationTabsRoutes: state.tabs.routes,
        navigationTabsText: state.tabs.text,
        navigationTabskey: state.tabs.key,
        authFirstName: state.auth.firstName,
        authLastName: state.auth.lastName,
        authEmail: state.auth.email,
        authFacebookUID: state.auth.facebook_uid
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
