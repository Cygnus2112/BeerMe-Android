import * as ActionTypes from '../actions/authActions';

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  username: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        username: action.username,
      });
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: '',
      });
    case ActionTypes.AUTH_REQUEST:
      return state;
    // return Object.assign({}, state, {
    //   isLoggedIn: false,
    //   username: '',
    // })
    case ActionTypes.AUTH_SUCCESS:
      return Object.assign({}, state, {
        username: action.username,
        isLoggedIn: true,
      });
    default:
      return state;
  }
}
