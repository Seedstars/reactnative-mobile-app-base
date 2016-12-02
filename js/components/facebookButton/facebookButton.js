import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class facebookButton extends Component {
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
                        <Icon name="facebook-official" size={24} color="#fff" style={styles.icon}/>
                        <Text style={styles.buttonText}>{'Log in with Facebook'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
