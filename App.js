import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import store from './reducers/rootStore';

import Login from './views/login';
import Signup from './views/signup';
import Styles from './views/styles';
import Swipe from './views/swipe';
import Main from './views/main';
import Wishlist from './views/wishlist';
import BeerDetail from './views/beerdetail';
import Browser from './views/webview';
import Forgot from './views/forgot';
import Whatever from './views/whatever';
import About from './views/about';

// BackAndroid.addEventListener('hardwareBackPress', () => {
//     Actions.pop();
//     return true;
// });

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="main" component={Main} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="styles" component={Styles} />
            <Stack.Screen name="swipe" component={Swipe} />
            <Stack.Screen name="wishlist" component={Wishlist} />
            <Stack.Screen name="beerdetail" component={BeerDetail} />
            <Stack.Screen name="webview" component={Browser} />
            <Stack.Screen name="forgot" component={Forgot} />
            <Stack.Screen name="whatever" component={Whatever} />
            <Stack.Screen name="about" component={About} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
