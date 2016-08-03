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

//import { loadWishlist } from '../actions/wishlistActions';

/* End redux stuff...      */ 

import { Actions } from 'react-native-router-flux';


  // signoutUser = (ref) => {
  //   ref.closeDrawer();
  //   //const { logout } = this.props.authActions;
  //   const { logout } = authActions;
  //   logout();
  // }

  // wishlist = (ref, username) => {
  //   ref.closeDrawer();
  //   console.log('username in wishlist func: ', username)
  //   const { loadWishlist } = wishlistActions;
  //   // loadWishlist({"username": username});
  //   loadWishlist({"username": username});
  // }

  // loadStyles = (ref) => {
  //   ref.closeDrawer();
  //   Actions.styles();
  // }

  // openDrawer = (ref) => {
  //   ref.openDrawer();
  // }

  // const Drawer = (props, drawer) => {

    //console.log('props in Drawer: ', props);
    //console.log('context in Drawer: ', context);

//   return (
//       <View style={styles.main}>
//           <View style={styles.drawer}>
//             <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#F5FCFF', padding: 5, borderBottomColor: '#b5b5b5', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15}}>
//               <Image source={require('../assets/logo_amber.png')} style={{width: 294*.65, height: 70*.65}} />
//             </View>
//             <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
//               <Image source={require('../assets/ic_person_black_24dp.png') } style={{margin: 10}} />
//               <Text style={{fontSize: 18, textAlign: 'left'}}>{props.username}</Text>
//             </View>
//             <TouchableOpacity onPress={ () => wishlist(drawer, props.username) }>
//               <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
//                 <Image source={require('../assets/ic_favorite_filled_3x.png')} style={{width: 24, height: 24,margin: 10}} />
//                 <Text style={{fontSize: 18, textAlign: 'left'}}>Wishlist</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={ () => loadStyles(drawer) }>
//               <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
//                 <Image source={require('../assets/beer-icon.png')} style={{width: 24, height: 24, margin: 10}}/>
//                 <Text style={{fontSize: 18, textAlign: 'left'}}>Browse Beers</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={ () => signoutUser(drawer) }>
//               <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
//                 <Image source={require('../assets/ic_account_circle_black_24dp_sm.png')} style={{margin: 10}}  />
//                 <Text style={{fontSize: 18, textAlign: 'left'}}>Sign Out</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//       </View>
//     )
//   }
// export default Drawer;

class DrawerView extends React.Component {
  constructor(props){
    super(props);

    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
  }

  signoutUser = () => {
    const { logout } = this.props.authActions;
    logout();
  }

  wishlist = () => {
    const { loadWishlist } = this.props.wishlistActions;
    loadWishlist({"username": this.props.username});
  }

  loadStyles = () => {
    Actions.styles();
  }

  render() {

    console.log('props in drawer comp: ', this.props);

  return (
      <View style={styles.main}>
          <View style={styles.drawer}>
            <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: '#F5FCFF', padding: 5, borderBottomColor: '#b5b5b5', borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15}}>
              <Image source={require('../assets/logo_amber.png')} style={{width: 294*.65, height: 70*.65}} />
            </View>
            <View style={{height: 50, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5FCFF', borderBottomColor: '#b5b5b5', borderBottomWidth: 1}}>
              <Image source={require('../assets/ic_person_black_24dp.png') } style={{margin: 10}} />
              <Text style={{fontSize: 18, textAlign: 'left'}}>COCK!!!</Text>
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
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: .7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'black',
    borderWidth: 2    
  },
  main: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    //justifyContent: 'space-around',
    //backgroundColor: '#F5FCFF'
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
    username: state.authReducer.username
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawerView);
