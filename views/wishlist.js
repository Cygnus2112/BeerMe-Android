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
  ScrollView
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Drawer from '../components/Drawer'

/* Redux stuff...      */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as wishlistActions from '../actions/wishlistActions';
import * as authActions from '../actions/authActions';

let screenHeight = Dimensions.get('window').height;

class Wishlist extends React.Component {
  constructor(props) {
    super(props);

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

  emptyLoadStyles = () => {
    Actions.styles();
  }
    
  render() {
    let emptyWishlistView = (
      <View>
        <Text style={styles.choose}>
          You {"haven't"} added any beers to your wishlist!
        </Text>
        <TouchableNativeFeedback onPress={ this.emptyLoadStyles } >
          <View>
            <Text style={styles.choose}>
              Find your brew
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      );

    let wishlistView = (
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
        )

    if(!Object.keys(this.props.wishlist).length){
      return ( <Drawer view={ emptyWishlistView } /> )
    } else {
      return ( <Drawer view={ wishlistView } /> )
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
    borderColor: 'darkgrey',
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
