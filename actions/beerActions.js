import axios from 'axios';
const utils = require('../utils');

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
    const username = userData.username ? `username:"${userData.username}",` : '';
    try {
      const query = `
        query {
          fetchBeers(input:{${username}style:"${userData.style}"}){
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
      const response = await axios({
        url: utils.fetchbeersURL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ query }),
      });
      const beerArr = response.data.data.fetchBeers;
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
