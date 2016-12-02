import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Modal,
} from 'react-native';
import Button from 'react-native-button';
import ModalStyles from './styles';


export default class WarningModal extends Component {
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        buttons: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                text: React.PropTypes.node.isRequired, // eslint-disable-line react/no-unused-prop-types
                action: React.PropTypes.func.isRequired // eslint-disable-line react/no-unused-prop-types
            })
        ).isRequired,
        title: React.PropTypes.string,
        message: React.PropTypes.string,
        close: React.PropTypes.func.isRequired
    };

    executeAction = (action) => {
        return () => {
            action();
            this.props.close();
        };
    };

    renderButtons = () => {
        const buttons = this.props.buttons || [];
        let buttonsView = null;

        if (buttons.length === 1) {
            buttonsView = (
                <View style={ModalStyles.buttonWrapper}>
                    <Button style={ModalStyles.button}
                            styleDisabled={ModalStyles.buttonDisabled}
                            containerStyle={ModalStyles.buttonContainer}
                            onPress={this.executeAction(buttons[0].action)}
                    >
                        {buttons[0].text}
                    </Button>
                </View>
            );
        } else if (buttons.length === 2) {
            buttonsView = (
                <View style={ModalStyles.buttonWrapper}>
                    <Button style={ModalStyles.button}
                            styleDisabled={ModalStyles.buttonDisabled}
                            containerStyle={[ModalStyles.buttonContainer, ModalStyles.secondaryButton]}
                            onPress={this.executeAction(buttons[0].action)}
                    >
                        {buttons[0].text}
                    </Button>
                    <Button style={ModalStyles.button}
                            styleDisabled={ModalStyles.buttonDisabled}
                            containerStyle={ModalStyles.buttonContainer}
                            onPress={this.executeAction(buttons[1].action)}
                    >
                        {buttons[1].text}
                    </Button>
                </View>
            );
        }

        return buttonsView;
    };

    render() {
        return (
            <View>
                <Modal animationType={'fade'}
                       visible={this.props.visible}
                       transparent
                       onRequestClose={() => {}}
                >
                    <View style={ModalStyles.container}>
                        <ScrollView style={ModalStyles.scrollView}
                                    contentContainerStyle={ModalStyles.scrollViewContainer}
                        >
                            <View style={ModalStyles.innerContainer}>
                                <Text style={ModalStyles.title}>{this.props.title}</Text>
                                <Text style={ModalStyles.text}>{this.props.message}</Text>
                                {this.renderButtons()}
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        );
    }
}
