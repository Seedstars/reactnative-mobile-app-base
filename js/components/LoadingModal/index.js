import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native';
import { SECONDARY_COLOR } from '../../styles/colors';
import LoadingStyles from './styles';


export default class LoadingModal extends Component {
    static propTypes = {
        visible: React.PropTypes.bool,
        message: React.PropTypes.string
    };

    renderLoadingMessage = () => {
        let message = null;

        if (this.props.message) {
            message = (
                <Text style={LoadingStyles.spinnerText}>
                    {this.props.message}
                </Text>
            );
        }

        return message;
    };

    render() {
        return (
            <View>
                <Modal animationType={'fade'}
                       visible={this.props.visible}
                       transparent
                       onRequestClose={() => {}}
                >
                    <View style={LoadingStyles.container}>
                        <View style={LoadingStyles.innerContainer}>
                            <View style={LoadingStyles.spinner}>
                                <ActivityIndicator size="large" color={SECONDARY_COLOR}/>
                                {this.renderLoadingMessage()}
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
