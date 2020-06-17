import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

let utils = require('../utils');

export const LOAD_BEERS_REQUEST = 'LOAD_BEERS_REQUEST';
export const LOAD_BEERS_SUCCESS = 'LOAD_BEERS_SUCCESS';
export const LOAD_BEERS_FAILURE = 'LOAD_BEERS_FAILURE';
export const LOAD_FRONT_BEER = 'LOAD_FRONT_BEER';
export const CLEAR_BEER_DATA = 'CLEAR_BEER_DATA';
export const CLEAR_FRONT_BEER = 'CLEAR_FRONT_BEER';
//export const IMAGE_LOAD_SUCCESS = 'IMAGE_LOAD_SUCCESS';

export const loadBeers = (userData = { style: 'Ale' }) => {
  return async (dispatch) => {
    dispatch(loadBeersRequest());

    try {
      const creds = await AsyncStorage.getItem('beerme-token');
      const response = await fetch(utils.fetchbeersURL + '?username=' + userData.username + '&style=' + userData.style, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': creds,
        },
      });
      const response_1 = await response.json();
      if (response_1.errorMessage) {
        console.error('BreweryDB API Limit Reached. Sorry :-(');
        dispatch(loadBeersFailure('BreweryDB API Limit Reached. Sorry :-('));
        return;
      }
      let beerArr = [];
      for (var key in response_1) {
        if (!beerArr.length < 2) {
          await Image.prefetch(response_1[key].label);
        }
        beerArr.push({
          id: key,
          name: response_1[key].name,
          label: response_1[key].label,
          style: response_1[key].style,
          icon: response_1[key].icon,
          descript: response_1[key].descript,
          abv: response_1[key].abv,
          brewery: response_1[key].brewery,
          website: response_1[key].website,
        });
      }
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
