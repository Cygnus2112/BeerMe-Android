import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
let utils = require('../utils');

export const LOAD_WISHLIST_REQUEST = 'LOAD_WISHLIST_REQUEST';
export const LOAD_WISHLIST_SUCCESS = 'LOAD_WISHLIST_SUCCESS';
export const UPDATE_WISHLIST_REQUEST = 'UPDATE_WISHLIST_REQUEST';
export const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';
export const REMOVE_WISHLIST_ITEM_REQUEST = 'REMOVE_WISHLIST_ITEM_REQUEST';
export const REMOVE_WISHLIST_ITEM_SUCCESS = 'REMOVE_WISHLIST_ITEM_SUCCESS';
export const EMPTY_WISHLIST = 'EMPTY_WISHLIST';

export const loadWishlist = (userData, navigation) => {
  return async (dispatch) => {
    dispatch(loadWishlistRequest());

    const token = await AsyncStorage.getItem('beerme-token');
    if (token) {
      try {
        //dispatch(authSuccess());
        const res = await fetch(
          utils.wishlistURL + '?username=' + userData.username,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': token,
            },
          },
        );
        const response = await res.json();

        for (let beer in response) {
          Image.prefetch(response[beer].icon);
        }

        dispatch(loadWishlistSuccess(response));
        navigation.navigate('wishlist');
      } catch (err) {
        console.error('Error in loadWishlist:', err);
      }
    } else {
      // dispatch(authFail());
      navigation.navigate('login');
    }
  };
};

const loadWishlistRequest = () => {
  return {
    type: LOAD_WISHLIST_REQUEST,
  };
};

const loadWishlistSuccess = (wishlistData) => {
  return {
    type: LOAD_WISHLIST_SUCCESS,
    wishlistData,
  };
};

export const updateWishlist = (userData, navigation) => {
  return async (dispatch) => {
    dispatch(updateWishlistRequest());
    const token = await AsyncStorage.getItem('beerme-token');
    if (token) {
      //dispatch(authSuccess());
      try {
        const res = await axios({
          url: utils.wishlistURL,
          method: 'post',
          data: JSON.stringify({
            username: userData.username,
            wishlist: userData.wishlistToAdd, // TODO: change to array of ids instead
            dislikes: userData.dislikesToAdd, // TODO: change to array of ids instead
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          timeout: 30000,
        });
        dispatch(updateWishlistSuccess(res));
        // const response = await res();
        // dispatch(updateWishlistSuccess(response));
      } catch (err) {
        console.error('Error in UPDATEWishlist:', err);
      }
    } else {
      // dispatch(authFail());
      navigation.navigate('login');
    }
  };
};

// corresponds to addDislike in GraphQL server
export const removeWishlistItem = (userData, navigation) => {
  return async (dispatch) => {
    dispatch(removeWishlistItemRequest());
    const token = await AsyncStorage.getItem('beerme-token');
    if (token) {
      try {
        await axios({
          url: utils.wishlistURL,
          method: 'put',
          data: JSON.stringify({
            username: userData.username,
            dislike: userData.dislike, // TODO: change to send id instead
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          timeout: 30000,
        });
        dispatch(removeWishlistItemSuccess(userData.dislike));
      } catch (err) {
        console.error('Error in UPDATEWishlist:', err);
      }
    } else {
      // dispatch(authFail());
      navigation.navigate('login');
    }
  };
};

const emptyWishlist = () => {
  return {
    type: EMPTY_WISHLIST,
  };
};

const removeWishlistItemRequest = () => {
  return {
    type: REMOVE_WISHLIST_ITEM_REQUEST,
  };
};

const removeWishlistItemSuccess = (item) => {
  return {
    type: REMOVE_WISHLIST_ITEM_SUCCESS,
    item,
  };
};

export const updateWishlistRequest = () => {
  return {
    type: UPDATE_WISHLIST_REQUEST,
  };
};

export const updateWishlistSuccess = () => {
  return {
    type: UPDATE_WISHLIST_SUCCESS,
  };
};
