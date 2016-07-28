import React, { Component } from 'react';
import { WebView } from 'react-native';

class Browser extends Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.website}}
        style={{marginTop: 20}}/>
    );
  }
}

export default Browser