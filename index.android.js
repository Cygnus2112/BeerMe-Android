import React, { Component } from 'react';

import {
  AppRegistry,
  BackAndroid,
  Navigator
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

// import Login from './components/login'
// import Signup from './components/signup'
// import Styles from './components/styles'
// import Swipe from './components/swipe'
// import Main from './components/main'
// import Wishlist from './components/wishlist'
// import BeerDetail from './components/beerdetail'
// import Browser from './components/webview'
// import Forgot from './components/forgot'
// import Whatever from './components/whatever'
// import About from './components/about'
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

BackAndroid.addEventListener('hardwareBackPress', () => {
    Actions.pop();
    return true;
});

import {Scene, Router, Actions } from 'react-native-router-flux';

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
            <Scene key="forgot" component={ Forgot } hideNavBar={false}/>
            <Scene key="whatever" component={ Whatever } hideNavBar={false} />
            <Scene key="about" component={ About } />
          </Scene>
        </Router>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('BeerMeAndroid', () => BeerMeAndroid);
