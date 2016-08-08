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
let screenHeight = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

class About extends React.Component {
  constructor(props) {
    super(props);

    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.loadAbout = this.loadAbout.bind(this);

    this.goBack = this.goBack.bind(this);

    this.state = {
      isLoadingWishlist: false
    }
  }

  signoutUser = () => {
    this.refs['DRAWER'].closeDrawer();
    const { logout } = this.props.authActions;
    logout();
  }

  wishlist = () => {
    this.setState({
      isLoadingWishlist: true
    })
    this.refs['DRAWER'].closeDrawer();
    const { loadWishlist } = this.props.wishlistActions;
    loadWishlist({"username": this.props.username});
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

    if (this.state.isLoadingWishlist) {
       return (
      <View style={{flex: 1}}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_navigate_before_black_24dp.png')}
          onIconClicked={() => this.goBack() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar}/>
        <View style={styles.loading}>
          <View style={{flex:.5, flexDirection:'row', justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize: 27, textAlign: 'center'}}>Loading wishlist...</Text>
          </View>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
      </View>
        )
    } else {

    return (
      <View style={{flex: 1}}>
         <ToolbarAndroid
          navIcon={require('../assets/ic_navigate_before_black_24dp.png')}
          onIconClicked={() => this.goBack() }
          logo={require('../assets/logo_white_30.png')}
          style={styles.toolbar}/>
        <View style={styles.main}>
          <View style={{flex: 1, margin: 10, height: 75, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        		<Image source={require('../assets/logo_outline.png')} />
          </View>
          <View style={styles.container}>
              <View style={{flex: 2, flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 22, textAlign: 'center'}}>
                Version 1.0
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
              	<Text style={{fontSize: 16, textAlign: 'center'}}>
                <Image source={require('../assets/ic_copyright_black_24dp.png')} style={{height:20,width:20}} /> 2016 Thomas Leupp
                </Text>
                <Text></Text>
                <Text style={{fontSize: 14, textAlign: 'center'}}>
                Beer data courtesy of BreweryDB
                </Text>
              </View>
          </View>
        </View>
    </View>)
    }
  }
}

const styles = StyleSheet.create({
  toolbar: {
   // backgroundColor: '#e9eaed',
    backgroundColor: '#ffbf00',
    //height: 50,
    height: screenHeight * .092,
    flexDirection: 'column',
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
  main: {
    flex: 1,
    backgroundColor: '#ddd',
    flexDirection: 'column', 
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'white'
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
  container: {
    flex: 4,
    justifyContent: 'center'
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
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.authReducer.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    beerActions: bindActionCreators(beerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);




// import React from 'react';

// import {
// 	View,
// 	Text,
// 	Modal,
// 	StyleSheet,
// 	TouchableHighlight

// } from 'react-native';

// class About extends React.Component {
// 	constructor(props) {
// 		super(props);

// 		this.toggleModal = this.toggleModal.bind(this);

// 		this.state = {
// 			modalVisible: false
// 		};
// 	}

// 	toggleModal() {
// 		this.setState({
// 			modalVisible: !this.state.modalVisible
// 		})
// 	}


// 	render() {
// 	  <View style={{marginTop: 22}}>
//         <Modal
//           animationType={"none"}
//           transparent={true}
//           visible={this.state.modalVisible}
//           onRequestClose={() => {alert("Modal has been closed.")}}>
//          <View style={{marginTop: 22}}>
//           <View>
//             <Text>BeerMe!</Text>
//             <Text>Copyright 2016 Thomas Leupp</Text>
//             <Text>All rights reserved.</Text>

//             <TouchableHighlight onPress={() => {
//               this.setModalVisible(!this.state.modalVisible)
//             }}>
//               <Text>Hide Modal</Text>
//             </TouchableHighlight>

//           </View>
//          </View>
//         </Modal>

//         <TouchableHighlight onPress={() => {
//           this.setModalVisible(true)
//         }}>
//           <Text>Show Modal</Text>
//         </TouchableHighlight>

//       </View>
// 	}
// }
