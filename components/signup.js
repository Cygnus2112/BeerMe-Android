import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  AsyncStorage,
  TouchableNativeFeedback,
  findNodeHandle,
  ScrollView
} from 'react-native';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';

/* ---------------------- */
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

let width = Dimensions.get('window').width;

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.submitSignup = this.submitSignup.bind(this);
		this.loadLogin = this.loadLogin.bind(this);

		this.state = {
			username: "",
			password: "",
      email: "",
      errorMsg: ""
		}

	}

  componentWillReceiveProps(newProps){
    if(newProps.authErrorMsg.ERROR) {
      this.setState({
        //errorMsg: newProps.authErrorMsg.ERROR
        errorMsg: "That username is already taken.\nPlease choose another."
      })
    }
  }

	submitSignup() {
    if(!this.state.username || !this.state.password || !this.state.email){
      this.setState({
        errorMsg: "Please fill out all fields"
      }) 
    } else if(this.state.password.length < 6){
      this.setState({
        errorMsg: "Password must be at least six characters in length."
      }) 
    } else {
      const { signup } = this.props.authActions;
      const userInfo = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      };
      this.setState({
        errorMsg: ""
      }) 
      signup(userInfo);
    }
	}

	loadLogin() {
    Actions.login();
	}

  inputFocused(refName) {
    setTimeout(() => {
      // Note the this.refs.scrollView -- the ScrollView element to be
      // handled must have the ref='scrollView' for this to work.
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        //offset,
        //110, //additionalOffset
        300, //additionalOffset
        true
      );
    }, 50);
  }

    render() {
    return (
    <View style={styles.main}>
      <ScrollView ref='scrollView' style={styles.scrollView} keyboardDismissMode='interactive' contentContainerStyle={styles.contentContainerStyle}>        
            <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../assets/logo.png')} />
                </View>
            <View style={styles.container} ref='input'>
                <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                  <TextInput placeholder="Email" style={styles.input} 
                    ref='email'
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email} 
                    returnKeyType='next'
                    onFocus={this.inputFocused.bind(this, 'email')} />
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                  <TextInput placeholder="Username" style={styles.input} 
                    ref="username"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username} 
                    returnKeyType='next'
                    onFocus={this.inputFocused.bind(this, 'username')} />
                </View>
                <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                  <TextInput placeholder="Password" style={styles.input}
                    ref='password' 
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    returnKeyType='next'
                    onFocus={this.inputFocused.bind(this, 'input')} />
                </View>
                <Button
                  containerStyle={ styles.buttonBox }
                  style={{fontSize: 18, color: 'white'}}
                  styleDisabled={{color: 'red'}}
                  onPress={ this.submitSignup }>
                  Sign up
                </Button>   
                <View style={ styles.errorBox } >
                  <Text style={ styles.errorMsg }>
                    {this.state.errorMsg}
                  </Text>
                </View>
                <View> 
                  <Text style={styles.instructions} >
                    Already have an account?
                  </Text>
                  <TouchableNativeFeedback onPress={ this.loadLogin } style={styles.button} >
                    <View style={ styles.header }>
                      <Text style={styles.iambold} >
                      Sign {"in"}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
            </View>
          <View style={styles.footer} />
      </ScrollView>
    </View>)
  }
}
//{flexDirection: 'row',justifyContent: 'center'}}
const styles = StyleSheet.create({
  main: {
    flex: 1,
   // alignItems: 'flex-start',
    backgroundColor: '#ddd'
  },
  header: {
    flex: .1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#ddd'
  },
  footer: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  errorBox: {
    flex: .1,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  errorMsg: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5
  },
   contentContainerStyle: {
    flex: 1,
  },
   scrollView: {
    flex: 1,
  },
  //inputcontainer
  container: {
    flex: .6,
    //flex: .5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
  },
  iambold: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white', 
    margin: 3, 
    padding: 10,
    height: 45, 
    width: width*.7,
    fontSize: 18,
    textAlign: 'center'
  },
  buttonBox: {
  	padding:10, 
  	margin: 3,
  	height:45, 
  	width: width*.7, 
  	overflow:'hidden', 
  	borderRadius:4, 
  	backgroundColor: 'blue'
  },
  button: {
    textAlign: 'center',
    //color: '#ffffff',
    color: '#333333',
    marginBottom: 7,
    width: width*.7,

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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);