import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import middlewares from '../middlewares';

export default function configureStore() {
    const logger = createLogger();
    const middleware = applyMiddleware(thunk, logger, middlewares.crashlyticsLogger);
    const createStoreWithMiddleware = compose(
        middleware,
    );
    return createStoreWithMiddleware(createStore)(reducers);
}
