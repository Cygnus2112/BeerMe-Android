import React from 'react';

import {
  ActivityIndicator,
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
  AsyncStorage,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ToolbarAndroid,
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

import { Actions } from 'react-native-router-flux';
let width = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

import clamp from 'clamp';
const SWIPE_THRESHOLD = 120;

class Swipe extends React.Component {
  constructor(props){
    super(props);

    this.likeBeer = this.likeBeer.bind(this);
    this.dislikeBeer = this.dislikeBeer.bind(this);

   // this.onActionSelected = this.onActionSelected.bind(this);
    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.loadAbout = this.loadAbout.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      likeMessage: "",
      wishlistToAdd: [],
      dislikesToAdd: [],
      actionText: "",
      isLoadingWishlist: false,
      pan: new Animated.ValueXY(),
      //enter: new Animated.Value(0.5),
      enter: new Animated.Value(1),
    }
  }

  /* Begin Tinder Swipe code, large portions of which are gratefully copied from
   * https://github.com/meteor-factory/react-native-tinder-swipe-cards, which was 
   * gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder
   */

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
    console.log('componentWill MOUNT called');
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
    this.state.enter.setValue(0);
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
    this.refs['DRAWER'].closeDrawer();
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

  likeBeer = (beer) => {
    Actions.beerdetail({selectedBeer: beer, rowID: beer.id, isAlreadyInWishlist: false});

    const { loadFrontBeer } = this.props.beerActions;
    setTimeout(loadFrontBeer, 200);

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
    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

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

  signoutUser = () => {
    this.refs['DRAWER'].closeDrawer();
    const { logout } = this.props.authActions;
    logout();
  }

  loadStyles = () => {
    this.refs['DRAWER'].closeDrawer();
    Actions.styles();
  }

  loadAbout = () => {
    this.refs['DRAWER'].closeDrawer();
    Actions.about();
  }

  openDrawer = () => {
    this.refs['DRAWER'].openDrawer()
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


    let navigationView = (
     <View style={styles.drawermain}>
          <View style={styles.drawer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#F5FCFF', padding: 5, borderBottomColor: '#b5b5b5', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15}}>
              <Image source={require('../assets/logo_amber.png')} style={{width: 294*.65, height: 70*.65}} />
            </View>
            <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
              <Image source={require('../assets/ic_person_black_24dp.png') } style={{margin: 10}} />
              <Text style={{fontSize: 18, textAlign: 'left'}}>{ this.props.username }</Text>
            </View>
            <TouchableOpacity onPress={ this.wishlist  }>
              <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
                <Image source={require('../assets/ic_favorite_filled_3x.png')} style={{width: 24, height: 24,margin: 10}} />
                <Text style={{fontSize: 18, textAlign: 'left'}}>Wishlist</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.loadStyles }>
              <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
                <Image source={require('../assets/beer-icon.png')} style={{width: 24, height: 24, margin: 10}}/>
                <Text style={{fontSize: 18, textAlign: 'left'}}>Browse Beers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.signoutUser }>
              <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
                <Image source={require('../assets/ic_account_circle_black_24dp_sm.png')} style={{margin: 10}}  />
                <Text style={{fontSize: 18, textAlign: 'left'}}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: .075,backgroundColor: '#F5FCFF'}}>
            <TouchableOpacity onPress={ this.loadAbout }>
              <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderTopColor: '#b5b5b5', borderTopWidth: 1}}>
                <Image source={require('../assets/ic_info_black_24dp.png')} style={{width: 24, height: 24,margin: 10}}  />
                <Text style={{fontSize: 18, textAlign: 'left'}}>About</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    );

    if(this.props.isSearching && !this.props.beerToView.label) {
      return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
          onIconClicked={() => this.openDrawer() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar} />
        <View style={styles.loading}>
          <View style={{flex:.5,flexDirection:'row', justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize: 27, textAlign: 'center'}}>Fetching beers...</Text>
          </View>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
      </DrawerLayoutAndroid>
        )
    } else if (this.state.isLoadingWishlist) {
       return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
          onIconClicked={() => this.openDrawer() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar} />
        <View style={styles.loading}>
          <View style={{flex:.5, flexDirection:'row', justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize: 27, textAlign: 'center'}}>Loading wishlist...</Text>
          </View>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
      </DrawerLayoutAndroid>
        )
    } else {
      return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
          onIconClicked={() => this.openDrawer() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar} />
      <View style={styles.main} >
          <Animated.View style={[styles.card, animatedCardstyles]} {...this._panResponder.panHandlers}>
              <View style={{flexDirection: 'row',justifyContent: 'center', borderColor: 'black', borderWidth: 1, width: 258, height: 258}}>
                <Image source={{uri: this.props.beerToView.label}} style={{width: 256, height: 256}}/>
              </View>
              <Text style={styles.choose}>
                {this.props.beerToView.name}
              </Text>
          </Animated.View>
          <View style={ styles.thumbs }>
              <TouchableOpacity onPress={ () => this.dislikeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbdown_outline2.png') } style={{width: 72, height: 72, marginRight:35}}/>
              </TouchableOpacity >
              <TouchableOpacity onPress={ () => this.likeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbup_outline.png') } style={{width: 72, height: 72, marginLeft:35}}/>
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
      </DrawerLayoutAndroid>
      );
    } 
  }

}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffbf00',
    height: screenHeight * .092,
    justifyContent: 'center',
  },
  drawer: {
    flex: .7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  drawermain: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ddd',
    //alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: '#F5FCFF'
    borderColor: 'black',
    borderWidth: 2
  },
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
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 20
  },
  drawermain: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
    borderColor: 'black',
    borderWidth: 2
  },
  card: {
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
    margin: 10,
    //width: width*.8,
    //justifyContent: 'space-between'
  },
  header: {
    flex: .1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  divider: {
    flex: .1
  },
  footer: {
    flex: .1,
  },
  choose: {
    fontSize: 27,
    textAlign: 'center',
   // justifyContent: 'center',
    margin: 10,
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
    beerToView: state.beerReducer.beerToView,
    beerData: state.beerReducer.beerData,
    isSearching: state.beerReducer.isSearching,
    isFetching: state.wishlistReducer.isFetching,
    isUpdating: state.wishlistReducer.isUpdating,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Swipe);

