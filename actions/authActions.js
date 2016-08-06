import { Actions } from 'react-native-router-flux';

let utils = require('../utils');

import {
  AsyncStorage
} from 'react-native';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

export const signup = (info) => {
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
          	Actions.styles();
        } else {
          dispatch(signupError(response));
        }
      } catch(e){
        console.log('error response in SIGNUP: ', e);
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

export const login = (info) => {
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

          Actions.styles();
        } else {
          console.log('initial error response in LOGIN: ', response);
          dispatch(loginError());
          
        }
      } catch(e) {
        console.log('error response #2 in LOGIN: ', e);
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

export const logout = () => {
  return dispatch => {
    AsyncStorage.removeItem('beerme-token')
    	.then(result => {
    		AsyncStorage.removeItem('beerme-username')
    			.then(result => {
    				dispatch(logoutSuccess());
    				Actions.login();
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

export const checkForToken = () => {
    return dispatch => {
    	AsyncStorage.getItem("beerme-token").then((value) => {
            if(value){
            	AsyncStorage.getItem("beerme-username").then((username) => {
            		dispatch(authSuccess(username));
            		Actions.styles(hideNavBar={true});
            	}).done();
            } else {
            	// dispatch(authFail());
            	Actions.login();
            }

        }).done();
    }
}

const authRequest = () => {
  return {
    type: AUTH_REQUEST
  }
}

const authSuccess = (username) => {
  return {
    type: AUTH_SUCCESS,
    username: username
  }
}



