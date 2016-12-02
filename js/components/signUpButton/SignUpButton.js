import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLOR_WHITE } from '../../styles/colors';

import styles from './styles';


export default class SignUpButton extends Component {

    static propTypes = {
        onPress: React.PropTypes.func,
    };
    render() {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={this.props.onPress}
                >
                    <View style={styles.buttonContent}>
                        <Icon name="email" size={24} color={COLOR_WHITE} style={styles.icon}/>
                        <Text style={styles.buttonText}>Register with email</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}
