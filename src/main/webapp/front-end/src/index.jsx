import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {loadGames, loadGamesSuccess, loadGamesError, cleanState, loadContentItems, loadContentItemsSuccess, loadContentItemsError} from './action_creators';
import App from './components/App';
import {List, Map} from 'immutable';
import promise from 'redux-promise';
import {AppGridContainer} from './components/AppGrid';
//import {MapWrapperContainer} from './components/MapWrapper'

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);
const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


store.dispatch(cleanState());

store.dispatch(loadGames()).then((response) => {
               !response.error ? store.dispatch(loadGamesSuccess(response.payload.data)) : store.dispatch(loadGamesError(response.error));
           });
store.dispatch(loadContentItems()).then((response) => {
                !response.error ? store.dispatch(loadContentItemsSuccess(response.payload.data)) : store.dispatch(loadContentItemsError(response.error));
            });


const routes = <Route component={App}>
  <Route path="/" component={AppGridContainer} />
  <Route path="/adventures/:adventureId/edit" component={AppGridContainer} />
  <Route path="/games/new" />
</Route>;



ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

