import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

/* Redux stuff...      */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

/* ---------------------- */
import { styles } from '../css/stylesheet';
import Drawer from '../components/Drawer';
import { gradientColors } from '../utils';
import Button from 'react-native-button';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.loadSignup = this.loadSignup.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);

		this.state = {
			username: "",
			password: "",
      errorMsg: ""
		}

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
            password: this.state.password,
          };
        this.setState({
          errorMsg: ""
        })
        login(userInfo, this.props.navigation);
      }
  	}

	loadSignup() {
    this.props.navigation.navigate('signup');
	}

  forgotPassword() {
    this.props.navigation.navigate('forgot');
  }
//flex: 1.5, 
        // <View style={{margin: 10, height: 75, flexDirection: 'column', justifyContent: 'center'}}>
        //     <Image source={require('../assets/logo_outline.png')} />
        // </View>
	render() {
    let mainView = (
  <LinearGradient colors={gradientColors} style={{flex:1}}>
    <View style={styles.main}>
      <View style={{height: 325, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{elevation:3,height: 50,flexDirection: 'row',justifyContent: 'center', backgroundColor:'white', margin:5, marginTop:50, borderRadius: 4}}>
            <TextInput placeholder="Username" style={styles.textInput} 
              onChangeText={(username) => this.setState({username})}
              value={this.state.username} />
        </View>
        <View style={{elevation:3,height: 50, flexDirection: 'row',justifyContent: 'center',backgroundColor:'white', margin:5, borderRadius: 4}}>
            <TextInput placeholder="Password" 
              style={styles.textInput} 
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password} />
        </View>
        <LinearGradient colors={['blue','blue','mediumblue']} style={styles.buttonBox}>
        <Button
            style={{fontSize: 18, color: 'white'}}
            styleDisabled={{color: 'red'}}
            onPress={ this.submitLogin }>
            Sign In
        </Button> 
        </LinearGradient>
        <View style={ styles.error } >  
            <Text style={ styles.errorMsg }>
              {this.state.errorMsg}
            </Text>
        </View>
          <TouchableNativeFeedback onPress={ this.forgotPassword } style={styles.button} >
            <View style={ styles.header }>
              <Text style={styles.forgot} >
                Forgot your password?
              </Text>
            </View>
          </TouchableNativeFeedback> 
      </View>
        <View style={ styles.signup }> 
            <TouchableNativeFeedback onPress={ this.loadSignup } style={styles.button} >
                <View style={ styles.header }>
                  <Text style={styles.instructions} >
                    { "Don't" } have an account?
                  </Text>
                  <Text style={styles.iambold} >
                    Sign up!
                  </Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    </View>
  </LinearGradient>
      );

		return (<Drawer view={ mainView } navigation={this.props.navigation} />)

	}
}

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

