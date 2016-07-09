import {
  AsyncStorage
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
let utils = require('../utils');

export const LOAD_WISHLIST_REQUEST = 'LOAD_WISHLIST_REQUEST';
export const LOAD_WISHLIST_SUCCESS = 'LOAD_WISHLIST_SUCCESS';
export const UPDATE_WISHLIST_REQUEST = 'UPDATE_WISHLIST_REQUEST';
export const UPDATE_WISHLIST_SUCCESS = 'UPDATE_WISHLIST_SUCCESS';

export const loadWishlist = (userData) => {
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
  console.log('userData in updateWishlist ', userData);
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
            console.log('initial response in wishlist UPDATE: ', response);
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

// export const updateWishlist = (userData) => {
// 	console.log('userData in UPDATE wishlist', userData);
//   return dispatch => {
//     dispatch(updateWishlistRequest());			// presents spinner

//     //	'x-access-token': token
//    //		'Accept': 'application/json',
//    //'Content-Type': 'application/json',
//     AsyncStorage.getItem("beerme-token").then((token) => {
//         if(token){
//             //dispatch(authSuccess());
//             return fetch("http://beermeserver.yxuemvb8nv.us-west-2.elasticbeanstalk.com/wishlist", {
//             //return fetch("http://localhost:8080/wishlist?username="+userData.username, {
//       			method: 'POST',
//       			headers: {
//       				'Accept': 'application/json',
//       				'Content-Type': 'application/json',
//         			'x-access-token': token  
//       			},
//       			body: JSON.stringify({
//         			username: userData.username,
//         			wishlist: userData.wishlistToAdd,
//         			dislikes: userData.dislikesToAdd
//       			})
//     		})
//     		.then(response => {
//     			console.log('response in updateWishlist: ', response);
//       			return response.json();
//     		})
//     		.then(response => {
//       			console.log('resp in wishlist UPDATE: ', response);
//       			dispatch(updateWishlistSuccess(response));
//       			//Actions.wishlist();							// SEND DATA AS PROP???
//     		})
//     		.catch(err => console.error('Error in UPDATEWishlist:', err));
            	
//         } else {
//             // dispatch(authFail());
//             //Actions.login();
//         }
//     }).done();
//   }
// }

const updateWishlistRequest = () => {
	return {
    	type: UPDATE_WISHLIST_REQUEST
  	}
}
const updateWishlistSuccess = () => {
	return {
    	type: UPDATE_WISHLIST_SUCCESS
  	}
}

