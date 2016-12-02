import { combineReducers } from 'redux';
import globalNavigationReducer from './globalNavigator';
import tabs from './applicationTabs';
import authReducer from './auth';
import modals from './modals';
import form from './forms';

const appReducers = combineReducers({
    globalNavigation: globalNavigationReducer,
    tabs,
    modals,
    form,
    auth: authReducer,
});
export default appReducers;
