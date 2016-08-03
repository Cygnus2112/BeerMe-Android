import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
let utils = require('../utils');

export const LOAD_WISHLIST_REQUEST = 'LOAD_WISHLIST_REQUEST';
export const LOAD_WISHLIST_SUCCESS = 'LOAD_WISHLIST_SUCCESS';
export const UPDATE_WISHLIST_REQUEST = 'UPDATE_WISHLIST_REQUEST';
export const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';
export const REMOVE_WISHLIST_ITEM_REQUEST = 'REMOVE_WISHLIST_ITEM_REQUEST';
export const REMOVE_WISHLIST_ITEM_SUCCESS = 'REMOVE_WISHLIST_ITEM_SUCCESS';

export const loadWishlist = (userData) => {
 // return dispatch => {

    // AsyncStorage.getItem("beerme-token", (error, token) => {
    //   console.log('error: ', error);
    //   console.log('result: ', token);
    //   if(!error) {
    //     return fetch(utils.wishlistURL+"?username="+userData.username, {
    //         //return fetch("http://localhost:8080/wishlist?username="+userData.username, {
    //         method: 'GET',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //           'x-access-token': token
    //         }
    //     })
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(response => {
    //       console.log('response in loadWishlist: ', response);
    //     //    dispatch(loadWishlistSuccess(response));
    //        // Actions.wishlist();             
    //     })
    //     .catch(err => console.error('Error in loadWishlist:', err));


    //   }

    // });
  //}

  return dispatch => {
    dispatch(loadWishlistRequest());			// presents spinner

    AsyncStorage.getItem("beerme-token").then((token) => {
        if(token){
            //dispatch(authSuccess());
            return fetch(utils.wishlistURL+"?username="+userData.username, {
            //return fetch("http://localhost:8080/wishlist?username="+userData.username, {
      			method: 'GET',
      			headers: {
        			'Accept': 'application/json',
        			'Content-Type': 'application/json',
        			'x-access-token': token
      			}
    		})
    		.then(response => {
      			return response.json();
    		})
    		.then(response => {
      			dispatch(loadWishlistSuccess(response));
      			Actions.wishlist();							
    		})
    		.catch(err => console.error('Error in loadWishlist:', err));
            	
        } else {
            // dispatch(authFail());
            Actions.login();
        }
    }, (reason) => {
      console.log('reason??? ', reason);
    }).done();
  }
}

const loadWishlistRequest = () => {
	return {
    	type: LOAD_WISHLIST_REQUEST
  	}
}

const loadWishlistSuccess = (wishlistData) => {
	return {
    	type: LOAD_WISHLIST_SUCCESS,
    	wishlistData
  	}
}

export const updateWishlist = (userData) => {
  console.log(userData);
  return dispatch => {
    dispatch(updateWishlistRequest());      // presents spinner

    AsyncStorage.getItem("beerme-token").then((token) => {
        if(token){
            //console.log('token: ', token);
            //dispatch(authSuccess());
            return axios({
              url: utils.wishlistURL,
              method: 'post',
              data: JSON.stringify({
                username: userData.username,
                wishlist: userData.wishlistToAdd,
                dislikes: userData.dislikesToAdd
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token  
              },
              timeout: 30000
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
            Actions.login();
        }
    }).done();
  }
}

export const removeWishlistItem = (userData) => {
  return dispatch => {
    dispatch(removeWishlistItemRequest());      // presents spinner

    AsyncStorage.getItem("beerme-token").then((token) => {
        if(token){
            //console.log('token: ', token);
            //dispatch(authSuccess());
            return axios({
              url: utils.wishlistURL,
              method: 'put',
              data: JSON.stringify({
                username: userData.username,
                wishlist: userData.wishlist,
                dislikes: userData.dislikes
              }),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token  
              },
              timeout: 30000
            }   
        )
        .then(response => {
            //return response.json();
            return response;
        })
        .then(response => {
           // console.log('userData.wishlist[0] ', userData.wishlist[0]);
            dispatch(removeWishlistItemSuccess(userData.wishlist[0]));
        })
        .catch(err => console.error('Error in UPDATEWishlist:', err));
              
        } else {
            // dispatch(authFail());
            Actions.login();
        }
    }).done();
  }
}

const removeWishlistItemRequest = () => {
  return {
      type: REMOVE_WISHLIST_ITEM_REQUEST
    }
}

const removeWishlistItemSuccess = (item) => {
  return {
      type: REMOVE_WISHLIST_ITEM_SUCCESS,
      item: item
    }
}

export const updateWishlistRequest = () => {
	return {
    	type: UPDATE_WISHLIST_REQUEST
  	}
}
export const updateWishlistSuccess = () => {
	return {
    	type: UPDATE_WISHLIST_SUCCESS
  	}
}

