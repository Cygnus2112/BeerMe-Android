import * as ActionTypes from '../actions/wishlistActions';

const initialState = {
  isFetching: false,
  isUpdating: false,
  wishlist: {},
  dislikes: {},
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
        wishlist: action.wishlistData,
      })
    case ActionTypes.EMPTY_WISHLIST:
      return Object.assign({}, state, {
        isFetching: false,
      })
    case ActionTypes.UPDATE_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      })
    case ActionTypes.UPDATE_WISHLIST_SUCCESS:
      return Object.assign({}, state, {
        isUpdating: false,
      })
    case ActionTypes.REMOVE_WISHLIST_ITEM_REQUEST:
      return Object.assign({}, state, {
        isUpdating: true,
      })
    case ActionTypes.REMOVE_WISHLIST_ITEM_SUCCESS:
      let newWishlist = Object.assign({}, state.wishlist);
      delete newWishlist[action.item.id];
      console.log('newWishlist: ', newWishlist);
      return Object.assign({}, state, {
        isUpdating: false,
        wishlist: newWishlist,
      })
    default:
      return state;
  }
}