import * as ActionTypes from '../actions/wishlistActions';

const initialState = {
  isFetching: false,
  isUpdating: false,
  wishlist: {},
  dislikes: {}
}

export default function beerReducer(state = initialState, action){
  switch(action.type){
    case ActionTypes.LOAD_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case ActionTypes.LOAD_WISHLIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        wishlist: action.wishlistData
      })
    case ActionTypes.UPDATE_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case ActionTypes.UPDATE_WISHLIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      })
    default:
      return state;
  }
}