import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Animated,
  PanResponder
} from 'react-native';

/* Redux stuff...      */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as beerActions from '../actions/beerActions'; 
import * as wishlistActions from '../actions/wishlistActions'; 
import * as authActions from '../actions/authActions';
/* End redux stuff...      */ 

import Drawer from '../components/Drawer'

import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors } from '../utils';
let width = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

import clamp from 'clamp';
//const SWIPE_THRESHOLD = 120;
const SWIPE_THRESHOLD = 105;

class Swipe extends React.Component {
  constructor(props){
    super(props);

    this.likeBeer = this.likeBeer.bind(this);
    this.dislikeBeer = this.dislikeBeer.bind(this);

    this.wishlist = this.wishlist.bind(this);

    this._loadFrontBeer = this._loadFrontBeer.bind(this);

    this.state = {
      likeMessage: "",
      wishlistToAdd: [],
      dislikesToAdd: [],
      actionText: "",
      isLoadingWishlist: false,
      pan: new Animated.ValueXY(),
      //enter: new Animated.Value(0),
      // enter: new Animated.Value(0.5),
      enter: new Animated.Value(1),
      beerLabel: this.props.beerToView.label,
      nextLabel: null,
      mountTime: new Date(),
      firstImageLoaded: false,
    }
  }

  /* Begin Tinder Swipe code, large portions of which are gratefully copied from
   * https://github.com/meteor-factory/react-native-tinder-swipe-cards, which was 
   * gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder
   */

  componentWillReceiveProps(newProps) {
      if(newProps.nextBeer.label) {
        Image.prefetch(newProps.nextBeer.label).then(() => {
        // console.log('IMAGE PREFETCHED')
        })
      }
      if(!this.state.firstImageLoaded && newProps.beerToView.label ){
        Image.prefetch(newProps.beerToView.label).then(() => {
          this.setState({
            firstImageLoaded: true
          })
        })
      }
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          this.state.pan.x._value > 0
            ? this.likeBeer(this.props.beerToView)
            : this.dislikeBeer(this.props.beerToView)

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(1);
  //  this._goToNextCard();
    this._animateEntrance();
  }

  /* End gratefully copied Tinder Swipe code */

  componentWillUnmount() {
    const { clearBeerData } = this.props.beerActions;
    clearBeerData();
    const { updateWishlist } = this.props.wishlistActions;
    if(this.state.wishlistToAdd.length || this.state.dislikesToAdd.length) {
      updateWishlist({
        "username": this.props.username,
        "wishlistToAdd": this.state.wishlistToAdd,
        "dislikesToAdd": this.state.dislikesToAdd
      });
    }
  }

  wishlist = () => {
    //this.refs['DRAWER'].closeDrawer();
    const { clearBeerData } = this.props.beerActions;
    clearBeerData();
    const { updateWishlist } = this.props.wishlistActions;
    if(this.state.wishlistToAdd.length || this.state.dislikesToAdd.length) {
    updateWishlist({
        "username": this.props.username,
        "wishlistToAdd": this.state.wishlistToAdd,
        "dislikesToAdd": this.state.dislikesToAdd
      });
      this.setState({
        wishlistToAdd: [],
        dislikesToAdd: []
      })
    }
    let loading = true;

    this.setState({
      isLoadingWishlist: true
    })
 
    while(loading) {
      if(this.props.isUpdating === false){

        const { updateWishlistRequest } = this.props.wishlistActions;
        updateWishlistRequest();
        const { loadWishlist } = this.props.wishlistActions;
        loadWishlist({"username": this.props.username});
        //setTimeout(() => loadWishlist({"username": this.props.username}), 500);
        loading = false;
      }
    }
  }

  _loadFrontBeer = () => {
    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

    Image.prefetch(this.props.beerToView.icon).then(() => {
      // Actions.beerdetail({selectedBeer: beer, rowID: beer.id, isAlreadyInWishlist: false});
      //     //const { loadFrontBeer } = this.props.beerActions;
      // setTimeout(this._loadFrontBeer, 300);
    })
  }

  likeBeer = (beer) => {
   // Image.prefetch(this.props.beerToView.icon).then(() => {
      Actions.beerdetail({selectedBeer: beer, rowID: beer.id, isAlreadyInWishlist: false});
          //const { loadFrontBeer } = this.props.beerActions;
      setTimeout(this._loadFrontBeer, 300);
   // })

    if(this.props.beerData.length < 5 && !this.props.isSearching){
      const { loadBeers } = this.props.beerActions;
      let userData = {
        username: this.props.username,
        style: this.props.styleChoice
      }
      loadBeers(userData);
    }  
  }

  dislikeBeer = (beer) => {
   // const { loadFrontBeer } = this.props.beerActions;
    this._loadFrontBeer();

    this.setState({
      likeMessage: "You disliked " + beer.name,
      dislikesToAdd: this.state.dislikesToAdd.concat([{
        "id": beer.id,
        "name": beer.name,
        "labelUrl": beer.label,
        "style": beer.style,
        "icon": beer.icon,
        "abv": beer.abv,
        "descript": beer.descript,
        "brewery": beer.brewery,
        "website": beer.website
      }])
    })

    setTimeout(() => {this.setState({
      likeMessage: ""
    });}, 2000);

    if(this.props.beerData.length < 5 && !this.props.isSearching){
      const { loadBeers } = this.props.beerActions;
      let userData = {
        username: this.props.username,
        style: this.props.styleChoice
      }
      loadBeers(userData);
    }
  }

  render() {
    /* Begin Tinder Swipe code pt. II ....        */
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    /* End Tinder Swipe code pt. II ------------------ */
    let searchingView = (
        <View style={styles.loading}>
          <View style={{flex:.5,flexDirection:'row', justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize: 27, textAlign: 'center'}}>Fetching beers...</Text>
          </View>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
        );
          let loadingView = (
        <View style={styles.loading}>
          <View style={{flex:.5, flexDirection:'row', justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize: 27, textAlign: 'center'}}>Loading wishlist...</Text>
          </View>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
        );

    let mainView = (
    <LinearGradient colors={gradientColors} style={{flex:1}}>
      <View style={styles.main} >
          <Animated.View style={[styles.card, animatedCardstyles]} {...this._panResponder.panHandlers}>
              <View style={{elevation:3,flexDirection: 'row',justifyContent: 'center', borderColor: 'black', borderWidth: 1, width: 258, height: 258}}>
                <Image 
                  source={{uri: this.props.beerToView.label}} 
                  style={{width: 256, height: 256}}/>
              </View>
              <Text style={styles.choose}>
                {this.props.beerToView.name}
              </Text>
              <Text style={{fontSize: 16}}>
                {this.props.beerToView.brewery}
              </Text>
          </Animated.View>
          <View style={ styles.thumbs }>
              <TouchableOpacity onPress={ () => this.dislikeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbdown_outline2.png') } style={{width: 72, height: 72, marginRight: width*.1}}/>
              </TouchableOpacity >
              <TouchableOpacity onPress={ () => this.likeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbup_outline.png') } style={{width: 72, height: 72, marginLeft: width*.1}}/>
              </TouchableOpacity >
          </View>
          <View style={ styles.footer }>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Text style={styles.like } >
                  { this.state.likeMessage }
                </Text>
            </View>
          </View>
        </View>
      </LinearGradient>);
    if((this.props.isSearching && !this.props.beerToView.label) || !this.state.firstImageLoaded) {
      return ( <Drawer view={searchingView} wishlistFunc={this.wishlist} /> )
    } else if (this.state.isLoadingWishlist) {
       return ( <Drawer view={loadingView} wishlistFunc={this.wishlist} /> )
    } else {
      return ( <Drawer view={mainView} wishlistFunc={this.wishlist} /> )
    } 
  }
}
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
    borderTopColor: 'white'
    //backgroundColor: '#F5FCFF'
  },
  main: {
    flex: 1,
    flexDirection: 'column',
   // backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
   // borderTopWidth: 1,
   // borderTopColor: 'white',
    paddingTop: 10
  },
  card: {
    elevation:5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: width*.85,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5
  },
  thumbs: {
    flex: .2,
    flexDirection: 'row',
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: .1,
  },
  choose: {
    fontSize: 24,
    textAlign: 'center',
    margin: 2,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    beerData: state.beerReducer.beerData,
    beerToView: state.beerReducer.beerToView,
    nextBeer: state.beerReducer.nextBeer,
    isSearching: state.beerReducer.isSearching,
    isUpdating: state.wishlistReducer.isUpdating,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Swipe);

