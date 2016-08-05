import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  WebView, 
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  TouchableOpacity 
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';
const TEXT_INPUT_REF = 'urlInput';
const WEBVIEW_REF = 'webview';

let screenHeight = Dimensions.get('window').height;

class Browser extends Component {
  constructor(props){
    super(props);

    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.goBack = this.goBack.bind(this);
    //this.goForward = this.goForward.bind(this);
    this.reload = this.reload.bind(this);

    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.quitWeb = this.quitWeb.bind(this);

    this.state = {
      url: this.props.website,
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
      isLoadingWishlist: false
    }
  }

  inputText = '';

  handleTextInputChange = (event) => {
    var url = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }
    this.inputText = url;
  }

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  }

  // goForward = () => {
  //   this.refs[WEBVIEW_REF].goForward();
  // }

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  }

  onSubmitEditing = (event) => {
    this.pressGoButton();
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

  wishlist = () => {
    this.setState({
      isLoadingWishlist: true
    })
    this.refs['DRAWER'].closeDrawer();
    const { loadWishlist } = this.props.wishlistActions;
    loadWishlist({"username": this.props.username});
  }

  openDrawer = () => {
    this.refs['DRAWER'].openDrawer()
  }

  quitWeb = () => {
    Actions.pop()
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
    );

    if (this.state.isLoadingWishlist) {
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
          navIcon={require('../assets/ic_navigate_before_black_24dp.png')}
          onIconClicked={() => this.quitWeb() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar} />
      <View style={styles.container}>	
      	<View style={styles.addressBarRow}>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               {'<'}
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.props.website}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}/>
            <TouchableOpacity onPress={this.quitWeb}>
              <View style={styles.goButton}>
                <Text style={{fontWeight: 'bold'}}>
                 X
                </Text>
              </View>
            </TouchableOpacity>
        </View>
      	<WebView
            ref={WEBVIEW_REF}
            automaticallyAdjustContentInsets={false}
        		source={{uri: this.props.website}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
        		style={{marginTop: 1}}/>
      </View>
    </DrawerLayoutAndroid>
    );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
    borderTopWidth: 1,
    borderTopColor: 'white'
  },
  toolbar: {
    backgroundColor: '#ffbf00',
    justifyContent: 'center',
    height: screenHeight * .092
  },
  drawer: {
    flex: .7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF', 
  },
  drawermain: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,   
    //justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    borderTopColor: 'white', 
    borderTopWidth: 1
  },
  // webView: {
  //   //backgroundColor: BGWASH,
  //   height: 350,
  // },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 16,
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
    justifyContent: 'center'
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    wishlistActions: bindActionCreators(wishlistActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username,
    isSearching: state.beerReducer.isSearching,
    isFetching: state.wishlistReducer.isFetching
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Browser);



