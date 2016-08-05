import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer'

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
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class BeerDetail extends React.Component {
  constructor(props){
    super(props);

    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.toggleWishlist = this.toggleWishlist.bind(this);
    this.drizlyClicked = this.drizlyClicked.bind(this);
    this.websiteClicked = this.websiteClicked.bind(this);

    this.goBack = this.goBack.bind(this);

    this.state = {
      toggled: this.props.isAlreadyInWishlist,
      actionMessage: "",
      wishlistMessage: "Remove From Wishlist",
      heartUri: '../assets/ic_favorite_filled_3x.png',
      wishlistClicked: false,
      isLoadingWishlist: false,
    }
  }

  componentWillUnmount() {
    // temp solution to load front beer when back button pressed to return to swipe

    // if(this.props.beerData.length) {
    //   const { loadFrontBeer } = this.props.beerActions;
    // }

    const { removeWishlistItem } = this.props.wishlistActions;
    //if(this.state.dislikeToAdd) {
    if(!this.state.toggled && this.props.isAlreadyInWishlist) {
      let a = {
        "id": this.props.rowID,
        "name": this.props.selectedBeer.name,
        "style": this.props.selectedBeer.style,
        "labelUrl": this.props.selectedBeer.label,
        "icon": this.props.selectedBeer.icon,
        "descript": this.props.selectedBeer.descript,
        "abv": this.props.selectedBeer.abv,
        "brewery": this.props.selectedBeer.brewery,
        "website": this.props.selectedBeer.website
      }
      removeWishlistItem ({
        "username": this.props.username,
        "wishlist": [a],
        "dislikes": [a]
      });
    }
    if(this.state.toggled && !this.props.isAlreadyInWishlist && !this.state.wishlistClicked){
      //add to wishlist
      const { updateWishlist } = this.props.wishlistActions;
      let a = {
        "id": this.props.rowID,
        "name": this.props.selectedBeer.name,
        "style": this.props.selectedBeer.style,
        "labelUrl": this.props.selectedBeer.label,
        "icon": this.props.selectedBeer.icon,
        "descript": this.props.selectedBeer.descript,
        "abv": this.props.selectedBeer.abv,
        "brewery": this.props.selectedBeer.brewery,
        "website": this.props.selectedBeer.website
      }

      updateWishlist({
        "username": this.props.username,
        "wishlistToAdd": [a],
        "dislikesToAdd": []
      });
    }
  }

  drizlyClicked = () => {
    this.setState({
      actionMessage: 'Drizly Feature Coming Soon!'
    })
    setTimeout(() => {this.setState({
      actionMessage: ""
    });}, 2000);
  }

  websiteClicked = () => {
    Actions.webview({website: this.props.selectedBeer.website})
  }

  toggleWishlist = () => {
    if(this.state.toggled){
      this.setState({
        actionMessage: 'Removed From Wishlist',
        toggled: !this.state.toggled,
       // dislikeToAdd: this.props.selectedBeer,
      //  dislikeID: this.props.rowID
      })
    } else {
      this.setState({
        actionMessage: 'Added to Wishlist',
        toggled: !this.state.toggled,
      //  dislikeToAdd: null,
      //  dislikeID: null
      })
    }
    setTimeout(() => {this.setState({
      actionMessage: ""
    });}, 2000);
  }

  signoutUser = () => {
    this.refs['DRAWER'].closeDrawer();
    const { logout } = this.props.authActions;
    logout();
  }

  wishlist = () => {
    this.setState({
      wishlistClicked: true,
      isLoadingWishlist: true
    })
    this.refs['DRAWER'].closeDrawer();
    if(this.state.toggled && !this.props.isAlreadyInWishlist){
      //add to wishlist
      const { updateAndLoadWishlist } = this.props.wishlistActions;
      let a = {
        "id": this.props.rowID,
        "name": this.props.selectedBeer.name,
        "style": this.props.selectedBeer.style,
        "labelUrl": this.props.selectedBeer.label,
        "icon": this.props.selectedBeer.icon,
        "descript": this.props.selectedBeer.descript,
        "abv": this.props.selectedBeer.abv,
        "brewery": this.props.selectedBeer.brewery,
        "website": this.props.selectedBeer.website
      }

      updateAndLoadWishlist({
        "username": this.props.username,
        "wishlistToAdd": [a],
        "dislikesToAdd": []
      });
    } else {
      const { loadWishlist } = this.props.wishlistActions;
      loadWishlist({"username": this.props.username});
    }
  }

  loadStyles = () => {
    this.refs['DRAWER'].closeDrawer();
    Actions.styles();
  }

  openDrawer = () => {
    this.refs['DRAWER'].openDrawer()
  }

  goBack = () => {
    Actions.pop();
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
      </View>
    )

    //let heartView = this.state.toggled ? (
      let heartView = this.state.toggled ? (
        <View style={ styles.icon }>
          <TouchableOpacity onPress={ this.toggleWishlist } >
            <Image source={require('../assets/ic_favorite_filled_3x.png') } style={{width: 60, height: 60}}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, textAlign: 'center'}}>Remove</Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>From Wishlist</Text>

        </View>
      ) : (
        <View style={ styles.icon }>
          <TouchableOpacity onPress={ this.toggleWishlist } >
            <Image source={require('../assets/heart_empty.png') } style={{width: 60, height: 60}}/>
          </TouchableOpacity>
          <Text style={{fontSize: 10, textAlign: 'center'}}>Add</Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>To Wishlist</Text>
        </View>
      )

      let abvColor;

    if(this.props.selectedBeer.abv < 4) {
        abvColor='#ffff00';
    } else if(this.props.selectedBeer.abv >= 4 && this.props.selectedBeer.abv < 5.7) {
        abvColor= '#ffcc00'
    } else if(this.props.selectedBeer.abv >= 5.7 && this.props.selectedBeer.abv < 7.4) {
        abvColor= '#ff9900'
    } else if(this.props.selectedBeer.abv >= 7.4 && this.props.selectedBeer.abv < 9) {
        abvColor= '#ff6600'
    } else {
        abvColor= '#ff3300'
    }

    let beerTitle = (
        <View style={{flex: 5, flexDirection: 'column', justifyContent: 'space-around'}}>
          <View style={{flex: 1, marginLeft:2,marginRight:2,marginBottom:2, flexDirection: 'column', justifyContent: 'space-around'}}>
              <Text style={styles.choose}>
                { this.props.selectedBeer.name }
              </Text>
              <Text style={styles.brewery}>
                { this.props.selectedBeer.brewery }
              </Text>
              <Text style={{fontSize: 12,textAlign: 'left'}}>
                { this.props.selectedBeer.style }
              </Text>
              <View style={{flexDirection: 'row',alignItems:'center'}}>
                <Text style={{fontSize: 12,textAlign: 'left'}}>ABV: </Text>
                  <View style={{ flexDirection: 'column', justifyContent:'flex-start',alignItems: 'center', paddingLeft:3, paddingRight:3, borderColor: 'black',borderWidth: 1, backgroundColor: abvColor}}>
                        <Text style={styles.abv}>
                            {this.props.selectedBeer.abv}%
                        </Text>
                  </View>
              </View>
          </View>
     
        </View>
      )

      // <DrawerLayoutAndroid
      //   ref={'DRAWER'}
      //   drawerWidth={200}
      //   drawerPosition={DrawerLayoutAndroid.positions.Left}
      //   renderNavigationView={() => navigationView}>
      //          <ToolbarAndroid
      //     navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
      //     onIconClicked={() => this.openDrawer() }
      //     logo={require('../assets/logo_white_30.png')}
      //     style={styles.toolbar}
      //     onActionSelected={ this.onActionSelected } />
      // </DrawerLayoutAndroid>

    if (this.state.isLoadingWishlist) {
       return (
        <View style={styles.loading}>
          <View style={{flex:.5, flexDirection:'row', justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize: 27, textAlign: 'center'}}>Loading wishlist...</Text>
          </View>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>)
      
    } else {
    return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_navigate_before_black_24dp.png')}
          onIconClicked={() => this.goBack() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar}/>
        <View style={styles.main}>
          <View style={styles.card}>
                <View style={{marginTop:2, flex: 1.3, flexDirection: 'row',justifyContent: 'flex-start',borderBottomColor: 'black',borderBottomWidth: 5, backgroundColor: 'white'}}>
                    <View style={{flex: 2, flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                        <Image source={{uri: this.props.selectedBeer.icon}} style={{width: 80, height: 80}}/>
                    </View>  
                    { beerTitle }
                </View>
                <View style={{flex: 2.5,flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Text numberOfLines={12} style={{margin:10}} >
                          {this.props.selectedBeer.descript}
                        </Text>
                </View>
                <View style={ styles.icons }>
                    { heartView }
                    <View style={ styles.icon }>
                      <TouchableOpacity onPress={ this.websiteClicked } >
                        <Image source={require('../assets/ic_public_black_24dp.png') } style={{width: 60, height: 60, marginLeft:20, marginRight: 20}}/>
                      </TouchableOpacity >
                      <Text style={{fontSize: 10, textAlign: 'center'}}>Brewer</Text>
                      <Text style={{fontSize: 10, textAlign: 'center'}}>Website</Text>
                    </View>
                    <View style={ styles.icon }>
                      <TouchableOpacity onPress={ this.drizlyClicked } >
                          <Image source={require('../assets/drizly_logo.jpeg') } style={{width: 60, height: 60}}/>
                      </TouchableOpacity >
                      <Text style={{fontSize: 10, textAlign: 'center'}}>Order</Text>
                      <Text style={{fontSize: 10, textAlign: 'center'}}>Online</Text>
                    </View>
                </View>
            </View>
            <View style={ styles.footer }>
                <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                    <Text style={styles.like} >
                      { this.state.actionMessage }
                    </Text>
                </View>
            </View>
        </View>
      </View>
      )
    }
  }
}

const toolbarActions = [
  {title: 'BrowseBeers', icon: require('../assets/beer-icon.png'), show: 'always'},
  {title: 'Wishlist', icon: require('../assets/ic_favorite_filled_3x.png'), show: 'always'}
];

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#F5FCFF'
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
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
    //height: 50,
    justifyContent: 'center',
    height: screenHeight * .092,
  },
  drawer: {
    flex: .7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 2    
  },
  drawermain: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    //justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
  },
  main: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#F5FCFF'
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 15
  },
  card: {
    flex: 1.1,
 //   justifyContent: 'center',
    width: screenWidth*.90,
    margin: 5,
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 5,
  },
  abvtitle: {
    fontSize: 10,
    textAlign: 'center',
   // lineHeight: 12
  },
  abv: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'top',
    fontWeight: 'bold',
  },
  avbbox: {
    flexDirection: 'column', 
    justifyContent:'flex-start',
    alignItems: 'center', 
    paddingLeft:3,
    paddingRight:3, 
    borderColor: 'black',
    borderWidth: 1, 
    backgroundColor: 'red'
  },
  brewery: {
    fontSize: 14,
    textAlign: 'left',
  },
  descript: {
    fontSize: 14,
    textAlign: 'left',
  },
  icons: {
    alignItems: 'center',
    //justifyContent: 'center',
    justifyContent: 'space-around',
    flex: 1.1,
    flexDirection: 'row',
    margin: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  icon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    flex: .1
  },
  footer: {
    flex: .1,
  },
  choose: {
    fontSize: 22,
    textAlign: 'left',
    color:'black',
    fontWeight: 'bold'
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
    beerData: state.beerReducer.beerData,
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BeerDetail);