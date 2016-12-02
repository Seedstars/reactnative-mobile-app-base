import { tabReducer } from 'react-native-navigation-redux-helpers';

const tabs = {
    routes: [
        { key: 'home', title: 'Home', icon: 'home' },
        { key: 'activity2', title: 'Activity 2', icon: 'looks-two' }
    ],
    text: [
    ],
    key: 'ApplicationTabs',
    index: 0
};

module.exports = tabReducer(tabs);
