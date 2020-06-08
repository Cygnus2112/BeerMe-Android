import React from 'react';
import { Provider } from 'react-redux'

import store from './reducers/rootStore';

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

import {Scene, Router} from 'react-native-router-flux';

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

export default App;
