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
  AsyncStorage,
  TouchableNativeFeedback,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ToolbarAndroid
} from 'react-native';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';
import * as beerActions from '../actions/beerActions';
import * as wishlistActions from '../actions/wishlistActions';
/* End Redux stuff...      */

import { Actions } from 'react-native-router-flux';

import Button from 'react-native-button';
let width = Dimensions.get('window').width;

class Styles extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBeers = this.fetchBeers.bind(this);
    this.openSwipe = this.openSwipe.bind(this);
    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);

    this.onActionSelected = this.onActionSelected.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      styleChoice: "",
      actionText: ""
    }
  }

  signoutUser = () => {
    const { logout } = this.props.authActions;
    logout();
  }

  fetchBeers = (style) => {         
    const { loadBeers } = this.props.beerActions;
    let userData = {
      username: this.props.username,
      //style: style || this.props.styleChoice
      style: style                                 
    }
    loadBeers(userData); 
    Actions.swipe({styleChoice: style});        
  }

  openSwipe = (styleChoice) => {
    const { clearFrontBeer } = this.props.beerActions;
    clearFrontBeer(); 

    this.fetchBeers(styleChoice); 
    // this.setState({
    //   showSwipeModal: true,
    //   styleChoice: val
    // })
  } 

  loadStyles() {
    Actions.styles();
  }  

  wishlist() {
    const { loadWishlist } = this.props.wishlistActions;
    loadWishlist({"username": this.props.username});
  }

  onActionSelected = (position) => {
    if (position === 0) { // index of 'Settings'
      //showSettings();
    }
  }

  openDrawer = () => {
    this.refs['DRAWER'].openDrawer()
  }

  render() {
    let navigationView = (
      <View style={styles.main}>
          <View style={styles.drawer}>
            <View >
              <Image source={require('../assets/logo.png')} style={{width: 294*.65, height: 70*.65}} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10}}>
              <Image source={require('../assets/ic_person_black_24dp.png') } />
              <Text style={{fontSize: 18, textAlign: 'left'}}>{ this.props.username }</Text>
            </View>
            <TouchableOpacity onPress={ this.wishlist  }>
              <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 18, textAlign: 'left'}}>Wishlist</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => Actions.styles() }>
              <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 18, textAlign: 'left'}}>Browse Beers</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={ this.signoutUser }>
              <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text style={{margin: 10, fontSize: 18, textAlign: 'left'}}>Sign Out</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
          title="toolbar"
          actions={toolbarActions}
          onIconClicked={() => this.openDrawer() }
          style={styles.toolbar}
          subtitle={this.state.actionText}
          onActionSelected={ this.onActionSelected } />
        <View style={styles.main}>
          <View style={styles.container}>
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Text style={styles.choose}>
                What are you thirsty {"for"}?
                </Text>
              </View>
              <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={ () => this.openSwipe("Ale") } >
                  <Image source={require('../assets/Ale-125.png') } style={{width: 108*.65, height: 254*.65}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.openSwipe("Lager") } >
                  <Image source={require('../assets/Lager-125.png') } style={{width: 108*.65, height: 252*.65}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.openSwipe("Pilsner") } >
                  <Image source={require('../assets/Pilsner-125.png') } style={{width: 125*.65, height: 247*.665}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.openSwipe("Stout") } >
                  <Image source={require('../assets/Stout-125.png') } style={{width: 108*.65, height: 252*.66}}/>
                </TouchableOpacity>
              </View>
              <Text style={styles.welcome}>  Ale         Lager        Pilsner       Stout</Text>
          </View>
          <View style={styles.footer} />
        </View>
    </DrawerLayoutAndroid>)
  }
//  render() {
//   let navigationView = (
//     <View style={{flex: 1, backgroundColor: '#fff'}}>
//       <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>{"I'm in the Drawer!"}</Text>
//     </View>
//   );
//   return (
//     <DrawerLayoutAndroid
//       drawerWidth={200}
//       drawerPosition={DrawerLayoutAndroid.positions.Left}
//       renderNavigationView={() => navigationView}>

//       <View style={{flex: 1, alignItems: 'center'}}>
//         <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
//         <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
//       </View>

//     </DrawerLayoutAndroid>
//   );
// }
}

// <TouchableNativeFeedback onPress={ this.submitLogin } style={styles.button} >
//                <View>
//                    <Text >Button!</Text>
//                </View>
//              </TouchableNativeFeedback>

const toolbarActions = [
  {title: 'Create', icon: require('../assets/ic_favorite_filled_3x.png'), show: 'always'}
];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 50,
    justifyContent: 'center',

  },
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF'
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
  drawer: {
    flex: .7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: .7,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  choose: {
    fontSize: 27,
    textAlign: 'center',
    margin: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    isLoggedIn: state.authReducer.isLoggedIn,
    isSearching: state.beerReducer.isSearching,
    beerData: state.beerReducer.beerData,
    beerToView: state.beerReducer.beerToView,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Styles);