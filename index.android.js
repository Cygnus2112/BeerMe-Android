import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  BackAndroid,
  Navigator,
  ToolbarAndroid,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';

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
})
const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)
const store = finalCreateStore(reducer)

import Login from './components/login'
import Signup from './components/signup'
import Styles from './components/styles'
import Swipe from './components/swipe'
import Main from './components/main'
import Wishlist from './components/wishlist'
import BeerDetail from './components/beerdetail'
import Browser from './components/webview'
//import Drawer from './components/drawer'

let width = Dimensions.get('window').width;

BackAndroid.addEventListener('hardwareBackPress', () => {
  //if (_navigator && _navigator.getCurrentRoutes().length > 1) {
   // _navigator.pop();
    Actions.pop();
    return true;
  //}

  //return false;
});

import {Scene, Router, Actions } from 'react-native-router-flux';
//component={ Drawer}
class BeerMeAndroid extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="main" component={ Main } initial={ true } />
            <Scene key="login" component={ Login } type='reset'/>
            <Scene key="signup" component={ Signup } type='reset'/>
            <Scene key="styles" component={ Styles} type='reset'/>
            <Scene key="swipe" component={ Swipe} />
            <Scene key="wishlist" component={ Wishlist } type='reset' />
            <Scene key="beerdetail" component={ BeerDetail } direction='vertical' />
            <Scene key="webview" component={ Browser} />
          </Scene>
        </Router>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('BeerMeAndroid', () => BeerMeAndroid);
