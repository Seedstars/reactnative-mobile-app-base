import React, { Component } from 'react';
import { Text, Image, View, ActivityIndicator, Alert } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

import ICON from '../../images/icon.png';
import styles from './styles';
import FacebookButton from '../../components/facebookButton/facebookButton';
import SignUpButton from '../../components/signUpButton/SignUpButton';
import BottomButton from '../../components/BottomButton/bottomButton';
import { loginFacebook, cleanErrors } from '../../actions/auth';


const { pushRoute } = navigationActions;

class LoginView extends Component {
    static propTypes = {
        dispatch: React.PropTypes.func,
        loginFacebook: React.PropTypes.func,
        cleanErrors: React.PropTypes.func,
        errorCode: React.PropTypes.shape(),
        authenticationExpired: React.PropTypes.bool,
        isFetching: React.PropTypes.bool
    };

    static contextTypes = {
        analytics: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            loginState: this.props.isFetching,
        };
    }

    componentDidMount() {
        this.context.analytics.trackScreenView('Login');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loginState: nextProps.isFetching });
    }

    getRemoteFacebookAccessToken = () => {
        return AccessToken.getCurrentAccessToken().then((data) => {
            return data && data.accessToken ? data.accessToken.toString() : null;
        });
    };

    login = () => {
        LoginManager.logInWithReadPermissions(['email', 'public_profile'])
            .then(() => {
                this.getRemoteFacebookAccessToken()
                    .then((token) => {
                        if (token) {
                            this.props.loginFacebook(token);
                        } else {
                            this.setState({ loginState: false });
                        }
                    });
            });
    };

    signup = () => {
        this.props.dispatch(pushRoute({ key: 'register' }, 'global'));
    };

    loginEmail = () => {
        this.props.dispatch(pushRoute({ key: 'loginEmail' }, 'global'));
    }

    render() {
        const renderSence = (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image source={ICON} style={styles.icon}/>
                </View>
                <Text style={styles.title}>
                    My Store Foo
                </Text>
                {!this.state.loginState ?
                    <View style={styles.buttonContainer}>
                        <View>
                            <FacebookButton onPress={this.login}/>
                            <SignUpButton onPress={this.signup}/>
                        </View>
                        <View style={styles.bottom}>
                            <BottomButton onPress={this.loginEmail}
                                    text={'Already have an account?'}
                                    text2={' Login'}
                                    backgroundColor={{ backgroundColor: 'rgba(00,00,00, 0.4)' }}
                            />
                        </View>
                    </View>
                    :
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator size="large" color={styles.activity}/>
                        <Text style={styles.h1}>Logging in...</Text>
                    </View>
                    }
            </View>
        );
        if (this.props.errorCode === 401 && this.props.authenticationExpired) {
            Alert.alert('Authentication Error', 'You session is not valid. Please Login again');
            this.props.cleanErrors();
        }
        return renderSence;
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        loginFacebook: bindActionCreators(loginFacebook, dispatch),
        cleanErrors: bindActionCreators(cleanErrors, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        navigation: state.globalNavigation,
        errorCode: state.auth.errorCode,
        isFetching: state.auth.isFetching,
        authenticationExpired: state.auth.authenticationExpired,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
