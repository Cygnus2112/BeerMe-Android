import React from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
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

let screenHeight = Dimensions.get('window').height;

import Button from 'react-native-button';
let width = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';
import { gradientColors } from '../utils';

import Drawer from '../components/Drawer'

class Styles extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBeers = this.fetchBeers.bind(this);
    this.openSwipe = this.openSwipe.bind(this);

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
    this.props.navigation.navigate('swipe', { styleChoice: style });      
  }

  openSwipe = (styleChoice) => {
    const { clearFrontBeer } = this.props.beerActions;
    clearFrontBeer(); 

    this.fetchBeers(styleChoice); 
  } 

  render() {
  //  let navIcon = require('../assets/ic_menu_black_24dp_sm.png');

    let mainView = (<LinearGradient colors={gradientColors} style={{flex:1}}>
        <View style={styles.main}>
          <View style={styles.container}>
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Text style={styles.choose}>
                What are you thirsty {"for"}?
                </Text>
              </View>
              <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={ () => this.openSwipe("Ale") } >
                      <Image source={require('../assets/Ale-125.png') } style={{width: 108*.65, height: 254*.65}}/>
                      <Text style={styles.welcome}>Ale</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={ () => this.openSwipe("Lager") } >
                      <Image source={require('../assets/Lager-125.png') } style={{width: 108*.65, height: 252*.65}}/>
                      <Text style={styles.welcome}>Lager</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={ () => this.openSwipe("Pilsner") } >
                      <Image source={require('../assets/Pilsner-125.png') } style={{width: 125*.65, height: 247*.665}}/>
                      <Text style={styles.welcome}>Pilsner</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={ () => this.openSwipe("Stout") } >
                      <Image source={require('../assets/Stout-125.png') } style={{width: 108*.65, height: 252*.66}}/>
                      <Text style={styles.welcome}>Stout</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </View>
          <View style={styles.footer} />
        </View>
      </LinearGradient>);
//icon={navIcon} 
      return (<Drawer view={mainView} />)
    
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
   // backgroundColor: '#ddd'
  },
  footer: {
    flex: .1,
  },
  container: {
    flex: .7,
    justifyContent: 'center',
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
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    isLoggedIn: state.authReducer.isLoggedIn,
    isSearching: state.beerReducer.isSearching,
    beerData: state.beerReducer.beerData,
    beerToView: state.beerReducer.beerToView,
    dislikes: state.wishlistReducer.dislikes,
    wishlist: state.wishlistReducer.wishlist  
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