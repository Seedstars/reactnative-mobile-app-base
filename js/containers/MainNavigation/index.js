import { BackAndroid, View, NavigationExperimental } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { bindActionCreators } from 'redux';

import ApplicationTabs from '../ApplicationTabs';
import Splash from '../Splash';
import Login from '../Login';
import Register from '../Register';
import LoginEmail from '../LoginEmail';
import Cta from '../ApplicationTabs/CTA';
import OrderDone from '../ApplicationTabs/OrderDone';
import LoadingModal from '../../components/LoadingModal';
import WarningModal from '../../components/WarningModal';
import { closeWarningModal } from '../../actions/modals';

const { CardStack: NavigationCardStack } = NavigationExperimental;
const { popRoute, jumpTo } = navigationActions;

class MainNavigation extends Component {
    static propTypes = {
        navigation: React.PropTypes.shape({
            routes: React.PropTypes.arrayOf(React.PropTypes.object)
        }),
        tabsIndex: React.PropTypes.number,
        dispatch: React.PropTypes.func,
        closeWarningModal: React.PropTypes.func,
        modal: React.PropTypes.shape({
            LoadingVisible: React.PropTypes.bool,
            LoadingMessage: React.PropTypes.string,
            WarningVisible: React.PropTypes.bool,
            WarningTitle: React.PropTypes.string,
            WarningMessage: React.PropTypes.string,
            WarningButtons: React.PropTypes.arrayOf(
                React.PropTypes.shape()
            )
        }),
    };

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBackAction);
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAction);
    }

    handleBackAction = () => {
        let event;
        const globalLastRoute = this.props.navigation.routes.slice(-1)[0].key;

        if (globalLastRoute === 'dashboard' && this.props.tabsIndex === 0) {
            // from dashboard let's exist app
            event = false;
        } else if (globalLastRoute === 'login' && this.props.tabsIndex === 0) {
            // from login let's exist app
            event = false;
        } else if (globalLastRoute !== 'dashboard') {
            // if we have pushed any other views let's pop it
            this.props.dispatch(popRoute('global'));
            event = true;
        } else {
            // jump to home if in another view
            this.props.dispatch(jumpTo(0, 'ApplicationTabs'));
            event = true;
        }

        return event;
    };

    renderScene = (props) => {
        let scene = null;

        switch (props.scene.route.key) {
            case 'login':
                scene = <Login/>;
                break;
            case 'register':
                scene = <Register/>;
                break;
            case 'loginEmail':
                scene = <LoginEmail/>;
                break;
            case 'dashboard':
                scene = <ApplicationTabs/>;
                break;
            case 'cta':
                scene = <Cta/>;
                break;
            case 'orderDone':
                scene = <OrderDone/>;
                break;
            case 'splash':
            default:
                scene = (<Splash/>);
        }

        return (
            <View style={{ flex: 1 }}>
                {scene}
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationCardStack enableGestures={false}
                                     direction={'vertical'}
                                     navigationState={this.props.navigation}
                                     renderScene={this.renderScene}
                />
                <LoadingModal visible={this.props.modal.LoadingVisible}
                                  message={this.props.modal.LoadingMessage}
                />
                <WarningModal close={this.props.closeWarningModal}
                                visible={this.props.modal.WarningVisible}
                                title={this.props.modal.WarningTitle}
                                message={this.props.modal.WarningMessage}
                                buttons={this.props.modal.WarningButtons}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        closeWarningModal: bindActionCreators(closeWarningModal, dispatch)
    };
}

function mapStateToProps(state) {
    return {
        navigation: state.globalNavigation,
        tabsIndex: state.tabs.index,
        modal: state.modals
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
