import React, { Component } from 'react';
import { View } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Tab3 from './Tab3';
import Tab2 from './Tab2';
import Tab1 from './Tab1';
import styles from './styles';


class Tabs extends Component {

    static title = 'Scrollable top bar';
    static appbarElevation = 0;

    static propTypes = {
        style: View.propTypes.style,
    };
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
          { key: 'Tab1', icon: 'looks-one' },
          { key: 'Tab2', icon: 'looks-two' },
          { key: 'Tab3', icon: 'looks-3' }
            ],
        };
    }

    handleChangeTab = (index) => {
        this.setState({
            index,
        });
    };


    renderIcon = ({ route }) => {
        return (
            <View style={styles.iconContainer}>
                <Icon style={styles.icon} name={route.icon}/>
            </View>
        );
    };

    renderHeader = (props) => {
        return (
            <TabBarTop {...props}
                indicatorStyle={styles.indicator}
                style={styles.tabbar}
                labelStyle={styles.label}
                renderIcon={this.renderIcon}
            />
        );
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case 'Tab1':
                return <Tab1/>;
            case 'Tab2':
                return (<Tab2/>);
            case 'Tab3':
                return <Tab3/>;
            default:
                return null;
        }
    };

    render() {
        return (
            <TabViewAnimated style={[styles.container, this.props.style]}
                navigationState={this.state}
                renderScene={this.renderScene}
                renderHeader={this.renderHeader}
                onRequestChangeTab={this.handleChangeTab}
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
