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
  ToolbarAndroid
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

class Swipe extends React.Component {
  constructor(props){
    super(props);

    this.likeBeer = this.likeBeer.bind(this);
    this.dislikeBeer = this.dislikeBeer.bind(this);

    this.onActionSelected = this.onActionSelected.bind(this);
    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = {
      likeMessage: "",
      wishlistToAdd: [],
      dislikesToAdd: [],
      actionText: "",
      isLoadingWishlist: false
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount called');
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
    console.log('wishlist called');
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
      console.log('in while loop');
      if(this.props.isUpdating === false){

        const { updateWishlistRequest } = this.props.wishlistActions;
        updateWishlistRequest();
        const { loadWishlist } = this.props.wishlistActions;
       // loadWishlist({"username": this.props.username});
        setTimeout(() => loadWishlist({"username": this.props.username}), 500);
        //setTimeout(() => this.setState({isLoadingWishlist: false}), 1000);
      loading = false;
      }
    }
  }

  likeBeer = (beer) => {
    const { loadFrontBeer } = this.props.beerActions;
    loadFrontBeer();

    this.setState({
      likeMessage: "You liked " + beer.name,
      wishlistToAdd: this.state.wishlistToAdd.concat([{
        "id": beer.id,
        "name": beer.name,
        "labelUrl": beer.label,
        "style": beer.style
      }])
    })

    setTimeout(() => {this.setState({
      likeMessage: ""
    });}, 1000);

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
        "style": beer.style
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
    );
//          actions={toolbarActions}
//          title="toolbar"
    // let swipeView = (this.props.isSearching && (!this.props.beerToView || !this.props.beerToView.label)) ? (
    //   <View style={styles.main}>
    //     <ActivityIndicator
    //       animating={ true }
    //       style={[styles.centering, {height: 80}]}
    //       size="large"/>
    //   </View>
    //   ) : (
    //   <DrawerLayoutAndroid
    //     ref={'DRAWER'}
    //     drawerWidth={200}
    //     drawerPosition={DrawerLayoutAndroid.positions.Left}
    //     renderNavigationView={() => navigationView}>
    //     <ToolbarAndroid
    //       navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
    //       onIconClicked={() => this.openDrawer() }
    //       logo={require('../assets/logo_white_30.png')}
    //       style={styles.toolbar}
    //       onActionSelected={ this.onActionSelected } />
    //   <View >
    //       <View style={styles.card}>
    //           <View style={{flexDirection: 'row',justifyContent: 'center'}}>
    //             <Image source={{uri: this.props.beerToView.label}} style={{width: 256, height: 256}}/>
    //           </View>
    //           <Text style={styles.choose}>
    //             {this.props.beerToView.name}
    //           </Text>
    //       </View>
    //       <View style={ styles.thumbs }>
    //           <TouchableOpacity onPress={ () => this.dislikeBeer(this.props.beerToView) } >
    //             <Image source={require('../assets/thumbdown.png') } style={{width: 72, height: 72}}/>
    //           </TouchableOpacity >
    //           <TouchableOpacity onPress={ () => this.likeBeer(this.props.beerToView) } >
    //             <Image source={require('../assets/thumbup.png') } style={{width: 72, height: 72}}/>
    //           </TouchableOpacity >
    //       </View>
    //       <View style={ styles.footer }>
    //         <View style={{flexDirection: 'row',justifyContent: 'center'}}>
    //             <Text style={styles.like } >
    //               { this.state.likeMessage }
    //             </Text>
    //         </View>
    //       </View>
    //     </View>
    //   </DrawerLayoutAndroid>
    //   );
    // return (
    //   <View  style={styles.main}>
    //     { swipeView }  
    //   </View>)

    if((this.props.isSearching && !this.props.beerToView.label) || this.state.isLoadingWishlist) {
      return (
        <View style={styles.main}>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
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
          style={styles.toolbar}
          onActionSelected={ this.onActionSelected } />
      <View style={styles.main} >
          <View style={styles.card}>
              <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Image source={{uri: this.props.beerToView.label}} style={{width: 256, height: 256}}/>
              </View>
              <Text style={styles.choose}>
                {this.props.beerToView.name}
              </Text>
          </View>
          <View style={ styles.thumbs }>
              <TouchableOpacity onPress={ () => this.dislikeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbdown.png') } style={{width: 72, height: 72, marginRight:35}}/>
              </TouchableOpacity >
              <TouchableOpacity onPress={ () => this.likeBeer(this.props.beerToView) } >
                <Image source={require('../assets/thumbup.png') } style={{width: 72, height: 72, marginLeft:35}}/>
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

const toolbarActions = [
  {title: 'Create', icon: require('../assets/ic_favorite_filled_3x.png'), show: 'always'}
];

const styles = StyleSheet.create({
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
    padding: 8,
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

