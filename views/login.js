import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';

/* Redux stuff...      */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
/* ---------------------- */

import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';

const LOGIN = gql`
  query Login($user: LoginInput) {
    login(input: $user) {
      token
    }
  }
`;

import { styles } from '../css/stylesheet';
import Drawer from '../components/Drawer';
import { gradientColors } from '../utils';

const Login = (props) => {
  const [ errorMsg, setErrorMessage ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const client = useApolloClient();

  const user = {
    username,
    password,
  };

  // TODO: sign in spinner

  const submitLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Please fill out all fields');
    } else {
      try {
        const { data, loading } = await client.query({
          query: LOGIN,
          variables: { user },
        });
        const { setToken } = props.authActions;
        const { token } = data.login;
        setToken(
          {
            token,
            username,
          },
          props.navigation,
        );
        setErrorMessage('');
      } catch (err) {
        setErrorMessage('Username and/or password incorrect.');
      }
    }
  };

  const loadSignup = () => {
    props.navigation.navigate('signup');
  };

  const forgotPassword = () => {
    props.navigation.navigate('forgot');
  };

  const clearErrorMessage = () => {
    const { clearError } = props.authActions;
    clearError();
  };

  let mainView = (
    <LinearGradient colors={gradientColors} style={{flex:1}}>
      <View style={styles.main}>
        <View style={loginStyles.inputWrap}>
          <View style={[loginStyles.input, {marginTop: 5}]}>
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              onChangeText={(e) => {
                setErrorMessage('');
                clearErrorMessage();
                setUsername(e);
              }}
              value={username}
            />
          </View>
          <View style={loginStyles.input}>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={(e) => {
                setErrorMessage('');
                clearErrorMessage();
                setPassword(e);
              }}
              value={password}
            />
          </View>
          <LinearGradient
            colors={['blue', 'blue', 'mediumblue']}
            style={styles.buttonBox}
          >
            <Button
              style={loginStyles.button}
              styleDisabled={{color: 'red'}}
              onPress={submitLogin}
            >
              Sign In
            </Button>
          </LinearGradient>
          <View style={styles.error}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
          <TouchableNativeFeedback
            onPress={forgotPassword}
            style={styles.button}
          >
            <View style={styles.header}>
              <Text style={styles.forgot}>Forgot your password?</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={styles.signup}>
          <TouchableNativeFeedback onPress={loadSignup} style={styles.button}>
            <View style={styles.header}>
              <Text style={styles.instructions}>
                { "Don't" } have an account?
              </Text>
              <Text style={styles.iambold}>Sign up!</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </LinearGradient>
  );

  return <Drawer view={mainView} navigation={props.navigation} />;
};

const loginStyles = StyleSheet.create({
  inputWrap: {
    height: 325,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    elevation: 3,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 4,
  },
  button: {
    fontSize: 18,
    color: 'white',
  },
  signin: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isFetching: state.authReducer.isFetching,
    authErrorMsg: state.authReducer.authErrorMsg,
    username: state.authReducer.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
