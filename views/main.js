import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import store from '../reducers/rootStore';
import { authSuccess } from '../actions/authActions';

const checkForToken = async (props) => {
  try {
    const token = await AsyncStorage.getItem("beerme-token");
    const username = await AsyncStorage.getItem("beerme-username");
    store.dispatch(authSuccess(username));
  } catch(err) {
    console.warn('token err: ', err);
  } finally {
    props.navigation.navigate('styles');
  }
};

const Main = (props) => {
  useEffect(() => {
    setTimeout(() => {
      checkForToken(props);
    } ,1500) // Because I spent a long time working on the main logo 
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image source={require('../assets/logo_outline.png')} />
      </View> 
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  header: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  footer: {
    flex: .2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  }
});

export default Main;