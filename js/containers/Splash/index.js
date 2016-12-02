import React, { Component } from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
import Storage from 'react-native-simple-store';
import { Crashlytics } from 'react-native-fabric';
import { bindActionCreators } from 'redux';
import Config from 'react-native-config';
import SplashStyles from './styles';
import ICON from '../../images/icon.png';
import { userLoginSuccess } from '../../actions/auth';
import { VERSION_PATCH } from '../../utils/config';

const { replaceAtIndex } = navigationActions;

class SplashPage extends Component {

    static propTypes = {
        dispatch: React.PropTypes.func,
        userLoginSuccess: React.PropTypes.func,
    };

    static contextTypes = {
        analytics: React.PropTypes.object
    };


    componentDidMount() {
        Crashlytics.setString('currentScreen', 'Splash');
        Crashlytics.setString('currentVersion', `v${Config.APP_VERSION_NAME}.${VERSION_PATCH}`);

        setTimeout(() => {
            Storage.get('user').then((user) => {
                if (user) {
                    this.setState({ loginState: true });
                    this.props.userLoginSuccess(user.token, user.user);

                    const props = {
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                    };
                    this.context.analytics.setUserId(user.id, props);

                    this.props.dispatch(replaceAtIndex(0, {
                        key: 'dashboard',
                        title: 'Dashboard'
                    }, 'global'));
                } else {
                    this.props.dispatch(replaceAtIndex(0, {
                        key: 'login',
                        title: 'Login'
                    }, 'global'));
                }
            });
        }, 1000);
    }


    render() {
        return (
            <View style={SplashStyles.container}>
                <Image source={ICON}/>
                <Text style={SplashStyles.title}>My Store Foo</Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        userLoginSuccess: bindActionCreators(userLoginSuccess, dispatch)
    };
};

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);
