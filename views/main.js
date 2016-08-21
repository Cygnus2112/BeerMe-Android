import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';

import { Actions } from 'react-native-router-flux';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';
import * as wishlistActions from '../actions/wishlistActions';

/* ---------------------- */

let width = Dimensions.get('window').width;

class Main extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
    const { checkForToken } = this.props.authActions;
    checkForToken();
  }

	render() {
		return (
		  <View style={styles.main}>
        <View style={styles.header} />
          <View style={styles.container}>
              <Image source={require('../assets/logo_outline.png')} />
          </View> 
        <View style={styles.footer} />
    </View>)
	}
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  header: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  footer: {
    flex: .2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  }
});

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    isFetching: state.authReducer.isFetching,
    authErrorMsg: state.authReducer.authErrorMsg,
    username: state.authReducer.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);