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
  ScrollView,
  Keyboard,
} from 'react-native';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';

/* ---------------------- */
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { gradientColors } from '../utils';

import LinearGradient from 'react-native-linear-gradient';

let width = Dimensions.get('window').width;

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.submitSignup = this.submitSignup.bind(this);
		this.loadLogin = this.loadLogin.bind(this);
    this._validateEmail = this._validateEmail.bind(this);

		this.state = {
			username: "",
			password: "",
      email: "",
      errorMsg: "",
     // visibleHeight: Dimensions.get('window').height
		}
	}

  // componentWillMount() {
  //   this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
  //   this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  // }

  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }

  // keyboardDidShow (e) {
  //   let newSize = Dimensions.get('window').height - e.endCoordinates.height
  //   this.setState({
  //     //topLogo: {width: 100, height: 70},
  //     visibleHeight: newSize
  //   })
  // }

  // keyboardDidHide (e) {
  //   this.setState({
  //    // topLogo: {width: Dimensions.get('window').width},
  //     visibleHeight: Dimensions.get('window').height
  //   })
  // }  

  componentWillReceiveProps(newProps){
    if(newProps.authErrorMsg.ERROR) {
      this.setState({
        errorMsg: "That username is already taken.\nPlease choose another."
      })
    }
  }

  _validateEmail() {
    let regExString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExString.test(this.state.email);
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
    } else if (!this._validateEmail()) {
      this.setState({
        errorMsg: "Please enter a properly formatted email address."
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
 // flex: 1.25, 
//flex: .85, 
  render() {
    return (
    <LinearGradient colors={gradientColors} style={{flex:1}}>
      <View style={styles.main}>
        <View style={{height: 75, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/logo_outline.png')} />
        </View>
            <View style={styles.container} >
                <View style={{elevation:3, height: 45, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white',borderRadius: 4, margin:2}}>
                  <TextInput placeholder="Email" style={styles.input} 
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email} 
                    returnKeyType='next'/>
                </View>
                <View style={{elevation:3,height: 45, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white',borderRadius: 4, margin:2}}>
                  <TextInput placeholder="Username" style={styles.input} 
                    ref="username"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username} 
                    returnKeyType='next'/>
                </View>
                <View style={{elevation:3,height: 45, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white',borderRadius: 4, margin:2}}>
                  <TextInput placeholder="Password" style={styles.input}
                    ref='password' 
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    returnKeyType='next' />
                </View>
                <LinearGradient colors={['blue', 'blue', 'mediumblue']} style={styles.buttonBox}>
                  <Button
                    style={{fontSize: 18, color: 'white'}}
                    styleDisabled={{color: 'red'}}
                    onPress={ this.submitSignup }>
                    Sign up
                  </Button>   
                </LinearGradient>
                <View style={ styles.errorBox } >
                  <Text style={ styles.errorMsg }>
                    {this.state.errorMsg}
                  </Text>
                </View>
            </View>
            <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}> 
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
    </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
   // alignItems: 'flex-start',
   // backgroundColor: '#ddd'
  },
  errorBox: {
    flex: .3,
    margin: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  errorMsg: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5
  },
  container: {
    //flex: 3.5,
    //flex: 5.5,
    height: 250,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#ddd',
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
    // padding: 10,
    padding: 5,
   // height: 45, 
    width: width*.7,
    fontSize: 18,
    textAlign: 'center'
  },
  buttonBox: {
    elevation:3,
    //flex: 1, 
  	padding:10, 
  	margin: 3,
  	height:45, 
  	width: width*.7, 
  	overflow:'hidden', 
  	borderRadius:4, 
  	//backgroundColor: 'blue'
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