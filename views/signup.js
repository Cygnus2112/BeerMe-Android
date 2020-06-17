import React, { useState, useEffect, useRef } from 'react';
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
import Drawer from '../components/Drawer';

import { styles } from '../css/stylesheet';

const Signup = (props) => {
  const [ errorMsg, setErrorMessage ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (props.authErrorMsg.ERROR) {
      setErrorMessage('That username is already taken.\nPlease choose another.');
    }
    // TODO: do I need to access old props to remove error msg?
  }, [props.authErrorMsg]);

  const _validateEmail = () => {
    let regExString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExString.test(email);
  };

  const submitSignup = () => {
    if (!username || !password || !email){
      setErrorMessage('Please fill out all fields.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be at least six characters in length.');
    } else if (!_validateEmail()) {
      setErrorMessage('Please enter a properly formatted email address.');
    } else {
      const { signup } = props.authActions;
      const userInfo = {
        email,
        username,
        password,
      };
      setErrorMessage('');
      signup(userInfo, props.navigation);
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
              onChangeText={setEmail}
              value={email}
              returnKeyType="next"
            />
          </View>
          <View style={signupStyles.input}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              ref={usernameRef}
              onChangeText={setUsername}
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
              onChangeText={setPassword}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
