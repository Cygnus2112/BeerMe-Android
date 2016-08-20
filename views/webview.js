import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  WebView, 
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity 
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';

import Toolbar from '../components/Toolbar';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';
const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';

let screenHeight = Dimensions.get('window').height;

class Browser extends Component {
  constructor(props){
    super(props);

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.goBack = this.goBack.bind(this);
    //this.goForward = this.goForward.bind(this);
    this.reload = this.reload.bind(this);

    this.quitWeb = this.quitWeb.bind(this);

    this.state = {
      url: this.props.website,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
      isLoadingWishlist: false
    }
  }

  inputText = '';

  handleTextInputChange = (event) => {
    var url = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }
    this.inputText = url;
  }

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  }

  // goForward = () => {
  //   this.refs[WEBVIEW_REF].goForward();
  // }

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  }

  onSubmitEditing = (event) => {
    this.pressGoButton();
  }

  quitWeb = () => {
    Actions.pop()
  }

  render() {      
      return (
      <View style={{flex: 1, backgroundColor: HEADER}}>
      <Toolbar iconAction={'back'} />  
      <View style={styles.container}>	
      	<View style={styles.addressBarRow}>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               {'<'}
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.props.website}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}/>
            <TouchableOpacity onPress={this.quitWeb}>
              <View style={styles.goButton}>
                <Text style={{fontWeight: 'bold'}}>
                 X
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      	<WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
        		source={{uri: this.props.website}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
        		style={{marginTop: 1}}/>
      </View>
    </View>
    );
    
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
   // borderTopWidth: 1,
    //borderTopColor: 'white'
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderTopColor: 'white', 
    borderTopWidth: 1
  },
  // webView: {
  //   //backgroundColor: BGWASH,
  //   height: 350,
  // },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 16,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  loading: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    wishlistActions: bindActionCreators(wishlistActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    isSearching: state.beerReducer.isSearching,
    isFetching: state.wishlistReducer.isFetching
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Browser);



