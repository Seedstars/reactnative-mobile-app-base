import React, { Component } from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

import styles from './styles';

export default class Spinner extends Component {

    render() {
        return (
            <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#fff"/>
            </View>
        );
    }
}
