import React, { useState, useRef } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DrawerLayoutAndroid,
  // BackAndroid
} from 'react-native';
import FastImage from 'react-native-fast-image';

/* Redux stuff...      */

import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../actions/authActions';
import * as wishlistActions from '../actions/wishlistActions';
/* End Redux stuff...      */

import Toolbar from './Toolbar';

const Drawer = (props) => {
  const DRAWER = useRef(null);
  const [ wishlistError, setWishlistError ] = useState('');
  const [ drawerOpen, setDrawerOpen ] = useState(false);

  const username = useSelector((state) => state.authReducer.username);
  const isFetching = useSelector((state) => state.wishlistReducer.isFetching);

  const dispatch = useDispatch();

  const signoutUser = () => {
    // because for some reason onDrawerClose doesn't always work
    setDrawerOpen(false);
    DRAWER.current.closeDrawer();
    dispatch(authActions.logout(props.navigation));
  };

  const wishlist = () => {
    if (!username) {
      setWishlistError('You must be signed in to access your wishlist');
      setTimeout(() => setWishlistError(''), 3000);
    } else {
      setDrawerOpen(false);
      // because for some reason onDrawerClose doesn't always work
      DRAWER.current.closeDrawer();

      if (props.wishlistFunc) {
        props.wishlistFunc();
      } else {
        dispatch(wishlistActions.loadWishlist(props.navigation));
      }
    }
  };

  const loadStyles = () => {
    // because for some reason onDrawerClose doesn't always work
    setDrawerOpen(false);
    DRAWER.current.closeDrawer();
    props.navigation.navigate('styles');
  };

  const loadAbout = () => {
    // because for some reason onDrawerClose doesn't always work
    setDrawerOpen(false);
    DRAWER.current.closeDrawer();
    props.navigation.navigate('about');
  };

  const openDrawer = () => {
    DRAWER.current.openDrawer();
  };

  // BackAndroid.addEventListener('hardwareBackPress', () => {
  //   if(this.state.drawerOpen) {
  //     if(this.DRAWER){
  //     // this.refs['DRAWER'].closeDrawer();
  //     this.DRAWER.closeDrawer();
  //     this.setState({ drawerOpen: false })
  //     // return true;
  //     }
  //   }
  //   return true;
  // });

  const userView = (
    <View style={styles.wrap}>
      <FastImage
        source={require('../assets/ic_person_black_24dp.png')}
        style={{ margin: 10 }}
      />
      <Text style={styles.label}>{username}</Text>
    </View>
  );

  const signoutView = (
    <TouchableOpacity onPress={signoutUser}>
      <View style={styles.wrap}>
        <FastImage
          source={require('../assets/ic_account_circle_black_24dp_sm.png')}
          style={{ margin: 10 }}
        />
        <Text style={styles.label}>Sign Out</Text>
      </View>
    </TouchableOpacity>
  );

  const loginView = (
    <TouchableOpacity onPress={() => {
        DRAWER.current.closeDrawer();
        props.navigation.navigate('login');
      }}
    >
      <View style={styles.wrap}>
        <FastImage
          source={require('../assets/ic_account_circle_black_24dp_sm.png')}
          style={{ margin: 10 }}
        />
        <Text style={styles.label}>Sign In</Text>
      </View>
    </TouchableOpacity>
  );

  const errorView = (
    <View style={styles.errorWrap}>
      <Text style={styles.error}>{wishlistError}</Text>
    </View>
  );

  const navigationView = (
    <View style={styles.drawermain}>
      <View style={styles.drawer}>
        <View style={styles.logowrap}>
          <FastImage
            source={require('../assets/logo_amber.png')}
            style={{ width: 294 * 0.65, height: 70 * 0.65 }}
          />
        </View>
        {username ? userView : null}
        <TouchableOpacity onPress={wishlist}>
          <View style={styles.button}>
            <FastImage
              source={require('../assets/ic_favorite_filled_3x.png')}
              style={styles.icon}
            />
            <Text style={styles.label}>Wishlist</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={loadStyles}>
          <View style={styles.button}>
            <FastImage
              source={require('../assets/beer-icon.png')}
              style={styles.icon}
            />
            <Text style={styles.label}>Browse Beers</Text>
          </View>
        </TouchableOpacity>
        {username ? signoutView : loginView}
        {wishlistError ? errorView : null}
      </View>
      <View style={styles.about}>
        <TouchableOpacity onPress={loadAbout}>
          <View style={styles.button}>
            <FastImage
              source={require('../assets/ic_info_black_24dp.png')}
              style={styles.icon}
            />
            <Text style={styles.label}>About</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const loadingView = (
    <View style={styles.loadingWrap}>
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading wishlist...</Text>
      </View>
      <ActivityIndicator
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={DRAWER}
      drawerWidth={200}
      keyboardDismissMode={'on-drag'}
      onDrawerOpen={() => setDrawerOpen(true)}
      onDrawerClose={() => setDrawerOpen(false)}
      drawerPosition={'left'}
      renderNavigationView={() => navigationView}
    >
      <Toolbar openDrawer={openDrawer} navigation={props.navigation} />
      {isFetching ? loadingView : props.view}
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    elevation: 3,
    backgroundColor: '#ffbf00',
    height: 57,
    justifyContent: 'center',
  },
  loadingWrap: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  loading: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'flex-end',
  },
  loadingText: {
    fontSize: 27,
    textAlign: 'center',
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  drawer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  drawermain: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 2,
  },
  wrap: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1,
  },
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1,
  },
  logowrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  errorWrap: {
    height: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 18,
    textAlign: 'left',
  },
  icon: {
    width: 24,
    height: 24,
    margin: 10,
  },
  error: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
  },
  about: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 0.075,
    backgroundColor: '#F5FCFF',
  },
});

export default Drawer;
