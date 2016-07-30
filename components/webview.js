import React, { Component } from 'react';
//import { WebView } from 'react-native';

import {
  WebView, 
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  TouchableOpacity 
} from 'react-native';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';
//const DEFAULT_URL = 'https://m.facebook.com';

class Browser extends Component {
  constructor(props){
    super(props);

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.reload = this.reload.bind(this);

    this.state = {
      url: this.props.website,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true
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

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  }

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  }

  onSubmitEditing = (event) => {
    this.pressGoButton();
  }

  pressGoButton = () => {
    var url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyboard
    this.refs[TEXT_INPUT_REF].blur();
  }



  render() {
    return (
      <View style={styles.container}>	
      	<View style={styles.addressBarRow}>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               {'<'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'>'}
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
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                 Go!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      		<WebView
        		source={{uri: this.props.website}}
        		style={{marginTop: 20}}/>
      </View>
    );
  }
}

export default Browser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
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
    fontSize: 14,
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