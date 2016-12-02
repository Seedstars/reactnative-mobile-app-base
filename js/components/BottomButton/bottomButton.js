import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

export default class bottomButton extends Component {
    static propTypes = {
        onPress: React.PropTypes.func,
        text: React.PropTypes.string,
        text2: React.PropTypes.string,
        backgroundColor: React.PropTypes.shape()
    };
    render() {
        return (
            <View>
                <TouchableOpacity style={[styles.loginButton, this.props.backgroundColor]}
                    onPress={this.props.onPress}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.buttonText}>{this.props.text}</Text>
                        <Text style={[styles.buttonText, styles.textBold]}>{this.props.text2}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
