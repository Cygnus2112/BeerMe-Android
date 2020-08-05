import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import clamp from 'clamp';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

/* Redux stuff...      */
import { useSelector, useDispatch } from 'react-redux';
import * as beerActions from '../actions/beerActions';
import * as wishlistActions from '../actions/wishlistActions';
/* End redux stuff...      */

import Drawer from '../components/Drawer';
import { gradientColors } from '../utils';

let width = Dimensions.get('window').width;

const SWIPE_THRESHOLD = 105;

const pan = new Animated.ValueXY();
const enter = new Animated.Value(1);

const Swipe = (props) => {
  const [ likeMessage, setLikeMessage ] = useState('');
  const [ isLoadingWishlist, setIsLoadingWishlist ] = useState(false);

  const dispatch = useDispatch();

  const username = useSelector((state) => state.authReducer.username);
  const beerData = useSelector((state) => state.beerReducer.beerData);
  const beerToView = useSelector((state) => state.beerReducer.beerToView);
  const nextBeer = useSelector((state) => state.beerReducer.nextBeer);
  const isSearching = useSelector((state) => state.beerReducer.isSearching);
  const isUpdating = useSelector((state) => state.wishlistReducer.isUpdating);

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

    if (beerData.length < 5 && !isSearching) {
      let userData = {
        username,
        style: props.styleChoice,
      };
      dispatch(beerActions.loadBeers(userData));
    }
  };

  const dislikeBeer = (beer) => {
    _loadFrontBeer();
    if (username) {
      dispatch(
        wishlistActions.addDislike(
          {
            username,
            dislike: beer.id,
          },
          props.navigation,
        ),
      );
    }

    setTimeout(() => {
      setLikeMessage('');
    }, 2000);

    if (beerData.length < 5 && !isSearching) {
      let userData = {
        username,
        style: props.styleChoice,
      };
      dispatch(beerActions.loadBeers(userData));
    }
  };

  const _loadFrontBeer = () => {
    dispatch(beerActions.loadFrontBeer());
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
          ? likeBeer(beerToView)
          : dislikeBeer(beerToView);

        Animated.decay(pan, {
          velocity: { x: velocity, y: vy },
          deceleration: 0.98,
          useNativeDriver: false,
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

    // if (label) {
    //   Image.prefetch(label).then(() => {});
    // }
    // if (!firstImageLoaded && beerToView.label) {
    //   Image.prefetch(beerToView.label).then(() => {
    //     setFirstImageLoaded(true);
    //   });
    // }
  }, [nextBeer, beerToView]); // TODO: this is probably wrong implementation

  const loadWishlist = useCallback(() => {
    let loading = true;

    setIsLoadingWishlist(true);

    while (loading) {
      if (!isUpdating) {
        dispatch(wishlistActions.loadWishlist(props.navigation));
        loading = false;
      }
    }
  }, [isUpdating, props.navigation, dispatch]);

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

  const mainView = (beerToView && beerToView.label) ? (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <View style={styles.main}>
        <Animated.View
          style={[styles.card, animatedCardstyles]}
          {..._panResponder.panHandlers}
        >
          <View style={styles.labelWrap}>
            <FastImage
              source={{ uri: beerToView.label }}
              style={styles.labelImg}
            />
          </View>
          <Text style={styles.choose}>{beerToView.name}</Text>
          <Text style={{ fontSize: 16 }}>{beerToView.brewery}</Text>
        </Animated.View>
        <View style={styles.thumbs}>
          <TouchableOpacity onPress={() => dislikeBeer(beerToView)}>
            <FastImage
              source={require('../assets/thumbdown_outline2.png')}
              style={styles.thumbDown}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => likeBeer(beerToView)}>
            <FastImage
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
  ) : <View><Text>Oops!</Text></View> ;

  let viewToDisplay;

  if (isSearching && (!beerToView || !beerToView.label)) {
    viewToDisplay = searchingView;
  } else if (isLoadingWishlist) {
    viewToDisplay = loadingView;
  } else {
    viewToDisplay = mainView;
  }
  return (
    <Drawer
      view={viewToDisplay}
      wishlistFunc={loadWishlist}
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

export default Swipe;
