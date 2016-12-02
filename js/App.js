import React, { Component } from 'react';
import {
    View,
    StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import codePush from 'react-native-code-push';

import AppStyles from './styles';
import configureStore from './store';
import MainNavigation from './containers/MainNavigation';
import AnalyticsProvider from './utils/AnalyticsUtils';
import { DARKER_PRIMARY } from './styles/colors';

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE
};
const store = configureStore();

class App extends Component {
    render() {
        return (
            <AnalyticsProvider>
                <Provider store={store}>
                    <View style={AppStyles.container}>
                        <StatusBar backgroundColor={DARKER_PRIMARY}
                            barStyle="light-content"
                        />
                        <MainNavigation/>
                    </View>
                </Provider>
            </AnalyticsProvider>
        );
    }

}

export default codePush(codePushOptions)(App);
