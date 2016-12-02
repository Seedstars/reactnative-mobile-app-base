import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

import PaymentModal from '../../../../../components/PaymentModal';
import Spinner from '../../../../../components/spiner';
import { orderDeviceValidatePostForms, orderDeviceSaveForms } from '../../../../../actions/forms';
import { openBuyDeviceModal } from '../../../../../actions/modals';
import { validateEmail, PhoneNumber } from '../../../../../utils/validators';
import phoneNumberTransformer from '../../../../../utils/transformers';
import styles from './styles';
import formStyles from '../../../../../styles/form';
import {
    SECONDARY_COLOR,
} from '../../../../../styles/colors';

const Form = t.form.Form;
const emailForm = {
    email: validateEmail
};
const generalFormFields = {
    address: t.String,
    phone_number: PhoneNumber,
};
const options = {
    stylesheet: formStyles,
    fields: {
        address: {
            error: 'This field is required',
            label: 'Address',
            underlineColorAndroid: SECONDARY_COLOR,
        },
        phone_number: {
            transformer: phoneNumberTransformer,
            error: 'International phone number format is required',
            label: 'Contact Number',
            underlineColorAndroid: SECONDARY_COLOR,
        },
        email: {
            error: 'This field should be a valid email',
            underlineColorAndroid: SECONDARY_COLOR,
        }
    }
};

class Tab3 extends Component {

    static propTypes = {
        actionsOrderDeviceSaveForms: React.PropTypes.func,
        actionsOrderDeviceValidatePostForms: React.PropTypes.func,
        actionsOpenBuyDeviceModal: React.PropTypes.func,
        modalVisible: React.PropTypes.bool,
        index: React.PropTypes.number,
        auth: React.PropTypes.shape({
            token: React.PropTypes.string,
            email: React.PropTypes.string,
        }),
        form: React.PropTypes.shape({
            isFetching: React.PropTypes.bool.isRequired,
            formData: React.PropTypes.object.isRequired,
            errorCode: React.PropTypes.number,  // eslint-disable-line
            errorObject: React.PropTypes.shape({
                non_field_errors: React.PropTypes.arrayOf(React.PropTypes.string) // eslint-disable-line
            }),
        }),
    };

    static contextTypes = {
        analytics: React.PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            formOptions: options,
            modalVisible: this.props.modalVisible,
            orderForm: t.struct(this.calcForm()),
        };
    }
    componentDidMount() {
        this.context.analytics.trackScreenView('Tab3');
    }

    componentWillReceiveProps(nextProps) {
        const errorState = {};
        Object.keys(this.calcForm()).forEach((item) => {
            errorState[item] = {
                hasError: { $set: false },
                error: { $set: '' }
            };
        });
        if (nextProps.form.errorObject) {
            Object.keys(nextProps.form.errorObject).forEach((item) => {
                errorState[item] = {
                    hasError: { $set: true },
                    error: { $set: nextProps.form.errorObject[item][0] }
                };
            });
        }
        const newFormOptions = t.update(this.state.formOptions, { fields: errorState });
        this.setState({
            formOptions: newFormOptions,
            modalVisible: nextProps.modalVisible
        });
    }

    calcForm = () => {
        let email = {};
        if (!this.props.auth.email) {
            email = emailForm;
        }
        const newForm = { ...email, ...generalFormFields };
        return newForm;
    }

    submit = () => {
        this.form.validate();
        const value = this.form.getValue();
        if (value) {
            this.props.actionsOpenBuyDeviceModal();
            this.props.actionsOrderDeviceSaveForms(value);
        }
    }

    processPayment = (type) => {
        const values = Object.assign({}, this.props.form.formData, {
            payment: type
        });
        if (this.props.auth.email) {
            this.props.actionsOrderDeviceValidatePostForms(this.props.auth.token, values,
                this.props.auth.email, this.props.index);
        } else {
            this.props.actionsOrderDeviceValidatePostForms(this.props.auth.token, values,
                values.email, this.props.index);
        }
    }

    render() {
        let renderScene;
        if (this.props.form.isFetching) {
            renderScene = <Spinner/>;
        } else {
            renderScene = (
                <View style={styles.container}>
                    <ScrollView>
                        <PaymentModal visible={this.state.modalVisible} onPress={this.processPayment}/>
                        <View style={styles.iconContainer}>
                            <Text style={styles.subTitle}>
                                Order Your Cool Device Today!
                            </Text>
                            <Text style={styles.priceColor}>
                                USD 10.99
                            </Text>
                        </View>
                        <View style={styles.formContainer}>
                            <Form ref={(c) => { this.form = c; }}
                                  type={this.state.orderForm}
                                  value={this.props.form.formData}
                                  options={this.state.formOptions}
                            />
                        </View>
                        <View style={styles.scheduleButtonContainer}>
                            <TouchableOpacity onPress={() => { this.submit(); }}
                                              style={styles.scheduleButton}
                            >
                                <Text style={styles.scheduleButtonTitle}>
                                    Select Payment Type
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
        actionsOrderDeviceValidatePostForms: bindActionCreators(orderDeviceValidatePostForms, dispatch),
        actionsOrderDeviceSaveForms: bindActionCreators(orderDeviceSaveForms, dispatch),
        actionsOpenBuyDeviceModal: bindActionCreators(openBuyDeviceModal, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        form: state.form,
        index: state.globalNavigation.index,
        modalVisible: state.modals.BuyDevicevisible
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Tab3);
