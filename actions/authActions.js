let utils = require('../utils');

import {
  AsyncStorage
} from 'react-native';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const signup = (info, navigation) => {
  return dispatch => {
    dispatch(signupRequest(info));

      //return fetch('http://localhost:8080/signup', {
      return fetch(utils.signupURL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password,
        email: info.email
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      try {
        if(response.token){
        	AsyncStorage.setItem('beerme-token', response.token);
        	AsyncStorage.setItem('beerme-username', info.username);
          dispatch(signupSuccess({"token":response.token, "username": info.username}));
          navigation.navigate('styles');
        } else {
          dispatch(signupError(response));
        }
      } catch(e){
       // console.log('error response in SIGNUP: ', e);
        dispatch(signupError(e));
      }
    })
    .catch(err => console.error('Error in signup:', err));
  }
}

const signupRequest = (info) => {
  return {
    type: SIGNUP_REQUEST,
    username: info.username
  }
}

const signupError = (err) => {
  return {
    type: SIGNUP_ERROR,
    errorMsg: err
  }
}

const signupSuccess = (info) => {
  return {
    type: SIGNUP_SUCCESS,
    username: info.username
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = (info, navigation) => {
  return dispatch => {
    dispatch(loginRequest(info));

    //return fetch('http://localhost:8080/login', {
    return fetch(utils.loginURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: info.username,
        password: info.password
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      try {
        if(response.token){        	
        	AsyncStorage.setItem('beerme-token', response.token);
        	AsyncStorage.setItem('beerme-username', info.username);

          dispatch(loginSuccess({"token":response.token, "username": info.username}));
          //dispatch(authSuccess());
          navigation.navigate('styles');
        } else {
          dispatch(loginError());
        }
      } catch(e) {
        dispatch(loginError());
      };
    })
    .catch(err => {
      console.error('login error:', err);
      dispatch(loginError());
    });
  }
}

const loginRequest = (info) => {
  return {
    type: LOGIN_REQUEST,
    info
  }
}

const loginError = () => {
  return {
    type: LOGIN_ERROR
  }
}

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    username: user.username
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logout = (navigation) => {
  return dispatch => {
    AsyncStorage.removeItem('beerme-token')
    	.then(result => {
    		AsyncStorage.removeItem('beerme-username')
    			.then(result => {
            dispatch(logoutSuccess());
            navigation.navigate('login');
    			});
    	});
  }
}

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
// export const AUTH_FAIL = 'AUTH_FAIL';

const authRequest = () => {
  return {
    type: AUTH_REQUEST
  }
}

export const authSuccess = (username) => {
  return {
    type: AUTH_SUCCESS,
    username: username
  }
}
