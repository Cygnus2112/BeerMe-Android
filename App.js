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
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen
              name="main"
              component={Main}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="styles"
              component={Styles}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="swipe"
              component={Swipe}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="wishlist"
              component={Wishlist}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="beerdetail"
              component={BeerDetail}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="webview"
              component={Browser}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="forgot"
              component={Forgot}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="whatever"
              component={Whatever}
              options={{ animationEnabled: false }}
            />
            <Stack.Screen
              name="about"
              component={About}
              options={{ animationEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
