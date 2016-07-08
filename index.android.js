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

/* ---- experimenting with redux ---- */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import * as reducers from './reducers'
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
/* ----------------------------------- */

import Login from './components/login'
import Signup from './components/signup'
import Styles from './components/styles'
import Swipe from './components/swipe'
import Main from './components/main'
import Wishlist from './components/wishlist'
import BeerDetail from './components/beerdetail'

let width = Dimensions.get('window').width;

//let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  //if (_navigator && _navigator.getCurrentRoutes().length > 1) {
   // _navigator.pop();
    Actions.pop();
    return true;
  //}

  //return false;
});

// <View style={{flex: 1}}>
//         <ToolbarAndroid
//           actions={[]}
//           navIcon={require('image!android_back_white')}
//           onIconClicked={navigationOperations.pop}
//           style={styles.toolbar}
//           titleColor="white"
//           title={"bleh!"} />
//         <Login
//           style={{flex: 1}}
//           navigator={navigationOperations}/>
//       </View>

import {Scene, Router, Actions } from 'react-native-router-flux';

class BeerMeAndroid extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="main" component={ Main } initial={ true } />
            <Scene key="login" component={ Login } />
            <Scene key="signup" component={ Signup } />
            <Scene key="styles" component={ Styles} type='replace'/>
            <Scene key="swipe" component={ Swipe} hideNavBar={false}/>
            <Scene key="wishlist" component={ Wishlist }/>
            <Scene key="beerdetail" component={ BeerDetail } hideNavBar={false} />
          </Scene>
        </Router>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('BeerMeAndroid', () => BeerMeAndroid);
