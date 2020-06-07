import React from 'react';

import {
  StyleSheet,
  // ToolbarAndroid
} from 'react-native';

import ToolbarAndroid from '@react-native-community/toolbar-android';

import { Actions } from 'react-native-router-flux';

let menuIcon = require('../assets/ic_menu_black_24dp_sm.png');
let backIcon = require('../assets/ic_navigate_before_black_24dp.png');

class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    Actions.pop();
  }

  render() {
    return (
        <ToolbarAndroid
          navIcon={ this.props.iconAction ? backIcon : menuIcon }
          onIconClicked={() => {
            if(this.props.iconAction === 'back') {
              this.goBack();
            } else {
              this.props.openDrawer()
            }
          }}
          logo={require('../assets/logo_white_40.png')}
          style={styles.toolbar} />
      )
  }

}

const styles = StyleSheet.create({
  toolbar: {
    elevation: 3,
    backgroundColor: '#ffbf00',
    height: 57,
    //flexDirection: 'column',
    justifyContent: 'center',
  }
})

export default Toolbar