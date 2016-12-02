import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';


class Tab2 extends Component {

    static propTypes = {
        dispatch: React.PropTypes.func
    };

    static contextTypes = {
        analytics: React.PropTypes.object
    };

    componentDidMount() {
        this.context.analytics.trackScreenView('Tab2');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>
                    Tab2
                </Text>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab2);
