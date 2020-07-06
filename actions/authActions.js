import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const setToken = (info, navigation) => {
  const { token, username } = info;
  return async (dispatch) => {
    try {
      await AsyncStorage.setItem('beerme-token', token);
      await AsyncStorage.setItem('beerme-username', username);
      dispatch(loginSuccess({ token, username }));
      navigation.navigate('styles');
    } catch (err) {
      return err;
    }
  };
};

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    username: user.username,
  };
};

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const logout = (navigation) => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('beerme-token');
    await AsyncStorage.removeItem('beerme-username');
    dispatch(logoutSuccess());
    navigation.navigate('login');
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const authRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};

export const authSuccess = (username) => {
  return {
    type: AUTH_SUCCESS,
    username: username,
  };
};
