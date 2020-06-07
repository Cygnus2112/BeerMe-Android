/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import beerReducer from './reducers/beerReducers'
import authReducer from './reducers/authReducers'
import wishlistReducer from './reducers/wishlistReducers'

const reducer = combineReducers({
  beerReducer,
  authReducer,
  wishlistReducer
});

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

const store = finalCreateStore(reducer);

import Login from './views/login'
import Signup from './views/signup'
import Styles from './views/styles'
import Swipe from './views/swipe'
import Main from './views/main'
import Wishlist from './views/wishlist'
import BeerDetail from './views/beerdetail'
import Browser from './views/webview'
import Forgot from './views/forgot'
import Whatever from './views/whatever'
import About from './views/about'

// BackAndroid.addEventListener('hardwareBackPress', () => {
//     Actions.pop();
//     return true;
// });

import {Scene, Router, Actions } from 'react-native-router-flux';

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="main" component={ Main } initial={ true } />
            <Scene key="login" component={ Login } type='reset'/>
            <Scene key="signup" component={ Signup } type='reset'/>
            <Scene key="styles" component={ Styles} type='reset'/>
            <Scene key="swipe" component={ Swipe} type='reset'/>
            <Scene key="wishlist" component={ Wishlist } type='reset' />
            <Scene key="beerdetail" component={ BeerDetail } />
            <Scene key="webview" component={ Browser} />
            <Scene key="forgot" component={ Forgot } hideNavBar={false}/>
            <Scene key="whatever" component={ Whatever } hideNavBar={false} />
            <Scene key="about" component={ About } />
          </Scene>
        </Router>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
