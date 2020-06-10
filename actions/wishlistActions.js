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
  return dispatch => {
    dispatch(loadWishlistRequest());

    AsyncStorage.getItem("beerme-token").then((token) => {
        if(token){
            //dispatch(authSuccess());
            return fetch(utils.wishlistURL+"?username="+userData.username, {
      			method: 'GET',
      			headers: {
        			'Accept': 'application/json',
        			'Content-Type': 'application/json',
        			'x-access-token': token,
      			},
    		})
    		.then(response => {
      			  return response.json();
    		})
    		.then(response => {
            // console.log('response in wishlist actions: ');
            // console.log(response);

            for(var beer in response) {
              Image.prefetch(response[beer].icon);
              //console.log(response[beer].icon);
            }

            dispatch(loadWishlistSuccess(response));
            navigation.navigate('wishlist');
    		})
    		.catch(err => {
            console.error('Error in loadWishlist:', err);
          });

        } else {
            // dispatch(authFail());
            navigation.navigate('login');
        }
    }).done();
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
  return dispatch => {
    dispatch(updateWishlistRequest());
    AsyncStorage.getItem("beerme-token").then((token) => {
        if(token){
            //dispatch(authSuccess());
            return axios({
              url: utils.wishlistURL,
              method: 'post',
              data: JSON.stringify({
                username: userData.username,
                wishlist: userData.wishlistToAdd,
                dislikes: userData.dislikesToAdd,
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
              },
              timeout: 30000,
            }
        )
        .then(response => {
            //return response.json();
            return response;
        })
        .then(response => {
            dispatch(updateWishlistSuccess(response));
        })
        .catch(err => console.error('Error in UPDATEWishlist:', err));

        } else {
            // dispatch(authFail());
            navigation.navigate('login');
        }
    }).done();
  };
};

export const removeWishlistItem = (userData, navigation) => {
  return dispatch => {
    dispatch(removeWishlistItemRequest());

    AsyncStorage.getItem("beerme-token").then((token) => {
        if(token){
            //dispatch(authSuccess());
            return axios({
              url: utils.wishlistURL,
              method: 'put',
              data: JSON.stringify({
                username: userData.username,
                wishlist: userData.wishlist,
                dislikes: userData.dislikes,
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token,
              },
              timeout: 30000,
            }
        )
        .then(response => {
            //return response.json();
            return response;
        })
        .then(response => {
            dispatch(removeWishlistItemSuccess(userData.wishlist[0]));
        })
        .catch(err => console.error('Error in UPDATEWishlist:', err));

        } else {
            // dispatch(authFail());
            navigation.navigate('login');
        }
    }).done();
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
      item: item,
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

