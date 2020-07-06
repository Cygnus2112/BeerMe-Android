import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
/* Redux stuff...      */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
/* ---------------------- */
import LinearGradient from 'react-native-linear-gradient';
import Button from 'react-native-button';
import { gradientColors } from '../utils';

import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';

const SIGNUP = gql`
  mutation Signup($user: CreateUserInput) {
    signup(input: $user) {
      token
    }
  }
`;

import Drawer from '../components/Drawer';
import { styles } from '../css/stylesheet';

const Signup = (props) => {
  const [ errorMsg, setErrorMessage ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const client = useApolloClient();

  const _validateEmail = () => {
    let regExString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExString.test(email);
  };

  const submitSignup = async () => {
    if (!username || !password || !email){
      setErrorMessage('Please fill out all fields.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least six characters in length.');
    } else if (!_validateEmail()) {
      setErrorMessage('Please enter a properly formatted email address.');
    } else {
      try {
        const { setToken } = props.authActions;
        const user = {
          email,
          username,
          password,
        };
        // TODO: signup spinner
        const { data, loading } = await client.mutate({
          mutation: SIGNUP,
          variables: { user },
        });
        const { token } = data.signup;
        setToken(
          {
            token,
            username,
          },
          props.navigation,
        );
        setErrorMessage('');
      } catch (err) {
        setErrorMessage('That username is already taken.\nPlease choose another.');
      }
    }
  };

  const loadLogin = () => {
    props.navigation.navigate('login');
  };

  let mainView = (
    <LinearGradient colors={gradientColors} style={{ flex:1 }}>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={[signupStyles.input, { marginTop: 30 }]}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              autoCorrect={false}
              onChangeText={(e) => {
                setErrorMessage('');
                setEmail(e);
              }}
              value={email}
              returnKeyType="next"
            />
          </View>
          <View style={signupStyles.input}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              ref={usernameRef}
              onChangeText={(e) => {
                setErrorMessage('');
                setUsername(e);
              }}
              value={username}
              returnKeyType="next"
            />
          </View>
          <View style={signupStyles.input}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              ref={passwordRef}
              secureTextEntry={true}
              onChangeText={(e) => {
                setErrorMessage('');
                setPassword(e);
              }}
              value={password}
              returnKeyType="next"
            />
          </View>
          <LinearGradient
            colors={['blue', 'blue', 'mediumblue']}
            style={styles.signupbuttonBox}
          >
            <Button
              style={signupStyles.button}
              styleDisabled={{ color: 'red' }}
              onPress={submitSignup}
            >
              Sign up
            </Button>
          </LinearGradient>
          <View style={styles.errorBox}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </View>
        </View>
        <View style={signupStyles.signin}>
          <TouchableNativeFeedback
            onPress={loadLogin}
            style={styles.button}
          >
            <View style={styles.header}>
              <Text style={styles.instructions}>Already have an account?</Text>
              <Text style={styles.iambold}>Sign {'in'}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    </LinearGradient>
  );

  return <Drawer view={mainView} navigation={props.navigation} />;
};

const signupStyles = StyleSheet.create({
  input: {
    elevation: 3,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 2,
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

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
