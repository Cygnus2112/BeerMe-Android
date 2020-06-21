import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const utils = require('../utils');

export const LOAD_BEERS_REQUEST = 'LOAD_BEERS_REQUEST';
export const LOAD_BEERS_SUCCESS = 'LOAD_BEERS_SUCCESS';
export const LOAD_BEERS_FAILURE = 'LOAD_BEERS_FAILURE';
export const LOAD_FRONT_BEER = 'LOAD_FRONT_BEER';
export const CLEAR_BEER_DATA = 'CLEAR_BEER_DATA';
export const CLEAR_FRONT_BEER = 'CLEAR_FRONT_BEER';
//export const IMAGE_LOAD_SUCCESS = 'IMAGE_LOAD_SUCCESS';

export const loadBeers = (userData = { style: 'Ale' }) => {
  console.log('load beers called');
  return async (dispatch) => {
    dispatch(loadBeersRequest());
    const username = userData.username ? `username:"${userData.username}",` : '';
    try {
      const beerurl = `${utils.fetchbeersURL}?query={fetchBeers(input:{${username}style:"${userData.style}"}) {id name brewery label style icon descript abv website}}`;
      // const creds = await AsyncStorage.getItem('beerme-token');
      // const response = await fetch(utils.fetchbeersURL + '?username=' + userData.username + '&style=' + userData.style, {
      // const response = await fetch(beerurl, {
      // method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     // 'x-access-token': creds,
      //   },
      // });
      const response = await fetch(beerurl);
      const response_1 = await response.json();
      if (response_1.errorMessage) {
        console.error('BreweryDB API Limit Reached. Sorry :-(');
        dispatch(loadBeersFailure('BreweryDB API Limit Reached. Sorry :-('));
        return;
      }
      let beerArr = response_1.data.fetchBeers;
      dispatch(loadBeersSuccess(beerArr));
    } catch (err) {
      console.warn('Error in loadBeers:', err);
    }
  };
};

const loadBeersRequest = () => {
  return {
    type: LOAD_BEERS_REQUEST,
  };
};

const loadBeersSuccess = (beerData) => {
  return {
    type: LOAD_BEERS_SUCCESS,
    beerData,
  };
};

const loadBeersFailure = (errorMessage) => {
  return {
    type: LOAD_BEERS_FAILURE,
    errorMessage,
  };
};

// export const imageLoadSuccess = () => {
//   return dispatch => {
//     dispatch(_imageLoadSuccess())
//   }
// }

// const _imageLoadSuccess = () => {
//   return {
//     type: IMAGE_LOAD_SUCCESS
//   }
// }

export const loadFrontBeer = () => {
  return (dispatch) => {
    dispatch(loadFrontBeerSuccess());
  };
};

const loadFrontBeerSuccess = () => {
  return {
    type: LOAD_FRONT_BEER,
  };
};

const clearBeerDataSuccess = () => {
  return {
    type: CLEAR_BEER_DATA,
  };
};

export const clearBeerData = () => {
  return (dispatch) => {
    dispatch(clearBeerDataSuccess());
  };
};

const clearFrontBeerSuccess = () => {
  return {
    type: CLEAR_FRONT_BEER,
  };
};

export const clearFrontBeer = () => {
  return (dispatch) => {
    dispatch(clearFrontBeerSuccess());
  };
};
