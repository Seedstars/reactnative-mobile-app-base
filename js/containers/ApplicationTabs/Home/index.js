import React, { Component } from 'react';
import {
    Alert,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';

import Tabs from './Tabs';


class Home extends Component {

    static propTypes = {
        outdatedApp: React.PropTypes.bool
    };

    static contextTypes = {
        analytics: React.PropTypes.object
    };

    componentDidMount() {
        this.context.analytics.trackScreenView('Home');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.outdatedApp) {
            Alert.alert(
                'New app is available',
                'We\'ve added new features to improve the quality of your application!',
                [
                    { text: 'Remind later' },
                    { text: 'Update', onPress: this.updateApp },
                ]
            );
        }
    }

    updateApp = () => {
        Linking.openURL('market://details?id=com.seedstarsbase');
    }


    render() {
        return (
            <Tabs/>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
};

const mapStateToProps = (state) => {
    return {
        outdatedApp: state.auth.outdated,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
