import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import clamp from 'clamp';
import LinearGradient from 'react-native-linear-gradient';

/* Redux stuff...      */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as beerActions from '../actions/beerActions';
import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';
/* End redux stuff...      */

import Drawer from '../components/Drawer';
import { gradientColors } from '../utils';

let width = Dimensions.get('window').width;

const SWIPE_THRESHOLD = 105;

const Swipe = (props) => {
  const [ likeMessage, setLikeMessage ] = useState('');
  const [ wishlistToAdd, setWishlist ] = useState([]);
  const [ dislikesToAdd, setDislikes ] = useState([]);
  const [ isLoadingWishlist, setIsLoadingWishlist ] = useState(false);
  const [ pan, setPan ] = useState(new Animated.ValueXY());
  const [ enter, setEnter ] = useState(new Animated.Value(1));
  // const [ actionText, setActionText ] = useState('');
  // const [ beerLabel, setBeerLabel ] = useState(props.beerToView.label);
  // const [ nextLabel, setNextLabel ] = useState(null);
  // const [ mountTime, setMountTime ] = useState(new Date());
  const [ firstImageLoaded, setFirstImageLoaded ] = useState(false);

  /* Begin Tinder Swipe code, large portions of which are gratefully copied from
   * https://github.com/meteor-factory/react-native-tinder-swipe-cards, which was 
   * gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder
   */

  const _animateEntrance = () => {
    Animated.spring(enter, {
      toValue: 1,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };

  const likeBeer = (beer) => {
    props.navigation.navigate('beerdetail', {
      selectedBeer: beer,
      rowID: beer.id,
      isAlreadyInWishlist: false,
      direction: 'vertical',
    });

    setTimeout(_loadFrontBeer, 300);

    if (props.beerData.length < 5 && !props.isSearching) {
      const { loadBeers } = props.beerActions;
      let userData = {
        username: props.username,
        style: props.styleChoice,
      };
      loadBeers(userData);
    }
  };

  const dislikeBeer = (beer) => {
    _loadFrontBeer();
    setDislikes(dislikesToAdd.concat([beer.id]));

    setTimeout(() => {
      setLikeMessage('');
    }, 2000);

    if (props.beerData.length < 5 && !props.isSearching) {
      const { loadBeers } = props.beerActions;
      let userData = {
        username: props.username,
        style: props.styleChoice,
      };
      loadBeers(userData);
    }
  };

  const _loadFrontBeer = () => {
    const { loadFrontBeer } = props.beerActions;
    loadFrontBeer();
  };

  const _resetState = () => {
    pan.setValue({
      x: 0,
      y: 0,
    });
    enter.setValue(1);
    _animateEntrance();
  };

  const _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: (e, gestureState) => {
      pan.setOffset({ x: pan.x._value, y: pan.y._value });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [ null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false },
    ),
    onPanResponderRelease: (e, { vx, vy }) => {
      pan.flattenOffset();
      let velocity;

      if (vx >= 0) {
        velocity = clamp(vx, 3, 5);
      } else if (vx < 0) {
        velocity = clamp(vx * -1, 3, 5) * -1;
      }

      if (Math.abs(pan.x._value) > SWIPE_THRESHOLD) {
        pan.x._value > 0
          ? likeBeer(props.beerToView)
          : dislikeBeer(props.beerToView);

        Animated.decay(pan, {
          velocity: { x: velocity, y: vy },
          deceleration: 0.98,
        }).start(_resetState);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  useEffect(() => {
    _animateEntrance();

    if (props.nextBeer.label) {
      Image.prefetch(props.nextBeer.label).then(() => {});
    }
    if (!firstImageLoaded && props.beerToView.label) {
      Image.prefetch(props.beerToView.label).then(() => {
        setFirstImageLoaded(true);
      });
    }

    // return () => {
    // TODO: this is getting called after every swipe.
    //   const { clearBeerData } = props.beerActions;
    //   clearBeerData();
    //   if (props.username) {
    //     const { updateWishlist } = props.wishlistActions;
    //     if (wishlistToAdd.length || dislikesToAdd.length) {
    //       updateWishlist(
    //         {
    //           'username': props.username,
    //           'wishlistToAdd': wishlistToAdd,
    //           'dislikesToAdd': dislikesToAdd,
    //         },
    //         props.navigation,
    //       );
    //     }
    //   }
    // };
  }, [props.nextBeer, props.beerToView]);

  /* End gratefully copied Tinder Swipe code */

  const wishlist = () => {
    const { clearBeerData } = props.beerActions;
    clearBeerData();
    const { updateWishlist } = props.wishlistActions;
    if (wishlistToAdd.length || dislikesToAdd.length) {
      updateWishlist(
        {
          username: props.username,
          'wishlistToAdd': wishlistToAdd,
          'dislikesToAdd': dislikesToAdd,
        },
        props.navigation,
      );
      setWishlist([]);
      setDislikes([]);
    }
    let loading = true;

    setIsLoadingWishlist(true);

    while (loading) {
      if (props.isUpdating === false) {
        const { updateWishlistRequest } = props.wishlistActions;
        updateWishlistRequest();
        const { loadWishlist } = props.wishlistActions;
        loadWishlist({ 'username': props.username }, props.navigation);
        loading = false;
      }
    }
  };

  /* Begin Tinder Swipe code pt. II ....        */

  const [translateX, translateY] = [pan.x, pan.y];
  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });
  const opacity = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
  });
  const scale = enter;
  const animatedCardstyles = {
    transform: [{ translateX }, { translateY }, { rotate }, { scale }],
    opacity,
  };

  /* End Tinder Swipe code pt. II ------------------ */

  const searchingView = (
    <View style={styles.loading}>
      <View style={styles.loadingTextWrap}>
        <Text style={styles.loadingText}>Fetching beers...</Text>
      </View>
      <ActivityIndicator
        animating={true}
        style={[styles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );

  const loadingView = (
    <View style={styles.loading}>
      <View style={styles.loadingTextWrap}>
        <Text style={styles.loadingText}>Loading wishlist...</Text>
      </View>
      <ActivityIndicator
        animating={true}
        style={[styles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );

  const mainView = (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <View style={styles.main}>
        <Animated.View
          style={[styles.card, animatedCardstyles]}
          {..._panResponder.panHandlers}
        >
          <View style={styles.labelWrap}>
            <Image
              source={{ uri: props.beerToView.label }}
              style={styles.labelImg}
            />
          </View>
          <Text style={styles.choose}>{props.beerToView.name}</Text>
          <Text style={{ fontSize: 16 }}>{props.beerToView.brewery}</Text>
        </Animated.View>
        <View style={styles.thumbs}>
          <TouchableOpacity onPress={() => dislikeBeer(props.beerToView)}>
            <Image
              source={require('../assets/thumbdown_outline2.png')}
              style={styles.thumbDown}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => likeBeer(props.beerToView)}>
            <Image
              source={require('../assets/thumbup_outline.png')}
              style={styles.thumbUp}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.footerWrap}>
          <View style={styles.footer}>
            <Text style={styles.like}>{likeMessage}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );

  let viewToDisplay;

  if ((props.isSearching && !props.beerToView.label) || !firstImageLoaded) {
    viewToDisplay = searchingView;
  } else if (isLoadingWishlist) {
    viewToDisplay = loadingView;
  } else {
    viewToDisplay = mainView;
  }
  return (
    <Drawer
      view={viewToDisplay}
      wishlistFunc={wishlist}
      navigation={props.navigation}
    />
  );
};

const styles = StyleSheet.create({
  like: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
    fontSize: 18,
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
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  card: {
    elevation: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: width * 0.85,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  thumbs: {
    flex: 0.2,
    flexDirection: 'row',
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbUp: {
    width: 72,
    height: 72,
    marginLeft: width * 0.1,
  },
  thumbDown: {
    width: 72,
    height: 72,
    marginRight: width * 0.1,
  },
  footerWrap: {
    flex: 0.1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  choose: {
    fontSize: 24,
    textAlign: 'center',
    margin: 2,
  },
  labelWrap: {
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    width: 258,
    height: 258,
  },
  labelImg: {
    width: 256,
    height: 256,
  },
  loadingTextWrap: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loadingText: {
    fontSize: 27,
    textAlign: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    beerData: state.beerReducer.beerData,
    beerToView: state.beerReducer.beerToView,
    nextBeer: state.beerReducer.nextBeer,
    isSearching: state.beerReducer.isSearching,
    isUpdating: state.wishlistReducer.isUpdating,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Swipe);
