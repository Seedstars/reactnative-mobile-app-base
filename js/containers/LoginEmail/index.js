import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, Text, ScrollView } from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import Spinner from '../../components/spiner';
import { validateEmail, validatePassword } from '../../utils/validators';
import formStyles from '../../styles/form-white';
import { COLOR_WHITE } from '../../styles/colors';
import { loginUser, loginSaveForms, cleanErrors } from '../../actions/auth';

const { popRoute } = navigationActions;
const Form = t.form.Form;

const generalFormFields = {
    email: validateEmail,
    password: validatePassword,
};

const options = {
    stylesheet: formStyles,
    fields: {
        email: {
            error: 'This field should be a valid email',
            underlineColorAndroid: COLOR_WHITE,
            keyboardType: 'email-address'
        },
        password: {
            password: true,
            secureTextEntry: true,
            error: 'This field is required',
            placeholder: 'Must have at least 6 characters',
            placeholderTextColor: COLOR_WHITE
        },
    }
};

const registerForm = t.struct(generalFormFields);


class LoginEmail extends Component {

    static propTypes = {
        isFetching: React.PropTypes.bool,
        dispatch: React.PropTypes.func,
        actionsLoginUser: React.PropTypes.func,
        actionsLoginSaveForms: React.PropTypes.func,
        cleanErrors: React.PropTypes.func,
        formData: React.PropTypes.object,  // eslint-disable-line react/forbid-prop-types
    };

    static contextTypes = {
        analytics: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            formOptions: options,
        };
    }

    componentDidMount() {
        this.context.analytics.trackScreenView('Login with Email');
    }

    componentWillReceiveProps(nextProps) {
        const errorState = {};

        Object.keys(generalFormFields).forEach((item) => {
            errorState[item] = {
                hasError: { $set: false },
                error: { $set: '' }
            };
        });
        if (nextProps.auth.errorCode >= 400 && typeof nextProps.auth.errorObject.non_field_errors !== 'undefined') {
            Alert.alert('Server Error', nextProps.auth.errorObject.non_field_errors[0]);
            this.props.cleanErrors();
        } else {
            if (nextProps.auth.errorObject) {
                Object.keys(nextProps.auth.errorObject).forEach((item) => {
                    errorState[item] = {
                        hasError: { $set: true },
                        error: { $set: nextProps.auth.errorObject[item][0] }
                    };
                });
            }

            const newFormOptions = t.update(this.state.formOptions, { fields: errorState });
            this.setState({
                formOptions: newFormOptions
            });
        }
    }

    submit = () => {
        this.form.validate();
        const value = this.form.getValue();

        if (value) {
            this.props.actionsLoginUser(value);
            this.props.actionsLoginSaveForms(value);
        }
    }

    render() {
        let renderScene;
        if (this.props.isFetching) {
            renderScene = <Spinner/>;
        } else {
            renderScene = (
                <View style={styles.container}>
                    <Icon.ToolbarAndroid style={styles.toolbar}
                                                titleColor={COLOR_WHITE}
                                                navIconName="arrow-back"
                                                onIconClicked={() => { this.props.dispatch(popRoute('global')); }}
                    />
                    <ScrollView>
                        <View style={styles.contentContaier}>
                            <Form ref={(c) => { this.form = c; }}
                                type={registerForm}
                                value={this.props.formData}
                                options={this.state.formOptions}
                            />
                            <TouchableOpacity onPress={() => { this.submit(); }}
                                            style={styles.registerButton}
                            >
                                <Text style={styles.registerButtonTitle}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            );
        }

        return renderScene;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actionsLoginUser: bindActionCreators(loginUser, dispatch),
        actionsLoginSaveForms: bindActionCreators(loginSaveForms, dispatch),
        cleanErrors: bindActionCreators(cleanErrors, dispatch)


    };
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isAuthenticating,
        formData: state.auth.formData,
        // errorCode: state.auth.errorCode,
        // errorObject: state.auth.errorObject,
        navigation: state.globalNavigation,
        auth: state.auth,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginEmail);
