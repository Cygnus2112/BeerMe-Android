/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
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

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

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
