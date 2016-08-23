import { AsyncStorage, Image } from 'react-native';

let utils = require('../utils');

export const LOAD_BEERS_REQUEST = 'LOAD_BEERS_REQUEST';
export const LOAD_BEERS_SUCCESS = 'LOAD_BEERS_SUCCESS';
export const LOAD_BEERS_FAILURE = 'LOAD_BEERS_FAILURE';
export const LOAD_FRONT_BEER = 'LOAD_FRONT_BEER';
export const CLEAR_BEER_DATA = 'CLEAR_BEER_DATA';
export const CLEAR_FRONT_BEER = 'CLEAR_FRONT_BEER';
//export const IMAGE_LOAD_SUCCESS = 'IMAGE_LOAD_SUCCESS';

export const loadBeers = (userData={style: "Ale"}) => {	
  return dispatch => {
    dispatch(loadBeersRequest());

    return fetch(utils.fetchbeersURL+"?username="+userData.username+"&style="+userData.style, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': AsyncStorage.getItem('beerme-token')
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      if(response.errorMessage) {
        console.error('BreweryDB API Limit Reached. Sorry :-(')
        dispatch(loadBeersFailure('BreweryDB API Limit Reached. Sorry :-('));
        return;
      }
      let beerArr = [];
      for(var key in response){
        if(!beerArr.length < 2){
          Image.prefetch(response[key].label).then(() => {
            // console.log('IMAGE PREFETCHED for ', response[key].name)
          })
        }
        beerArr.push({
          id: key,
          name: response[key].name,
          label: response[key].label,
          style: response[key].style,
          icon: response[key].icon,
          descript: response[key].descript,
          abv: response[key].abv,
          brewery: response[key].brewery,
          website: response[key].website
        })
      }
      dispatch(loadBeersSuccess(beerArr));             
    })
    .catch(err => console.error('Error in loadBeers:', err));
  }
}

const loadBeersRequest = () => {
  return {
    type: LOAD_BEERS_REQUEST
  }
}

const loadBeersSuccess = (beerData) => {
  return {
    type: LOAD_BEERS_SUCCESS,
    beerData
  }
}

const loadBeersFailure = (errorMessage) => {
  return {
    type: LOAD_BEERS_FAILURE,
    errorMessage
  }
}

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
  return dispatch => {
    dispatch(loadFrontBeerSuccess())
  }
}

const loadFrontBeerSuccess = () => {
  return {
    type: LOAD_FRONT_BEER
  }
}

const clearBeerDataSuccess = () => {
  return {
    type: CLEAR_BEER_DATA
  }
}

export const clearBeerData = () => {
  return dispatch => {
    dispatch(clearBeerDataSuccess())
  }
}

const clearFrontBeerSuccess = () => {
  return {
    type: CLEAR_FRONT_BEER
  }
}

export const clearFrontBeer = () => {
  return dispatch => {
    dispatch(clearFrontBeerSuccess())
  }
}

