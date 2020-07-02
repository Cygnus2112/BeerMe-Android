import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';

import Toolbar from '../components/Toolbar';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';
const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';

const Browser = (props) => {
  const [ url, setUrl ] = useState(props.route.params.url);
  const [ backButtonEnabled, setBackButtonEnabled ] = useState(false);

  const webRef = useRef(WEBVIEW_REF);
  const textInputRef = useRef(TEXT_INPUT_REF);

  let inputText = '';

  const handleTextInputChange = (event) => {
    var urlText = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(urlText)) {
      urlText = 'http://' + urlText;
    }
    inputText = urlText;
  };

  const goBack = () => {
    webRef.current.goBack();
  };

  const reload = () => {
    webRef.current.reload();
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
    textInputRef.current.blur();
  };

  inputText = url;

  return (
    <View style={styles.container}>
      <Toolbar iconAction={'back'} navigation={props.navigation} />
      <View style={styles.container}>
        <View style={styles.addressBarRow}>
          <TouchableOpacity
            onPress={goBack}
            style={backButtonEnabled ? styles.navButton : styles.disabledButton}
          >
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <TextInput
            ref={textInputRef}
            autoCapitalize="none"
            defaultValue={props.route.params.url}
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
          ref={webRef}
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

export default Browser;
