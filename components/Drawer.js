import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authActions from '../actions/authActions';
import * as beerActions from '../actions/beerActions';
import * as wishlistActions from '../actions/wishlistActions';
/* End Redux stuff...      */

import { Actions } from 'react-native-router-flux';
let screenHeight = Dimensions.get('window').height;

let width = Dimensions.get('window').width;

import Toolbar from './Toolbar'

class Drawer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBeers = this.fetchBeers.bind(this);
    this.openSwipe = this.openSwipe.bind(this);
    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);

    this.openDrawer = this.openDrawer.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.loadAbout = this.loadAbout.bind(this);

    this.state = {
      styleChoice: "",
      actionText: "",
      username: ""
    }
  }

  fetchBeers = (style) => {         
    const { loadBeers } = this.props.beerActions;
    let userData = {
      username: this.props.username,
      style: style                                 
    }
    loadBeers(userData); 
    Actions.swipe({styleChoice: style});        
  }

  openSwipe = (styleChoice) => {
    const { clearFrontBeer } = this.props.beerActions;
    clearFrontBeer(); 

    this.fetchBeers(styleChoice); 
  } 

  signoutUser = () => {
    this.refs['DRAWER'].closeDrawer();
    const { logout } = this.props.authActions;
    logout();
  }

  wishlist = () => {
    this.refs['DRAWER'].closeDrawer();

    if(this.props.wishlistFunc){
      this.props.wishlistFunc();
    } else {
      const { loadWishlist } = this.props.wishlistActions;
      loadWishlist({"username": this.props.username});
    }
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
          <View style={{flexDirection: 'column', justifyContent: 'center', flex: .075,backgroundColor: '#F5FCFF'}}>
            <TouchableOpacity onPress={ this.loadAbout }>
              <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderTopColor: '#b5b5b5', borderTopWidth: 1}}>
                <Image source={require('../assets/ic_info_black_24dp.png')} style={{width: 24, height: 24,margin: 10}}  />
                <Text style={{fontSize: 18, textAlign: 'left'}}>About</Text>
              </View>
            </TouchableOpacity>
          </View>
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
      )

      return (
        <DrawerLayoutAndroid
          ref={'DRAWER'}
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <Toolbar openDrawer={this.openDrawer} />

          { this.props.isFetching ? loadingView : this.props.view }

        </DrawerLayoutAndroid>)
  }
}

const styles = StyleSheet.create({
  toolbar: {
   // backgroundColor: '#e9eaed',
    elevation: 3,
    backgroundColor: '#ffbf00',
    height: 57,
    //flexDirection: 'column',
    //height: screenHeight * .092,
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white'
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
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
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    isFetching: state.wishlistReducer.isFetching 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
