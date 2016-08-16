import React from 'react';

import {
  ActivityIndicator,
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';

let screenHeight = Dimensions.get('window').height;

class Wishlist extends React.Component {
  constructor(props) {
    super(props);

    this.signoutUser = this.signoutUser.bind(this);
    this.wishlist = this.wishlist.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.loadStyles = this.loadStyles.bind(this);
    this.loadAbout = this.loadAbout.bind(this);
    this.renderHeader = this.renderHeader.bind(this);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.wishlist)
    }
  }

  componentDidMount(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.wishlist)
    })
    const { updateWishlistSuccess} = this.props.wishlistActions;
    updateWishlistSuccess();
  }

  componentWillReceiveProps(newProps){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.wishlist)
    })
  }

  renderHeader = () => {
    return(
      <View style={styles.header}><Text style={{textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold'}} >Wishlist</Text></View>
      );
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

  loadAbout = () => {
    this.refs['DRAWER'].closeDrawer();
    Actions.about();
  }

  emptyLoadStyles = () => {
    Actions.styles();
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
    if(!Object.keys(this.props.wishlist).length){
      return (
        <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
          onIconClicked={() => this.openDrawer() }
          style={styles.toolbar}
          logo={require('../assets/logo_white_40.png')}/>
          <Text style={styles.choose}>
            You {"haven't"} added any beers to your wishlist!
          </Text>
          <TouchableNativeFeedback onPress={ this.emptyLoadStyles} >
              <View>
                  <Text style={styles.choose}>
                    Find your brew
                  </Text>
              </View>
          </TouchableNativeFeedback>
 
        </DrawerLayoutAndroid>

        )
    } else if(this.props.isFetching){
      return (
        <View style={styles.main}>
          <ActivityIndicator
            animating={ true }
            style={[styles.centering, {height: 80}]}
            size="large"/>
        </View>
        );
    } else {

      let beerIcon;
      return (
      <DrawerLayoutAndroid
        ref={'DRAWER'}
        drawerWidth={200}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <ToolbarAndroid
          navIcon={require('../assets/ic_menu_black_24dp_sm.png')}
          onIconClicked={() => this.openDrawer() }
          style={styles.toolbar}
          logo={require('../assets/logo_white_40.png')}/>
        <ScrollView >
        <ListView
          dataSource = {this.state.dataSource}
          renderHeader={this.renderHeader}
          renderRow = {(selectedBeer, sectionID, rowID) => {
            return (
          <TouchableHighlight
            onPress={()=> {
              Actions.beerdetail({ selectedBeer: selectedBeer, rowID: rowID, isAlreadyInWishlist: true })}
            }
            underlayColor = '#ddd'>

            <View style ={styles.row}>
              <Image source={{uri: selectedBeer.icon}} style={{height:34, width:34, borderColor: 'black', borderWidth: 1, marginLeft: 5, marginRight:5}} />
              <Text style={{fontSize:18}}>{selectedBeer.name}</Text>
            </View>
          </TouchableHighlight>  ) }} />
          </ScrollView>
        </DrawerLayoutAndroid>

        )
    }
  }
}

let styles = StyleSheet.create({
  header: {
    backgroundColor: 'brown',
   // borderBottomColor: 'black',
   // borderBottomWidth: 1,
    height: 30,
    elevation: 3
  },
  toolbar: {
    elevation: 3,
    backgroundColor: '#ffbf00',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 57,
    //height: screenHeight * .092
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
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  choose: {
    fontSize: 27,
    textAlign: 'center',
    margin: 30,
  },
  main: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:5,
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  selectionText:{
    fontSize:15,
    paddingTop:3,
    color:'#b5b5b5',
    textAlign:'right'
  },
}); 

const mapStateToProps = (state) => {
  return {
    isUpdating: state.wishlistReducer.isUpdating,
    isFetching: state.wishlistReducer.isFetching,
    username: state.authReducer.username,
    wishlist: state.wishlistReducer.wishlist,
    dislikes: state.wishlistReducer.dislikes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    wishlistActions: bindActionCreators(wishlistActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
