import React from 'react';

import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';

/* ---------------------- */

import Button from 'react-native-button';
let width = Dimensions.get('window').width;

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.logToConsole = this.logToConsole.bind(this);
		this.loadSignup = this.loadSignup.bind(this);
		this.submitLogin = this.submitLogin.bind(this);

		this.state = {
			username: "",
			password: "",
      errorMsg: ""
		}

	}

	logToConsole(e) {
		console.log('this.props in LOGIN', this.props);
	}

  componentWillReceiveProps(newProps){
    if(newProps.authErrorMsg) {
      this.setState({
        errorMsg: newProps.authErrorMsg
      })
    }
  }

	submitLogin(){
      if(!this.state.username || !this.state.password){  
        this.setState({
          errorMsg: "Please fill out all fields"
        })
      } else {
        const { login } = this.props.authActions;
          const userInfo = {
            username: this.state.username,
            password: this.state.password
          };
        this.setState({
          errorMsg: ""
        })
        login(userInfo)
      }
      

  	}


	loadSignup() {
		Actions.signup();
	}

	render() {
		return (
		<View style={styles.main}>
        	<View style={styles.container}>
        		<View style={{margin: 10}}>
        			<Image source={require('../assets/logo_outline.png')} />
        		</View>
          		<View style={{flexDirection: 'row',justifyContent: 'center'}}>
            		<TextInput placeholder="Username" style={styles.input} 
            			onChangeText={(username) => this.setState({username})}
            			value={this.state.username} />
          		</View>
          		<View style={{flexDirection: 'row',justifyContent: 'center'}}>
            		<TextInput placeholder="Password" style={styles.input} 
            			secureTextEntry={true}
            			onChangeText={(password) => this.setState({password})}
            			value={this.state.password} />
          		</View>
          		<Button
          			containerStyle={ styles.buttonBox }
        			  style={{fontSize: 18, color: 'white'}}
        			  styleDisabled={{color: 'red'}}
        			  onPress={ this.submitLogin }>
        			  Login
      			  </Button> 
              <View style={ styles.error } >  
                <Text style={ styles.errorMsg }>
                  {this.state.errorMsg}
                </Text>
              </View>   		
          		<View > 
          			<Text style={styles.instructions} >
          				{ "Don't" } have an account?
          			</Text>
          			<TouchableNativeFeedback onPress={ this.loadSignup } style={styles.button} >
          				<View style={ styles.header }>
               				<Text style={styles.iambold} >
          					Sign up!
          					</Text>
          				</View>
          			</TouchableNativeFeedback>
          		</View>
			</View>
        	<View style={styles.footer} />
      	</View>)
	}
}
//{flexDirection: 'row',justifyContent: 'center'}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  header: {
    flex: .1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd'
  },
  footer: {
    flex: .2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  container: {
    flex: .8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  error: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  errorMsg: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5
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
    marginBottom: 5
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
    margin: 5, 
    padding: 10,
    height: 45, 
    width: width*.7,
    fontSize: 18,
    textAlign: 'center'
  },
  buttonBox: {
  	padding:10, 
  	margin: 5,
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);

