import * as ActionTypes from '../actions/beerActions';

const initialState = {
  isSearching: false,
  beerData: [],
  beerToView: {},
  nextBeer: {},
}
export default function beerReducer(state = initialState, action){
  switch(action.type){
    case ActionTypes.LOAD_BEERS_REQUEST:
      return Object.assign({}, state, {
        isSearching: true,
      })
    case ActionTypes.LOAD_BEERS_SUCCESS:
      if(!state.beerToView.label) {
        return Object.assign({}, state, {
          isSearching: false,
          beerToView: action.beerData.pop(),
          nextBeer: action.beerData.pop(),
          beerData: [...(new Set( [...state.beerData, ...action.beerData ]))],
        })
      } else {
        return Object.assign({}, state, {
          isSearching: false,
          beerData: [...(new Set( [...state.beerData, ...action.beerData ]))],
        })
      }
    case ActionTypes.LOAD_BEERS_FAILURE:
      console.error('LOAD_BEERS_FAILURE dispatched');
      return Object.assign({}, state, {
        beerToView: {name: action.errorMessage},
        beerData: [{name: action.errorMessage}],
        isSearching: false,
      })
    // case ActionTypes.IMAGE_LOAD_SUCCESS:
    //   return Object.assign({}, state, {
    //     isSearching: false
    //   })
    case ActionTypes.LOAD_FRONT_BEER:
      return Object.assign({}, state, {
        beerToView: state.nextBeer,
        nextBeer: state.beerData[0] || {},
        beerData: state.beerData.slice(1),
      })

    case ActionTypes.CLEAR_BEER_DATA:
      return Object.assign({}, state, {
        beerData: [],
      })
    case ActionTypes.CLEAR_FRONT_BEER:
      return Object.assign({}, state, {
        beerToView: {},
      })
    default:
      return state;
  }
}