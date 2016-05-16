import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import * as reducers from './modules/reducers.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import App from './views/App/App';
import Home from './views/Home/Home';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const logger = createLogger();
const saga = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(logger, saga)(createStore);
const store = createStoreWithMiddleware(reducer);
const history = syncHistoryWithStore(browserHistory, store);

// Required for replaying actions from devtools to work
// reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
