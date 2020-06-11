import React, { useState, useRef } from 'react';
import {
  WebView, 
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';

import Toolbar from '../components/Toolbar';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';
const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';

const Browser = (props) => {
  const [ url, setUrl ] = useState(props.url);
  const [ backButtonEnabled, setBackButtonEnabled ] = useState(false);

  const webRef = useRef(WEBVIEW_REF);

  let inputText = '';

  const handleTextInputChange = (event) => {
    var urlText = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(urlText)) {
      urlText = 'http://' + urlText;
    }
    inputText = urlText;
  };

  const goBack = () => {
    webRef.goBack();
  };

  const reload = () => {
    webRef.reload();
  };

  const onSubmitEditing = (event) => {
    pressGoButton();
  };

  const quitWeb = () => {
    props.navigation.goBack();
  };

  const pressGoButton = () => {
    var urlInput = inputText.toLowerCase();
    if (urlInput === url) {
      reload();
    } else {
      setUrl(urlInput);
    }
    // dismiss keyboard
    webRef.blur();
  };

  inputText = url;

  return (
    <View style={styles.container}>
      <Toolbar iconAction={'back'} />
      <View style={styles.container}>
        <View style={styles.addressBarRow}>
          <TouchableOpacity
            onPress={goBack}
            style={backButtonEnabled ? styles.navButton : styles.disabledButton}
          >
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={props.url}
            onSubmitEditing={onSubmitEditing}
            onChange={handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />
          <TouchableOpacity onPress={quitWeb}>
            <View style={styles.goButton}>
              <Text style={{ fontWeight: 'bold' }}>X</Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={false}
          source={{ uri: url }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          style={{marginTop: 1}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
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
    justifyContent: 'center',
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
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    isSearching: state.beerReducer.isSearching,
    isFetching: state.wishlistReducer.isFetching,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
