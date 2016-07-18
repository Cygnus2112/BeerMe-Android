import React from 'react';

import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableNativeFeedback,
  AsyncStorage,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  TouchableOpacity 
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

class BeerDetail extends React.Component {
  constructor(props){
    super(props);

    this.onActionSelected = this.onActionSelected.bind(this);
    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.toggleWishlist = this.toggleWishlist.bind(this);
    this.cartClicked = this.cartClicked.bind(this);

    this.state = {
      toggled: true,
      actionMessage: "",
      wishlistMessage: "Remove From Wishlist",
      heartUri: '../assets/ic_favorite_filled_3x.png',
      dislikeToAdd: null,
      dislikeID: null
    }
  }

  componentWillUnmount() {
    const { removeWishlistItem } = this.props.wishlistActions;
    if(this.state.dislikeToAdd) {
      let a = {
        "id": this.state.dislikeID,
        "name": this.state.dislikeToAdd.name,
        "style": this.state.dislikeToAdd.style,
        "labelUrl": this.state.dislikeToAdd.label,
        "icon": this.state.dislikeToAdd.icon,
        "descript": this.state.dislikeToAdd.descript,
        "abv": this.state.dislikeToAdd.abv
      }
      removeWishlistItem ({
        "username": this.props.username,
        "wishlist": [a],
        "dislikes": [a]
      });
    }
  }

  cartClicked = () => {
    this.setState({
      actionMessage: 'Shopping Feature Coming Soon!'
    })
    setTimeout(() => {this.setState({
      actionMessage: ""
    });}, 2000);
  }

  toggleWishlist = () => {
    if(this.state.toggled){
      this.setState({
        actionMessage: 'Removed From Wishlist',
        toggled: !this.state.toggled,
        dislikeToAdd: this.props.selectedBeer,
        dislikeID: this.props.rowID
      })
    } else {
      this.setState({
        actionMessage: 'Added to Wishlist',
        toggled: !this.state.toggled,
        dislikeToAdd: null,
        dislikeID: null
      })
    }
    setTimeout(() => {this.setState({
      actionMessage: ""
    });}, 2000);
  }

  onActionSelected = (position) => {
    if (position === 0) { // index of 'Settings'
      //showSettings();
    }
  }

  signoutUser = () => {
    this.refs['DRAWER'].closeDrawer();
    const { logout } = this.props.authActions;
    logout();
  }

  wishlist = () => {
    this.refs['DRAWER'].closeDrawer();
    const { loadWishlist } = this.props.wishlistActions;
    loadWishlist({"username": this.props.username});
  }

  loadStyles = () => {
    this.refs['DRAWER'].closeDrawer();
    Actions.styles();
  }

  openDrawer = () => {
    this.refs['DRAWER'].openDrawer()
  }

  render() {
    let navigationView = (
      <View style={styles.main}>
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
      </View>
    )

    let heartView = this.state.toggled ? (
        <TouchableOpacity onPress={ this.toggleWishlist } >
          <Image source={require('../assets/ic_favorite_filled_3x.png') } style={{width: 72, height: 72, marginRight: 35}}/>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={ this.toggleWishlist } >
          <Image source={require('../assets/heart_empty.png') } style={{width: 72, height: 72, marginRight: 35}}/>
        </TouchableOpacity>
      )

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
          style={styles.toolbar}
          onActionSelected={ this.onActionSelected } />
        <View style={styles.main}>
          <View style={styles.card}>
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Image source={{uri: this.props.selectedBeer.label}} style={{width: 256, height: 256}}/>
              </View>
              <Text style={styles.choose}>
                {this.props.selectedBeer.name}
              </Text>
          </View>
          <View style={ styles.thumbs }>
              { heartView }
              <TouchableOpacity onPress={ this.cartClicked } >
                <Image source={require('../assets/shopping_cart.png') } style={{width: 72, height: 72, marginLeft:35}}/>
              </TouchableOpacity >
          </View>
          <View style={ styles.footer }>
            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Text style={styles.like} >
                  { this.state.actionMessage }
                </Text>
            </View>
          </View>
        </View>
      </DrawerLayoutAndroid>)
  }
}

const toolbarActions = [
  {title: 'BrowseBeers', icon: require('../assets/beer-icon.png'), show: 'always'},
  {title: 'Wishlist', icon: require('../assets/ic_favorite_filled_3x.png'), show: 'always'}
];

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  like: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
    fontSize: 18,
  },
  toolbar: {
    backgroundColor: '#ffbf00',
    height: 50,
    justifyContent: 'center',
  },
  drawer: {
    flex: .7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  main: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    width: width*.85,
    margin: 5,
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 1,
  },
  thumbs: {
    flex: .2,
    flexDirection: 'row',
    margin: 10,
    //width: width*.8,
    //justifyContent: 'space-between'
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
    wishlistActions: bindActionCreators(wishlistActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BeerDetail);