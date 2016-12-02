import React, { Component, Children } from 'react';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import { Crashlytics } from 'react-native-fabric';
import { AppEventsLogger } from 'react-native-fbsdk';
import Config from 'react-native-config';


export default class AnalyticsProvider extends Component {
    static propTypes = {
        children: React.PropTypes.shape()
    };

    static childContextTypes = {
        analytics: React.PropTypes.object
    };

    constructor(props, context) {
        super(props, context);

        this.googleAnalytics = new GoogleAnalyticsTracker(Config.ANALYTICS_KEY);
        this.googleAnalytics.allowIDFA(true);

        this.facebook = AppEventsLogger;

        this.crashlytics = Crashlytics;
    }

    getChildContext() {
        return {
            analytics: {
                logEvent: (event) => {
                    this.facebook.logEvent(event);
                },

                trackScreenView: (screen) => {
                    this.crashlytics.setString('currentScreen', screen);
                    this.googleAnalytics.trackScreenView(screen);
                    this.facebook.logEvent(`Show screen '${screen}'`);
                },

                setUserId: (userId, props) => {
                    this.crashlytics.setUserName(`${props.firstName} ${props.lastName}`);
                    this.crashlytics.setUserEmail(props.email);
                    this.crashlytics.setUserIdentifier(userId);
                }
            }
        };
    }

    render() {
        return Children.only(this.props.children);
    }
}
