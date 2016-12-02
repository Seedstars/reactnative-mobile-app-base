import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

import styles from './styles';
import { closeBuyDeviceModal } from '../../actions/modals';
import { orderDevicePostFormsSuccess } from '../../actions/forms';

const { pushRoute } = navigationActions;

class PaymentModal extends Component {

    static propTypes = {
        dispatch: React.PropTypes.func,
        actionsCloseBuyDeviceModal: React.PropTypes.func,
        orderDevicePostFormsSuccess: React.PropTypes.func,
        visible: React.PropTypes.bool
    }

    onPress = () => {
        this.props.actionsCloseBuyDeviceModal();
        this.props.orderDevicePostFormsSuccess();
        this.props.dispatch(pushRoute({ key: 'orderDone' }, 'global'));
    }

    render() {
        return (
            <Modal animationType={'fade'}
                   transparent
                   visible={this.props.visible}
                   onRequestClose={() => {}}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={this.props.actionsCloseBuyDeviceModal}>
                                <Icon style={styles.closeicon} name={'cancel'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContainer}>
                            <View style={styles.viewTitle}>
                                <Text style={styles.title}>
                                    Select your method of payment
                                </Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={this.onPress}
                                    style={styles.button}
                                >
                                    <View style={styles.iconContainer}>
                                        <Icon style={styles.payIcon} name={'local-shipping'}/>
                                        <Text style={styles.buttonText}>
                                            Pay On Delivery
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actionsCloseBuyDeviceModal: bindActionCreators(closeBuyDeviceModal, dispatch),
        orderDevicePostFormsSuccess: bindActionCreators( orderDevicePostFormsSuccess, dispatch)
    };
};

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
