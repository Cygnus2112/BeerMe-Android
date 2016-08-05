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

  render() {
    return (
    <View style={styles.main}>
        <View style={{flex: 1.25, margin: 10, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../assets/logo_outline.png')} />
        </View>
            <View style={styles.container} >
                <View style={{flex: .85, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white',borderRadius: 4, margin:2}}>
                  <TextInput placeholder="Email" style={styles.input} 
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email} 
                    returnKeyType='next'/>
                </View>
                <View style={{flex: .85, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white',borderRadius: 4, margin:2}}>
                  <TextInput placeholder="Username" style={styles.input} 
                    ref="username"
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username} 
                    returnKeyType='next'/>
                </View>
                <View style={{flex: .85, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white',borderRadius: 4, margin:2}}>
                  <TextInput placeholder="Password" style={styles.input}
                    ref='password' 
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    returnKeyType='next' />
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
            </View>
            <View style={{flex: 4, flexDirection: 'column', justifyContent: 'center'}}> 
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
      
    </View>)
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
   // alignItems: 'flex-start',
    backgroundColor: '#ddd'
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
    flex: 3.5,
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
    // padding: 10,
    padding: 5,
   // height: 45, 
    width: width*.7,
    fontSize: 18,
    textAlign: 'center'
  },
  buttonBox: {
    //flex: 1, 
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