import React from 'react';
import {StyleSheet} from 'react-native';

import ToolbarAndroid from '@react-native-community/toolbar-android';

let menuIcon = require('../assets/ic_menu_black_24dp_sm.png');
let backIcon = require('../assets/ic_navigate_before_black_24dp.png');

const Toolbar = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <ToolbarAndroid
      navIcon={ props.iconAction ? backIcon : menuIcon }
      onIconClicked={() => {
        if (props.iconAction === 'back') {
          goBack();
        } else {
          props.openDrawer();
        }
      }}
      logo={require('../assets/logo_white_40.png')}
      style={styles.toolbar}
    />
  );
};

const styles = StyleSheet.create({
  toolbar: {
    elevation: 3,
    backgroundColor: '#ffbf00',
    height: 57,
    justifyContent: 'center',
  },
});

export default Toolbar;