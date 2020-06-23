import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
const utils = require('../utils');

export const LOAD_WISHLIST_REQUEST = 'LOAD_WISHLIST_REQUEST';
export const LOAD_WISHLIST_SUCCESS = 'LOAD_WISHLIST_SUCCESS';
export const UPDATE_WISHLIST_REQUEST = 'UPDATE_WISHLIST_REQUEST';
export const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';
export const REMOVE_WISHLIST_ITEM_REQUEST = 'REMOVE_WISHLIST_ITEM_REQUEST';
export const REMOVE_WISHLIST_ITEM_SUCCESS = 'REMOVE_WISHLIST_ITEM_SUCCESS';
export const EMPTY_WISHLIST = 'EMPTY_WISHLIST';

export const loadWishlist = (navigation) => {
  return async (dispatch) => {
    dispatch(loadWishlistRequest());
    const token = await AsyncStorage.getItem('beerme-token');
    const username = await AsyncStorage.getItem('beerme-username');
    if (token) {
      try {
        const query = `
          query {
            wishlist(input:{username:"${username}",token:"${token}"}){
              id
              name
              brewery
              label
              style
              icon
              descript
              abv
              website
            }
          }
        `;
        const res = await axios({
          url: utils.wishlistURL,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ query }),
        });
        const { wishlist } = res.data.data;
        dispatch(loadWishlistSuccess(wishlist));
        navigation.navigate('wishlist');
      } catch (err) {
        console.error('Error in loadWishlist:', err);
      }
    } else {
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

export const addToWishlist = (userData, navigation) => {
  const { wishlistToAdd } = userData;
  return async (dispatch) => {
    dispatch(addToWishlistRequest());
    const token = await AsyncStorage.getItem('beerme-token');
    const username = await AsyncStorage.getItem('beerme-username');
    if (token) {
      try {
        const query = `
          mutation {
            addToWishlist(input:{username:"${username}",token:"${token}",wishlist:"${wishlistToAdd}"}){
              wishlist
              dislikes
            }
          }
        `;
        await axios({
          url: utils.wishlistURL,
          method: 'POST',
          data: JSON.stringify({ query }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        });
        dispatch(addToWishlistSuccess());
      } catch (err) {
        console.error('Error in UPDATEWishlist:', err);
      }
    } else {
      navigation.navigate('login');
    }
  };
};

export const addDislike = (userData, navigation) => {
  const { dislike } = userData;
  return async (dispatch) => {
    dispatch(addDislikeRequest());
    const token = await AsyncStorage.getItem('beerme-token');
    const username = await AsyncStorage.getItem('beerme-username');
    if (token) {
      const query = `
        mutation {
          addDislike(input:{username:"${username}",token:"${token}",dislike:"${dislike}"}){
            wishlist
            dislikes
          }
        }
      `;
      try {
        await axios({
          url: utils.wishlistURL,
          method: 'POST',
          data: JSON.stringify({ query }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        });
        dispatch(addDislikeSuccess(dislike));
      } catch (err) {
        console.error('Error in addDislike:', err);
      }
    } else {
      navigation.navigate('login');
    }
  };
};

const emptyWishlist = () => {
  return {
    type: EMPTY_WISHLIST,
  };
};

const addDislikeRequest = () => {
  return {
    type: REMOVE_WISHLIST_ITEM_REQUEST,
  };
};

const addDislikeSuccess = (item) => {
  return {
    type: REMOVE_WISHLIST_ITEM_SUCCESS,
    item,
  };
};

export const addToWishlistRequest = () => {
  return {
    type: UPDATE_WISHLIST_REQUEST,
  };
};

export const addToWishlistSuccess = () => {
  return {
    type: UPDATE_WISHLIST_SUCCESS,
  };
};
